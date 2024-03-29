/**
 * Created by Citrus on 2017/2/9.
 */
window.onload = function() {
    if (window.innerWidth > 640) {
        alert('请在手机上体验');
        return false;
    }

    var catConfig = {
        box: $('.game-box'),
        catSrc: $('#catImg').attr('src'),
        catTapSrc: $('#catTapImg').attr('src'),
        numBox: $('#num'),
        timeSecond: $('#timeSecond'),
        timeBox: $('#time'),
        countTime: 999,
        catNum: 5,
        catSize: parseInt($(window).width() / 8.5),
    };

//动态
    var config = {};
    config.boxW = catConfig.box.width();//游戏盒子
    config.boxH = catConfig.box.height();
    function initParam() {
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
    function getNewCat() {
        var cat = '';
        for (var i = 0; i < catConfig.catNum; i++) {
            config.deg = getRandomNum(360);
            getPosition();
            cat += '<div class="dog-box" style="transform:rotate(' + config.deg + 'deg);width:' + (catConfig.catSize * 2) + 'px;height:' + catConfig.catSize + 'px;position:absolute; top:' + config.position[i].y + 'px;left:' + config.position[i].x + 'px;">' +
                '<div class="cat" style="background-image: url(' + catConfig.catSrc + ');' +
                'width:' + catConfig.catSize + 'px;' +
                'height:' + catConfig.catSize + 'px;' +
                'position: absolute;' +
                'top:0;' +
                'left:0;' +
                '"></div>' +
                '<div class="cat" style="background-image: url(' + catConfig.catSrc + ');' +
                'width:' + catConfig.catSize + 'px;' +
                'height:' + catConfig.catSize + 'px;' +
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

    function getRandomNum(range) {
        return Math.floor(Math.random() * range);
    }

//生成位置
    function getPosition() {
        var num = {
            x: getRandomNum(config.boxW),
            y: getRandomNum(config.boxH)
        };
        //console.log(JSON.stringify(num));
        //取范围内
        if (num.x < (catConfig.catSize * 2.2) || num.y < (catConfig.catSize * 2.2) || num.x > config.boxW - (catConfig.catSize * 2.2) || num.y > config.boxH - (catConfig.catSize * 2.2)) {
            return getPosition();
        } else {
            if (config.position.length <= 0) {
                config.position.push(num);
            } else {
                //去重复位置
                for (var j = 0; j < config.position.length; j++) {
                    if (num.x > config.position[j].x - (catConfig.catSize * 2) && num.x < config.position[j].x + (catConfig.catSize * 2) && num.y > config.position[j].y - (catConfig.catSize * 2) && num.y < config.position[j].y + (catConfig.catSize * 2)) {
                        return getPosition();
                    }
                }
                config.position.push(num);
            }
        }
    }

//倒计时
    function countDown() {
        config.time = setInterval(function () {
            if (config.countTime >= 0) {
                catConfig.timeSecond.text(Math.floor(config.countTime / 100));
                if (config.countTime >= 100) {
                    catConfig.timeBox.text(config.countTime.toString().substr(1));
                } else {
                    catConfig.timeBox.text(config.countTime);
                }
                config.countTime--;
            } else {
                clearInterval(config.time);
                uploadCount();
                // $.alert('您的牵手的对数为'+config.nowNum+'');
                _board_middle.text((config.nowNum) * 10);
                _game_score.css({"top": "-" + $(window).height() + "px"});
                _game_score.show();
                _game_score.animate({
                    top: "0px"
                }, 300);
            }
        }, 10);
    }

//成绩提交
    function uploadCount() {

    }

    function init() {
        initParam();
        getNewCat();
        countDown();
    }

//点击事件
    catConfig.box.on('touchend', '.cat', function () {
        var $this = $(this);
        if (!$this.hasClass('tap')) {
            $this.addClass('tap');
            $this.css('background-image', 'url(' + catConfig.catTapSrc + ')');
            if ($this.parent().find('.tap').length >= 2) {
                setTimeout(function () {
                    $this.parent().remove();
                    if (catConfig.box.find('.cat').length <= 0) {
                        getNewCat();
                    }
                }, 50);

                config.nowNum++;
                catConfig.numBox.text(config.nowNum);
            }
        }

    });

//点击开始按钮
    _start_btn.on("click", function () {
        _game_step.hide();
        _game_play.css({"opacity": "1"});
        init();
    });

//再玩一次
    _again_btn.on("click", function () {
        _game_score.animate({
            top: "-" + $(window).height() + "px"
        }, 300, function () {
            _game_score.hide();
        });
        init();
    });

    var _step_rule_btn = $(".step-rule-btn");//活动规则显示按钮
    var _rule_pop = $(".rule-pop");//活动规则弹窗
    _step_rule_btn.on("click", function () {
        _rule_pop.fadeToggle(100);
    });
    var _share_pop = $(".share-pop");//分享弹窗
    var _help_btn = $(".help-btn");//分享按钮
    _help_btn.on("click", function () {
        _share_pop.fadeToggle(100);
    });
    _share_pop.on("click", function () {
        _share_pop.fadeToggle(100);
    });
}