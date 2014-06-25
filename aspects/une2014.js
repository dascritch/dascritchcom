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
/*
	var heights;
	var previous_active ='';
*/
	$(function(){
		/*
		var $menu = $('#menu');

		function movin() {
			var courtoisie_offset = 0;
		    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
		    var windowHeight = $(window).height(); // get the height of the window
		    var docHeight = $(document).height();
		    var found = '#';
		    for (var id in heights) {
		        if ((windowPos+courtoisie_offset) > heights[id] )  {
		            found = id;
		        }
		    }
		    if (previous_active !== found) {
		    	$menu.find('a').removeClass('active');
		    	$menu.find('a[href="'+found+'"]').addClass('active');
			}
			previous_active = found;
		}

		function recalc_heights() {
			heights = {};
			$menu.find('a').each(function(){
				var href = '#'+this.href.split('#')[1];
				heights[href] =  href==='#' ? 0 : $(href).offset().top;
			});
			movin();
		}
*/
		// obfuscation contre les malandrins . Évidemment, cela n'est pas accessible si javascript n'est pas là :(
		document.getElementById('s2').innerHTML = '@';
		document.getElementById('a0').href = 'mail'+'to:'+$('h2').text()+'?subject=J\'ai vu votre site professionnel';

		var $carte = $('#carte');
		// cela doit être faisable en css pur, à méditer
		$carte.on('mouseenter focus','a',function() {
			$carte.find('span').css('opacity',0.3);
			$carte.find('span.'+this.className).css('opacity',1);
		}).on('mouseleave blur','a',function() {
			$carte.find('span').css('opacity',1);
		});

		/*recalc_heights();
		$(window).on('resize',recalc_heights);
		$(window).on('scroll hashchange',movin);
		*/
	});

})(document,$);