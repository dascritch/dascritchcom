#!/bin/bash

wget -O data/webdev.html http://dascritch.net/category/Webdev
wget -O data/self-business.html http://dascritch.net/tag/self-business
wget -O data/html.html http://dascritch.net/tag/html
wget -O data/javascript.html http://dascritch.net/tag/javascript

python3 data/parse.py