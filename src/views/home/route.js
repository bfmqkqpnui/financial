export default [{
  path: '/home',
  component: r => require.ensure([], () => r(require('./home')), 'home'),
  redirect: '/home/accounts',
  children: [
    /**账套列表*/
    {
      path: 'accounts',
      meta: {
        title: '账套列表',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/setofbooks/booksList.vue')), 'booksList')
    },
    /**凭证列表*/
    {
      path: 'voucher',
      meta: {
        title: '凭证列表',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/setofbooks/voucher.vue')), 'voucher')
    }
  ]
}
]
