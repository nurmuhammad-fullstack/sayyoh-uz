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
