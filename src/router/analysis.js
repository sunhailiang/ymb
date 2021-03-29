export default {
  path: '/analysis',
  name: 'analysis',
  component: () => {
    return import(/* webpackChunkName: "user" */ '../views/analysis')
  },
}
