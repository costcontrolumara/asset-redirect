// =========================
// KONFIGURASI API
// =========================
const API_URL = "https://script.google.com/macros/s/AKfycbzWd7pEwjJY14EI4VWDFMoJrAlzdLl549iKR6jtnvqh3g0i9WffkYp07LXuIkACb5zLZA/exec";

// =========================
// AMBIL PARAMETER ID
// =========================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Helper function untuk update teks dengan aman (menghindari error null)
const setElText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
};

// =========================
// CEK ID
// =========================
if (!id) {
    setElText("nama", "ID Aset tidak ditemukan di URL");
    console.error("Proses dihentikan: Parameter ID kosong.");
} else {
    // =========================
    // LOADING
    // =========================
    setElText("nama", "Memuat data...");

    // =========================
    // REQUEST DATA
    // =========================
    fetch(`${API_URL}?id=${encodeURIComponent(id)}&api=1`)
    .then(async response => {
        // Cek apakah HTTP request sukses (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        // Cek apakah responsnya benar-benar teks/JSON (bukan halaman HTML Error Google)
        const textResponse = await response.text();
        try {
            return JSON.parse(textResponse);
        } catch (e) {
            throw new Error("Respons dari server bukan JSON yang valid. Cek akses Google Apps Script.");
        }
    })
    .then(data => {
        if (!data || data.error) {
            setElText("nama", "Aset tidak ditemukan atau data kosong");
            console.warn("Data kosong atau server mengembalikan error:", data);
            return;
        }

        console.log("Data berhasil dimuat:", data);

        // =========================
        // FOTO
        // =========================
        const foto = document.getElementById("foto");
        if (foto) {
            if (data.linkPhoto && data.linkPhoto.trim() !== "") {
                foto.src = data.linkPhoto;
                foto.onerror = function () {
                    console.warn("Gagal memuat gambar dari URL:", data.linkPhoto);
                    this.src = "https://placehold.co/600x400?text=No+Image";
                };
            } else {
                foto.src = "https://placehold.co/600x400?text=No+Image";
            }
        }

        // =========================
        // DATA
        // =========================
        setElText("qr", data.nomorQR || "-");
        setElText("nama", data.nama || "Tanpa Nama");
        setElText("kategori", data.kategori || "-");
        
        // Tangani jumlah dan satuan dengan rapi
        const jumlahTxt = data.jumlah ? `${data.jumlah} ${data.satuan || ""}`.trim() : "-";
        setElText("jumlah", jumlahTxt);
        
        setElText("area", data.area || "-");
        setElText("lokasi", data.lokasi || "-");
        setElText("keadaan", data.keadaan || "-");
    })
    .catch(error => {
        // Tampilkan pesan error ke console untuk debugging
        console.error("Terjadi Kesalahan Fetch:", error.message);
        
        // Beri tahu user di UI bahwa terjadi masalah
        setElText("nama", "Terjadi Kesalahan Jaringan/Server");
    });
}
