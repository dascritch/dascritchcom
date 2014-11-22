
(function(window,document,$) {
	"use strict";

	if (document.all) {
		// compatibilité MSIE 8 -, je garde car parfois, des clients sont taquins ou vraiment pas à jour
		var IEtristechose = ["section","nav","header","menu","article","aside","footer"];
		for (var i in IEtristechose) document.createElement(IEtristechose[i]);
	}


/*
	(function(i,s,o,g,r,a,m){
		i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)
		},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
*/
		// http://www.ignoredbydinosaurs.com/2014/09/deconstructing-the-google-analytics-tag
		var a, m;
        window['GoogleAnalyticsObject'] = 'ga';
        window['ga'] = window['ga'] || function() {
                (window['ga'].q = window['ga'].q || []).push(arguments)
        }, window['ga'].l = 1 * new Date();
        a = document.createElement('script'),
        m = document.getElementsByTagName('script')[0];
        a.async = 1;
        a.src = '//www.google-analytics.com/analytics.js';
        m.parentNode.insertBefore(a, m)

	ga('create', 'UA-81365-6', 'auto');
	ga('send', 'pageview');


	var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";

	function rebase(link) {
		return (link[0]==='/' ? 'http://dascritch.net/' : '') + link ;
	}

	$(function(){

		// obfuscation contre les malandrins . Évidemment, cela n'est pas accessible si javascript n'est pas là :(
		document.getElementById('s2').innerHTML = '@';
		document.getElementById('a0').href = 'mail'+'to:'+$('h2').eq(0).text().trim()+'?subject=J\'ai vu votre site professionnel';

		$.ajax({
			type: "GET",
			url:'./data/listing.json',
			dataType: 'json',
			error: function(){
				console.error('Unable to load feed');
			},
			success: function(values){
				var $blog = $('#blog');
				$blog.find('article[id!="plussurleblog"]').remove();
				var $plussurleblog = $('#plussurleblog');
				for(var index in values) {
					if (values.hasOwnProperty(index)) {
						var article = values[index];
						$plussurleblog.before(
							'<article>'
								+'<a class="bloc" href="'+rebase(article.url)+'">'
									+'<img alt="" src="'+rebase(article.img)+'" class="right" />'
									+'<h3>'+article.title+'</h3>'
									+'<p>'+article.intro+'</p>'
								+'</a>'
							+'</article>'
							);
					}
				}
			}
		});

		$(document).on('keydown',function(e) {
			// pour faire vite, http://css-tricks.com/snippets/jquery/konomi-code/
			kkeys.push( e.keyCode );
			if ( kkeys.toString().indexOf( konami ) >= 0 ) {
				// do something awesome
				kkeys = [];
				document.body.id='konami';
			}
		});

		var $carte = $('#carte');
		// cela doit être faisable en css pur, à méditer
		$carte.on('mouseenter focus','a',function() {
			$carte.find('span').css('opacity',0.3);
			$carte.find('span.'+this.className).css('opacity',1);
		}).on('mouseleave blur','a',function() {
			$carte.find('span').css('opacity',1);
		});

	});

})(window,document,jQuery);