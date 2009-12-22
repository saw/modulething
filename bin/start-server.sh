#!/bin/sh
echo "Starting module server";
mkdir ../logs;
touch ../logs/server.log;
/usr/local/bin/node server.js > ../logs/server.log &

