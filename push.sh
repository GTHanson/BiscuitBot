#!/bin/sh
git add .
git commit -am "make it better"
git push heroku master
echo Press Enter...
read