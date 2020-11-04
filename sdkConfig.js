class SdkConfig {
  constructor() {
    this.HOST = '//wap.beeplaying.com'
    this.APP_CHANNEL = this.getUrlParams('channel') || localStorage.getItem('APP_CHANNEL') || '100001'
    this.ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN') || this.getUrlParams('token') || ''
    this.OPEN_ACCESS_TOKEN = this.getUrlParams('openToken') || localStorage.getItem('OPEN_ACCESS_TOKEN') || ''
    this.IS_MY_PLAT = window.location.host === 'wap.beeplaying.com'
    if (this.IS_MY_PLAT && this.APP_CHANNEL === '100101') {
      if (this.APP_CHANNEL) {
        localStorage.setItem('APP_CHANNEL', this.APP_CHANNEL)
      }
      if (this.ACCESS_TOKEN) {
        localStorage.setItem('ACCESS_TOKEN', this.ACCESS_TOKEN)
      }
      if (this.OPEN_ACCESS_TOKEN) {
        localStorage.setItem('OPEN_ACCESS_TOKEN', this.OPEN_ACCESS_TOKEN)
      }
    }
    this.CHANNEL_CONFIG = window.linkUrl.url
    this.GAMETYPE = {
      billiards: 2,
      'billiardsgame.html': 2,
      'billiardsindex.html': 2,
      ball: 2,
      ring: 3,
      ring2: 3,
      legion: 4,
      fish: 10,
      crush: 12,
      crush2: 12,
      kingdom2: 13,
      landlord: 15,
      square: 18,
      gofish: 20,
      marbles: 21,
      mahjong: 22,
      zodiac: 23,
      bird: 26,
      crush3: 27,
      xiyou: 29,
      boom: 30,
      wing: 31,
      spirit: 32,
      ttfjdz: 105,
      hitmouse: 106,
      default: 0
    }
  }
  /** 公共方法  |  动态引入js **/
  loadScripts (urls, callback) {
    callback = callback || function () { }
    // 添加script属性，并添加到head中
    let loader = function (src, handler) {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = src
      // 重点！！！！script加载成功
      script.onload = function () {
        script.onload = null
        script.onerror = null
        handler()
      }
      script.onerror = function () {
        script.onload = null
        script.onerror = null
        callback({
          message: src + '依赖未加载成功！'
        })
      }
      let head = document.getElementsByTagName('head')[0];
      (head || document.body).appendChild(script)
    };
    // 自执行函数，用于循环loader
    (function run () {
      if (urls.length > 0) {
        loader(urls.shift(), run)
      } else {
        callback()
      }
    })()
  }
  /** 公共方法  |  动态引入css **/
  loadCSS (href) {
    let Link = document.createElement('link')
    Link.rel = 'stylesheet'
    Link.href = href
    let head = document.getElementsByTagName('head')[0];
    (head || document.body).appendChild(Link)
  }
  /** 公共方法  |  获取连接参数 **/
  getUrlParams (ename) {
    var url = window.location.href
    var Request = {}
    if (url.indexOf('?') != -1) {
      var str = url.split('?')[1]
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        Request[strs[i].split('=')[0]] = strs[i].split('=')[1]
      }
    }
    return ename
      ? Request[ename]
        ? Request[ename].split('#')[0]
        : ''
      : Request
  }
  /** 公共方法  |  埋点 **/
  marchSetsPoint (_pointId, _pointObject) {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('XiaoMi') > -1 //android终端
    /** 获取用户信息 **/
    var userInfo = localStorage.getItem('user_Info')
    userInfo = JSON.parse(userInfo)
    /** 平台数据 **/
    var _beginTime = Date.now()
    var _channel = this.APP_CHANNEL
    var _plateform = isAndroid ? 'android' : 'ios'
    /** 合并参数 **/
    var _eventContent = Object.assign({
      residual_gold: userInfo && userInfo.amount,
      position_id: null,
      target_project_id: null,
      task_id: null,
      task_name: null,
      marketing_id: null,
      residual_jingdong: null,
      residual_phone: null,
      app_version: '1.1.1',
      entrance: 'ddw'
    }, _pointObject)
    /** 要发送的数据 **/
    var sendMessage = {
      plateform: 'h5',
      version: '1.0.0',
      channel: _channel,
      subplateform: _plateform,
      useragent: window.navigator.userAgent,
      logs: [
        {
          uid: userInfo && userInfo.userId,
          begintime: _beginTime,
          eventid: _pointId,
          eventcontent: _eventContent
        }
      ]
    }
    /** 创建formDate 对象 并把数据插入formDate **/
    var formData = new FormData()
    formData.append('appName', 'wf_game')
    formData.append('json', JSON.stringify(sendMessage))
    var xhr = new XMLHttpRequest
    var xhr = new XMLHttpRequest()
    xhr.open('POST', 'https://log-center.beeplaying.com/am/log/v1/json', false)
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*")
    xhr.send(formData)
  }
  /** 公共方法  |  获取游戏gameType **/
  getGameType () {
    var pathname = location.pathname && location.pathname.replace(/\//g, '').toLowerCase()
    var gametype = this.GAMETYPE[pathname] || this.GAMETYPE['default']
    return gametype
  }
}
export default SdkConfig