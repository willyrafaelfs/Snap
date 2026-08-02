🌊 Daftar Animasi CSS/JS
Nama Animasi	Trigger	Deskripsi Teknis
Shutter Snap	Saat foto diambil	FlashOverlay: opacity 1 ke 0 dalam 400ms. VideoFeed: filter brightness(0) ke brightness(1) 200ms.
Countdown Pop	Timer 3-2-1	Angka scale(0) -> scale(1.2) -> scale(1) tiap detik, menggunakan cubic-bezier(0.68, -0.55, 0.27, 1.55). Disertai suara "beep".
Sticker Bounce-In	Stiker ditambahkan	@keyframes bounceIn: scale 0→1.1→0.9→1, durasi 0.6s.
Gallery Sheet Slide	Buka galeri	transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), backdrop blur.
Ripple Pulse	Tombol kamera idle	box-shadow: 0 0 0 0 rgba(255,255,255,0.7) → 0 0 0 15px rgba(255,255,255,0) siklus 2s tak terbatas.
Drag Haptic Feedback	Stiker diangkat	(JS) Skala stiker naik ke 1.1 dengan transisi spring, berbayang drop-shadow.
Celebration Confetti	Sesi burst selesai	Canvas particle system: emoji 🎉 atau partikel warna-warni meluncur turun selama 2 detik.
Filter Transition	Ganti filter	Pratinjau video: transition: filter 0.3s ease.
🔊 Desain Suara (SFX)
Countdown Beep: Nada pendek tinggi, AudioContext oscillator square wave, makin cepat di detik terakhir.

Shutter Click: File audio singkat (0.2 detik) suara rana kamera mekanik.

Success Chime: Melodi kecil saat foto masuk galeri, opsional upload sound custom event.