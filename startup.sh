#!/bin/sh

if [ ! -f ./src/service/FirebaseConfig.ts ]; then
    echo "You have not correctly setup your firebase database."
    echo "Please see the steps in 'FirebaseConfig-example.ts'." 
    exit 1
fi

echo "Firebase config is setup, continuing to build..." 

if [ ! -f ./build/index.html ]; then
    npm install --silent
    npm run --silent build 
fi
npx http-serve ./build -o