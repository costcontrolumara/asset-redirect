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
        "ID Aset tidak ditemukan";

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
            "Aset tidak ditemukan";

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

            console.log("Foto gagal dimuat.");

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

    document.getElementById("merk").textContent =
        data.merk || "-";

    document.getElementById("serialNumber").textContent =
        data.serialNumber || "-";

    document.getElementById("dimensi").textContent =
        data.dimensi || "-";

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
