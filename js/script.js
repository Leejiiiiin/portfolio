"use strict";

$(function(){
	var winHeight = $(window).height();
	var winWidth = $(window).width();
	var popStatue = false;
	var scrollEvent = false;
	var scrollTop = 0;
	var header = $('header');
	var headerH = $('.header_wrap').outerHeight();
	var mainOffsetTop = $('.main').offset().top;
	var sec0OffsetTop = $('.sec0').offset().top;
	var sec1OffsetTop = $('.sec1').offset().top;
	var sec2OffsetTop = $('.sec2').offset().top;
	var sec3OffsetTop = $('.sec3').offset().top;
	var defaultPos = 300;
	var sec3CBox = $('.sec3 .cont .cont_c');
	var sec3RBox = $('.sec3 .cont .cont_r');
	var sec3LBox = $('.sec3 .cont .cont_l');
	var sec3Swiper;
	var breakpoint = window.matchMedia('(min-width:769px)');
	var footerPosTop = $(document).height() - winHeight - $('footer').outerHeight();
	var userAgent;
	var userinfo;

	function userAgentInit() {
		userAgent = navigator.userAgent;

		var ie = userAgent.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i);
		/* if (ie) ie = parseInt(ie[1] || ie[2]); */

		var chrome_not = !/chrome/i.test(userAgent);

		userinfo = {
			os: navigator.appVersion.match(/(mac)/i) ? "mac" : navigator.appVersion.match(/(win)/i) ? "win" : navigator.appVersion.match(/(linux)/i) ? "linux" : "other_os",
			browser: /chrome/i.test(userAgent) ? "chrome" : /firefox/i.test(userAgent) ? "firefox" : /safari/i.test(userAgent) && chrome_not ? "safari" : ie ? "ie" : "other_browser",
			device: /android/i.test(userAgent) || /ip(ad|hone|od)/i.test(userAgent) ? "mobile" : "desktop",
			system: /android/i.test(userAgent) ? "android" : /ip(ad|hone|od)/i.test(userAgent) ? "ios" : "other_system",
		};
	}

	userAgentInit();
	
	function scrollStop() {
		scrollEvent = false;
	}

	// text event
	function secOnEvent(secNum){
		$('.sec' + secNum).find('.txt_wrap .txt').each(function(idx){
			var speed = idx * 200;
			setTimeout(function(){
				$('.sec' + secNum).find('.txt_wrap .txt').eq(idx).addClass('on');
			}, speed);
		});
	}

	function sectionMove(idx){
		$('html, body').stop().animate({scrollTop : $('section').eq(idx).offset().top - headerH + 'px'}, 800, scrollStop);
	}
	
	// sec3 mobile swiper
	function swiperMode(){
		if(breakpoint.matches === true && sec3Swiper !== undefined){
			sec3Swiper.destroy();
		}else if(breakpoint.matches === false) {
			sec3Swiper = new Swiper ('.sec3 .swiper-container', {
				slidesPerView: 'auto',
				spaceBetween: 20,
			});
		}
	};

	breakpoint.addListener(swiperMode);
	swiperMode();


	var mainFocus = mainOffsetTop + winHeight - headerH;
	var sec1Focus = sec1OffsetTop + $('.sec1').outerHeight() + $('.sec0').outerHeight() - headerH;
	var sec2Focus = sec2OffsetTop + winHeight - headerH;
	$(window).scroll(function(){
		scrollTop = $(window).scrollTop();
		var sec3BoxLPos = (scrollTop - sec3RBox.offset().top) / 30 * (-1);
		var sec3BoxCPos = (scrollTop -sec3CBox.offset().top) / 30;
		var sec3BoxRPos = (scrollTop - sec3RBox.offset().top) / 30 * (-1);
		
		if(scrollTop > 0){
			header.addClass('on');
			$('.btn_top').addClass('visible');
		}else{
			header.removeClass('on');
			$('.btn_top').removeClass('visible');
		}

		if(scrollTop > mainOffsetTop + sec0OffsetTop - winHeight && scrollTop <= sec0OffsetTop + $('.sec0').outerHeight()){
			var txtMove = sec0OffsetTop - scrollTop - (defaultPos / $('.sec0').outerHeight() * 100);
			$('.sec0 h2').css({transform : 'translateX(' + txtMove + 'px)'});
		}

		if(scrollTop > sec1OffsetTop - (winHeight /2) && scrollTop <= sec1OffsetTop + $('.sec1').height()){
			secOnEvent(1);
		}
		
		sec3CBox.css({transform : 'translateY(' + sec3BoxCPos + 'px)'});
		sec3RBox.css({transform : 'translateY(' + sec3BoxRPos + 'px)'});
		sec3LBox.css({transform : 'translateY(' + sec3BoxLPos + 'px)'});
		
		$('.indicator li').removeClass('on');
		if(scrollTop >= 0 && scrollTop < mainFocus){
			$('.indicator li').eq(0).addClass('on');
		}else if(scrollTop >= mainFocus && scrollTop < sec1Focus){
			$('.indicator li').eq(1).addClass('on');
		}else if(scrollTop >= sec1Focus && scrollTop < sec2Focus){
			$('.indicator li').eq(2).addClass('on');
		}else if(scrollTop >= sec2Focus){
			$('.indicator li').eq(3).addClass('on');
		}
		
		// top button
		if(scrollTop > footerPosTop){
			$('.btn_top').css('bottom', (scrollTop - footerPosTop) + 30 +'px');
		}else{
			$('.btn_top').css('bottom', '30px');
		}
	});

	// indicator
	$('.indicator li a').on('click', function(){
		var indiIdx = $(this).parent().index();
		if(indiIdx == 0){
			$('html, body').stop().animate({scrollTop : $(this.hash).offset().top}, 800);
		}else{
			$('html, body').stop().animate({scrollTop : $(this.hash).offset().top - headerH}, 800);
		}
		return false;
	});

	$('.btn_contact').on('click', function(){
		$(this).toggleClass('on');
		$('.pop_contact').toggleClass('on');
		if(!popStatue){
			popStatue = true;
			$('.dim').show();
			$('body').css('overflow','hidden');
		}else{
			popStatue = false;
			$('.dim').hide();
			$('body').css('overflow','');
		}
	});

	$('body').on('click', function(e){
		var target = e.target;
		var target2 = e.currentTarget;
		
		if(target == target2.querySelector('.dim')){
			popStatue =false;
			$('.dim').hide();
			$('body').css('overflow','');
			$('.pop_contact').removeClass('on');
			$('.btn_contact').removeClass('on');
		}
	});


	$(window).on('resize', function(){
		winHeight = $(window).height();
		winWidth = $(window).width();
		footerPosTop = $(document).height() - winHeight - $('footer').outerHeight();
		headerH = $('.header_wrap').outerHeight();
		mainOffsetTop = $('.main').offset().top;
		sec0OffsetTop = $('.sec0').offset().top;
		sec1OffsetTop = $('.sec1').offset().top;
		sec2OffsetTop = $('.sec2').offset().top;
		sec3OffsetTop = $('.sec3').offset().top;
	});


	if (userinfo.browser != "ie") {
		var introTxt = document.querySelectorAll('.main_intro .text');
		var halfX = window.innerWidth / 2;
		var halfY = window.innerHeight / 2;
	
		introTxt.forEach(function (el, i) {
			TweenMax.to(el, 1, { z: 1 * (i + 8) });
		});
	
		$(window).on('mousemove',function(e) {
			introTxt.forEach(function(el, i) {
				TweenMax.to(el, 0.5, {
				x: (e.clientX - halfX) * (i + 1) * 0.01,
				y: (e.clientY - halfY) * (i + 1) * 0.01 });
			});
		});
	}

	$('.btn_scroll').on('click', function(){
		sectionMove(1);
	});

	$('.btn_top').on('click', function(){
		sectionMove(0);
	});

	var sec2Swiper = new Swiper('.sec2 .swiper-container', {
		grabCursor: true,
		pagination: {
			el: '.sec2 .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		navigation: {
			nextEl: '.sec2 .swiper-button-next',
			prevEl: '.sec2 .swiper-button-prev',
		},
		on: {
			transitionStart: function () {
				$('.sec2 .slide_txt').removeClass("on");
	
				var activeData = $(".sec2 .swiper-slide-active").index();
	
				$('.sec2 .slide_txt').eq(activeData).addClass("on");
			},
		},
		breakpoints: {
			768: {
				slidesPerView: 1,
				spaceBetween: 0,
			}
		}
	});
});

