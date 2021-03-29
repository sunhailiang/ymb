export default {
  path: '/workbench',
  name: 'workbench',
  component: () => {
    return import(/* webpackChunkName: "user" */ '../views/workbench')
  },
}
