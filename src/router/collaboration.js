export default {
  path: '/collaboration',
  name: 'collaboration',
  component: () => {
    return import(/* webpackChunkName: "user" */ '../views/collaboration')
  }
}
