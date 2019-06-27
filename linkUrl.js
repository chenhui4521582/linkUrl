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
window.linkUrl.url['100069'] = '/bdWap/';
window.linkUrl.url['100013'] = '/bdWap/';
window.linkUrl.url['100070'] = '/bdWap/';
window.linkUrl.url['100032'] = '/yunqingWap/';
window.linkUrl.url['700002'] = '/llwWap/';
window.linkUrl.url['100047'] = '/miniWap/';
window.linkUrl.url['100048'] = '/miniWap/';
window.linkUrl.url['100051'] = '/xmWap/';
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
  if (window.linkUrl.url[id]&&window.linkUrl.url[id].startsWith('/')) {
    str = window.linkUrl.url[id].replace(/\//g,'')
  } else {
    str = 'wap'
  }
  return str;
}
//鏄惁鏄父瀹㈡笭閬�
window.linkUrl.isVistorChannel = function (channel) {
  var channels=['100039','100042']//濂界湅瑙嗛銆佸叏姘戝皬瑙嗛娓犻亾
  var id = String(channel);
  id = id.substring(0, 6);
  return channels.indexOf(id)!=-1||(localStorage.getItem('visitorLoginVal') && JSON.parse(localStorage.getItem('visitorLoginVal')))
}
//娓稿娓犻亾 璧勪骇杈惧埌闄愬埗璺宠浆鍦板潃 (濂界湅銆佸叏姘戦櫎澶�)
window.linkUrl.getBackUrlByLimit = function (channel, gametype) {
  var channels=['100039','100042']//濂界湅瑙嗛銆佸叏姘戝皬瑙嗛娓犻亾
  var id = String(channel);
  id = id.substring(0, 6);
  if(channels.indexOf(id)==-1){
    return 'https://wap.beeplay123.com/publicWap/loginPage.html#/?channel='+channel+'&from='+gametype+'&flag=assetLimitation'
  }
}