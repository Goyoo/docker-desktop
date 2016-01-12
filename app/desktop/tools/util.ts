
declare var $


export function getUid(length) {
    var id = ''
	length = length || 20
	
    while (length--) {
        id += (Math.random() * 16 | 0) % 2 ? (Math.random() * 16 | 0).toString(16) : (Math.random() * 16 | 0).toString(16).toUpperCase();
    }
    return id.toLowerCase();
}


function throttle(method,num?,context?, args?){ 
	num = num || 100;
    
	clearTimeout(method.tId); 
	method.tId = setTimeout(function(){ 
		method.apply(context,args); 
	},num); 
}



function selectstart (isSelect)
{
    if (typeof (document.onselectstart) != "undefined") {
        document.onselectstart = () =>{ return isSelect };
    } else {
        document.onmousedown = () =>{ return isSelect };
        document.onmouseup = () =>{ return true };
	}
}

export function dialog(config) 
{ 
    var isDown = false, top, left, isMax = false, beforeSize = {};
    window["z-index"] = window["z-index"] + 1 || 100;
    $(config.element).css('position', 'absolute')
	$(config.element).css('left', (config.left || Math.random()*100)+'px')
	$(config.element).css('top', (config.top || Math.random()*100)+'px')
	$(config.element).css('z-index', window["z-index"])

    $(config.eventEl).on('mousedown', function(event)
    {
        if (event.target != config.eventEl) { 
            if (!$(event.target).hasClass('title')) {
                return;
            }
             // return;
        }
		isDown = true;
		var xx = event.screenX; 
		var yy = event.screenY; 

		top = parseInt($(config.element).css('top').replace('px', '')) - yy;
		left = parseInt($(config.element).css('left').replace('px', '')) - xx;

	});


    var max = function () 
    { 
        if (isMax) {
            isMax = false;
            $(config.element).width(beforeSize["width"]);
            $(config.element).height(beforeSize["height"]);
            $(config.element).css("top", beforeSize["top"]);
            $(config.element).css("left", beforeSize["left"]);

            if (config.onResize) {
                config.onResize();
            }
            return;
        }
        

        var width = $("body").width(),
        height = $(window).height();
        beforeSize["height"] = $(config.element).height()
        beforeSize["width"] = $(config.element).width()
        beforeSize["top"] = $(config.element).css("top")
        beforeSize["left"] = $(config.element).css("left")

		$(config.element).width(width);
		$(config.element).height(height - config.taskBarHeight);
		$(config.element).css('top', 0);
		$(config.element).css("left",0);
            
		isMax = true;
        if (config.onResize) {
			config.onResize();
		}

        if (config.onMouseUp())
		    config.onMouseUp();

        isDown = false;
    }

	$('body').mouseup(function()
    {
        if (config.onMouseUp())
		    config.onMouseUp();

        isDown = false;
	});


	var windowMove = function (event) 
    { 
        if (!isDown) return;
        
        if (config.onMove())
		    config.onMove();

        var xx = event.screenX;
		var yy = event.screenY;

        if (isMax) 
        { 
		    var thatLeft = event.pageX;
            isMax = false;
            left = thatLeft - beforeSize["width"]/2 
            $(config.element).width(beforeSize["width"]);
		    $(config.element).height(beforeSize["height"]);
		    $(config.element).css("left", left + "px");
		    //$(config.element).css("top", beforeSize["top"]);
            
            if (config.onResize) {
			    config.onResize();
		    }
            left = left - xx;
            //alert(thatLeft - beforeSize["width"]/2 + "px"+"")
            return;
        }

        if (event.pageX <= 0) 
        {
            var width = $("body").width(),
            height = $(window).height();

            beforeSize["height"] = $(config.element).height()
            beforeSize["width"] = $(config.element).width()
            beforeSize["top"] = $(config.element).css("top")
            beforeSize["left"] = $(config.element).css("left")

		    $(config.element).width(width/2 - 10);
		    $(config.element).height(height - config.taskBarHeight);
		    $(config.element).css('top', 0);
		    $(config.element).css("left", 0);
        
		    isMax = true;
            if (config.onResize) {
			    config.onResize();
		    }

            if (config.onMouseUp())
		        config.onMouseUp();

            isDown = false;
            return;
        }

        
        if (event.pageX >= $("body").width()-1) 
        {
            var width = $("body").width(),
            height = $(window).height();

            beforeSize["height"] = $(config.element).height()
            beforeSize["width"] = $(config.element).width()
            beforeSize["top"] = $(config.element).css("top")
            beforeSize["left"] = $(config.element).css("left")

		    $(config.element).width(width/2 - 1);
		    $(config.element).height(height - config.taskBarHeight);
		    $(config.element).css('top', 0);
		    $(config.element).css("left", width/2);
        
		    isMax = true;
            if (config.onResize) {
			    config.onResize();
		    }

            if (config.onMouseUp())
		        config.onMouseUp();

            isDown = false;
            return;
        }
        
        if (event.pageY <= 0) {
            max();
            return;
        }

		$(config.element).css('top', (yy + top) + 'px');
		$(config.element).css('left', (xx + left) + 'px');
    
    }
    
	$(document).on('mousemove',function(event) {
        
		throttle(windowMove, 3, this, [event])
	});

    
    $(config.eventEl).on('dblclick', function(event)
    {
		
        if (isMax) 
        {
            
            isMax = false;
            $(config.element).width(beforeSize["width"]);
		    $(config.element).height(beforeSize["height"]);
		    $(config.element).css("top", beforeSize["top"]);
		    $(config.element).css("left", beforeSize["left"]);

            if (config.onResize) {
			    config.onResize();
		    }
            return;
        }

        var width = $("body").width(),
            height = $(window).height();
        
        beforeSize["height"] = $(config.element).height()
        beforeSize["width"] = $(config.element).width()
        beforeSize["top"] = $(config.element).css("top")
        beforeSize["left"] = $(config.element).css("left")

		$(config.element).width(width);
		$(config.element).height(height - config.taskBarHeight);
		$(config.element).css('top', 0);
		$(config.element).css("left", 0);
        
		isMax = true;
        if (config.onResize) {
			config.onResize();
		}
	});

	

    resize(config)

    return {
        max: max
    }
}

export function resize(config) 
{
	var element = config.element
        , $right = $(element).find('.design-resize-right')
		, $left = $(element).find('.design-resize-left')
		, $bottom = $(element).find('.design-resize-bottom')
		, $right_bottom = $(element).find('.design-resize-right-bottom')
		, $left_bottom = $(element).find('.design-resize-left-bottom')
		, isDown = false
		, seat = ''
		, top
		, left
		, bottom
		, widthValue
		, heightValue
        , panelHeight
        , panelWidth;
		
	var setValue = function(event, v, l, t = 0) 
    {
		isDown = true;
		seat = v;
		left = event.pageX;
		top = event.pageY;
		panelWidth = $(element).width();
		panelHeight = $(element).height();
		selectstart(false);
	}

	$right.mousedown(function(event){
		setValue(event, 'right', 5);
	});

	$left.mousedown(function(event){
		setValue(event, 'left', -5);
	});

	$bottom.mousedown(function(event){
		setValue(event, 'bottom', 5);
	});

	$right_bottom.mousedown(function(event){
		setValue(event, 'right-bottom', 5, 5);
	});

	$left_bottom.mousedown(function(event){
		setValue(event, 'left-bottom', -5, 5);
	});
	
	$('body').mouseup(function()
    {
		if (!isDown)
			return;
		isDown = false;
		selectstart(true);
		throttle(function() 
        {
			if (config.onBeforeMouseUp) {
				config.onBeforeMouseUp();
			}
			//that.resize(widthValue, heightValue);
			if (config.onMouseUp) {
				config.onMouseUp();
			}
		})
	});

    var mouseMoveEvent = function (event) 
    {
        if (!isDown) {
			return;
		}

		var thatLeft = event.pageX;
		var thatTop = event.pageY;

		if (!isDown)
		    return;

		if (seat == 'right') 
        {
		    widthValue = panelWidth + thatLeft - left;
		    heightValue = undefined;
		    $(element).css('width', widthValue + 'px');
		}
		else if (seat == 'left') 
        {
		    widthValue = panelWidth + left - thatLeft;
		    heightValue = undefined;
		    $(element).css('width', widthValue + 'px');
		    $(element).css('left', thatLeft)
		}
		else if (seat == 'bottom') 
        {
		    widthValue = undefined;
		    heightValue = panelHeight + thatTop - top;
		    $(element).css('height', heightValue - 4 + 'px');
		}
		else if (seat == 'right-bottom')
        {
		    widthValue = panelWidth + thatLeft - left;
		    heightValue = panelHeight + thatTop - top;
		    $(element).css('height', heightValue - 4 + 'px');
		    $(element).css('width', widthValue - 4 + 'px');
		}
		else if (seat == 'left-bottom') 
        {
		    widthValue = panelWidth + left - thatLeft;
		    heightValue = panelHeight + thatTop - top;
		    $(element).css('height', heightValue - 4 + 'px');
		    $(element).css('width', widthValue - 4 + 'px');
		    $(element).css('left', thatLeft)
		}
        
		if ($(element).height() % 2 != 0) { 
		    $(element).height($(element).height() + 1);
        }
		if ($(element).width() % 2 != 0) { 
		    $(element).width($(element).width() + 1);
        }
	}

    var onResize = function () { 
        
        if (!isDown) {
			return;
		}
        if (config.onResize())
		    config.onResize();
    }
    
		
	$('body').on('mousemove',function(event)
    {
        
        if (!isDown) {
			return;
		}
        if (config.onMove())
		    config.onMove();
		throttle(mouseMoveEvent, 6, this, [event]);
		throttle(onResize, 6, this, [event]);
	});
}