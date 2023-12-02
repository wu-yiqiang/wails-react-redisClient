package service

import (
	"changeme/internal/define"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/google/uuid"
	"io/ioutil"
	"os"
)

// 连接列表
func ConnectionList() ([]*define.Connection, error) {
	nowpath, _ := os.Getwd()
	data, err := ioutil.ReadFile(nowpath + string(os.PathSeparator) + define.ConfigName)
	if errors.Is(err, os.ErrNotExist) {
		return nil, err
	}
	conf := new(define.Config)
	err = json.Unmarshal(data, conf)
	if err != nil {
		return nil, err
	}
	return conf.Connections, nil
}

// 创建连接
func ConnectionCreate(conn *define.Connection) error {
	if conn.Addr == "" {
		return errors.New("连接地址为空")
	}
	if conn.Name == "" {
		conn.Name = conn.Addr
	}
	if conn.Port == "" {
		conn.Port = "6379"
	}

	conn.Identify = uuid.New().String()
	conf := new(define.Config)
	nowpath, _ := os.Getwd()
	data, err := ioutil.ReadFile(nowpath + string(os.PathSeparator) + define.ConfigName)
	if errors.Is(err, os.ErrNotExist) {
		os.Mkdir(nowpath, 0666)
		conf.Connections = []*define.Connection{conn}
		data, _ := json.Marshal(conf)
		ioutil.WriteFile(nowpath+string(os.PathSeparator)+define.ConfigName, data, 0666)
		return nil
	}
	json.Unmarshal(data, conf)
	conf.Connections = append(conf.Connections, conn)
	data, _ = json.Marshal(conf)
	ioutil.WriteFile(nowpath+string(os.PathSeparator)+define.ConfigName, data, 0666)
	return nil
}

// 编辑连接
func ConnectionEdit(conn *define.Connection) error {
	if conn.Identify == "" {
		fmt.Println("erer", conn)
		return errors.New("连接标识不能为空")
	}
	if conn.Addr == "" {
		return errors.New("连接地址为空")
	}
	if conn.Name == "" {
		conn.Name = conn.Addr
	}
	if conn.Port == "" {
		conn.Port = "6379"
	}

	conf := new(define.Config)
	nowpath, _ := os.Getwd()
	data, err := ioutil.ReadFile(nowpath + string(os.PathSeparator) + define.ConfigName)
	if err != nil {
		return err
	}
	json.Unmarshal(data, conf)
	for k, v := range conf.Connections {
		if v.Identify == conn.Identify {
			conf.Connections[k] = conn
		}
	}
	data, _ = json.Marshal(conf)
	ioutil.WriteFile(nowpath+string(os.PathSeparator)+define.ConfigName, data, 0666)
	return nil
}

// 编辑连接
func ConnectionDelete(conn *define.Connection) error {
	if conn.Identify == "" {
		return errors.New("连接标识不能为空")
	}
	if conn.Addr == "" {
		return errors.New("连接地址为空")
	}
	if conn.Name == "" {
		conn.Name = conn.Addr
	}
	if conn.Port == "" {
		conn.Port = "6379"
	}

	conf := new(define.Config)
	nowpath, _ := os.Getwd()
	data, err := ioutil.ReadFile(nowpath + string(os.PathSeparator) + define.ConfigName)
	if err != nil {
		return err
	}
	json.Unmarshal(data, conf)
	for k, v := range conf.Connections {
		if v.Identify == conn.Identify {
			conf.Connections = append(conf.Connections[:k], conf.Connections[k+1:]...)
		}
	}
	data, _ = json.Marshal(conf)
	ioutil.WriteFile(nowpath+string(os.PathSeparator)+define.ConfigName, data, 0666)
	return nil
}
