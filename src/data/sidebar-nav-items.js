export default function () {
  return [{
    title: 'Overview',
    to: {
      name: 'overview',
    },
    htmlBefore: '<i class="material-icons">show_chart</i>',
    htmlAfter: '',
  }, {
    title: 'Cluster',
    htmlBefore: '<i class="material-icons">dns</i>',
    to: {
      name: 'cluster',
    },
  }, {
    title: 'Users',
    htmlBefore: '<i class="material-icons">person</i>',
    to: {
      name: 'users',
    },
  }, {
    title: 'Items',
    htmlBefore: '<i class="material-icons">inventory_2</i>',
    to: {
      name: 'items',
    },
  }, {
    title: 'Settings',
    htmlBefore: '<i class="material-icons">settings</i>',
    to: {
      name: 'config',
    },
  }];
}