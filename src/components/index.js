const install = function (Vue) {
  if (install.installed) return;
  // switch
  Vue.component('navComponent', resolve => {
    require(['./nav/nav.vue'], resolve)
  });
  Vue.component('booksTable', resolve => {
    require(['./setofbooks/index.vue'], resolve)
  });

  Vue.component('bodyNav', resolve => {
    require(['./setofbooks/bodyNav.vue'], resolve)
  });
  Vue.component('voucher', resolve => {
    require(['./setofbooks/voucher.vue'], resolve)
  });
  Vue.component('booksList', resolve => {
    require(['./setofbooks/booksList.vue'], resolve)
  });
  Vue.component('pagination', resolve => {
    require(['./pagination/paginationFull.vue'], resolve)
  });
}


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default install
