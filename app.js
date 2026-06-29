// =========================
// KONFIGURASI API
// =========================

const API_URL =
"https://script.google.com/macros/s/AKfycbzWd7pEwjJY14EI4VWDFMoJrAlzdLl549iKR6jtnvqh3g0i9WffkYp07LXuIkACb5zLZA/exec";


// =========================
// AMBIL PARAMETER ID
// =========================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// =========================
// JIKA TIDAK ADA ID
// =========================

if(!id){

    document.getElementById("nama").innerHTML="ID Aset tidak ditemukan";
    throw new Error("ID kosong");

}


// =========================
// LOADING
// =========================

document.getElementById("nama").innerHTML="Memuat data...";


// =========================
// REQUEST API
// =========================

fetch(`${API_URL}?id=${encodeURIComponent(id)}&api=1`)

.then(response=>response.json())

.then(data=>{

    if(data==null){

        document.getElementById("nama").innerHTML="Aset tidak ditemukan";
        return;

    }

    // =====================
    // FOTO
    // =====================

    const foto=document.getElementById("foto");

    if(data.linkPhoto){

        let url=data.linkPhoto;

        // Google Drive
        if(url.includes("drive.google.com")){

            const match=url.match(/\/d\/([^\/]+)/);

            if(match){

                url=`https://drive.google.com/uc?export=view&id=${match[1]}`;

            }

        }

        foto.src=url;

    }else{

        foto.src="https://placehold.co/600x400?text=No+Image";

    }


    // =====================
    // DATA
    // =====================

    document.getElementById("qr").innerHTML=data.nomorQR ?? "-";

    document.getElementById("nama").innerHTML=data.nama || "Tanpa Nama";

    document.getElementById("kategori").innerHTML=data.kategori || "-";

    document.getElementById("jumlah").innerHTML=
        `${data.jumlah || "-"} ${data.satuan || ""}`;

    document.getElementById("area").innerHTML=data.area || "-";

    document.getElementById("lokasi").innerHTML=data.lokasi || "-";

    document.getElementById("keadaan").innerHTML=data.keadaan || "-";

})

.catch(error=>{

    console.error(error);

    document.getElementById("nama").innerHTML="Terjadi Kesalahan";

});
