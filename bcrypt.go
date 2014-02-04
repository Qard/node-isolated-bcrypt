package main

import (
  "code.google.com/p/go.crypto/bcrypt"
  "github.com/codegangsta/cli"
  "fmt"
  "os"
)

func main () {
  app := cli.NewApp()
  app.Name = "bcrypt"
  app.Usage = "Hash and compare strings with bcrypt"

  app.Commands = []cli.Command{
    {
      Name:      "hash",
      ShortName: "h",
      Usage:     "hash a string",
      Action: func(c *cli.Context) {
        args := c.Args()
        input := args[0]

        hash, err := bcrypt.GenerateFromPassword([]byte(input), 1)
        if err == nil {
          fmt.Println(string(hash))
        } else {
          println(err.Error())
        }
      },
    },
    {
      Name:      "compare",
      ShortName: "c",
      Usage:     "compare a string to a hash",
      Action: func(c *cli.Context) {
        args := c.Args()
        input := args[0]
        hash := args[1]

        err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(input))
        if err == nil {
          fmt.Println("true")
        } else {
          fmt.Println("false")
        }
      },
    },
  }

  app.Run(os.Args)
}