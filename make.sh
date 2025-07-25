#!/bin/bash

wget -O data/webdev.html https://dascritch.net/category/Webdev
wget -O data/self-business.html https://dascritch.net/tag/self-business
python3 data/parse.py

scss -t compact aspects/source.scss aspects/compressed.css

rm aspects/concatenated.js
cp aspects/une2025.js aspects/concatenated.js
cp aspects/concatenated.js aspects/compressed.js
java -jar /usr/share/java/closure-compiler.jar --language_in ECMASCRIPT6 --compilation_level SIMPLE_OPTIMIZATIONS  --js aspects/concatenated.js --js_output_file aspects/compressed.js

git add aspects/compressed.css aspects/concatenated.js aspects/compressed.js