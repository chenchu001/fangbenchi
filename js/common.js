var app = {
    maskTop:$('body').height(),
    $main: $('#main'),
    lock: false,
    result: [],
    loaded: false,
    init: function() {
        FastClick.attach(document.body);
        $(document).on('touchmove', function(event) {
            event.preventDefault();
        });
        app.loading();
        app.Event();
        $("#audioBtn").click(function(){
            var audioBtn = $(this);
            if(audioBtn.attr("class") == "soundStop")
            {
                audioBtn.removeClass("soundStop");
                playVid();
            }
            else
            {
                audioBtn.addClass("soundStop");
                pauseVid();
            }
        });
    },
    Event:function(){
        var $video = $('#video').get(0);
        $('#stage11').on('click', 'a.btn-video', function(event) {
            event.preventDefault();
            $("#audioBtn").trigger('click');
            $('#stage11 .popup-video').fadeIn(200,function(){
                $video.play();
            });
        });
        $('#stage11 .popup-video a.close').on('click', function(event) {
            event.preventDefault();
            $("#audioBtn").trigger('click');
            $('#stage11 .popup-video').fadeOut(200,function(){
                $video.pause();
            });
        });
        $('#shareBtn').on('click', function(event) {
            event.preventDefault();
            $('.share-box').fadeIn(200).on('click', function(event) {
                event.preventDefault();
                $(this).fadeOut(200)
            });
        });
        touch.on('#stage11', 'swipeleft swiperight swipeup swipedown', function(ev){
            if(ev.type == 'swipeup'){
                //if(app.result.length < 8) return;
                goPage($("#stage12"));
            }
        });
        function goPage(obj) {
            var t = $('.section.active');
            if(obj){
                var n = obj;
            }else{
                var n = t.next('.section');
            }
            
            if(!n.html() || app.lock) return;
            
            $('#snow').prependTo(n.find('.bg'))
            app.lock = true;
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
                app.lock = false;
            });
        }
        app.$main.find('.radio1,.radio2').on('click', function(event) {
            event.preventDefault();
            $(this).addClass('change').siblings().removeClass('change');
            app.result[$(this).parents('.section').index()] = $(this).index();
            if($(this).parents('.section').index()==7){
                var j = 0;
                for (var i = 0; i <app.result.length; i++) {
                    if(app.result[i]==1) j++;
                };console.log(j)
                if(j>2){
                    $('#stage10 .bg img.text').attr('src','images/s10-text1.png');
                }else{
                    $('#stage10 .bg img.text').attr('src','images/s10-text2.png');
                }
            }
            setTimeout(function(){
                goPage();
            },800)
            //
        });

        $('#stage9 h2').on('click', function(event) {
            event.preventDefault();
            goPage();
            
        });
        $('#stage10 .click').on('click', function(event) {
            event.preventDefault();
            goPage();
            
        });
        $('#stage11 a.btn1').on('click', function(event) {
            event.preventDefault();
            $('#stage11 .popup').fadeIn(200);
            
        });
        
        $('#stage11 .popup a.close').on('click', function(event) {
            event.preventDefault();
            $('#stage11 .popup').fadeOut(200);
        });
        $('#stage11 a.btn3').on('click', function(event) {
            event.preventDefault();
            goPage($("#stage12"));
            
        });
        $('#stage11 a.btn2').on('click', function(event) {
            event.preventDefault();
            goPage($("#stage14"));
            
        });
        $('#stage12 a.btn4').on('click', function(event) {
            event.preventDefault();
            $('#stage12 .popup-amg').fadeIn(200).find('a.close').on('click', function(event) {
                event.preventDefault();
                $('#stage12 .popup-amg').fadeOut(200);
            });
        });
        $('#stage12 a.btn5').on('click', function(event) {
            event.preventDefault();
            $('#stage12 .popup-dream').fadeIn(200).find('a.close').on('click', function(event) {
                event.preventDefault();
                $('#stage12 .popup-dream').fadeOut(200);
            });
        });
        $('#stage12 a.btn6').on('click', function(event) {
            event.preventDefault();
            goPage($("#stage13"));
            
        });
        $('#stage12 a.btn-back').on('click', function(event) {
            event.preventDefault();
            goPage($("#stage11"));
            
        });
        $('#stage13 a.btn-back').on('click', function(event) {
            event.preventDefault();
            goPage($("#stage12"));
            
        });
        $('.form span.sex').on('click', function(event) {
            event.preventDefault();
            if(!$(this).hasClass('selected')){
                $(this).addClass('selected').siblings().removeClass('selected');
            }
        });
        $('.form span.clause').on('click', function(event) {
            event.preventDefault();
            if(!$(this).hasClass('selected')){
                $(this).addClass('selected');
            }else{
                $(this).removeClass('selected');
            }
        });
        $('.form a.btn7').on('click', function(event) {
            event.preventDefault();
            $(document).unbind('touchmove');
            $("#stage14 .popup").fadeIn(200).find('a.close').on('click', function(event) {
                event.preventDefault();
                $("#stage14 .popup").fadeOut(200);
                $(document).on('touchmove', function(event) {
                    event.preventDefault();
                });
            });
        });
        $('.form a.btn-back').on('click', function(event) {
            event.preventDefault();
            goPage($("#stage11"));
        });
        
        $('#information .but a').eq(1).on('click',function(event){
            event.preventDefault();
            $('#information').css('display','none');
            goPage($("#stage14"));
        })
    },
    loading: function(){
        var imgArr = ['images/loading.jpg','images/loading-text.png','images/loading1.png','images/loading2.png','images/loading3.png','images/loading4.png','images/loading5.png','images/loading6.png','images/loading7.png'];
        loadimg(imgArr,function(){},function(){
            var $loading = $('#loading');
            $loading.show().find('img.ani.ing').eq(6).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                if(!app.loaded){

                    $loading.find('img.ani').removeClass('ing');
                    setTimeout(function(){
                        $loading.find('img.ani').addClass('ing');
                    },2000);
                }
            });
            app.$main.show();
        });

    }
}
$(function(){

    app.init();
    //loading
    $("#loading").loading({numEle: ".number span" });
});
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
function loadimg(arr, funLoading, funOnLoad, funOnError) {
    var numLoaded = 0,
    numError = 0,
    isObject = Object.prototype.toString.call(arr) === "[object Object]" ? true : false;

    var arr = isObject ? arr.get() : arr;//alert(arr)
    for (a in arr) {
        var src = isObject ? $(arr[a]).attr("data-src") : arr[a];
        preload(src, arr[a]);
    }
    
    function preload(src, obj) {
        var img = new Image();
        img.onload = function () {
            numLoaded++;
            funLoading && funLoading(numLoaded, arr.length, src, obj);
            funOnLoad && numLoaded == arr.length && funOnLoad(numError);

        };
        img.onerror = function () {
            numLoaded++;
            numError++;
            funOnError && funOnError(numLoaded, arr.length, src, obj);
        }
        img.src = src;
    }
}

function playVid()
{
    $("#video_1").get(0).play();
}

function pauseVid()
{
    $("#video_1").get(0).pause();
}