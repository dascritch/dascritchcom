#!/bin/bash

wget -O data/webdev.html http://dascritch.net/category/Webdev
wget -O data/self-business.html http://dascritch.net/tag/self-business

python3 data/parse.py