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
		return M{"code": -1, "msg": "创建连接失败", "data": ""}
	}
	return M{"code": 200, "msg": "创建连接成功", "data": ""}
}
