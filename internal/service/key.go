package service

import (
	"changeme/internal/define"
	"changeme/internal/helper"
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
)

// 键列表
func KeyList(req define.KeyListRequest) ([]string, error) {
	conn, err := helper.GetConnection(req.ConnIdentify)
	if err != nil {
		return nil, err
	}
	rdb := redis.NewClient(&redis.Options{
		Addr:     conn.Addr + ":" + conn.Port,
		Username: conn.Username,
		Password: conn.Password,
		DB:       req.Db,
	})
	var count int64 = 100
	if req.Keyword != "" {
		count = 200
	}
	res, _, err := rdb.Scan(context.Background(), 0, "*"+req.Keyword+"*", count).Result()
	if err != nil {
		return nil, err
	}
	return res, nil
}

func GetKeyValue(req *define.KeyValueRequest) (*define.KeyValueReply, error) {
	conn, err := helper.GetConnection(req.ConnIdentify)
	if err != nil {
		return nil, err
	}
	rdb := redis.NewClient(&redis.Options{
		Addr:     conn.Addr + ":" + conn.Port,
		Username: conn.Username,
		Password: conn.Password,
		DB:       req.Db,
	})
	_type, err := rdb.Type(context.Background(), req.Key).Result()
	if err != nil {
		return nil, err
	}
	v, err := rdb.Get(context.Background(), req.Key).Result()
	if err != nil {
		return nil, err
	}
	ttl, err := rdb.TTL(context.Background(), req.Key).Result()
	if err != nil {
		return nil, err
	}
	return &define.KeyValueReply{TTL: ttl, Type: _type, Value: v}, nil
}

func DeleteKeyValue(req *define.KeyValueRequest) error {
	conn, err := helper.GetConnection(req.ConnIdentify)
	if err != nil {
		return err
	}
	rdb := redis.NewClient(&redis.Options{
		Addr:     conn.Addr + ":" + conn.Port,
		Username: conn.Username,
		Password: conn.Password,
		DB:       req.Db,
	})
	n, err := rdb.Del(context.Background(), req.Key).Result()
	if err != nil {
		return err
	}
	fmt.Println("delete success", n)
	return nil
}

func SetKeyValue(req *define.KeyValueUpdate) (*define.KeyValueReply, error) {
	conn, err := helper.GetConnection(req.ConnIdentify)
	if err != nil {
		return nil, err
	}
	rdb := redis.NewClient(&redis.Options{
		Addr:     conn.Addr + ":" + conn.Port,
		Username: conn.Username,
		Password: conn.Password,
		DB:       req.Db,
	})
	res, err := rdb.Set(context.Background(), req.Key, req.Value, 0).Result()
	fmt.Println("res", res)
	if err != nil {
		return nil, err
	}
	_type, err := rdb.Type(context.Background(), req.Key).Result()
	if err != nil {
		return nil, err
	}
	v, err := rdb.Get(context.Background(), req.Key).Result()
	if err != nil {
		return nil, err
	}
	ttl, err := rdb.TTL(context.Background(), req.Key).Result()
	if err != nil {
		return nil, err
	}
	return &define.KeyValueReply{TTL: ttl, Type: _type, Value: v}, nil
}
