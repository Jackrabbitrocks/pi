$(document).ready(function()
{
	//cache reference to menu for performance
	var $menu = $(".menu");
	//get the distance between the menu and the top of the window
	var menuOffset = $menu.offset().top;
	var didScroll = false;
	var menTog = 1;
	var scrollValue = 0;
	var marginValue;	
	//don't use scroll event to fire functions
	$(window).scroll(function () {
		didScroll = true;
	});
	// setInterval to respond to scroll instead of scroll event https://github.com/shichuan/javascript-patterns/blob/master/jquery-patterns/window-scroll-event.html
	setInterval(function () 
	{
		if (didScroll) 
		{
			didScroll = false;
			scrollValue = $(window).scrollTop();
			if (scrollValue < menuOffset){
				$menu.stop().animate({
					marginTop : 0
				}, 200)
				return;
			} else {
				marginValue = scrollValue - menuOffset;
				$menu.stop().animate({
					marginTop : marginValue
				}, 200)
			}
		}
	}, 250);
	//open and close menu on click
	function menuToggle (a) {
		console.log('menuToggle')
		if(a)
		{
			$menu.css("background-image", "url(lib/img/menuArrowOpen.png)").animate({height:460});
		} else {
			$menu.css("background-image", "url(lib/img/menuArrow.png)").animate({height:50}, function  () {
				if ($menu.height() > 50) { $menu.height() = 50 };
			});
		}
	}
	//animate scroll to 
	function menuMove (m) {
		setTimeout( function()
			{$('html,body').stop().animate({
				scrollTop: m.offset().top}
				)} ,600);
	}
	$menu.find('li').on('click', function(){
		var thisMenuItem = $(this).attr('id');
		thisMenuItem = thisMenuItem.replace('M', '');
		var $thisMenuItem = $("#" + thisMenuItem);
		var $nextDiv = $("#" + thisMenuItem).next();
		$("#" + thisMenuItem).toggleClass('active').siblings().removeClass('active');
		$nextDiv.slideToggle(300).siblings("div.menu_body").hide();
		menuMove($thisMenuItem);
		menuToggle(0);
		menTog = 0; 
	})
	$('#menuShim').on('click', function()
	{
		menTog = ($('.menu').height() > 50) ? 0 : 1;
		menuToggle(menTog);
	});

	//slides the element with class "menu_body" when paragraph with class "menu_head" is clicked 
	$("#firstpane").find( 'p.menu_head').on('click', function()
	{
		menuToggle(0);
		$obj = $(this);
		var $next = $obj.next();
		$(this).toggleClass('active').siblings().removeClass('active');
		$next.slideToggle(300).siblings("div.menu_body").slideUp("fast");		
		menuMove($(this));
	});

});