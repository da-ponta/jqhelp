$.fn.extend({
  help:function(data,param){
    data = $("<div></div>").append(data);
    var $data = $(data).addClass("help_window");
    var $this = $(this);
    $("body").append($data);
    var position=(param && param.position)?param.position:"";
    var outerHeight = $data.outerHeight();
    var outerWidth = $data.outerWidth();
    $data.hide();
    $this.hover(function(){
        var offset = $this.offset();
        var thisOuterHeight = $this.outerHeight();
        var thisOuterWidth = $this.outerWidth();
        if (position.indexOf("top")>=0) {
            $data.css("top",offset.top-outerHeight);
        } else if (position.indexOf("bottom")>=0) {
            $data.css("top",offset.top+thisOuterHeight);
        } else {
            $data.css("top",offset.top+(thisOuterHeight-outerHeight)/2);
        }
        if (position.indexOf("left")>=0) {
            $data.css("left",offset.left-outerWidth);
        } else if (position.indexOf("right")>=0) {
            $data.css("left",offset.left+thisOuterWidth);
        } else {
            $data.css("left",offset.left+(thisOuterWidth-outerWidth)/2);
        }
        $data.delay(100).show(10);
    },function(){$data.delay(100).hide(10);});
  },
    targetLightBox:function(str,target,callback,param) {
	    var dialog = $("<div class='alert_dialog'></div>");
	    var wrap = $("<div>"+str+"</div>");
	    var overlay=$("<div class='dialog_overlay'></div>");
	    dialog.append(wrap);
	    var dialog_set = overlay.add(dialog);
	    var duration=5000;
	    if (param){
	        if(param.fixed)dialog_set.css("position","fixed");
	        if(param["background-color"])overlay.css("background-color",param["background-color"]);
	        if(param.duration)duration=param.duration;
	        if(!(param.click === false)) { 
	            dialog_set.click(function(){
	                dialog_set.unbind("click");
	                $(this).stop(true,false).fadeOut(200,function(){dialog_set.remove();callback()});
	                return false;
	            })
	        } 
	    }
	    if (target != window) {
	    target.append(dialog_set);
	    wrap.css({"top":(target.outerHeight()-wrap.height())/2+"px","left":(target.outerWidth()-wrap.width())/2});
	    var border = parseInt(dialog_set.css("border-width"),10);
	    var offset = target.offset();
	    dialog_set.css({"display":"none","width":target.innerWidth(),"height":target.innerHeight()})//,"left":offset.left+parseInt(target.css('borderLeftWidth'))-border,"top":offset.top+parseInt(target.css('borderTopWidth'))-border});
	    }else{
	    $("body").append(dialog_set);
	    wrap.css({"top":"50%","left":"50%","margin-top":-wrap.height()/2+"px","margin-left":-wrap.width()/2+"px"});//($(window).height()-wrap.height())/2+"px","left":($(window).width()-wrap.width())/2+"px"});
	    dialog_set.css({"display":"none","width":"100%","height":"100%","left":0,"top":0});
	    }
	    overlay.show().css("opacity",0).animate({opacity:0.7},300);
	    dialog.fadeIn(300)
	    if (duration>=0) {
	        dialog.delay(duration).fadeOut(200,function(){dialog_set.remove();callback()});
	        overlay.delay(duration).fadeOut(200);
	    }
	}
})