if (document.all)
{
    var IEtristechose = ["section","header","article","aside","footer"];
    for (var i in IEtristechose) document.createElement(IEtristechose[i]);
}

$(function(){
	$('#s2').html('@');
	$('#a4').attr('href','mail'+'to:'+$('h2').text()+'?subject=J\'ai vu votre site professionnel');
	$('a','#carte').hover(function()
	{
		$('span','#carte').css('opacity',0.3);
        $('span.'+this.className,'#carte').css('opacity',1);
	});
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-81365-6']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();