import Axios from 'axios'
import AppCall from './native/index'
if (localStorage.getItem('APP_CHANNEL') == 100081) {
  var time2 = new Date().getTime()
  var script2 = document.createElement('script')
  script2.type = 'text/javascript'
  script2.src =
    'https://a.lianwifi.com/miniapp/wifikey-bridge/1.0.1/index.js?time=' + time2
  document.head.appendChild(script2)
}
else if (localStorage.getItem('APP_CHANNEL') == 100100) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src =
    'https://res.wx.qq.com/open/js/jweixin-1.4.0.js'
  document.head.appendChild(script)
}

window.linkUrl = {
  url: {
    '100032': '/yunqingWap/',
    '100047': '/miniWap/',
    '100048': '/miniWap/',
    '100072': '/miniWap/',
    '700002': '/llwWap/',
    default: '/xmWap/'
  }
}
window.linkUrl.getBackUrl = function (
  channel = '',
  gametype,
  bisbag,
  isHasChannel,
  concaturl
) {
  isHasChannel = arguments.length < 4 ? true : isHasChannel
  concaturl = arguments.length < 5 ? '' : concaturl
  var id = channel.toString()
  /** 好看底bar 返回 **/
  if (id == '100039001') {
    window.location.href = 'baiduhaokan://action/goback'
    return false
  }
  id = id.substring(0, 6)
  var str = ''
  if (isHasChannel) {
    if (window.linkUrl.url[id]) {
      if (gametype == 2) {
        str =
          window.linkUrl.url[id] +
          '?channel=' +
          channel +
          '&source=billiards' +
          (bisbag ? '&skip=bag' : '')
      } else {
        str =
          window.linkUrl.url[id] +
          '?channel=' +
          channel +
          (bisbag ? '&skip=bag' : '')
      }
    } else {
      str =
        window.linkUrl.url['default'] +
        '?channel=' +
        channel +
        (bisbag ? '&skip=bag' : '')
    }
  } else {
    if (window.linkUrl.url[id]) {
      if (gametype == 2) {
        str =
          window.linkUrl.url[id] +
          '?source=billiards' +
          (bisbag ? '&skip=bag' : '')
      } else {
        str = window.linkUrl.url[id] + (bisbag ? '?skip=bag' : '')
      }
    } else {
      str = window.linkUrl.url['default'] + (bisbag ? '?skip=bag' : '')
    }
  }
  return str + concaturl + '&ts=' + Date.now()
}
window.linkUrl.getBackUrlFlag = function (channel) {
  var id = String(channel)
  id = id.substring(0, 6)
  var str = ''
  if (window.linkUrl.url[id] && window.linkUrl.url[id].startsWith('/')) {
    str = window.linkUrl.url[id].replace(/\//g, '')
  } else {
    str = 'xmWap'
  }
  return str
}
window.linkUrl.isVistorChannel = function (channel) {
  var channels = ['100039', '100042']
  var id = String(channel)
  id = id.substring(0, 6)
  return (
    channels.indexOf(id) != -1 ||
    (localStorage.getItem('visitorLoginVal') &&
      JSON.parse(localStorage.getItem('visitorLoginVal')))
  )
}
window.linkUrl.getBackUrlByLimit = function (channel, gametype) {
  var channels = ['100039', '100042']
  var id = String(channel)
  id = id.substring(0, 6)
  if (channels.indexOf(id) == -1) {
    return (
      'https://wap.beeplaying.com/publicWap/loginPage.html#/?channel=' +
      channel +
      '&from=' +
      gametype +
      '&flag=assetLimitation'
    )
  }
}
// 老猫停服判断 可以删除 开始
window.catIsClose = function (date) {
  return (
    new Date(date || '2019/10/15 20:00').getTime() - new Date().getTime() < 0
  )
}
// 老猫停服判断 可以删除 结束
// 判断是否是游客渠道
window.linkUrl.getYKChannel = function (channel) {
  return (
    channel == '100039' ||
    channel == '100042' ||
    channel == '100047001' ||
    channel == '100048001' ||
    channel == '100070' ||
    channel == '100068'
  )
}
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

/** 平台SDK **/
class SdkFun extends SdkConfig {
  constructor() {
    super()
    this.editIcon()
  }
  /** 获取游戏返回地址 **/
  getBackUrl (channel, gametype, bisbag) {
    var app_channel = this.APP_CHANNEL || channel
    var id = String(app_channel)
    /** 好看底bar 返回 **/
    if (id == '100039001') {
      localStorage['bottomBarCloseWebView'] = 'close'
      window.location.href = 'baiduhaokan://action/goback'
      return false
    }
    id = id.substring(0, 6)
    var str = ''
    if ((this.APP_CHANNEL == 100095 || this.APP_CHANNEL == 100030004) && AppCall.call('isInReviewState')) {
      str = ''
    } else if (this.CHANNEL_CONFIG[id]) {
      if (gametype == 2) {
        str =
          this.CHANNEL_CONFIG[id] +
          '?channel=' +
          app_channel +
          '&source=billiards' +
          (bisbag ? '&skip=bag' : '')
      } else {
        str =
          this.CHANNEL_CONFIG[id] +
          '?channel=' +
          app_channel +
          (bisbag ? '&skip=bag' : '')
      }
    } else {
      str =
        this.CHANNEL_CONFIG['default'] +
        '?channel=' +
        app_channel +
        (bisbag ? '&skip=bag' : '')
    }
    return str
  }
  /** 获取排行榜地址 **/
  getRankingUrl () {
    return (
      this.HOST +
      '/jsWap/#/popGame?channel=' +
      this.APP_CHANNEL +
      '&token=' +
      this.ACCESS_TOKEN
    )
    // var PLANT_VERSION = localStorage.getItem('PLANT_VERSION')
    // if(PLANT_VERSION === 'xmWap') {
    //   return this.HOST + '/xmWap/#/profitlist?from=game'
    // }else {
    //   return this.HOST + '/bdWap/#/profitlist/0?from=game'
    // }
  }
  /** 获取横屏地址 **/
  getUseLandscape () {
    let useLandscape = false
    try {
      let screenOrientation = parent.document.querySelector(
        'meta[name=screen-orientation]'
      )
      let x5Orientation = parent.document.querySelector(
        'meta[name=x5-orientation]'
      )

      if (
        screenOrientation &&
        screenOrientation.getAttribute('content') == 'landscape'
      ) {
        useLandscape = true
      } else if (
        x5Orientation &&
        x5Orientation.getAttribute('content') == 'landscape'
      ) {
        useLandscape = true
      }

      let games = ['/landlord/', '/mahjong/', '/paodekuai/']
      if (parent.location.href) {
        for (let game of games) {
          if (parent.location.href.indexOf(game) > -1) {
            useLandscape = true
          }
        }
      }
    } catch (e) {
      useLandscape = false
    }
    return useLandscape
  }
  /** 获取支付地址 **/
  getPaymentUrl () {
    let useLandscape = this.getUseLandscape()
    localStorage.setItem('originDeffer', window.location.href)
    if (useLandscape) {
      /* Landscape  横屏模式 商城*/
      return (
        this.HOST +
        '/xmWap/#/gamepayment/landScape?channel=' +
        this.APP_CHANNEL +
        '&token=' +
        this.ACCESS_TOKEN +
        '&time=' +
        new Date().getTime()
      )
    } else {
      /*  Portrait  竖屏模式 商城*/
      return (
        this.HOST +
        '/xmWap/#/gamepayment/portrait?channel=' +
        this.APP_CHANNEL +
        '&token=' +
        this.ACCESS_TOKEN +
        '&time=' +
        new Date().getTime()
      )
    }
  }
  /** 获取SDK地址 **/
  getTaskUrl () {
    let gametype = this.getGameType()
    //横屏游戏先使用深色的
    let useLandscape = this.getUseLandscape()
    return (
      this.HOST +
      '/xmWap/#/sdk/task?channel=' +
      this.APP_CHANNEL +
      '&gametype=' +
      gametype +
      '&token=' +
      this.ACCESS_TOKEN +
      '&isLandscape=' +
      useLandscape
    )
  }
  /** 获取奇遇任务 **/
  getAdventureUrl () {
    var gametype = this.getGameType()
    return (
      this.HOST +
      '/activities/adventure.html?channel=' +
      this.APP_CHANNEL +
      '&gametype=' +
      gametype +
      '&token=' +
      this.ACCESS_TOKEN +
      '&vt=' + new Date().getTime()
    )
  }
  /** 获取支付回调地址 **/
  getPaymentCallbackUrl () {
    var isCheckPlatOrderStatus =
      localStorage.getItem('checkPlatOrderStatus') == 'true'
    var isCheckOrderStatus = localStorage.getItem('checkOrderStatus') == 'true' // 游戏修改后还原
    localStorage.setItem('originDeffer', window.location.href)
    if (isCheckPlatOrderStatus) {
      // 兼容 旧版逻辑
      if (isCheckOrderStatus) {
        return (
          this.HOST +
          '/xmWap/#/gamepayment/callback?channel=' +
          this.APP_CHANNEL +
          '&token=' +
          this.ACCESS_TOKEN
        )
      } else {
        return (
          this.HOST +
          '/xmWap/#/gamepayment/list?channel=' +
          this.APP_CHANNEL +
          '&token=' +
          this.ACCESS_TOKEN
        )
      }
    }
  }
  /** 获取游客渠道 **/
  getIsVisitorChannel () {
    if (
      ['100039', '100042', '100047001', '100048001', '100070'].indexOf(
        this.APP_CHANNEL
      ) > -1
    ) {
      return true
    } else {
      return false
    }
  }
  /** 打开充值窗口 **/
  charge (order) {
    if (!order) {
      return false
    }
    let url = `${this.HOST}/xmWap/#/gamepayment/list`
    localStorage.setItem('originDeffer', window.location.href)
    localStorage.setItem('JDD_PARAM', JSON.stringify(order))
    try {
      if (GameEval) {
        GameEval('openweb', url)
      }
    } catch (e) {
      console.log('charge openweb error')
    }
  }
  /** 打开充值回调 **/
  chargeCallBack () {
    var isCheckPlatOrderStatus = localStorage.getItem('checkPlatOrderStatus') === 'true'
    localStorage.setItem('originDeffer', window.location.href)
    if (isCheckPlatOrderStatus) {
      try {
        if (GameEval) {
          GameEval('openweb', `${this.HOST}/xmWap/#/gamepayment/callback`)
        }
      } catch (e) {
        console.log('chargeCallBack openweb error')
      }
    }
  }
  /** 获取平台盈利榜地址 **/
  getPlantRankingUrl () {
    return `${this.HOST}/xmWap/#/profitlist/?channel=${this.APP_CHANNEL}&from=game`
  }
  /** 获取平台客服地址 **/
  getPlantServices () {
    return `${this.HOST}/xmWap/#/my/customerService?channel=${this.APP_CHANNEL}`
  }
  /** 获取平台 我的 地址 **/
  getPlatMyUrl () {
    return `${this.HOST}/xmWap/#/my/?channel=${this.APP_CHANNEL}&from=game`
  }
  /** 100061 渠道修改titile 图标**/
  editIcon () {
    if (this.APP_CHANNEL == 100061) {
      try {
        var link = document.createElement('link')
        link.rel = 'apple-touch-icon'
        link.sizes = '114*114'
        link.href = 'https://wap.beeplaying.com/xmWap/img/icon_ddw.png'
        document.getElementsByTagName('head')[0].appendChild(link)
      } catch (e) { }
    }
  }
  //充值100081
  charge100081 (order) {
    wifikey.pay({
      orderInfo: {
        tpOrderId: order
      },
      success: res => {
        if (document.getElementsByTagName('iframe')[0]) {
          document
            .getElementsByTagName('iframe')[0]
            .contentWindow.chargeState(true, res)
        }
      },
      fail: msg => {
        if (document.getElementsByTagName('iframe')[0]) {
          document
            .getElementsByTagName('iframe')[0]
            .contentWindow.chargeState(false, msg)
        }
      }
    })
  }
  // 获取活动icon
  getActivitiesIcon (activityName) {
    switch (activityName) {
      case 'yiyuanchou':
        return 'https://file.beeplaying.com/group1/M00/42/26/CmcEHV3t5suAJBnkAAAaLg3vpNI734.png'

      default:
        break
    }
  }
  // 打开猫活动
  openActivityPop (activityName) {
    let url = ""
    switch (activityName) {
      // 猫新年活动
      case 'catNewYear':
        url = `${this.HOST}/activities/catandmouse.html#/?time=${new Date().getTime()}`
        break

      default:
        break
    }
    try {
      if (GameEval) {
        GameEval('openweb', url)
      }
    } catch (e) {
      console.log('openActivityPop openweb error')
    }
  }
}

/** 微信分享 **/
class WechatShare extends SdkConfig {
  constructor() {
    super()
    this.wechatShareInit()
  }
  // 微信分享 加载jsSDK
  loadJs () {
    const url = '//res2.wx.qq.com/open/js/jweixin-1.6.0.js'
    this.loadScripts([url], () => {
      this.getShareMessage()
    })
  }
  // 微信分享 获取自定义分享内容
  getShareMessage () {
    let xhr = new XMLHttpRequest()
    let url = `//platform-api.beeplaying.com/wap/api/oauth/wx/share/${this.APP_CHANNEL}/platformShare`
    xhr.open('POST', url, true)
    xhr.setRequestHeader("Authorization", this.ACCESS_TOKEN)
    xhr.setRequestHeader("App-Channel", this.APP_CHANNEL)
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let script = document.createElement('script')
          script.type = 'text/javascript'
          script.innerHTML = xhr.responseText
          let head = document.getElementsByTagName('head')[0] || document.body
          head.appendChild(script)
        }
      }
    }
    xhr.send()
  }
  // 微信分享初始化
  wechatShareInit () {
    if (['110002001', '110002002', '110002007', '100093'].indexOf(this.APP_CHANNEL) > -1) {
      this.loadJs()
    }
  }
}

/** 退出拦截 **/
class RetunBack extends SdkConfig {
  constructor() {
    super()
    this.init()
  }
  /** 创建挽留弹框 **/
  createPopup () {
    try {
      require('./backpopup/style.css')
      let item1 = require('./backpopup/item1.png').default
      let item2 = require('./backpopup/item2.png').default
      let item3 = require('./backpopup/item3.png').default
      let my = require(`./backpopup/my-${this.APP_CHANNEL}.png`).default
      let gameEntry = require(`./backpopup/game-entry-${this.APP_CHANNEL}.png`).default
      let popup = document.createElement('div')
      popup.className = 'linkurl-backPopup'
      let html = `
        <div class="mask"></div>
        <div class="popup-wrap">
          <div class="title">猜你喜欢</div>
          <div class="gameList">
            <div class="item"><img src="${item1}"><p>街机欢乐捕鱼</p></div>
            <div class="item"><img src="${item2}"><p>狂热斗地主</p></div>
            <div class="item"><img src="${item3}"><p>三国大作战</p></div>
          </div>
          <div class="next">
            <div class="title">下次这样找到我</div>
            <div class="next-wrap">
              <div class="item"><img src="${my}"><p>第一步</p><p>点击“我的”</p></div>
              <div class="item"><img src="${gameEntry}"><p>第二步</p><p>点击“游戏大厅”</p>
            </div>
          </div>
          <div class="btns">
            <div class="item cancel">忍痛退出</div>
            <div class="item more">玩更多游戏</div>
          </div>
          <div class="close"></div>
        </div>
      `
      popup.innerHTML = html
      if (document.querySelector('.linkurl-backPopup')) {
        return false
      }
      document.body.appendChild(popup)
      this.setFontsize()
      this.bindClick()
    } catch (e) {
    }
  }
  /** 设置fontsize **/
  setFontsize () {
    const baseSize = 30
    let baseWidth = 720
    function setRem () {
      const scale = document.documentElement.clientWidth / baseWidth
      document.querySelector('.linkurl-backPopup').style.fontSize = baseSize * scale + 'px'
    }
    setRem()
    window.onresize = function () {
      setRem()
    }
  }
  /** 挂载click事件 **/
  bindClick () {
    let url = [
      `//wap.beeplaying.com/fish/?channel=${this.APP_CHANNEL}&time=${Date.now()}`,
      `//wap.beeplaying.com/landlord/?channel=${this.APP_CHANNEL}&time=${Date.now()}`,
      `//wap.beeplaying.com/kingdom2/?channel=${this.APP_CHANNEL}&time=${Date.now()}`,
    ]
    let close = document.querySelector('.linkurl-backPopup .close')
    let cancel = document.querySelector('.linkurl-backPopup .cancel')
    let more = document.querySelector('.linkurl-backPopup .more')
    let games = document.querySelectorAll('.linkurl-backPopup .gameList .item')
    close.onclick = () => {
      this.remocePopup()
      this.marchSetsPoint('A_H5PT0019003651', {
        target_project_id: this.getGameType()
      })
    }
    more.onclick = () => {
      this.remocePopup()
      this.gotoIndex()
      this.marchSetsPoint('A_H5PT0019003650', {
        target_project_id: this.getGameType()
      })
    }
    cancel.onclick = () => {
      this.remocePopup()
      this.closeWebView()
      this.marchSetsPoint('A_H5PT0019003649', {
        target_project_id: this.getGameType()
      })
    }
    for (let i in games) {
      games[i].onclick = () => {
        this.remocePopup()
        window.location.href = url[i]
      }
    }
  }
  /** 删除弹框 **/
  remocePopup () {
    let popup = document.querySelector('.linkurl-backPopup')
    popup && popup.parentNode.removeChild(popup)
  }
  /** 前往首页 **/
  gotoIndex () {
    window.location.href = `https://wap.beeplaying.com/xmWap/#/?channel=${this.APP_CHANNEL}`
  }
  /** 关闭webwiew **/
  closeWebView () {
    if (this.APP_CHANNEL === '100039') {
      window.location.href = 'baiduhaokan://action/goback'
    } else if (this.APP_CHANNEL === '100042') {
      window.location.href = 'bdminivideo://webview/close'
    }
  }
  /** 创建(百度好看/全民小视频)退出回调钩子 **/
  createBaiDuBack () {
    let bdminObj = 'backHandler'
    let scheme = 'baiduhaokan://action/backHandler/?goback_callback=' + encodeURIComponent(bdminObj)
    if (this.APP_CHANNEL === '100042') {
      bdminObj = {
        "handlerName": "window.backHandler"
      }
      scheme = 'bdminivideo://webview/backHandler?params=' + encodeURIComponent(JSON.stringify(bdminObj))
    }
    let iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = scheme
    document.body.appendChild(iframe)
    setTimeout(function () {
      iframe.remove()
    }, 1000)
    /** window对象挂载百度好看回调方法 **/
    window.backHandler = () => {
      this.createPopup()
      this.marchSetsPoint('A_H5PT0019003648', {
        target_project_id: this.getGameType()
      })
      let endTime = new Date(new Date().toLocaleDateString()).getTime()
      localStorage.setItem('linkurl-backPopup', `${endTime}`)
    }
  }
  init () {
    let endTime = new Date(new Date().toLocaleDateString()).getTime()
    let cacheTime = localStorage.getItem('linkurl-backPopup')
    /** 假如缓存时间小于当前时间, 打开弹框更新缓存**/
    let channelArr = ['100039', '100042']
    if (channelArr.includes(this.APP_CHANNEL)) {
      if (cacheTime) {
        if (endTime != cacheTime) {
          this.createBaiDuBack()
        }
      } else {
        this.createBaiDuBack()
      }
    }
  }
}

/** 分享出来下载多多完APP后获取粘贴板内容 **/
class DDW_Share extends SdkConfig {
  constructor() {
    super()
    this.init()
  }
  /** 清除粘贴板内容 **/
  async init () {
    /** 获取粘贴板数据 **/
    let copy = await AppCall.getClipboardContent()
    const from = copy && copy.split('&')[0].replace('from=', '')
    /** 积分墙把数据传给后端 **/
    if (from == 'earnCoin') {
      try {
        setTimeout(() => {
          const copyUrl = copy.split('&')[2].replace('redirect_uri=', '')
          const sign = copy.split('&')[1].replace('sign=', '')
          if (copyUrl && sign) {
            Axios.post(copyUrl, {
              tToken: this.ACCESS_TOKEN,
              sign: sign
            }, { headers: { 'Authorization': this.ACCESS_TOKEN, 'App-Channel': this.APP_CHANNEL } })
            AppCall.clearClipboardContent()
          }
        }, 2000)
      } catch (e) { }
    }
    /** 裂变活动把数据传给后端 **/
    if (from == 'fission') {
      try {
        setTimeout(() => {
          const userId = copy.split('&')[1].replace('userId=', '')
          let currentUserInfo = localStorage.getItem('user_Info')
          let currentUserID = currentUserInfo && JSON.parse(currentUserInfo).userId
          if (userId && currentUserID) {
            let url = `//ops-api.beeplaying.com/ops/fission/invite/${userId}_${currentUserID}`
            Axios.post(url, '', { headers: { 'Authorization': this.ACCESS_TOKEN, 'App-Channel': this.APP_CHANNEL } })
            AppCall.clearClipboardContent()
          }
        }, 2000)
      } catch (e) { }
    }
    if (from == 'blindBoxFission') {
      try {
        setTimeout(() => {
          const invitationCode = copy.split('&')[1].replace('invitationCode=', '')
          if (invitationCode && this.ACCESS_TOKEN) {
            let url = `//platform-api.beeplaying.com/box/api/fission/callback/${invitationCode}`
            Axios.post(url, '', { headers: { 'Authorization': this.ACCESS_TOKEN, 'App-Channel': this.APP_CHANNEL } })
            AppCall.clearClipboardContent()
          }
        }, 2000)
      } catch (e) { }
    }
  }
}

/** 实例化SDK **/
window.SDK = new SdkFun()

/** 实例化微信分享 **/
new WechatShare()

/** 实例化退出拦截 **/
new RetunBack()

/** 实例化分享出来下载多多完APP后获取粘贴板内容 **/
new DDW_Share()
