export default [{
  path: '/home',
  meta: {
    title: '账户',
    notLoading: true,
    needLogin: true
  },
  component: r => require.ensure([], () => r(require('./home')), 'home')
  }
]
