package main

import (
	"changeme/internal/define"
	"changeme/internal/service"
	"context"
	"fmt"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// 连接列表
func (a *App) ConnectionList() interface{} {
	conn, err := service.ConnectionList()
	if err != nil {
		return M{"code": -1, "msg": "Error" + err.Error(), "data": ""}
	}
	return M{"code": 200, "data": conn, "msg": ""}
}

// 创建连接
func (a *App) ConnectionCreate(conn *define.Connection) H {
	err := service.ConnectionCreate(conn)
	if err != nil {
		return M{"code": -1, "msg": "新建连接失败", "data": ""}
	}
	return M{"code": 200, "msg": "新建连接成功", "data": ""}
}

// 编辑连接
func (a *App) ConnectionEdit(conn *define.Connection) H {
	err := service.ConnectionEdit(conn)
	if err != nil {
		return M{"code": -1, "msg": "编辑连接失败", "data": ""}
	}
	return M{"code": 200, "msg": "编辑连接成功", "data": ""}
}

// 删除连接
func (a *App) ConnectionDelete(conn *define.Connection) H {
	err := service.ConnectionDelete(conn)
	if err != nil {
		return M{"code": -1, "msg": "删除连接失败", "data": ""}
	}
	return M{"code": 200, "msg": "删除连接成功", "data": ""}
}

// DB列表
func (a *App) DbList(identify string) interface{} {
	dbs, err := service.DbList(identify)
	if err != nil {
		return M{"code": -1, "msg": "Error" + err.Error(), "data": ""}
	}
	return M{"code": 200, "data": dbs, "msg": ""}
}

// 键列表
func (a *App) KeyList(req define.KeyListRequest) H {
	if req.ConnIdentify == "" {
		return M{"code": -1, "msg": "连接唯一标识不能为空", "data": ""}
	}
	keys, err := service.KeyList(req)
	if err != nil {
		return M{"code": -1, "msg": "Error" + err.Error(), "data": ""}
	}
	return M{"code": 200, "data": keys, "msg": ""}
}

// 键值对查询
func (a *App) GetKeyValue(req *define.KeyValueRequest) H {
	if req.Key == "" || req.ConnIdentify == "" {
		return M{"code": -1, "msg": "标识符和键名不能为空", "data": ""}
	}
	kv, err := service.GetKeyValue(req)
	if err != nil {
		return M{"code": -1, "msg": "Error" + err.Error(), "data": ""}
	}
	return M{"code": 200, "data": kv, "msg": ""}
}

// 键值对删除
func (a *App) DeleteKeyValue(req *define.KeyValueRequest) H {
	if req.Key == "" || req.ConnIdentify == "" {
		return M{"code": -1, "msg": "标识符和键名不能为空", "data": ""}
	}
	err := service.DeleteKeyValue(req)
	if err != nil {
		return M{"code": -1, "msg": "Error" + err.Error(), "data": ""}
	}
	return M{"code": 200, "data": "", "msg": ""}
}

// 键值对设置
func (a *App) SetKeyValue(req *define.KeyValueUpdate) H {
	if req.Key == "" || req.ConnIdentify == "" {
		return M{"code": -1, "msg": "标识符和键名不能为空", "data": ""}
	}
	kv, err := service.SetKeyValue(req)
	if err != nil {
		return M{"code": -1, "msg": "Error" + err.Error(), "data": ""}
	}
	return M{"code": 200, "data": kv, "msg": ""}
}
