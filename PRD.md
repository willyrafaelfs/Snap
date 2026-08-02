🎯 Ringkasan Eksekutif
SnapVerse adalah aplikasi web photobooth modern yang menggabungkan pengambilan gambar real-time dengan filter kreatif, stiker interaktif, dan animasi yang memukau. Cocok untuk acara, gathering, atau sekadar seru-seruan bersama teman.

🥅 Tujuan Produk
Memberikan pengalaman photobooth digital yang menyenangkan dan mudah diakses via browser.

Mendorong kreativitas pengguna dengan berbagai filter, efek, dan properti virtual.

Memfasilitasi berbagi hasil foto secara instan ke media sosial.

Menyediakan experience layaknya photobooth fisik dengan countdown, burst mode, dan layout kolase.

👤 Target Pengguna
Individu/Pribadi: Pengguna biasa yang ingin selfie atau foto bersama teman dengan efek lucu.

Event Organizer: Membutuhkan instalasi photobooth yang bisa di-customize untuk acara (wedding, ulang tahun, gathering kantor).

Kreator Konten: Ingin menghasilkan foto unik dengan cepat untuk feed media sosial.

⚙️ Kebutuhan Fungsional (Functional Requirements)
ID	Fitur	Deskripsi	Prioritas
F01	Kamera Real-time	Mengakses webcam pengguna dengan permintaan izin yang halus.	Harus (Must)
F02	Mode Foto	Ambil foto tunggal, burst (3/4 foto berturut-turut), atau timer (3/5/10 detik).	Harus (Must)
F03	Filter Warna	Pilihan filter: Vintage, Black & White, Sepia, Cool Tone, Warm Glow, No Filter. Pratinjau langsung.	Harus (Must)
F04	Stiker & Properti Virtual	Overlay gambar PNG transparan (kacamata, topi, kumis, mahkota, dll). Dapat di-drag, resize, dan rotate. Face tracking opsional.	Harus (Must)
F05	Frame & Layout	Pilihan bingkai foto (polaroid, film, digital) dan layout kolase (single, 2-grid, 4-grid).	Harus (Must)
F06	Galeri Hasil	Menyimpan dan menampilkan hasil foto dalam sesi. Bisa di-download satu per satu atau sekaligus.	Harus (Must)
F07	Berbagi (Sharing)	Tombol share ke WhatsApp, Instagram Story, Twitter, atau download langsung.	Harus (Must)
F08	Countdown Animasi	Tampilan hitung mundur lucu (3... 2... 1... POSE!) sebelum foto burst/timer.	Harus (Must)
F09	Flash Screen	Layar berkedip putih saat pengambilan gambar untuk mensimulasikan blitz.	Harus (Must)
F10	Suara Efek (SFX)	Suara shutter kamera, countdown beep, dan cheers setelah selesai. User bisa mute/unmute.	Harus (Must)
F11	Custom Branding	Parameter URL untuk custom logo, teks judul, dan palet warna acara.	Sebaiknya ada (Should)
F12	Green Screen (Background)	Ganti latar belakang real-time menggunakan teknik chroma key sederhana (warna solid) atau virtual background.	Boleh ada (Could)
F13	QR Code Session	Tampilkan QR code yang bisa di-scan untuk download semua foto dalam sesi.	Boleh ada (Could)
📱 Kebutuhan Non-Fungsional
Performa: FPS kamera stabil minimal 24fps di perangkat mid-range.

Responsivitas: UI adaptif untuk layar landscape (tablet/photobooth monitor) dan potret (smartphone).

Privasi: Semua foto diproses secara lokal di browser (client-side), tidak ada yang diunggah ke server tanpa izin eksplisit.

Kompatibilitas: Browser modern berbasis Chromium, Safari, Firefox terbaru.