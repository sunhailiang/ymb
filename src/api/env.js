// 根据环境变量确认baseurl
let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'dev':
    baseUrl = 'localproxy'
    break
  case 'envtest':
    baseUrl = 'http://www.jd.com'
    break
  case 'production':
    baseUrl = 'http://www.taobao.com'
    break
}
export default baseUrl
