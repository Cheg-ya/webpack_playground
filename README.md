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

### 11. Asset Management
- Webpack 이전에 Grunt나 Gulp와 같은 툴을 이용해 이미지나 Dependency 파일 같은 asset을 `/src`에서 `/dist`나 `/build` 폴더로 옮기곤 했다.
- Webpack의 등장 이후 Dependency graph를 이용해 다이나믹하게 번들링을 할 수 있게 되었다.
- 어떤 dependency graph를 통해 어떤 dependency를 사용하고 있는지 명확하게 알 수 있게 되어 불필요한 모듈을 번들링 하지 않게 됨
- Webpack의 가장 큰 장점은 JS이외에 파일들도 dependecy graph에 추가해 필요한 모든걸 한꺼번에 번들링 할 수 있다. (*이전에는 모듈(js파일)을 제외한 파일(이미지, css)들은 직접 dist파일에 옮겼나 싶다)
- image, font, css 등의 파일을 추가할때 Loader를 이용한다.

```
npm install --save-dev style-loader css-loader

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { // .css파일을 style-loader, css-loader를 이용해 변환
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};
```
- 모듈이 실행되면 css 코드가 문자열화 되어 `<head>`태그 안에 `<style>`에 들어간다.
- 빌드 후 index.html을 열어 보면 css가 적용되어 있는 것을 확인할 수 있고 브라우저 inspect 창에서 head 태그를 살펴보면 해당 코드를 볼 수 있다.
- 에디터 내 index.html 파일에서는 해당 코드를 볼 수 없다.

### 12. Dependency Graph
- 하나의 파일이 다른 파일에 의존한다면 Webpack은 이를 dependency로 간주한다.
- 이러한 특성은 Webpack이 CSS, image, font 등과 같은 non-code assets도 어플리케이션의 자바스크립트 라이브러리와 같은 dependency로 제공한다.
- Webpack이 번들링을 시작할때 Entry Point에서 부터 시작해 재귀를 돌면서 Dependency graph를 그리게 되고 모두 묶어 하나의 파일로 만든다. (경우에 따라 복수)
- 이미지 폰트 css파일의 경우 `output`directory 폴더에 들어감
- 이미지 파일의 경우 번들링 후 파일 이름이 바뀌게 되는데 해당 이미지의 경로를 사용하는 부분도 모두 바뀜

```
// Webpack이 번들링 후 부여받은 이름으로 바꿔줌
<image src='./apple.jpg' /> // 내가 작성한 코드
<image src='./4asdfj234jwqwf.jpg' /> // 번들링 후 바뀐 url 주소
```

### 13. Loading Data
- Loader를 이용하면 CSVs, TSVs, and XML 형태의 데이터 파일도 dependency로 추가할 수 있다.
- JSON은 built-in으로 제공되므로 별도의 설치는 필요없다.

```
npm install --save-dev csv-loader xml-loader
```

### 14. Output Management
- Entry Point의 filename이 변경되고 `build`할 때 `index.html`에 해당 변경사항을 자동 적용시키고 싶다면 `HtmlWebpackPlugin` 을 사용한다.
- `HtmlWebpackPlugin`는 default로 `index.html`를 생성한다. `dist` 폴더안에 이미 있다면 해당 파일을 덮어씌운다.
- `CleanWebpackPlugin`은 `dist`폴더를 지운다. 덕분에 webpack config의 변경이 생길 때 사용하지 않는 불필요한 파일들을 지우고 `HtmlWebpackPlugin`을 통해 새로 생성한다.

## 7 May

### 1. Development
```
// Set mode property for Webpack development environment

module.exports = {
  ...
  mode: 'development'
}
```
- `Webpack`을 이용해 코드를 번들링하게 되면 에러를 찾기가 어렵다.
- 예를들어 `Webpack`이 `a.js b.js c.js`를 번들링해 `bundle.js`를 만들었다고 가정하자.
- 위 세개의 파일 중 어느 한 군대서 에러나 경고가 발생하면 `stack trace`는 단순히 `bundle.js`를 가리킨다.
- [source map](https://blog.teamtreehouse.com/introduction-source-maps)을 이용하면 컴파일된 코드와 원래 코드를 맵핑해준다. 따라서 `b.js`에서 에러가 발생했다면 정확히 어느 코드에서 에러가 발생했는지 알 수 있다.
- source map을 사용하려면 devtool 프로퍼티를 추가하면 된다.
- [기타 source map 옵션](https://webpack.js.org/configuration/devtool/)

```
module.exports = {
  ...
  devtool: 'inline-source-map'
};
```
### 2. Development Tool
- 위에 예제에서는 매번 `npm run build`으로 코드를 컴파일해왔다. Webpack은 코드가 수정될 때 자동으로 컴파일 해주는 기능을 제공한다.

#### 1. Webpack Watch Mode
- Watch mode를 이용하면 코드가 수정될 때 마다 자동으로 코드가 컴파일 된다. 단, 컴파일 후 브라우저를 새로고침해야만 변경사항을 확인 할 수 있는 단점이 있다.
```
// package.json
{
  ...
  "script": {
    "watch": "webpack --watch"
  }
};
```

#### 2. Webpack Dev Server
- `webpack-dev-server`은 Watch mode의 단점인 새로고침없이 컴파일과 동시에 자동으로 브라우저를 새로고침해준다.
```
npm install --save-dev webpack-dev-server

// webpack.config.js
module.exports  = {
  ...
  devServer: {
    contentBase: './dist', // 생략 가능
    // port: 3000,
    // open: true,
    // publicPath: '/assets' visit localhost:8080/assets/
  }
};

// package.json
{
  ...
  "script": {
    "start": "webpack-dev-server --open"
  }
}

// open flag는 컴파일 후 자동으로 브라우저를 통해 localhost로 이동한다.

npm run dev // visit localhost:8080
```
- `webpack-dev-server`는 로컬 서버를 만들어 준다.
- default port는 8080
- devServer에 port 프로퍼티를 추가해 port를 바꿀 수 있다.
- open flag 대신 open: true 프로퍼티를 추가해도 같은 결과
- `webpack-dev-server`는 컴파일 후 `output`파일을 만들지 않고 컴파일된 번들된 파일을 메모리에 저정하고 `/(root path)`에서 마운트 된 파일인 것처럼 제공한다. (실제 서버로부터 파일을 응답받은 것처럼)
- `/`가 아닌 다른 path에서 번들된 파일을 불러오고 싶다면 `publicPath` 옵션을 추가할 수 있다.
- `publicPath`를 설정하면 dist가 아닌 설정된 경로에 번들된 파일이 저장된다. (in memory)

#### 3. Webpack Dev MiddleWare
- `webpack-dev-middleware` is a wrapper that will emit files processed by `webpack` to a server.
- `webpack-dev-middleware`는 `express-style` 개발 미들웨어로 개발 환경에서만 사용된다. `webpack-dev-server` 내부적으로 사용되고 있으나 설치 후 직접 커스텀 셋업이 가능하다.
- `webpack-dev-server`나 `Express`와 함께 사용할 수 있다.
- to be continue
