package user

import "github.com/fasthttp/websocket"

type User struct {
	WS       *websocket.Conn `json:"ws"`
	Username string          `json:"username"`
	IP       string          `json:"ip"`
	Country  string          `json:"country"`
}

type Visible struct {
	Username string `json:"username"`
	Country  string `json:"country"`
}

func (u *User) GetVisible() Visible {
	return Visible{
		Username: u.Username,
		Country:  u.Country,
	}
}
