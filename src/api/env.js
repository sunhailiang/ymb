// 根据环境变量确认baseurl

let baseUrl = ''
console.log('')
switch (process.env.NODE_ENV) {
  case 'dev':
    baseUrl = 'http://106.55.173.177:8081/'
    break
  case 'envtest':
    baseUrl = 'http://www.jd.com'
    break
  case 'production':
    baseUrl = 'http://www.taobao.com'
    break
}

console.log('确认一下环境变量', baseUrl, process.env.NODE_ENV)

export default baseUrl
