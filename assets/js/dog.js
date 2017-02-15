/**
 * Created by Citrus on 2017/2/9.
 */
define(function(){

    var _step_rule_btn = $(".step-rule-btn");//活动规则显示按钮
    var _rule_pop = $(".rule-pop");//活动规则弹窗
    _step_rule_btn.on("click",function () {
        _rule_pop.fadeToggle(100);
    });

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
            var fraction   = $('#fraction').val();
            var shareid    = $('#shareid').val();
            var url;
            var title;
            var desc;
            var random_num = Math.random();
            if(shareid){
                url       = etConfig.ajaxUrl + 'helps/shareid/'+shareid;
            }else{
                url       = 'http://mp.weixin.qq.com/s/0HFf60yfViVWktmoGekIIw';//换成图文链接
            }
            if(random_num <= 0.333333){
                title = '2.14大作战，快来参与对战领最高50元话费+300M流量!';
                desc  = '小伙伴请帮我一把，大力猛戳>>';
            }else if(random_num > 0.333333 && random_num <= 0.666666){
                title = '情人节大礼来袭！免费送最高50元话费+300M流量！';
                desc  = '朋友，麻烦点一下为我+10分，好人一生平安~';
            }else{
                title = '我在10秒内拆散了'+fraction+'对情侣，你敢来挑战我吗？';
                desc  = '2.14大作战，快来参与对战领最高50元话费+300M流量!';
            }
            var shareData = {
                title:  title,
                desc:   desc,
                link:   url,
                imgUrl: 'http://csyidong.cyou100.com/Template/Wechat/Etackle/Assets/Images/Lover/share.jpg',
            };

            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareWeibo(shareData);
        });
        function wxShare(shareData){
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
        }
        var catConfig = {
            box : $('.game-box'),
            catSrc : $('#catImg').attr('src'),
            catTapSrc : $('#catTapImg').attr('src'),
            numBox : $('#num'),
            timeSecond: $('#timeSecond'),
            timeBox: $('#time'),
            countTime : 999,
            catNum : 5,
            catSize : parseInt($(window).width() / 8.5),
        };

        //动态
        var config = {};
        config.boxW = catConfig.box.width();//游戏盒子
        config.boxH = catConfig.box.height();
        function initParam(){
            config.nowNum = 0;//已经牵手对数
            config.deg = 0;//角度
            config.x = 0;
            config.y = 0;
            config.countTime = catConfig.countTime;
            config.position = [];
            catConfig.timeBox.text(catConfig.countTime);
            catConfig.numBox.text(0);
            catConfig.box.find('.cat').remove();
        }

        var _game_score = $(".game-score");//得分盒子
        var _board_middle = $(".board-middle");//所得分数
        var _start_btn = $(".start-btn");//开始按钮
        var _game_step = $(".game-step");//步骤提示盒子
        var _game_play = $(".game-play");//游戏盒子
        var _again_btn = $(".again-btn");//再玩一次按钮

        //创建喵
        function getNewCat(){
            var cat = '';
            for(var i = 0;i < catConfig.catNum; i++){
                config.deg = getRandomNum(360);
                getPosition();
                cat += '<div class="dog-box" style="transform:rotate('+config.deg+'deg);width:'+(catConfig.catSize * 2)+'px;height:'+catConfig.catSize+'px;position:absolute; top:'+ config.position[i].y +'px;left:'+ config.position[i].x +'px;">' +
                    '<div class="cat" style="background-image: url('+ catConfig.catSrc +');' +
                    'width:'+catConfig.catSize+'px;' +
                    'height:'+catConfig.catSize+'px;' +
                    'position: absolute;' +
                    'top:0;' +
                    'left:0;' +
                    '"></div>' +
                    '<div class="cat" style="background-image: url('+ catConfig.catSrc +');' +
                    'width:'+catConfig.catSize+'px;' +
                    'height:'+catConfig.catSize+'px;' +
                    'position: absolute;' +
                    'top:0;' +
                    'right: 0;' +
                    '"></div>' +
                    '</div>';
            }
            //console.log(JSON.stringify(config.position));
            catConfig.box.append(cat);
            config.position = [];
        }

        function getRandomNum(range){
            return Math.floor(Math.random() * range);
        }
        //生成位置
        function getPosition(){
            var num = {
                x : getRandomNum(config.boxW),
                y : getRandomNum(config.boxH)
            };
            //console.log(JSON.stringify(num));
            //取范围内
            if(num.x < (catConfig.catSize * 2.2) || num.y < (catConfig.catSize * 2.2) || num.x > config.boxW - (catConfig.catSize * 2.2) || num.y > config.boxH - (catConfig.catSize * 2.2)){
                return getPosition();
            }else{
                if(config.position.length <= 0){
                    config.position.push(num);
                }else{
                    //去重复位置
                    for(var j = 0; j < config.position.length; j++){
                        if(num.x > config.position[j].x - (catConfig.catSize * 2) && num.x < config.position[j].x + (catConfig.catSize * 2) && num.y > config.position[j].y - (catConfig.catSize * 2) && num.y < config.position[j].y + (catConfig.catSize * 2)){
                            return getPosition();
                        }
                    }
                    config.position.push(num);
                }
            }
        }

        //倒计时
        function countDown(){
            config.time =  setInterval(function(){
                if(config.countTime >= 0){
                    catConfig.timeSecond.text(Math.floor(config.countTime / 100));
                    if(config.countTime >= 100){
                        catConfig.timeBox.text(config.countTime.toString().substr(1));
                    }else{
                        catConfig.timeBox.text(config.countTime);
                    }
                    config.countTime --;
                }else{
                    clearInterval(config.time);
                    uploadCount();
                    // $.alert('您的牵手的对数为'+config.nowNum+'');
                    _board_middle.text((config.nowNum) * 10);
                    _game_score.css({"top":"-" + $(window).height() + "px"});
                    _game_score.show();
                    _game_score.animate({
                        top:"0px"
                    },300);
                }
            },10);
        }

        //成绩提交
        function uploadCount(){
            var url = etConfig.ajaxUrl+"dog";
            $.darkPreloader('正在提交');
            $.post(url,{fraction:(config.nowNum) * 10},function(data){
                $.hidePreloader();
                if(data.status == 1){
                    var fraction   = config.nowNum;
                    var shareid    = $('#shareid').val();
                    if(shareid){
                        var url       = etConfig.ajaxUrl + 'helps/shareid/'+shareid;
                    }else{
                        var url       = 'http://mp.weixin.qq.com/s/0HFf60yfViVWktmoGekIIw';//换成图文链接
                    }
                    var title     = '单身汪PK情侣喵，快来参与对战领最高50元话费吧~';
                    var desc      = '朋友，麻烦点一下助我一臂之力，谢谢~';
                    var shareData = {
                        title:  title,
                        desc:   desc,
                        link:   url,
                        imgUrl: 'http://csyidong.cyou100.com/Template/Wechat/Etackle/Assets/Images/Lover/share.jpg',
                    };
                    wxShare(shareData);
                }else{
                    $.alert(data.info);
                }
            });
        }

        function init(){
            initParam();
            getNewCat();
            countDown();
        }

        //点击事件
        catConfig.box.on('touchend','.cat',function(){
            var $this = $(this);
            if(!$this.hasClass('tap')){
                $this.addClass('tap');
                $this.css('background-image','url('+ catConfig.catTapSrc +')');
                if($this.parent().find('.tap').length >= 2){
                    setTimeout(function(){
                        $this.parent().remove();
                        if(catConfig.box.find('.cat').length <= 0){
                            getNewCat();
                        }
                    },50);

                    config.nowNum ++;
                    catConfig.numBox.text(config.nowNum);
                }
            }

        });

        //点击开始按钮
        _start_btn.on("click",function () {
            _game_step.hide();
            _game_play.css({"opacity":"1"});
            init();
        });

        //再玩一次
        _again_btn.on("click",function () {
            $.post(etConfig.ajaxUrl+"button",{button:'again'},function(data){});
            _game_score.animate({
                top:"-" + $(window).height() + "px"
            },300,function () {
                _game_score.hide();
            });
            init();
        });
        var _share_pop = $(".share-pop");//分享弹窗
        var _help_btn = $(".help-btn");//分享按钮
        _help_btn.on("click",function () {
            $.post(etConfig.ajaxUrl+"button",{button:'share'},function(data){});
            _share_pop.fadeToggle(100);
        });
        _share_pop.on("click",function () {
            _share_pop.fadeToggle(100);
        });

        // init();



        wx.error(function (res) {
            console.log(res.errMsg);
        });
    });


});