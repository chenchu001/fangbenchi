var app = {
    maskTop: $('body').height(),
    $main: $('#main'),
    lock: false,
    result: [],
    loaded: false,
    init: function() {
        // FastClick.attach(document.body);
        $(document).on('touchmove', function(event) {
            event.preventDefault();
        });
        //控制音乐按钮
        $('#audioBtn').click(function() {
            var audioBtn = $(this);
            if(audioBtn.attr("class") === "soundStop"){
                audioBtn.removeClass("soundStop");
                playVid();
            }else{
                audioBtn.addClass("soundStop");
                pauseVid();
            }
        })
        app.Event();
        app.loading();
    },
    Event: function() {
        // share
        $('#shareBtn').on('click',function(){
            event.preventDefault();
            $('.share-box').fadeIn(200).on('click', function(event) {
                event.preventDefault();
                $(this).fadeOut(200)
            });
        });
        function goPage(obj) {
            var t = $('.section.active');
            if(obj){
                var n = obj;
            }else{
                var n = t.next('.section');
            }

            // if(!n.html() || app.lock) return;

            $('#snow').prependTo(n.find('.bg'));

            n.addClass('active').removeAttr('style').find('.bg').removeAttr('style');

            var nBg = n.find('.bg');
            t.fadeOut(1000);
            maskAnimation(4,5,20,80,function(x,y){
                nBg.css("-webkit-mask-position", (-x*640)+"px "+(-y*app.maskTop)+"px");
            },function(){
                t.removeClass('active');
                n.find('.bg img.text').addClass('ani-text').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    n.find('.radio').addClass('show');
                    
                });
            });
        };
        app.$main.find('.radio1,.radio2').on('click',function(event) {
            event.preventDefault();
            $(this).addClass('change').siblings().removeClass('change');
            app.result[$(this).parents('.section').index()] = $(this).index();
            console.log(app.result);
            setTimeout(function(){
                goPage();
            },400);
        });
        $('#stage9 .click').on('click', function(event) {
            event.preventDefault();
            goPage();
            
        });
    },
    loading: function() {
        var imgs = ['images/s1.jpg','images/s2.jpg','images/s3.jpg','images/s4.jpg','images/s5.jpg','images/s6.jpg','images/s7.jpg','images/s8.jpg','images/s9.jpg','images/s10.jpg','images/s1-text.png','images/s2-text.png','images/s3-text.png','images/s4-text.png','images/s5-text.png','images/s6-text.png','images/s7-text.png','images/s8-text.png','images/s10-text1.png','images/s11-text.png','images/share.png','images/bg.jpg','images/audio.png','images/btn-1.png','images/btn-2.png','images/btn-3.png','images/btn-share.png','images//btn-video.png','images/Generic.png','images/radio1.png','images/radio2.png','images/touch1.png','images/touch2.png'];
        var len = imgs.length;
        $.preload(imgs,{
            //每一张图片加载执行
            each:function(count){
                $('.progress').html(Math.round((count+1) / len * 100) + '%');
            },
            //所有图片加载完成之后执行
            all:function(){
                document.body.onload= init();
                setTimeout(function(){
                    $('.progress').hide();
                    $('#loading img').addClass('ani-text');
                    touch.on('#loading', 'swipeleft swiperight swipeup swipedown', function(ev){
                        if(ev.type == 'swipeup'){
                            $('#loading').fadeOut(400);
                            $('#snow').prependTo($('#stage1').find('.bg'));
                            $('#stage1').addClass('active');
                            var nBg = $('#stage1').find('.bg');
                            maskAnimation(4,5,20,80,function(x,y){
                                nBg.css("-webkit-mask-position", (-x*640)+"px "+(-y*app.maskTop)+"px");
                            },function(){
                                $('#main #stage1 .bg img.text').addClass('ani-text').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                                        $('#stage1').find('.radio').addClass('show');
                                });
                            });
                        }
                    });
                }, 300);
            }
        })
    }
}

$(function(){
    app.init();
})
var setInter = '';
maskAnimation = function(x,y,end,time,step,callback){
    clearInterval(setInter);
    var _x = _y = _i = 0;
    setInter = setInterval(function(){
        if(_x >= x){
            _x=0;
            _y = _y >= y ? 0 : _y += 1;
        }
        step(_x,_y);
        _x+=1;
        _i++;
        if(_i>=end){
            clearInterval(setInter);
            callback();
        }
    },time);
};
function playVid() {
    $("#video").get(0).play();
}
function pauseVid() {
    $("#video").get(0).pause();
}