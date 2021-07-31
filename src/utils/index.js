// 公用的函数工具库
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
// 数组转对象
function arrToObj(arr) {
  // 参数必须是一个数组
  if (!Array.isArray(arr)) {
    throw new Error('type err: arr 必须是一个数组')
  }
  // 存放返回结果
  const obj = {}
  arr.map((item) => {
    obj[Object.keys(item)[0]] = item[Object.keys(item)[0]]
  })
  return obj
}
export default { getQueryString, arrToObj }
