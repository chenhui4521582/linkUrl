window.linkUrl = {
  url: {
    '100001': '/bdWap/',
    '100006': '/bdWap/',
    '100022': '/bdWap/',
    '100023': '/bdWap/',
    '100026': '/bdWap/',
    '100028': '/bdWap/',
    '100027': '/bdWap/',
    '100029': '/bdWap/',
    '100035': '/bdWap/',
    '100036': '/bdWap/',
    '100038': '/bdWap/',
    '100039': '/bdWap/',
    '100040': '/bdWap/',
    '100041': '/bdWap/',
    '100042': '/bdWap/',
    '100045': '/bdWap/',
    '100046': '/bdWap/',
    '100049': '/bdWap/',
    '100050': '/bdWap/',
    '100052': '/bdWap/',
    '100053': '/bdWap/',
    '100054': '/bdWap/',
    '100055': '/bdWap/',
    '100056': '/bdWap/',
    '100057': '/bdWap/',
    '100058': '/bdWap/',
    '100064': '/bdWap/',
    '100065': '/bdWap/',
    '100067': '/bdWap/',
    '100068': '/bdWap/',
    '100069': '/bdWap/',
    '100032': '/yunqingWap/',
    '700002': '/llwWap/',
    '100047': '/miniWap/',
    '100048': '/miniWap/',
    '100051': '/miWap/',
    '100002': '../../home/',
    '100004': '../../home/',
    '100005': '../../home/',
    'default': '/wap/home/'
  },
  config: {
    'host': 'https://wap.beeplay123.com',
    'bdPay': '/payment/#/bdPayment',
    'pay': '/payment/#/payment',
    'miPay': '/miWap/#/payment',
    'yiyuanchou': '/payment/#/yiyuanchou',
    'payTurntable': '/payment/#/payTurntable',
    'shop': '/payment/#/gameMall',
    'rank': '/jsWap/#/popGame',
    'miRanking': '/miWap/#/profitlist?from=game',
    'bdRanking': '/bdWap/#/profitlist/0?from=game'
  },
  getBackUrl = function (channel, gametype, bisbag, isHasChannel, concaturl) {
    isHasChannel = arguments.length < 4 ? true : isHasChannel
    concaturl = arguments.length < 5 ? '' : concaturl
    var id = String(channel);
    id = id.substring(0, 6);
    var str = '';
    if (isHasChannel) {
      if (this.url[id]) {
        if (gametype == 2) {
          str =this.url[id] + '?channel=' + channel + '&source=billiards' + (bisbag ? '&skip=bag' :
            '');
        } else {
          str = this.url['default'] + '?channel=' + channel + (bisbag ? '&skip=bag' : '');
        }
      } else {
        if (this.url[id]) {
          if (gametype == 2) {
            str = this.url[id] + '?source=billiards' + (bisbag ? '&skip=bag' : '');
          } else {
            str = this.url[id] + (bisbag ? '?skip=bag' : '');
          }
        } else {
          str = this.url['default'] + (bisbag ? '?skip=bag' : '');
        }
      }
      return str + concaturl;
    }
  },
  /** 获取平台标识 H5使用 **/
  getBackUrlFlag: function (channel) {
    var id = String(channel);
    id = id.substring(0, 6);
    var str = '';
    if (this.url[id] && this.url[id].startsWith('/')) {
      str = this.url[id].replace(/\//g,'')
    } else {
      str = 'wap'
    }
    return str;
  },
  /** 是否是游客渠道 **/
  isVistorChannel: function (channel) {
    var channels=['100039','100042']//好看视频、全民小视频渠道
    var id = String(channel);
    id = id.substring(0, 6);
    return channels.indexOf(id)!=-1||(localStorage.getItem('visitorLoginVal') && JSON.parse(localStorage.getItem('visitorLoginVal')))
  },
  /** 游客渠道 资产达到限制跳转地址 (好看、全民除外) **/
  getBackUrlByLimit: function (channel, gametype) {
    /** 好看视频、全民小视频渠道 **/
    var channels=['100039','100042']
    var id = String(channel);
    id = id.substring(0, 6);
    if(channels.indexOf(id)==-1){
      return 'https://wap.beeplay123.com/publicWap/loginPage.html#/?channel='+channel+'&from='+gametype+'&flag=assetLimitation'
    }
  },
  /** 提供给Cocos支付跳转地址 **/
  getWebUrl: function (type) {
    console.log(type)
    let ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN')
    let APP_CHANNEL = localStorage.getItem('APP_CHANNEL').toString().substring(0, 6)
    let pathName = ''
    let params = 'channel=' + APP_CHANNEL + '&token=' + ACCESS_TOKEN
    let returnUrl = {
      url: '',
      channel: APP_CHANNEL || '',
      token: ACCESS_TOKEN || ''
    }
    if(!type) {
      console.error('传入Type 无效')
      return false
    }
    if(type === 'pay') {
      pathName = this.url[APP_CHANNEL] === '/bdWap/' ? this.config.bdPay : this.url[APP_CHANNEL] === '/miWap/' ? this.config.miPay: this.config.pay
      returnUrl.url = this.config.host + pathName + '?' +params
      return returnUrl
    }
    if(type === 'ranking') {
      pathName = this.url[APP_CHANNEL] === '/miWap/' ? this.config.miRanking : this.config.bdRanking
      returnUrl.url = this.config.host + pathName + '&' +params
      return returnUrl
    }
    for (var i in this.config) {
      if(type === this.config[i]) {
        returnUrl.url = this.config.host + this.config[i] + params
        break
      }
    }
    return returnUrl
  }
}