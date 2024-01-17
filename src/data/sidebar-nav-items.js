export default function () {
  return [{
    title: '概览',
    to: {
      name: 'overview',
    },
    htmlBefore: '<i class="material-icons">show_chart</i>',
    htmlAfter: '',
  }, {
    title: '任务',
    htmlBefore: '<i class="material-icons">task</i>',
    to: {
      name: 'tasks',
    },
  }, {
    title: '集群',
    htmlBefore: '<i class="material-icons">dns</i>',
    to: {
      name: 'cluster',
    },
  }, {
    title: '用户',
    htmlBefore: '<i class="material-icons">person</i>',
    to: {
      name: 'users',
    },
  }, {
    title: '内容',
    htmlBefore: '<i class="material-icons">inventory_2</i>',
    to: {
      name: 'items',
    },
  }, {
    title: '导入导出',
    htmlBefore: '<i class="material-icons">subject</i>',
    to: {
      name: 'advance',
    },
  }, {
    title: '设置',
    htmlBefore: '<i class="material-icons">settings</i>',
    to: {
      name: 'config',
    },
  }];
}
