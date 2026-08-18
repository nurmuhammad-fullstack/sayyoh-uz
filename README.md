# SAYYOH.uz

O'zbekiston bo'ylab sayohatlar uyushtiruvchi tur agentligi uchun landing sahifa.
Sof HTML, CSS va kichik vanilla JS — hech qanday framework yoki build qadami yo'q.

## Tarkibi

| Fayl | Vazifasi |
| --- | --- |
| `index.html` | Sahifa tuzilishi va barcha bo'limlar |
| `style.css` | Dizayn, responsive layout va animatsiya uslublari |
| `script.js` | Scroll animatsiyasi va menyu holatini kuzatish |

## Bo'limlar

Navbar → hero → "Nega bizni tanlaydi" va statistika → mashhur yo'nalishlar →
tur paketlari → band qilish qadamlari → CTA va futer.

## Animatsiya

Har bir blok `IntersectionObserver` yordamida ekranga kirganda pastdan yuqoriga
suzib chiqadi. Kartalar ketma-ket kechikish bilan ochiladi, hero rasmi esa sekin
yaqinlashadi. `prefers-reduced-motion` yoqilgan bo'lsa animatsiyalar o'chadi.

## Ishga tushirish

Statik sayt — istalgan oddiy server yetarli:

```bash
python3 -m http.server 8080
```

So'ng brauzerda `http://localhost:8080` ni oching.

## Rasmlar

Hozircha namuna sifatida `picsum.photos` dan manzara suratlari ishlatilgan.
Haqiqiy suratlarni qo'yish uchun `index.html` dagi `<img src="...">` manzillarini
almashtirish kifoya.
