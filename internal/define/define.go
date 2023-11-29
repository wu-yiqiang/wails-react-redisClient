package define

var ConfigName = "redis-client.conf"

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
