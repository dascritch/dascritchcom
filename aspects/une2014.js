(function(document,$) {
	"use strict";

	if (document.all) {
		// compatibilité MSIE 8 -, je garde car parfois, des clients sont taquins ou vraiment pas à jour
	    var IEtristechose = ["section","header","article","aside","footer"];
	    for (var i in IEtristechose) document.createElement(IEtristechose[i]);
	}

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-81365-6']);
	_gaq.push(['_trackPageview']);
	var ga = document.createElement('script'); 
	ga.type = 'text/javascript'; 
	ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(ga, s);

	$(function(){
		// obfuscation contre les malandrins . Évidemment, cela n'est pas accessible si javascript n'est pas là :(
		document.getElementById('s2').innerHTML = '@';
		document.getElementById('a4').href = 'mail'+'to:'+$('h2').text()+'?subject=J\'ai vu votre site professionnel';

		var $carte = $('#carte');
		// cela doit être faisable en css pur, à méditer
		$carte.on('mouseenter focus','a',function() {
			$carte.find('span').css('opacity',0.3);
			$carte.find('span.'+this.className).css('opacity',1);
		}).on('mouseleave blur','a',function() {
			$carte.find('span').css('opacity',1);
		});


/*		$(document).on('click','a[href*=#]',function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var hash = this.hash;
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000, function() {
						document.location = hash;
					});
					return false;
				}
			}
		});
*/
/*
		window.onhashchange = function() {
			var hash = document.location.hash;
			var $hash = $(hash);
			var hashtop =  $hash.length == ? $hash.offset().top : 0;
			console.log('hash TODO ',hash, document.body.style.scrollTop);
		};


		$(document).on('scroll',function(){
			console.log('scroll TODO');
		});
*/

	});

})(document,$);