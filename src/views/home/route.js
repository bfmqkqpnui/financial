export default [{
  path: '/home',
  name: 'home',
  component: r => require.ensure([], () => r(require('./home')), 'home'),
  children: [
    {
      path: '/',
      redirect: {name: 'accounts'}
    },
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
    },
    /**用户列表*/
    {
      path: 'user',
      name: 'user',
      meta: {
        title: '账套列表',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/user/userManager.vue')), 'userManager')
    },
    /**合同列表*/
    {
      path: 'contract',
      name: 'contract',
      meta: {
        title: '账套列表',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/contract/contractManager.vue')), 'contractManager')
    },
    /**数据列表*/
    {
      path: 'data',
      name: 'data',
      meta: {
        title: '账套列表',
        notLoading: true,
        needLogin: true
      },
      component: r => require.ensure([], () => r(require('../../components/data/dataManager.vue')), 'dataManager')
    },
  ]
}
]
