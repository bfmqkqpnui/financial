export default [{
  path: '/login',
  meta: {
    title: '登录',
    notLoading: true,
    needLogin: false
  },
  component: r => require.ensure([], () => r(require('./index')), 'login')
  }
]
