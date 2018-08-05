
simplesite-nextjs-boilerplate

一个`nextjs`站点模板，由[Create Next App](https://github.com/segmentio/create-next-app)创建并自定义

[nextjs](https://nextjs.org/)是一个react 轻量服务端渲染框架

## 特点

- 支持less全局 `./styles`、局部`./components`目录下
- css modules
- 导出静态html配置
- 自定义生产静态文件路径前缀
- bootstrap.gird.css 全局样式支持响应式
- normalize.css 全局样式

## 结构

```
.
├── README.md
├── components
│   ├── head.js
│   └── nav.js
├── next.config.js
├── node_modules
│   ├── [...]
├── package.json
├── pages
│   └── index.js
├── static
│   └── favicon.ico
└── yarn.lock
```

## css

目前方案用less，(https://github.com/zeit/next.js#css).

- 全局`./styles`
- 局部`./components`

一点问题 ：css 默认都编译到 style.css 导致不会即使生效，还未有解决方法，只能自己刷新

### css modules

多个class

```javascript
import styles from './index.less'

const classes = ['item', 'item_active']

function exportCssModules(classArray) {
  return classArray.map(item => styles[item]).join(' ')
}

export item = () => (
    <div className={exportCssModules(classes)></div>
)
export default item
```

```less
.item{
    display:none;
    &_active{
        display:block;
    }
}

```


## 安装

```bash
yarn install
```

## 开发

```bash
yarn dev
```

## 生产部署

```bash
yarn build  # 构建编译js
yarn export # 导出静态页
```

## 添加组件

`./components` 添加组件
