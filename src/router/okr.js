export default {
  path: '/okr',
  name: 'okr',
  component: () => {
    return import(/* webpackChunkName: "user" */ '../views/okr')
  }
}
