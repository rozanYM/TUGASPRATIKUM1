// ==========================================
// 1. INISIALISASI ELEMEN (PENGAMBILAN DATA DOM)
// ==========================================

// Mengambil elemen form utama untuk mendeteksi event submit (pengiriman pesan)
const formKontak = document.getElementById('form-kontak');

// Mengambil elemen container untuk menampung daftar pesan masuk di bagian Inbox
const inboxList = document.getElementById('inbox-list');

// Mengambil elemen input nama pengirim (digunakan untuk Tantangan 2)
const inputNama = document.getElementById('sender-name');

// Mengambil elemen <span> di bagian Hero untuk menampilkan nama secara dinamis
const displayNamaHero = document.getElementById('nama-pemilikkita');

// ============================================================
// 2. TANTANGAN 2: DINAMISASI PROFIL (REAL-TIME DATA BINDING)
// ============================================================

/**
 * Event 'input' mendeteksi setiap ketikan user di kotak "Nama Pengirim".
 * Nama di bagian Hero akan berubah secara otomatis saat user mengetik.
 */
inputNama.addEventListener('input', function() {
    // Memperbarui teks di Hero dengan nilai dari input secara real-time
    displayNamaHero.innerText = inputNama.value;

    // Logika pengaman: Jika kotak input dikosongkan, teks kembali ke default
    if (inputNama.value === "") {
        displayNamaHero.innerText = "Mahasiswa TI";
    }
});

// ============================================================
// 3. TANTANGAN 1 & 3: VALIDASI & PERSONALISASI (SUBMIT FORM)
// ============================================================

/**
 * Menjalankan seluruh logika pengiriman pesan ketika tombol submit diklik
 */
formKontak.addEventListener('submit', function(e) {
    
    // Mencegah browser melakukan refresh halaman otomatis agar data inbox tidak hilang
    e.preventDefault();

    // --- PENGAMBILAN DATA DARI FORM ---
    const namaFix = inputNama.value; 
    const subjek = document.getElementById('subjectdata').value;
    const pesan = document.getElementById('message').value;

    // --- LOGIKA VALIDASI (TANTANGAN 1) ---
    // Mengecek apakah pesan kurang dari 10 karakter
    if (pesan.length < 10) {
        // Tampilkan peringatan jika syarat minimal karakter belum terpenuhi
        alert("Pesan terlalu pendek! Minimal harus 10 karakter agar bisa dikirim.");
        
        // Return digunakan untuk menghentikan program di sini agar tidak masuk ke inbox
        return;
    }

    // --- MANIPULASI TAMPILAN INBOX ---
    
    // Cari elemen teks "Belum ada pesan"
    const emptyMsg = document.querySelector('.empty-msg');
    
    // Jika masih ada teks "Belum ada pesan", hapus elemen tersebut
    if (emptyMsg) {
        emptyMsg.remove();
    }

    // --- PEMBUATAN ELEMEN PESAN SECARA DINAMIS ---
    const itemPesan = document.createElement('div');
    
    // Memberikan class dasar .msg-item untuk gaya visual kartu
    itemPesan.classList.add('msg-item');

    // --- TANTANGAN 3: PERSONALISASI WARNA BERDASARKAN SUBJEK ---
    // Logika pemilihan warna kartu menggunakan class CSS berdasarkan nilai subjek
    if (subjek === "Tawaran Proyek") {
        itemPesan.classList.add('bg-proyek'); // Memberikan warna hijau
    } else if (subjek === "Kolaborasi") {
        itemPesan.classList.add('bg-kolaborasi'); // Memberikan warna oranye
    } else if (subjek === "Tanya-Jawab") {
        itemPesan.classList.add('bg-tanya'); // Memberikan warna biru
    }

    // Menyusun struktur konten kartu pesan menggunakan Template Literals
    itemPesan.innerHTML = `
        <h4>${namaFix}</h4>
        <small>Perihal: <strong>${subjek}</strong></small>
        <p>${pesan}</p>
    `;

    // --- OUTPUT KE LAYAR ---
    // Memasukkan pesan baru ke urutan paling atas di dalam daftar inbox
    inboxList.prepend(itemPesan);

    // Mengosongkan form kembali setelah proses selesai
    formKontak.reset();

    // Mengembalikan teks Hero ke default setelah form di-reset
    displayNamaHero.innerText = "Mahasiswa TI";

    // Notifikasi sukses kepada user
    alert("Berhasil! Pesan Anda telah ditambahkan ke Inbox dengan warna kategori.");
});