

//********************全平台停服配置开始**********************
//开关
const IS_OPEN = false;
//日期
// const DATE = '2017-7-3';
//时间
const TIME = {
	startDate: '2019年1月8日',
    start: '4:00',
    finishDate: '2019年1月9日',
    finish: '22:00'
};
//********************全平台停服配置结束**********************




//********************单个小游戏或者单个外界游戏停服配置开始***************
//开关
const IS_GAME_OPEN = false;
//日期
const GAMETIME = {
	startDate: '2019年1月8日',
    start: '4:00',
    finishDate: '2019年1月9日',
    finish: '22:00'
};
//需要停服的游戏  (例如  ) ==>  ['billiards','dart','sdk.zhijiangames.com/wanfeng/init/game/xxjqxz']
const tfGames = []


//外接游戏地址停服地址参考
/*
[
    '37.com.cn/h5game/public/?pid=491',                                 //大天使之剑
    'cdn.fyh5.hulai.com/lianyun',                                       //绯雨骑士团
    'sdk.zhijiangames.com/wanfeng/init/game/frfxz',                     //凡人飞仙转
    'kingh5.zhisnet.cn/GameEasySDK',                                    //权倾天下
    'game.yy2hd.com/website',                                           //神奇三国
    'sdk.zhijiangames.com/wanfeng/init/game/xxjqxz',                    //新仙剑
    'sdk.zhijiangames.com/wanfeng/init/game/dhls',                      //大话梁山
    'sssj.beeplay123.com/sssj',                                         //蜀山世界
    'sdk.zhijiangames.com/wanfeng/init/game/xkx',                       //侠客行
    'sssj.beeplay123.com/zll',                                          //醉玲珑
    'xy-cdn-sgzsh5.suyugame.com/web/xy/index.html',                     //上古诸神
    'apizrzs.h5.91xy.com/hun/login.php',                                //逐日战神

    'm.yxitai.com/channel/gameplay/game/1088/channelinfo/wanfeng',      //龙城战歌
    'fa.jygame.net/yssdk/channel/wanfeng/login.html',                   //绝世神功1
    'www.5idhf.com/sssj',                                               //蜀山世界
    '37.com.cn/h5game/public/?pid=403',                                 //屠龙破晓
    'h5sdk-xly.xileyougame.com/index.php/enter/play/wanfeng/1374',      //幻想西游
    'res.ghc.leduimg.com/online/web39',                                 //观海策
    'mlcdn3.hotgamehl.com/af/v1696/index_jdd.html',                     // 梦道
    'd.fire2333.com/xdpt/wanfeng/index',                                //仙站
    'h5cqllyx.jiulingwan.com/webserver/dujiaoshou',                     //传奇来了(对方未new)
    'bzmj.9wwan.com/yqdq2/index.html',                                  //暴走盟姬
    'jpxz.iwanpa.com/games/301044/index.html',                          //极品修真
    'd.fire2333.com/xdpt/wanfeng/index',                                //西游七十二变
    'web-ljh5.mingchaoyouxi.com/Ljh5ZMServerList.php',                  //六界仙尊
    'm.yxitai.com/channel/gameplay/game/1036/channelinfo/wanfeng',      //暗夜格斗
    'm.yxitai.com/channel/gameplay/game/1120/channelinfo/wanfeng',      //跑跑西游记
    'cdn0.myh5.90wmoyu.com/index.djshps.html',                          //魔域来了
    'm.yxitai.com/channel/gameplay/game/1093/channelinfo/wanfeng',      //万道武神
]
*/

//********************单个小游戏或者单个外界游戏停服配置结束***************




//提示
const NOTICE = {
    title: '停服公告',
    content: '各位玩家:<br/>为提升游戏体验，暂进行停服维护。停服期间将无法进行游戏，给各位带来的不便，敬请谅解。'
}

//频闭微信分享
function onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu');
}
function getRequest() {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

function closeWeiXinShare() {
    var WxScript = document.createElement("script");
    WxScript.type = "text/javascript";
    WxScript.src = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js';
    document.head.appendChild(WxScript);
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
}


var curChannel = '';
if (getRequest()['channel']) {
    curChannel = String(getRequest()['channel']);
} else {
    curChannel = localStorage.getItem('APP_CHANNEL');
}
var GameArr = ['landlord', 'dart', 'fish', 'kingdom', 'legion', 'moto', 'ring', 'samguk', 'crush', 'tcard', 'taurus' ,'cat']

if (curChannel.indexOf('100029') != -1) {
    closeWeiXinShare();
}

for (let i = 0; i < GameArr.length; i++) {
    if (window.location.href.indexOf(GameArr[i]) != -1 && (curChannel.indexOf('110002') != -1 || curChannel.indexOf('110004') != -1 || curChannel.indexOf('110003') != -1)) {
        closeWeiXinShare();
        break;
    }
}

localStorage.removeItem('originDeffer');

function timeRange(beginTime, endTime) {
    var strb = beginTime.split(":");
    if (strb.length != 2) {
        return false;
    }

    var stre = endTime.split(":");
    if (stre.length != 2) {
        return false;
    }

    var b = new Date();
    var e = new Date();
    var n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        return false;
    }
}

var _ss = window.location.href.split('#/');
function clientBack() {
    var locationUrlArr = window.location.href.split('#/');
    if (locationUrlArr.length > 1) {
        locationUrlArr.splice(1, 0, "&mainClient=true#/")
    }
    window.location.href = locationUrlArr.join('');
}
window.clientBack = clientBack;

(function () {
	
	//全平台停服js调用
    if (IS_OPEN) {
        if (timeRange(TIME.start, TIME.finish)) {
			window.location.href = 'https://wap.beeplay123.com/ErrorPage/ErrorPage.html?tf='+encodeURIComponent(JSON.stringify(TIME))+'&time='+(new Date()).getTime();
        }
    }
    //小游戏停服js调用
    
    if(IS_GAME_OPEN) {
    	var tf_server_wUrl = window.location.href && window.location.href.split('?')[0]
    	if (timeRange(GAMETIME.start, GAMETIME.finish)) {
    		tfGames.length&&tfGames.forEach(function(item) {
    			console.log('item::', item)
				if(tf_server_wUrl.indexOf(item) != -1) {
					
					if(item.length <= 10){
						//小游戏
						window.location.href = 'https://wap.beeplay123.com/ErrorPage/jcErrorPage.html?tf='+encodeURIComponent(JSON.stringify(GAMETIME))+'&time='+(new Date()).getTime();
					}else {
						//外界游戏
						window.location.href = 'https://wap.beeplay123.com/ErrorPage/jcErrorPage.html?from=wj&time='+(new Date()).getTime();
					}
				}
			})
        }
    }
    
    try {
		if(location.href.indexOf('wap.beeplay123.com') != -1 && (localStorage.getItem('APP_CHANNEL') == '100049' || localStorage.getItem('APP_CHANNEL') == '100045')) {
			var time = new Date().getTime()
			  var scriptRenRen = document.createElement('script')
			  scriptRenRen.type = 'text/javascript'
			  scriptRenRen.src = 'https://wap.beeplay123.com/rrVideoClose/index.js'
			  document.head.appendChild(scriptRenRen)
		}
	}
	catch(err) {
		console.log('err:',err)
	}

    
})();