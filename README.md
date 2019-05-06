# Webpack Tutorial

## Setup
```
cd path to the folder where you play
npm init -y //package.json 생성
npm install webpack --save-dev
npm install webpack-cli --save-dev //Webpack command line interface
```

# TIL

## 6 May

### 1. 코드 퍼블리싱 방지
package.json
```
{
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {}
  }
```
- `main` entry 를 지우고 `private`를 `true`로 바꿔 코드가 혹시라도 퍼블리싱되는 것을 방지할 수 있다.

### 2. Bundling
```
After bundling

npx webpack

|- package.json
|- /dist
  |- index.html
+ |- main.js
|- /src
  |- index.js
```

- 소스코드의 Default Directory Path는 `src/index.js`
- 소스코드 파일이 번들링 되어 `dist` 폴더 `main.js` 로 저장된다. (Default)
- Webpack의 Default Output Directory는 `dist` 폴더이지만 webpack.config.js 파일을 만들어 직접 파일 `output` 경로를 설정할 수 있다.
- 번들링 파일의 이름 역시 직접 설정할 수 있다.

### 3. CDN vs npm install --save library name
- Lodash로 예를 들어보자
- CDN을 이용해 Lodash를 사용하게 되면 `index.js` 에서 별도로 모듈을 import 나 require 할 필요 없이 `_`를 전역 변수처럼 사용할 수 있다. 그러나 다음과 같은 문제점이 있다.
1. CDN을 사용하게 되면 소스코드에서 `script` 로 불러온 Lodash를 사용하는지 즉시 알아차리기가 어렵다.
2. 예를 들어 인터넷 오류로 Lodash를 불러오지 못할 경우 어플리케이션이 제대로 작동하지 않을 수도 있다.
3. Lodash를 CDN으로 추가했지만 사용하지 않을 경우 브라우저는 불필요한 코드를 다운 받게 된다.

### 4. Webpack을 이용하면 최신 문법 코드가 하위 브라우저에서도 잘 작동하도록 해준다.
- import & export statement 같은 ES5+ 문법은 하위 브라우저을 지원하지 않는다. 
- Babel이나 Webpack의 loader system을 이용하면 최신 문법을 사용한 코드를 Transpile 시켜 하위 브라우저에서도 작동할 수 있다.

### 5. Webpack bundling command
```
1. npx webpack
src/index.js 파일을 번들링한다.

2. npx webpack --config webpack.config.js
사용자 configuration 내용을 적용 시켜 번들링한다.

3. NPM scripts를 이용한 shortcut (recommended)
{
  "scripts": {
    "build": webpack --config webpack.config.js
  }
}

npm run build

```

### 6. Entry Point
- Entry Point는 Webpack이 내부적으로 Dependency graph를 만들 때 시작 지점을 말한다.
- Default value는 `./src/index.js`

#### Single Entry Syntax
```
Entry: string|Array<String>

module.exports = {
  entry: './path/to/my/entry/file.js'
};

module.exports = {
  entry: ['babel-polyfill' , './path/to/my/entry/file.js']
};
```
- Entry Point에 배열을 이용하면 배열에 안에 있는 파일이나 Dependency files를 하나로 묶는다. 위에 babel-polyfill처럼 초기 구동 때 먼저 실행 되어야 하는 라이브러리를 넣을 수 있다.

### 7. Output
- 번들링 된 파일을 어느 경로에 어떤 이름으로 내보낼지 결정한다.
- Default value는 `./dist/main.js`

```
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```
 ### 8. Loaders
 - Webpack은 Javascript와 JSON파일만 이해한다.
 - Loader는 CSS, Font, image 등의 파일을 변환시켜 Webpack이 인식할 수 있게 해준다. (Dependency graph에 추가됨)
 
 ```
 const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};
 ```
- test: 변환 될 파일을 정의
- use: 해당 파일의 변환 작업을 할 Loader를 가리킴
- test에 RegExp 사용할 때 Quote의 유무에 따라 의미가 달라진다.

### 9. Plugins
- 특정 타입의 모듈을 변환시키는 로더와는 달리 bundle optimization, asset management, injection of environment variables와 같은 일을 한다.

```
//installed via npm & HTML 파일을 생성해 번들링 된 파일에 자동으로 추가한다.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

### 10. mode
```
module.exports = {
  mode: 'production' // 'development', 'none'
};
```
- By setting the mode parameter to either development, production or none, you can enable webpack's built-in optimizations that correspond to each environment. The default value is production.
