#!/bin/bash

wget -O data/webdev.html http://dascritch.net/category/Webdev
wget -O data/self-business.html http://dascritch.net/tag/self-business

#sed -e 's/.*<main id="main">(.*)</main>.*/$1/m' data/self-business.xml