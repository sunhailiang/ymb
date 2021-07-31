export default {
  path: '/admin',
  name: 'admin',
  component: () => {
    return import(/* webpackChunkName: "admin" */ '../../views/admin')
  }
}
