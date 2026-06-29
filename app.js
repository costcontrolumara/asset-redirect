const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    document.getElementById("nama").innerText = "ID aset tidak ditemukan";
    throw new Error("ID tidak ditemukan");
}

const api =
"https://script.google.com/macros/s/AKfycbzWd7pEwjJY14EI4VWDFMoJrAlzdLl549iKR6jtnvqh3g0i9WffkYp07LXuIkACb5zLZA/exec?id="
+ encodeURIComponent(id)
+ "&api=1";

fetch(api)
.then(res => res.json())
.then(data => {

    document.getElementById("qr").innerText = data.nomorQR || "-";
    document.getElementById("nama").innerText = data.nama || "-";
    document.getElementById("kategori").innerText = data.kategori || "-";
    document.getElementById("jumlah").innerText = data.jumlah || "-";
    document.getElementById("lokasi").innerText = data.lokasi || "-";

    if(data.linkPhoto){
        document.getElementById("foto").src = data.linkPhoto;
    }else{
        document.getElementById("foto").style.display="none";
    }

})
.catch(err=>{
    document.getElementById("nama").innerText="Gagal mengambil data";
    console.error(err);
});
