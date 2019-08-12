window.linkUrl = {}

window.linkUrl.url = [];
window.linkUrl.url['100001'] = '/bdWap/';
window.linkUrl.url['100006'] = '/bdWap/';
window.linkUrl.url['100022'] = '/bdWap/';
window.linkUrl.url['100023'] = '/bdWap/';
window.linkUrl.url['100026'] = '/bdWap/';
window.linkUrl.url['100028'] = '/bdWap/';
window.linkUrl.url['100027'] = '/bdWap/';
window.linkUrl.url['100029'] = '/bdWap/';
window.linkUrl.url['100035'] = '/bdWap/';
window.linkUrl.url['100036'] = '/bdWap/';
window.linkUrl.url['100038'] = '/bdWap/';
window.linkUrl.url['100039'] = '/bdWap/';
window.linkUrl.url['100040'] = '/bdWap/';
window.linkUrl.url['100041'] = '/bdWap/';
window.linkUrl.url['100042'] = '/bdWap/';
window.linkUrl.url['100045'] = '/bdWap/';
window.linkUrl.url['100046'] = '/bdWap/';
window.linkUrl.url['100049'] = '/bdWap/';
window.linkUrl.url['100050'] = '/bdWap/';
window.linkUrl.url['100051'] = '/xmWap/';
window.linkUrl.url['100052'] = '/bdWap/';
window.linkUrl.url['100053'] = '/bdWap/';
window.linkUrl.url['100054'] = '/bdWap/';
window.linkUrl.url['100055'] = '/bdWap/';
window.linkUrl.url['100056'] = '/bdWap/';
window.linkUrl.url['100057'] = '/bdWap/';
window.linkUrl.url['100058'] = '/bdWap/';
window.linkUrl.url['100064'] = '/bdWap/';
window.linkUrl.url['100065'] = '/bdWap/';
window.linkUrl.url['100067'] = '/bdWap/';
window.linkUrl.url['100068'] = '/bdWap/';
window.linkUrl.url['100073'] = '/bdWap/';
window.linkUrl.url['100074'] = '/bdWap/';
window.linkUrl.url['100069'] = '/xmWap/';
window.linkUrl.url['100013'] = '/bdWap/';
window.linkUrl.url['100070'] = '/xmWap/';
window.linkUrl.url['100032'] = '/yunqingWap/';
window.linkUrl.url['700002'] = '/llwWap/';
window.linkUrl.url['100047'] = '/miniWap/';
window.linkUrl.url['100048'] = '/miniWap/';
window.linkUrl.url['100072'] = '/miniWap/';
window.linkUrl.url['100002'] = '../../home/';
window.linkUrl.url['100004'] = '../../home/';
window.linkUrl.url['100005'] = '../../home/';
window.linkUrl.url['default'] = '/wap/home/';

window.linkUrl.getBackUrl = function (channel, gametype, bisbag, isHasChannel, concaturl) {
  isHasChannel = arguments.length < 4 ? true : isHasChannel
  concaturl = arguments.length < 5 ? '' : concaturl
  var id = String(channel);
  id = id.substring(0, 6);
  var str = '';
  if (isHasChannel) {
    if (window.linkUrl.url[id]) {
      if (gametype == 2) {
        str = window.linkUrl.url[id] + '?channel=' + channel + '&source=billiards' + (bisbag ? '&skip=bag' :
          '');
      } else {
        str = window.linkUrl.url[id] + '?channel=' + channel + (bisbag ? '&skip=bag' : '');
      }
    } else {
      str = window.linkUrl.url['default'] + '?channel=' + channel + (bisbag ? '&skip=bag' : '');
    }
  } else {
    if (window.linkUrl.url[id]) {
      if (gametype == 2) {
        str = window.linkUrl.url[id] + '?source=billiards' + (bisbag ? '&skip=bag' : '');
      } else {
        str = window.linkUrl.url[id] + (bisbag ? '?skip=bag' : '');
      }
    } else {
      str = window.linkUrl.url['default'] + (bisbag ? '?skip=bag' : '');
    }
  }
  return str + concaturl;
}
//鑾峰彇骞冲彴鏍囪瘑 H5浣跨敤
window.linkUrl.getBackUrlFlag = function (channel) {
  var id = String(channel);
  id = id.substring(0, 6);
  var str = '';
  if (window.linkUrl.url[id] && window.linkUrl.url[id].startsWith('/')) {
    str = window.linkUrl.url[id].replace(/\//g, '')
  } else {
    str = 'wap'
  }
  return str;
}
//鏄惁鏄父瀹㈡笭閬�
window.linkUrl.isVistorChannel = function (channel) {
  var channels = ['100039', '100042']//濂界湅瑙嗛銆佸叏姘戝皬瑙嗛娓犻亾
  var id = String(channel);
  id = id.substring(0, 6);
  return channels.indexOf(id) != -1 || (localStorage.getItem('visitorLoginVal') && JSON.parse(localStorage.getItem('visitorLoginVal')))
}
//娓稿娓犻亾 璧勪骇杈惧埌闄愬埗璺宠浆鍦板潃 (濂界湅銆佸叏姘戦櫎澶�)
window.linkUrl.getBackUrlByLimit = function (channel, gametype) {
  var channels = ['100039', '100042']//濂界湅瑙嗛銆佸叏姘戝皬瑙嗛娓犻亾
  var id = String(channel);
  id = id.substring(0, 6);
  if (channels.indexOf(id) == -1) {
    return 'https://wap.beeplaying.com/publicWap/loginPage.html#/?channel=' + channel + '&from=' + gametype + '&flag=assetLimitation'
  }
}

// 判断是否是游客渠道
window.linkUrl.getYKChannel = function (channel) {
  return channel == '100039' || channel == '100042' || channel == '100047001' || channel == '100048001' || channel == '100070'
}

function SdkConfig () {
  this.HOST = '//wap.beeplaying.com'
  this.APP_CHANNEL = this._getUrlParams('channel') || localStorage.getItem('APP_CHANNEL') || '100001'
  this.ACCESS_TOKEN = this._getUrlParams('token') || localStorage.getItem('ACCESS_TOKEN') || ''
  this.CHANNEL_CONFIG = {
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
    '100051': '/xmWap/',
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
    '100069': '/xmWap/',
    '100013': '/bdWap/',
    '100070': '/xmWap/',
    '100032': '/yunqingWap/',
    '700002': '/llwWap/',
    '100047': '/miniWap/',
    '100048': '/miniWap/',
    '100002': '../../home/',
    '100004': '../../home/',
    '100005': '../../home/',
    'default': '/wap/home/'
  }
  this.GAMETYPE = {
    'billiards': 2,
    'crush': 12,
    'gofish': 20,
    'kingdom2': 13,
    'landlord': 15,
    'legion': 4,
    'square': 18,
    'marbles': 21,
    'fish': 10,
    'default': 0
  }
}
SdkConfig.prototype = {
  _getUrlParams: function(ename) {
    let url = window.location.href
    let Request = {}
    if (url.indexOf('?') != -1) {
      let str = url.split('?')[1]
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        Request[strs[i].split('=')[0]] = strs[i].split('=')[1]
      }
    }
    return ename ? Request[ename] ? Request[ename].split('#')[0] : '' : Request
  },
  getBackUrl: function(channel, gametype, bisbag) {
    let app_channel = this.APP_CHANNEL || channel
    var id = String(app_channel);
    id = id.substring(0, 6);
    var str = '';
    if (this.CHANNEL_CONFIG[id]) {
      if (gametype == 2) {
        str = this.CHANNEL_CONFIG[id] + '?channel=' + app_channel + '&source=billiards' + (bisbag ? '&skip=bag' : '');
      } else {
        str = this.CHANNEL_CONFIG[id] + '?channel=' + app_channel + (bisbag ? '&skip=bag' : '');
      }
    } else {
      str = this.CHANNEL_CONFIG['default'] + '?channel=' + app_channel + (bisbag ? '&skip=bag' : '');
    }
    return str;
  },
  getRankingUrl: function() {
    return this.HOST + '/jsWap/#/popGame?channel=' + this.APP_CHANNEL +'&token=' + this.ACCESS_TOKEN
    // var PLANT_VERSION = localStorage.getItem('PLANT_VERSION')
    // if(PLANT_VERSION === 'xmWap') {
    //   return this.HOST + '/xmWap/#/profitlist?from=game'
    // }else {
    //   return this.HOST + '/bdWap/#/profitlist/0?from=game'
    // }
  },
  getPaymentUrl: function() {
    return this.HOST + '/payment/#/gameMall?channel=' + this.APP_CHANNEL +'&token=' + this.ACCESS_TOKEN
  },
  getTaskUrl: function() {
    var PLANT_VERSION = localStorage.getItem('PLANT_VERSION')
    var pathname = location.href.pathname && location.href.pathname.replace(/\//g, '')
    var gametype = this.GAMETYPE[pathname] || this.GAMETYPE['default']
    if(PLANT_VERSION === 'xmWap') {
      return this.HOST+ '/xmWap/#/sdk/task?channel=' + this.APP_CHANNEL+ '&gametype=' + gametype+ '&token='+ this.ACCESS_TOKEN
    }else {
      return this.HOST+ '/activities/taskgames.html?channel=' + this.APP_CHANNEL + '&gametype=' + gametype + '&token=' + this.ACCESS_TOKEN
    }
  },
  getPaymentCallbackUrl: function() {
    var isCheckOrderStatus = localStorage.getItem('checkPlatOrderStatus') == 'true'
    if(isCheckOrderStatus) {
      localStorage.setItem('originDeffer', window.location.href)
      if(['100039', '100042'].indexOf(this.APP_CHANNEL) > -1) {
        return this.HOST + '/payment/#bdPaymnet?channel=' + this.APP_CHANNEL + '$token=' + this.ACCESS_TOKEN
      }else {
        return this.HOST + '/payment/#payment?channel=' + this.APP_CHANNEL + '$token=' + this.ACCESS_TOKEN
      }
    }
  },
  getIsVisitorChannel: function() {
    if(['100039', '100042', '100047001', '100048001', '100070'].indexOf(this.APP_CHANNEL) > -1) {
      return true
    }else {
      return false
    }
  }
}

window.SDK = new SdkConfig