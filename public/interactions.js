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

function feeder(url, element) {
	const childrenNamed = (parent, name) =>
	Array.from(parent.children).filter((el) => el.localName === name);

	const childNamed = (parent, name) => childrenNamed(parent, name)[0] ?? null;

	const textOf = (parent, ...names) => {
		for (const name of names) {
			const el = childNamed(parent, name);
			if (el) return el.textContent.trim();
		}
		return '';
	};

	function parseFeed(xmlText) {
		const doc = new DOMParser().parseFromString(xmlText, 'application/xml');

		// DOMParser ne lève pas d'exception : il injecte un <parsererror>.
		const error = doc.querySelector('parsererror');
		if (error) throw new Error('XML invalide : ' + error.textContent.trim());

		const root = doc.documentElement;

		if (root.localName === 'feed') return parseAtom(root);          // Atom 1.0
		if (root.localName === 'rss') {
			const channel = childNamed(root, 'channel');
			if (channel) return parseRss(channel);                        // RSS 2.0
		}
		if (root.localName === 'RDF') {                                 // RSS 1.0
			const channel = childNamed(root, 'channel');
			if (channel) return parseRss(channel, childrenNamed(root, 'item'));
		}

		throw new Error('Format de flux non reconnu : <' + root.localName + '>');
	}

	function parseRss(channel, items = childrenNamed(channel, 'item')) {
		return {
			format: 'rss',
			title: textOf(channel, 'title'),
			link: textOf(channel, 'link'),
			description: textOf(channel, 'description'),
			items: items.map((item) => {
				const dateStr = textOf(item, 'pubDate', 'date');
				const enclosure = childNamed(item, 'enclosure');
				return {
					title: textOf(item, 'title'),
					link: textOf(item, 'link') || childNamed(item, 'guid')?.textContent.trim() || '',
					// encoded = <content:encoded>, souvent présent en plus de <description>
					summary: textOf(item, 'description', 'encoded'),
					author: textOf(item, 'creator', 'author'),
					id: textOf(item, 'guid') || textOf(item, 'link'),
					date: dateStr ? new Date(dateStr) : null,
					categories: childrenNamed(item, 'category').map((c) => c.textContent.trim()),
					enclosure: enclosure
						? { url: enclosure.getAttribute('url'), type: enclosure.getAttribute('type') }
						: null,
				};
			}),
		};
	}

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