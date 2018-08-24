## Node module should have only es5 for compatibility reasons

I followed instructions here: https://stackoverflow.com/questions/42942000/using-create-react-app-and-having-es6-dependencies

```
npm install --save-dev babel-core babel-cli babel-preset-latest

.babelrc

{
  "presets": ["latest"]
}

package.json

 "main": "./lib",
  "scripts": {
    "build": "babel src --out-dir lib"
  }
```

But npm prompted to use env instead of latest. Hence:

npm install --save-dev babel-core babel-cli babel-preset-latest

{
  "presets": ["env"]
}


I added src to .npmignore as mentioned here
