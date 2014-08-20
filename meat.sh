#!/bin/bash

if [  -n "$1" ]; then
   SSH_CONN=`curl -s http://skymeat.herokuapp.com/get/$1`
   if [[ $SSH_CONN == ssh* ]]; then
  	 `$SSH_CONN`
  	fi 
else
   CONN=`tmate show-messages | grep "Remote session:" | awk -F"ssh " '{print $2}'`
   HOST=`hostname`
   curl --data "host=$HOST&conn=$CONN" http://skymeat.herokuapp.com/save
   echo ""
fi



