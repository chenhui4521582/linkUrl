import Axios from 'axios'
import SdkConfig from './sdkConfig'

/** 退出拦截 **/
class ReturnBack extends SdkConfig {
  constructor() {
    super()
    this.returnBackInfo = {}
    this.adList = {}
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
        if (response.data.data.popupType === 0) {
          Axios.get('http://platform-api.beeplaying.com/wap/api/fixed/ad/get-list/37', { headers: { 'Authorization': this.ACCESS_TOKEN, 'App-Channel': this.APP_CHANNEL, 'App-Version': '1.0.0' } }).then(res => {
            if (res.data.code === 200) {
              this.adList = res.data.data[0] || {}
            }
          })
        }
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
      let popType = this.returnBackInfo.popupType
      this.returnBackInfo.gameList.forEach((element, index) => {
        if ((popType === 1 || this.returnBackInfo.showTask || this.adList.id) && index > 2) {
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
      let btnsHtml = this.adList.id ? `
      <div class="btns has-ad">
        <div class="item more">玩更多游戏</div>
        <div class="item cancel">忍痛退出</div>
      </div>`: `
      <div class="btns">
        <div class="item cancel">忍痛退出</div>
        <div class="item more">玩更多游戏</div>
      </div>
      `
      let adHtml = `
      <div class="ad-wrapper">
        <img src="${imgBaseUrl + this.adList.image}"/>
      </div>`
      let html = `
        <div class="mask"></div>
        <div class="popup-wrap popup-${popType}">
        ${this.returnBackInfo.showTask ? taskHtml : ''}
          <div class="title">猜你喜欢</div>
          <div class="gameList">
          ${gameListHtml}
          </div>
          ${popType ? nextHtml : ''}
          ${this.returnBackInfo.showTask ? '' : btnsHtml}
          ${this.adList.id ? adHtml : ''}
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
    let closeClick = document.querySelector('.linkurl-backPopup .close')
    let cancelClick = document.querySelector('.linkurl-backPopup .cancel')
    let moreClick = document.querySelector('.linkurl-backPopup .more')
    let gamesClick = document.querySelectorAll('.linkurl-backPopup .gameList .item')
    let taskClick = document.querySelectorAll('.linkurl-backPopup .task-wrapper')
    let adClick = document.querySelectorAll('.linkurl-backPopup .ad-wrapper')
    closeClick.onclick = () => {
      this.removePopup()
      this.marchSetsPoint('A_H5PT0019003651', {
        target_project_id: this.getGameType()
      })
    }
    moreClick.onclick = () => {
      this.removePopup()
      this.gotoIndex()
      this.marchSetsPoint('A_H5PT0019003650', {
        target_project_id: this.getGameType()
      })
    }
    cancelClick.onclick = () => {
      this.removePopup()
      this.closeWebView()
      this.marchSetsPoint('A_H5PT0019003649', {
        target_project_id: this.getGameType()
      })
    }
    for (let i in games) {
      gamesClick[i].onclick = () => {
        this.removePopup()
        window.location.href = `//wap.beeplaying.com${this.returnBackInfo.gameList[i].url}?channel=${this.APP_CHANNEL}&time=${new Date().getTime()}`
      }
    }
    taskClick.onclick = () => {
      this.removePopup()
      window.location.href = `//wap.beeplaying.com/xmWap/#${this.returnBackInfo.taskUrl}`
    }
    adClick.onclick = () => {
      this.removePopup()
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
      this.marchSetsPoint('A_H5PT0019003648', {
        target_project_id: this.getGameType()
      })
      let endTime = new Date(new Date().toLocaleDateString()).getTime()
      localStorage.setItem('linkurl-backPopup', `${endTime}`)
    }
  }
}
/** 实例化退出拦截 **/
new ReturnBack()