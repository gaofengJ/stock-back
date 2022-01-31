**最近把之前的一个个人项目重新拾起来了，用Koa替换掉之前的Express，顺便把TS加进来，这里记录一下初始化的过程。**

参考：[https://juejin.cn/post/6844904008834875400](https://juejin.cn/post/6844904008834875400)

## 一、初始化package.json。

```
mkdir koa-demo
cd koa-demo
npm init
```

## 二、安装koa

```npm install koa```

## 三、TypeScript的安装与配置

```npm install typescript --save-dev```

执行```node ./node_modules/.bin/tsc --init```初始化TypeScript项目，生成一个tsconfig.json配置文件。

下面是本项目配置：

```json
{
  "compilerOptions": {
    // "incremental": true,                   /* 增量编译 提高编译速度*/
    "target": "ES2017",                       /* 编译目标ES版本*/
    "module": "commonjs",                     /* 编译目标模块系统*/
    // "lib": [],                             /* 编译过程中需要引入的库文件列表*/
    "declaration": true,                      /* 编译时创建声明文件 */
    "rootDir": "./",                          /* ts编译根目录. */
    "outDir": "dist",                         /* ts编译输出目录 */
    "baseUrl": "./",                          /* ts基础路径 */
    "paths": {                                /* 别名 */
      "@/*": ["./src/*"]
    },
    // "importHelpers": true,                 /* 从tslib导入辅助工具函数(如__importDefault)*/
    "strict": true,                           /* 严格模式开关 等价于noImplicitAny、strictNullChecks、strictFunctionTypes、strictBindCallApply等设置true */
    "noUnusedLocals": true,                   /* 未使用局部变量报错*/
    "noUnusedParameters": true,               /* 未使用参数报错*/
    "noImplicitReturns": true,                /* 有代码路径没有返回值时报错*/
    "noFallthroughCasesInSwitch": true,       /* 不允许switch的case语句贯穿*/
    "moduleResolution": "node",               /* 模块解析策略 */
    "typeRoots": [                            /* 要包含的类型声明文件路径列表*/
      "./typings",
      "./node_modules/@types"
      ],                      
    "allowSyntheticDefaultImports": true,    /* 允许从没有设置默认导出的模块中默认导入，仅用于提示，不影响编译结果*/
    "esModuleInterop": false                  /* 允许编译生成文件时，在代码中注入工具类(__importDefault、__importStar)对ESM与commonjs混用情况做兼容处理*/
  },
  "include": [    
    "index.ts",                            /* 需要编译的文件 */
    "src/**/*.ts",
    "typings/**/*.ts"
  ],
  "exclude": [                                /* 编译需要排除的文件 */
    "node_modules/**"
  ],
}
```

安装常见插件的类型声明，刚开始只安装了这两个。

```npm install @types/koa @types/node --save-dev```

## 四、安装ESLint

这里我安装了以下几个插件：

* eslint
* eslint-config-airbnb-base（预设的Eslint规则，由于最新的版本需要升级eslint，而新版本的eslint与VSCode兼容有问题，所以这里没有使用最新版本）
* eslint-plugin-import（提供对ES6+ import/export语法的支持）
* @typescript-eslint/eslint-plugin（TS相关）
* @typescript-eslint/parser（TS相关）

另外安装nodemon（热更新）、ts-node（不必编译成js就可以直接运行）。

最后依赖如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b3599fd91e241dfa06746714a1afc6a~tplv-k3u1fbpfcp-watermark.image?)

## 五、添加文件

/src/app.ts：

```javascript
import Koa from 'koa';

const app = new Koa();

export default app;
```

index.ts:

```javascript
import app from './src/app';

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`项目启动成功，端口号：${port}`);
});
```

## 六、添加执行脚本

在package.json的scripts中添加执行脚本，这里使用了nodemon的配置文件nodemon.json：

```json
{
  "watch": ["src"],
  "ext": "ts",
  "ignore": [],
  "exec": "cross-env NODE_ENV=dev ts-node -r tsconfig-paths/register ./index"
}
```

package.json中命令如下：

```json
"scripts": {
  "dev": "nodemon",
  "start": "cross-env NODE_ENV=prod ts-node -r tsconfig-paths/register ./index"
},
```

## 七、执行```npm run dev```，成功启动项目。

## FAQ

### 设置别名

tsconfig中添加：

```json
"baseUrl": "./",                          /* ts基础路径 */
"paths": {                                /* 别名 */
  "@/*": ["./src/*"]
},
```

项目总用到了ts-node，所以需要安装一个新包tsconfig-paths，修改脚本：

```json
"exec": "cross-env NODE_ENV=dev ts-node -r tsconfig-paths/register ./index"
```

eslint也需要安装一个新包eslint-import-resolver-alias，然后修改.eslintrc.js文件：

```javascript
'import/resolver': {
  alias: {
    map: [['@', './src']],
    extensions: ['.ts', '.js'],
  }
},
```

### 报错：Unable to resolve path to module '@/app'.eslint(import/no-unresolved)

在.eslintrc.js中添加

```javascript
settings: {
  'import/resolver': {
    node: {
      extensions: ['.ts', '.js'],
    },
  },
},
```

### 报错：Missing file extension "ts" for "@/app"eslint(import/extensions)

在.eslintrc.js中添加

```javascript
rules: {
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      ts: 'never',
    }
  ]
},
```

### 报错：index.d.ts(753, 1): 此模块是使用 "export =" 声明的，只能在使用 "esModuleInterop" 标志时进行默认导入。

在tsconfig.json中添加

```json
"allowSyntheticDefaultImports": true,    /* 允许从没有设置默认导出的模块中默认导入，仅用于提示，不影响编译结果*/
"esModuleInterop": true                  /* 允许编译生成文件时，在代码中注入工具类(__importDefault、__importStar)对ESM与commonjs混用情况做兼容处理*/

```
