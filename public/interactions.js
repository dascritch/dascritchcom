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

async function feeder(url, element) {

	async function fetch_feed(url, { proxy = null, signal, timeout = 10000 } = {}) {
		const target = proxy ? proxy + encodeURIComponent(url) : url;

		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), timeout);
		signal?.addEventListener('abort', () => controller.abort(), { once: true });

		try {
			const response = await fetch(target, {
				signal: controller.signal,
				headers: { Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml' },
			});
			if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
			return parseFeed(await response.text());
		} finally {
			clearTimeout(timer);
		}
	}

	const children_named = (parent, name) => Array.from(parent.children).filter((el) => el.localName === name);

	function child_named(parent, name) {
		return children_named(parent, name)[0] ?? null;
	}

	function text_of(parent, ...names) {
		for (const name of names) {
			const el = child_named(parent, name);
			if (el) {
				return el.textContent.trim();
			}
		}
		return '';
	};

	function parse_feed(xml_string) {
		const doc = new DOMParser().parseFromString(xml_string, 'application/xml');

		// DOMParser ne lève pas d'exception : il injecte un <parsererror>.
		const error = doc.querySelector('parsererror');
		if (error) {
			throw new Error('XML invalide : ' + error.textContent.trim());
		} 

		const root = doc.documentElement;

		if (root.localName === 'rss') {
			const channel = child_named(root, 'channel');
			if (channel) return parse_rss(channel);                        // RSS 2.0
		}
		if (root.localName === 'RDF') {                                 // RSS 1.0
			const channel = child_named(root, 'channel');
			if (channel) return parse_rss(channel, children_named(root, 'item'));
		}

		throw new Error('Format de flux non reconnu : <' + root.localName + '>');
	}

	function parse_rss(channel, items = children_named(channel, 'item')) {
		return {
			format: 'rss',
			title: text_of(channel, 'title'),
			link: text_of(channel, 'link'),
			description: text_of(channel, 'description'),
			items: items.map((item) => {
				const dateStr = text_of(item, 'pubDate', 'date');
				const enclosure = child_named(item, 'enclosure');
				return {
					title: text_of(item, 'title'),
					link: text_of(item, 'link') || child_named(item, 'guid')?.textContent.trim() || '',
					// encoded = <content:encoded>, souvent présent en plus de <description>
					summary: text_of(item, 'description', 'encoded'),
					author: text_of(item, 'creator', 'author'),
					id: text_of(item, 'guid') || text_of(item, 'link'),
					date: dateStr ? new Date(dateStr) : null,
					categories: children_named(item, 'category').map((c) => c.textContent.trim()),
					enclosure: enclosure
						? { url: enclosure.getAttribute('url'), type: enclosure.getAttribute('type') }
						: null,
				};
			}),
		};
	}

	let promised = fetch_feed(url);
	if (promised) {
		promised.then( e => console.log(e));
	}
}

function main() {
	demail();
	datasheets();
	card();
	feeder('https://dascritch.net/feed/category/Webdev/rss2', document.querySelector('#publications ul'))
}

if ( document.readyState === 'loading' ) {
	document.addEventListener('DOMContentLoaded', main);
} else {
	// document may already be loaded and DOMContentLoaded fired.
	main();
}