package define

import "time"

var ConfigName = "redis-client.conf"

type Configjson struct {
	Identify string `json:"identify"`
	Name     string `json:"name"`
	Addr     string `json:"addr"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Connection struct {
	Identify string `json:"identify"`
	Name     string `json:"name"`
	Addr     string `json:"addr"`
	Port     string `json:"port"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Config struct {
	Connections []*Connection `json:"connections"`
}

type DbItem struct {
	Key    string `json:"key"`
	Number int    `json:"number"`
}

type KeyListRequest struct {
	ConnIdentify string `json:"conn_identify"`
	Db           int    `json:"db"`
	Keyword      string `json:"keyword"`
}

type KeyValueRequest struct {
	ConnIdentify string `json:"conn_identify"`
	Db           int    `json:"db"`
	Key          string `json:"key"`
}

type KeyValueReply struct {
	Type  string        `json:"type"`
	TTL   time.Duration `json:"ttl"`
	Value string        `json:"value"`
}
