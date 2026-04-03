//go:build ignore

package main

import (
    "fmt"
    "log"
    "net/http"
	//"net/http/httputil"
	"io"
)

/*
func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}
*/

func getRSS(w http.ResponseWriter, r *http.Request) {
	var resp, _ = http.Get("https://crateredland.blogspot.com/feeds/posts/default")
	var content, _ = io.ReadAll(resp.Body)
    fmt.Fprintf(w, string(content))

	//return "Yup"

}

func main() {
    http.HandleFunc("/rss/", getRSS)
    log.Fatal(http.ListenAndServe(":8080", nil))

	//var resp, _ = http.Get("https://crateredland.blogspot.com/feeds/posts/default")

	//fmt.Print(resp.Status)

    //fmt.Fprintf(w, )

	//fmt.Print(string(content))



}
