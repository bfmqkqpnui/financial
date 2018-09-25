export default [{
  path: '/home',
  meta: {
    title: '账套管理',
    notLoading: true,
    needLogin: true
  },
  component: r => require.ensure([], () => r(require('./home')), 'home'),
  children: [
    /**账套列表*/
    {path: 'booksManager', component: r => require.ensure([], () => r(require('../../components/setofbooks/index.vue')), 'index')}
  ]
}
]
