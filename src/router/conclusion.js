export default {
  path: '/conclusion',
  name: 'conclusion',
  component: () => {
    return import(/* webpackChunkName: "user" */ '../views/conclusion')
  }
}
