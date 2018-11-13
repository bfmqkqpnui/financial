export default [{
  path: '/home',
  component: r => require.ensure([], () => r(require('./home')), 'home'),
  redirect: '/home/accounts',
  children: [
    /**账套列表*/
    {
      path: 'accounts',
      name: 'accounts',
      meta: {
        title: '账套列表',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/setofbooks/booksList.vue')), 'booksList')
    },
    /**凭证列表*/
    {
      path: 'accounts/voucher',
      name: 'voucher',
      meta: {
        title: '凭证列表',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/setofbooks/voucher.vue')), 'voucher')
    },
    /**会计账簿*/
    {
      path: 'accounts/books',
      name: 'books',
      meta: {
        title: '历史数据',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/setofbooks/books.vue')), 'books')
    },
    /**历史数据*/
    {
      path: 'accounts/histories',
      name: 'histories',
      meta: {
        title: '历史数据',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/setofbooks/histories.vue')), 'histories')
    },
    /**账套设置*/
    {
      path: 'accounts/settings',
      name: 'bookSettings',
      meta: {
        title: '账套设置',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/setofbooks/bookSettings.vue')), 'bookSettings')
    }
  ]
}
]
