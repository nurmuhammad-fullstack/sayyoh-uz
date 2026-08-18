// Har bir ".reveal" element ekranga kirganda animatsiya bilan chiqadi
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('in');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Sahifa yuqorisidagi hero matni darhol ko'rinsin
window.addEventListener('load', () => {
	document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
});

// ================= QIDIRUV =================
const input = document.getElementById('searchInput');
const box = document.getElementById('searchResults');

// Apostrof va katta-kichik harf farqini yo'qotamiz: "To'shkent" ~ "toshkent"
const norm = s => s.toLowerCase().replace(/['`'ʻ’]/g, '').replace(/\s+/g, ' ').trim();

// Ma'lumot bazasi sahifadagi kartalardan yig'iladi — alohida ro'yxat saqlanmaydi
const items = [...document.querySelectorAll('.card, .pack')].map((el, i) => {
	el.id = el.id || 'item-' + i;
	const title = el.querySelector('h3').textContent.trim();
	const sub = (el.querySelector('.meta span') || el.querySelector('.pack-body p')).textContent.trim();
	const place = el.querySelector('.place')?.textContent.trim() || '';
	return {
		el, title, place,
		sub: place || sub,
		price: el.querySelector('.price')?.textContent.trim() || '',
		img: el.querySelector('img').src,
		hay: norm([title, sub, place].join(' '))
	};
});

let active = -1;
let shown = [];

function highlight(text, query) {
	if (!query) return text;
	const at = norm(text).indexOf(query);
	if (at === -1) return text;
	return text.slice(0, at) + '<mark>' + text.slice(at, at + query.length) + '</mark>' + text.slice(at + query.length);
}

function render(query) {
	shown = query ? items.filter(it => it.hay.includes(query)) : items;
	active = -1;

	if (!shown.length) {
		box.innerHTML = '<p class="no-result">Hech narsa topilmadi</p>';
	} else {
		box.innerHTML = shown.map((it, i) => `
			<button type="button" class="result" role="option" data-i="${i}">
				<img src="${it.img}" alt="">
				<span class="result-text">
					<b>${highlight(it.title, query)}</b>
					<small>${it.sub}</small>
				</span>
				<span class="result-price">${it.price}</span>
			</button>`).join('');
	}

	box.hidden = false;
	input.setAttribute('aria-expanded', 'true');
}

function close() {
	box.hidden = true;
	input.setAttribute('aria-expanded', 'false');
	active = -1;
}

function open(i) {
	const item = shown[i];
	if (!item) return;

	close();
	input.blur();
	item.el.scrollIntoView({ behavior: 'smooth', block: 'center' });

	// Animatsiyani qayta ishga tushirish uchun avval olib tashlaymiz
	item.el.classList.remove('flash');
	void item.el.offsetWidth;
	item.el.classList.add('flash');
}

function move(step) {
	if (box.hidden || !shown.length) return;
	active = (active + step + shown.length) % shown.length;

	[...box.children].forEach((el, i) => el.classList.toggle('active', i === active));
	box.children[active]?.scrollIntoView({ block: 'nearest' });
}

input.addEventListener('input', () => render(norm(input.value)));
input.addEventListener('focus', () => render(norm(input.value)));

input.addEventListener('keydown', e => {
	if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
	else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
	else if (e.key === 'Escape') { close(); input.blur(); }
	else if (e.key === 'Enter') { e.preventDefault(); open(active === -1 ? 0 : active); }
});

box.addEventListener('mousedown', e => {
	const row = e.target.closest('.result');
	if (row) { e.preventDefault(); open(+row.dataset.i); }
});

document.addEventListener('click', e => {
	if (!e.target.closest('.search-wrap')) close();
});

// Scroll paytida faol menyu bandini belgilash
const sections = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];

window.addEventListener('scroll', () => {
	const pos = window.scrollY + window.innerHeight / 3;
	const current = sections.filter(s => s.offsetTop <= pos).pop();
	if (!current) return;

	links.forEach(link => {
		link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
	});
}, { passive: true });
