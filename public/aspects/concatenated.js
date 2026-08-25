'use strict';

(function(window, document) {

	let kkeys = [];
	const konami = '38,38,40,40,37,39,37,39,66,65';
	let carte_element ;

	function rebase(link) {
		return (link[0]==='/' ? 'https://dascritch.net' : '') + link ;
	}

	function demail() {
		// obfuscation contre les malandrins . Évidemment, cela n'est pas accessible si javascript n'est pas là :(
		document.getElementById('s2').innerHTML = '@';
		let t = 'liam';
		const m = 'to:';
		t = t.split('').reverse().join('');
		document.getElementById('a0').href = `${t}${m}${document.querySelector('h2').innerText.trim()}?subject=J'ai vu votre site professionnel`;
	}

	function is_konamee(event) {
		// pour faire vite, http://css-tricks.com/snippets/jquery/konomi-code/
		kkeys.push( event.keyCode );
		if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			// do something awesome
			kkeys = [];
			document.body.id='konami';
		}
	}

	function reveal({target}) {
		for (let span of carte_element.querySelectorAll('span')) {
			span.style.opacity = span.classList.contains(target.className) ? 1 : 0.3;
		}
	}

	function blur({target}) {
		for (let span of carte_element.querySelectorAll('span')) {
			span.style.opacity = 1;
		}
	}

	function card() {
		carte_element = document.getElementById('carte');
		for (let a_element of carte_element.querySelectorAll('a')) {
			a_element.addEventListener('mouseenter', reveal);
			a_element.addEventListener('focus', reveal);
			a_element.addEventListener('mouseleave', blur);
			a_element.addEventListener('blur', blur);
		}		
	}

	function from_blog() {
		const blog_element = document.getElementById('blog');
		const plussurleblog_element = document.getElementById('plussurleblog');
		const contenant_element = plussurleblog_element.parentNode;
		const req_listing = new Request('./data/listing.json');

		fetch(req_listing)
			.then((response) => response.json())
			.then((data) => {
				for (let entry of blog_element.querySelectorAll('article:not(#plussurleblog)')) {
					entry.remove();
				}
				for (const entry of Object.values(data)) {
					const article = document.createElement('article');
					article.innerHTML = `<a class="bloc" href="'${rebase(entry.url)}"><img alt="" src="${rebase(entry.img)}" class="right" loading="lazy" /><h3>${entry.title}</h3><p>${entry.intro}</p></a>`;
					contenant_element.insertBefore(article, plussurleblog_element);
				}
			})
			.catch(console.error);
	}

	function main() {
		demail();
		card();
		from_blog();
		document.addEventListener('keydown', is_konamee);
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener('DOMContentLoaded', main);
	} else {
		// document may already be loaded and DOMContentLoaded fired.
		main();
	}

}(window, document));
