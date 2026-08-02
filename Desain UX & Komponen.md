🖼️ Wireframe Konseptual
Antarmuka didesain Immersive Fullscreen, membagi area menjadi:

text
┌────────────────────────────────────────────────┐
│  [Logo]          SNAPVERSE        [Sound] [⚙️] │  ← Navbar Transparan
├─────────────────────┬──────────────────────────┤
│                     │  [Filter] [Stiker] [Bingkai]│  ← Toolbar Vertikal
│                     │                          │
│   📷 AREA KAMERA    │   🖼️ PREVIEW             │
│   (Live Feed)       │   (Hasil/Galeri          │
│   + Stiker Drag     │    Mini)                 │
│   + Overlay Frame   │                          │
│                     │                          │
│                     │                          │
├─────────────────────┴──────────────────────────┤
│ [🎞️ Gallery] [🎨 Layout]   [ ⏺️ BURST ] [ ⏱️ Timer ] │  ← Bottom Action Bar
└────────────────────────────────────────────────┘
🎨 Komponen Utama
CameraViewfinder
Deskripsi: Layar penuh yang menampilkan streaming video langsung.

Sub-Komponen:

VideoFeed: Elemen video HTML yang menangkap MediaStream.

PoseGuide: Overlay siluet (opsional) untuk membantu pengguna berpose.

FlashOverlay: Div putih yang muncul singkat (animation: flash 0.3s) saat foto diambil.

CountdownOverlay: Angka besar dengan animasi scale dan fade (3... 2... 1...).

StickerCanvas
Deskripsi: Lapisan transparan di atas video, dibuat dengan library canvas interaktif.

Interaksi:

Drag: Sentuh/klik + geser untuk memindahkan stiker.

Pinch/Zoom: Multi-touch untuk memperbesar stiker, atau slider di toolbar.

Rotate: Gesture dua jari memutar.

Delete: Drag stiker ke area "🗑️" di pojok.

Properti: { id, src, x, y, width, height, rotation }

FilterCarousel
Deskripsi: Deretan tombol filter horizontal di sisi kanan/kiri.

Komponen:

FilterThumbnail: Canvas kecil yang menunjukkan pratinjau video dengan filter aktif.

Animasi slide saat berpindah pilihan. CSS: scroll-snap-type: x mandatory.

FrameSelector
Deskripsi: Memilih bingkai dekoratif.

Tipe:

Polaroid: Margin bawah tebal, bayangan halus.

Film Strip: Bingkai bergerigi di sisi atas/bawah.

Digital Rounded: Sudut membulat + glowing border berwarna.

Kustomisasi: Warna bingkai bisa diubah (putih, hitam, pink, emas).

GalleryDrawer
Deskripsi: Laci yang bisa ditarik dari bawah (bottom sheet) menampilkan strip foto.

Animasi: transform: translateY(100%) → 0% dengan pegas.

Aksi: Tap foto untuk melihat pratinjau besar. Long press untuk pilih banyak & download batch.

ActionButton (Tombol Ambil Gambar)
Desain: Lingkaran besar dengan efek gelombang (ripple pulse).

Animasi:

Idle: Skala 1, border 2px solid white, box-shadow berdenyut.

Pressed: Skala 0.95, rotasi ringan, inner circle memadat.

Fungsi: Mode single → langsung tangkap. Mode burst → panggil countdown.

