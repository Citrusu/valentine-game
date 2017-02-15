define(function(){

    //分享
    seajs.use('http://res.wx.qq.com/open/js/jweixin-1.0.0.js', function (wx) {

        //微信分享
        wx.config({
            debug:false,
            appId:     $('#appId').val(),
            timestamp: $('#timestamp').val(),
            nonceStr:  $('#nonceStr').val(),
            signature: $('#signature').val(),
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
        });
        wx.ready(function () {
            var title     = '单身汪PK情侣喵，快来参与对战领最高50元话费吧~';
            var desc      = '朋友，麻烦点一下助我一臂之力，谢谢~';
            var shareData = {
                title:  title,
                desc:   desc,
                link:   'http://mp.weixin.qq.com/s/0HFf60yfViVWktmoGekIIw',//换成图文链接
                imgUrl: 'http://csyidong.cyou100.com/Template/Wechat/Etackle/Assets/Images/Lover/share.jpg',

                success : function(){
                    //分享成功之后的回调
                }
            };

            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareWeibo(shareData);
        });
        wx.error(function (res) {
            console.log(res.errMsg);
        });
    });


});