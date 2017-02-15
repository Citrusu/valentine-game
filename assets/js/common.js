define(function(require, exports, module){

    var _rule_close = $(".rule-close");//活动规则弹窗关闭按钮
    var _rule_btn = $(".rule-btn");//活动规则显示按钮
    var _rule_pop = $(".rule-pop");//活动规则弹窗
    _rule_close.on("click",function () {
        _rule_pop.fadeToggle(100);
    });
    _rule_btn.on("click",function () {
        _rule_pop.fadeToggle(100);
    });
    
    var _my_audio = $(".panel-overlay").find(".my-audio")[0];//音乐播放器
    var _music_switch = $(".music-switch");//音乐暂停按钮

    function bgmplay() {
        window.onload = function() {
            // alert(typeof WeixinJSBridge);
            WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
                // 在这里拿到 e.err_msg, 这里面就包含了所有的网络类型
                // alert(e.err_msg);
                _my_audio.play();
            });
        };
    }
    bgmplay();
    _my_audio.play();

    $("body").on("touchstart",function () {
        var _this = $(this);
        if(!_this.is(".current")){
            bgmplay();
            _my_audio.play();
            _music_switch.addClass("rotate");
            _this.addClass("current");
        }
    });

    _music_switch.on("click",function () {
        if(_my_audio.paused){
            _my_audio.play();
            _music_switch.addClass("play");
        }else{
            _my_audio.pause();
            _music_switch.removeClass("play");
        }
    });
});