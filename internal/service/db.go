package service

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"context"
	"errors"
	"github.com/go-redis/redis/v8"
	"strconv"
	"strings"
)

func DbList(identify string) ([]*define.DbItem, error) {
	conn, err := helper.GetConnection(identify)
	if err != nil {
		return nil, err
	}
	rdb := redis.NewClient(&redis.Options{
		Addr:     conn.Addr + ":" + conn.Port,
		Username: conn.Username,
		Password: conn.Password,
	})
	KeySpace, err := rdb.Info(context.Background(), "KeySpace").Result()
	if err != nil {
		return nil, err
	}
	m := make(map[string]int)
	v := strings.Split(KeySpace, "\n")
	for i := 1; i < len(v); i++ {
		databases := strings.Split(v[i], ":")
		if len(databases) < 2 {
			continue
		}
		vv := strings.Split(databases[1], ",")
		if len(vv) < 1 {
			continue
		}
		keyNumber := strings.Split(vv[0], "=")
		if len(keyNumber) < 2 {
			continue
		}
		num, _ := strconv.Atoi(keyNumber[1])
		if err != nil {
			return nil, err
		}
		m[databases[0]] = num
	}

	databasesRes, err := rdb.ConfigGet(context.Background(), "databases").Result()
	if err != nil {
		return nil, err
	}
	if len(databasesRes) < 2 {
		return nil, errors.New("数据连接异常")
	}
	dbNum, err := strconv.Atoi(databasesRes[1].(string))
	if err != nil {
		return nil, err
	}
	data := make([]*define.DbItem, 0)
	for i := 0; i < dbNum; i++ {
		item := &define.DbItem{
			Key:    "db" + strconv.Itoa(i),
			Number: 0,
		}
		if n, ok := m["db"+strconv.Itoa(i)]; ok {
			item.Number = n
		}
		data = append(data, item)
	}
	return data, nil
}
