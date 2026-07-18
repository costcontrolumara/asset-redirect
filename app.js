// =====================================================
// KONFIGURASI API
// =====================================================

const API_URL =
"https://script.google.com/macros/s/AKfycbzWd7pEwjJY14EI4VWDFMoJrAlzdLl549iKR6jtnvqh3g0i9WffkYp07LXuIkACb5zLZA/exec";


// =====================================================
// TOMBOL LIHAT DATA INTERNAL
// =====================================================

const btnInternal = document.getElementById("btnInternal");

if (btnInternal) {

    btnInternal.addEventListener("click", function () {

        window.location.href = API_URL;

    });

}


// =====================================================
// AMBIL PARAMETER ID
// =====================================================

const params = new URLSearchParams(window.location.search);

const id = params.get("id");


// =====================================================
// CEK ID
// =====================================================

if (!id) {

    document.getElementById("nama").textContent =
        "ID Asset tidak ditemukan";

    throw new Error("ID kosong");

}


// =====================================================
// LOADING
// =====================================================

document.getElementById("nama").textContent =
    "Memuat data...";


// =====================================================
// REQUEST DATA
// =====================================================

fetch(`${API_URL}?id=${encodeURIComponent(id)}&api=1`)

.then(response => response.json())

.then(data => {

    if (!data) {

        document.getElementById("nama").textContent =
            "Asset tidak ditemukan";

        return;

    }

    console.log("Data Asset :", data);

    // =====================================================
    // FOTO
    // =====================================================

    const foto = document.getElementById("foto");

    if (data.linkPhoto && data.linkPhoto.trim() !== "") {

        foto.src = data.linkPhoto;

        foto.onerror = function () {

            this.src =
            "https://placehold.co/600x400?text=No+Image";

        };

    } else {

        foto.src =
        "https://placehold.co/600x400?text=No+Image";

    }

    // =====================================================
    // INFORMASI ASET
    // =====================================================

    document.getElementById("qr").textContent =
        data.nomorQR || "-";

    document.getElementById("nama").textContent =
        data.nama || "-";

    document.getElementById("kategori").textContent =
        data.kategori || "-";

    document.getElementById("jumlah").textContent =
        `${data.jumlah || "-"} ${data.satuan || ""}`;

    // =====================================================
    // SPESIFIKASI
    // =====================================================

    if(document.getElementById("merk"))
        document.getElementById("merk").textContent =
            data.merk || "-";

    if(document.getElementById("serialNumber"))
        document.getElementById("serialNumber").textContent =
            data.serialNumber || "-";

    if(document.getElementById("tahunPengadaan"))
        document.getElementById("tahunPengadaan").textContent =
            data.tahunPengadaan || "-";

    if(document.getElementById("pic"))
        document.getElementById("pic").textContent =
            data.pic || "-";

    if(document.getElementById("dimensi"))
        document.getElementById("dimensi").textContent =
            data.dimensi || "-";

    if(document.getElementById("warna"))
        document.getElementById("warna").textContent =
            data.warna || "-";

    // =====================================================
    // LOKASI
    // =====================================================

    document.getElementById("area").textContent =
        data.area || "-";

    document.getElementById("lokasi").textContent =
        data.lokasi || "-";

    // =====================================================
    // KONDISI
    // =====================================================

    document.getElementById("keadaan").textContent =
        data.keadaan || "-";

})

.catch(error => {

    console.error(error);

    document.getElementById("nama").textContent =
        "Terjadi Kesalahan";

});
