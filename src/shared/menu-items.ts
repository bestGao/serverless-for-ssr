export default [
  {
    name: '基本介绍',
    to: '/',
    children: [
      { name: '快速上手', to: '/#quickstart' },
      { name: '目录结构', to: '/#structure' },
      { name: '配置', to: '/#customize' },
    ],
  },
  {
    name: '项目开发',
    to: '/develop',
    children: [
      { name: '语言', to: '/develop#lang' },
      { name: '路由', to: '/develop#route' },
      { name: 'CSS预处理', to: '/develop#css' },
      { name: '数据获取', to: '/develop#data' },
      { name: '集成redux', to: '/develop#redux' },
    ],
  },
  {
    name: 'Demo',
    to: '/demo',
    children: [
      { name: '纯客户端渲染-1', to: '/demo/sors/36247134' },
      { name: '个人动态', to: '/demo/moment/90001621?pageNum=1' },
      { name: 'TV 列表', to: '/demo/cors?q=pokemon' },
    ],
  },
  {
    name: '待完善',
    to: '/continue',
    children: [
      { name: '热更新', to: '/continue#hmr' },
      { name: 'CSS预渲染', to: '/continue#css' },
      { name: '打包优化', to: '/continue#optimize' },
      { name: '封装', to: '/continue#capability' },
    ],
  },
]
