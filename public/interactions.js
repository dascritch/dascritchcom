'use strict';

function demail() {
	// obfuscation contre les malandrins . Évidemment, cela n'est pas accessible si javascript n'est pas là :(
	document.getElementById('s2').innerHTML = '@';
	let t = 'liam';
	const m = 'to:';
	t = t.split('').reverse().join('');
	document.getElementById('a0').href = `${t}${m}${document.querySelector('h2').innerText.trim()}?subject=J'ai vu votre site professionnel`;
}

function card() {
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

	const carte_element = document.getElementById('carte');
	for (let a_element of carte_element.querySelectorAll('a')) {
		a_element.addEventListener('mouseenter', reveal);
		a_element.addEventListener('focus', reveal);
		a_element.addEventListener('mouseleave', blur);
		a_element.addEventListener('blur', blur);
	}		
}

function datasheets() {
	const sections = document.querySelectorAll('[data-sheet]');
	const codeEl = document.getElementById('tb-code');
	const titleEl = document.getElementById('tb-title');
	const io = new IntersectionObserver(entries => {
		entries.forEach(element => {
			if (element.isIntersecting && element.intersectionRatio > 0.5) {
				codeEl.textContent = element.target.dataset.sheet;
				titleEl.textContent = element.target.dataset.title;
			}
		});
	}, { threshold: [0.5] });
	sections.forEach(s => io.observe(s));
}


function main() {
	demail();
	datasheets();
	card();
}

if ( document.readyState === 'loading' ) {
	document.addEventListener('DOMContentLoaded', main);
} else {
	// document may already be loaded and DOMContentLoaded fired.
	main();
}