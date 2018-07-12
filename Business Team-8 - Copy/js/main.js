(function ($, window, document) {
	'use strict';
	$(function () {
		var $navBtn = $('.navigation .nav-btn'),
			$navMenu = $('.navigation .nav-menu');
//			clicked = false;

		$(window).on('resize', function () {
			if( $(window).width() >= 975 ) {
				$('.slider-container .caption-head').css({
					fontSize: '53px'
				});
				$('.slider-container .special-head').css({
					fontSize: '50px'
				});
			}
		});

		$(window).on('scroll', function () {
			if( $(this).scrollTop() > 220 ) {
				$('.sticky').removeClass('hidden');
				$('.sticky').addClass('navbar-fixed-top');
				$('.sticky').slideDown(300);
			} else {
				$('.sticky').slideUp();
				$('.sticky').addClass('hidden');
				$('.sticky').removeClass('navbar-fixed-top');
			}
		});

		// mobile toggle nav
		$navBtn.on('click', function () {
			$(this).toggleClass('active');
			setTimeout(function () {
				$navMenu.toggleClass('active');
			}, 200);
		});


//		/* close navbar when click out of nav length */
//		$(document).on('click', function (e) {
//			var $clickOver = $(e.target);
//			if (!clicked) {
//				clicked = true;
//				if(!$clickOver.closest('.nav-menu-content').length && $navMenu.hasClass('active')) {
//					$navBtn.removeClass('active');
//					$navMenu.removeClass('active');
//				console.log('document clicked');
//				}
//				setTimeout(function () {
//					clicked = false;
//				}, 50);
//			}
//		});


		/* Smooth Scroll to div */
		$('header .slider-container .scroll-down').click(function () {
			$('html, body').animate({
				scrollTop: $('#about').offset().top
			}, 1000);
		});


		/* on scroll team progress bar */

		var windowHeight = $(window).height();
		var contentOffset = $('.our-team').offset().top;
		var contentScrollHeight = $('.our-team').prop('scrollHeight') - windowHeight;


		$(window).on('scroll resize', function() {

			if( $(window).scrollTop() >= contentOffset - 50 ) {
				$('.our-team .team-nav').addClass('fixed-team-nav');
				$('.our-team .progress').css({display: 'inline-block'});
				var progress = $(window).scrollTop() - 5100;
				var result = 100 / contentScrollHeight;
				$(".our-team .progress-bar").css( {'height': progress * result + "%"} );

			} else {
				$('.our-team .progress').css({display: 'none'});
				$('.our-team .team-nav').removeClass('fixed-team-nav');
				$('.our-team .team-nav').addClass('top');
			}

			if( $(window).scrollTop() < contentOffset ) {
				$(".our-team .progress-bar").css( 'height', "0%" );
			}
			else if ( $(window).scrollTop() > 7230 ) {
				$(".our-team .progress-bar").css( 'height', "100%" );
				$('.our-team .progress').css({display: 'none'});
				$('.our-team .team-nav').removeClass('fixed-team-nav');
				$('.our-team .team-nav').removeClass('top');
				$('.our-team .team-nav').addClass('bottom');
			}

		});


		/*$(window).on('load scroll resize', function() {
			if($(window).scrollTop() > 4930) {
				var docHeight = $(document).height(),
					windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					windowPos = $(window).scrollTop();
				var completion = windowPos/(docHeight-windowHeight);

				if(docHeight <= windowHeight) {
					$(".our-team .progress-bar").height(windowHeight);
				} else {
					$(".our-team .progress-bar").height(completion * windowHeight);
				}
			}

		});*/

		/*$(window).scroll(function() {
			if($(window).scrollTop() > 4930) {
				$(".our-team .progress").show();
			} else {
				$(".our-team .progress").hide();
			}

				var wintop = $(window).scrollTop(),
					docheight = $('article').height(),
					winheight = $(window).height();
				console.log('window top: ' + wintop);
				var totalScroll = (wintop/(docheight-winheight))*100;
//				console.log("total scroll" + totalScroll);
				$(".our-team .progress-bar").css("height",totalScroll + "%");
//			else {
//				$(".progress-bar").css("height","0%");
//			}
		});*/

		// word rotate custom plugin
		$.fn.wordRotatePlugin = function () {

			var words = document.getElementsByClassName('word');
			var wordArray = [];
			var currentWord = 0;

			words[currentWord].style.backgroundColor = "#337ab7";
			words[currentWord].style.opacity = 1;

			for (var i = 0; i < words.length; i++) {
				splitLetters(words[i]);
			}

			function changeWord() {
				var cw = wordArray[currentWord];
				var nw = currentWord == words.length-1 ? wordArray[0] : wordArray[currentWord+1];
				for (var i = 0; i < cw.length; i++) {
					animateLetterOut(cw, i);
				}

				for (var i = 0; i < nw.length; i++) {
					nw[i].className = 'letter behind';
					nw[0].parentElement.style.opacity = 1;
					animateLetterIn(nw, i);
				}

				currentWord = (currentWord == wordArray.length-1) ? 0 : currentWord+1;
				words[currentWord].style.color = "#fff";
			}

			function animateLetterOut(cw, i) {
				setTimeout(function() {
					cw[i].className = 'letter out';
				}, i*80);
			}

			function animateLetterIn(nw, i) {
				setTimeout(function() {
					nw[i].className = 'letter in';
				}, 340+(i*80));
			}

			function splitLetters(word) {
				var content = word.innerHTML;
				word.innerHTML = '';
				var letters = [];

				for (var i = 0; i < content.length; i++) {
					var letter = document.createElement('span');
					letter.className = 'letter';
					letter.innerHTML = content.charAt(i);
					word.appendChild(letter);
					letters.push(letter);
				}

				wordArray.push(letters);
			}

			words[currentWord].style.color = "#fff";
			changeWord();
			setInterval(changeWord, 4000);

		}
		$('.about-us .title-head').wordRotatePlugin();

	});
}(window.jQuery, window, document));