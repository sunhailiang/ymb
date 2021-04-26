export default {
  path: '/todo',
  name: 'todo',
  component: () => {
    return import(/* webpackChunkName: "user" */ '../views/todo')
  }
}
