package helper

import (
	"io/ioutil"
	"net/http"
)

func GetCountryCode(ip string) (string, error) {
	res, err := http.Get("http://www.geoplugin.net/json.gp?ip=" + ip)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	return string(body), err
}

func ContainsProfanity(msg string) bool {
	res, err := http.Get("http://www.purgomalum.com/service/containsprofanity?text=" + msg)
	if err != nil {
		return false
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return false
	}

	return string(body) == "true"
}
