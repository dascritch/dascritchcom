"use strict";

(function(document,$) {

	if (document.all) {
		// compatibilité MSIE 8 -, je garde car parfois, des clients sont taquins ou vraiment pas à jour
	    var IEtristechose = ["section","nav","header","article","aside","footer"];
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
        $.ajax({
        	type: "GET",
        	url:'./data/webdev.html',
        	dataType: 'html',
        	error: function(){
            	alert('Unable to load feed, Incorrect path or invalid feed');
        	},
        	success: function(xml){
            	values = xml;
            	console.log(values);
        	}
    	});
    	*/


	$(function(){

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

	});

})(document,$);