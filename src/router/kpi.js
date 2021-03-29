export default {
  path: '/kpi',
  name: 'kpi',
  component: () => {
    return import(/* webpackChunkName: "user" */ '../views/kpi')
  },
}
