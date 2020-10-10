import Axios from 'axios'
import SdkConfig from './sdkConfig'

/** 退出拦截 **/
class ReturnBack extends SdkConfig {
  constructor() {
    super()
    this.returnBackInfo = {}
    this.adList = {}
    this.popType = 'basic'
    this.init()
  }

  /**
   * 获取弹窗信息
   */
  getReturnBackInfo () {
    let from = this.getUrlParams('from')
    let url = `https://platform-api.beeplaying.com/wap/api/quit/retain${from ? '/' + from : ''}`
    Axios.post(url, null, { headers: { 'Authorization': this.ACCESS_TOKEN, 'App-Channel': this.APP_CHANNEL, 'App-Version': '1.0.0' } }).then(response => {
      if (response.data.code === 200) {
        this.returnBackInfo = response.data.data
        if (this.returnBackInfo.showTask) {
          this.popType = 'newuser'
          return
        }
        if (this.returnBackInfo.popupType === 1) {
          this.popType = 'entrance'
          return
        }
        Axios.get('https://platform-api.beeplaying.com/wap/api/fixed/ad/get-list/37', { headers: { 'Authorization': this.ACCESS_TOKEN, 'App-Channel': this.APP_CHANNEL, 'App-Version': '1.0.0' } }).then(res => {
          if (res.data.code === 200) {
            this.adList = res.data.data[0] || {}
            if (this.adList.id) {
              this.popType = 'poster'
            }
          }
        })
      }
    })
  }
  /** 创建挽留弹框 **/
  createPopup () {
    try {
      require('./backpopup/style.css')
      let imgBaseUrl = '//file.beeplaying.com'
      let my = require(`./backpopup/my-${this.APP_CHANNEL}.png`).default
      let gameEntry = require(`./backpopup/game-entry-${this.APP_CHANNEL}.png`).default
      let popup = document.createElement('div')
      popup.className = 'linkurl-backPopup'
      let gameListHtml = ''
      this.returnBackInfo.gameList.forEach((element, index) => {
        if ((this.returnBackInfo.showTask || this.returnBackInfo.popupType === 1 || this.adList.id) && index > 2) {
          return
        }
        gameListHtml += `<div class="item"><img src="${imgBaseUrl + element.img}"><p>${element.name}</p></div>`
      })
      let taskHtml = `
      <div class="task-wrapper">
        <img src="${imgBaseUrl + this.returnBackInfo.taskImg}"/>
      </div>`
      let nextHtml = `
        <div class="next">
          <div class="title">下次这样找到我</div>
            <div class="next-wrap">
            <div class="item"><img src="${my}"><p>第一步</p><p>点击“我的”</p></div>
            <div class="item"><img src="${gameEntry}"><p>第二步</p><p>点击“游戏大厅”</p></div>
          </div>
        </div>`
      let adHtml = `
      <div class="ad-wrapper">
        <img src="${imgBaseUrl + this.adList.image}"/>
      </div>`
      let html = `
        <div class="mask"></div>
        <div class="popup-wrap popup-${this.popType === 'entrance' ? 1 : 0}">
        ${this.popType === 'newuser' ? taskHtml : ''}
          <div class="title">猜你喜欢</div>
          <div class="gameList">
          ${gameListHtml}
          </div>
          ${this.popType === 'entrance' ? nextHtml : ''}
          <div class="btns ${['poster', 'newuser'].includes(this.popType) ? 'not-flex' : ''}">
            ${['poster'].includes(this.popType) ? '<div class="item more">玩更多游戏</div>' : ''}
            <div class="item cancel">忍痛退出</div>
            ${!['poster', 'newuser'].includes(this.popType) ? '<div class="item more">玩更多游戏</div>' : ''}
          </div>
          ${this.popType === 'poster' ? adHtml : ''}
          <div class="close"></div>
        </div >
        `
      popup.innerHTML = html
      if (document.querySelector('.linkurl-backPopup')) {
        return false
      }
      document.body.appendChild(popup)
      this.setFontsize()
      this.bindClick()
      this.marchSetsPoint('P_H5PT0342', {
        project_id: this.getGameType(),
        window_type: this.popType,
        source_address: this.getUrlParams('from')
      })// H5平台-挽留弹窗(20年9月)-加载完成
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
    let closeClick = document.querySelector('.linkurl-backPopup .close')
    let cancelClick = document.querySelector('.linkurl-backPopup .cancel')
    let moreClick = document.querySelector('.linkurl-backPopup .more')
    let gamesClick = document.querySelectorAll('.linkurl-backPopup .gameList .item')
    let taskClick = document.querySelectorAll('.linkurl-backPopup .task-wrapper')
    let adClick = document.querySelectorAll('.linkurl-backPopup .ad-wrapper')
    closeClick.onclick = () => {
      this.removePopup()
      this.marchSetsPoint('A_H5PT0342004279', {
        project_id: this.getGameType(),
        window_type: this.popType,
      })// H5平台-挽留弹窗(20年9月)-关闭点击
    }
    moreClick.onclick = () => {
      this.removePopup()
      this.gotoIndex()
      this.marchSetsPoint('A_H5PT0342004277', {
        project_id: this.getGameType(),
        window_type: this.popType,
      })// H5平台-挽留弹窗(20年9月)-更多游戏点击
    }
    cancelClick.onclick = () => {
      this.removePopup()
      this.closeWebView()
      this.marchSetsPoint('A_H5PT0342004276', {
        project_id: this.getGameType(),
        window_type: this.popType,
      })// H5平台-挽留弹窗(20年9月)-忍痛退出点击
    }
    for (let i in games) {
      gamesClick[i].onclick = () => {
        this.removePopup()
        this.marchSetsPoint('A_H5PT0342004275', {
          project_id: this.getGameType(),
          window_type: this.popType,
          target_project_name: this.returnBackInfo.gameList[i].name
        })// H5平台-挽留弹窗(20年9月)-游戏位点击
        window.location.href = `//wap.beeplaying.com${this.returnBackInfo.gameList[i].url}?channel=${this.APP_CHANNEL}&time=${new Date().getTime()}`
      }
    }
    taskClick.onclick = () => {
      this.removePopup()
      this.marchSetsPoint('A_H5PT0342004274', {
        project_id: this.getGameType(),
        window_type: this.popType,
      })// H5平台-挽留弹窗(20年9月)-去拿新人奖励点击
      window.location.href = `//wap.beeplaying.com/xmWap/#${this.returnBackInfo.taskUrl}`
    }
    adClick.onclick = () => {
      this.removePopup()
      this.marchSetsPoint('A_H5PT0342004278', {
        project_id: this.getGameType(),
        window_type: this.popType,
      })// H5平台-挽留弹窗(20年9月)-运营位点击
      window.location.href = this.adList.url
    }
  }
  /** 删除弹框 **/
  removePopup () {
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
  init () {
    this.getReturnBackInfo()
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
      let endTime = new Date(new Date().toLocaleDateString()).getTime()
      localStorage.setItem('linkurl-backPopup', `${endTime}`)
    }
  }
}
/** 实例化退出拦截 **/
new ReturnBack()