const install = function (Vue) {
  if (install.installed) return;
  // bl-switch
  Vue.component('booksTable', resolve => {
    require(['./setofbooks/setOfBooksTable.vue'], resolve)
  });
}


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default install
