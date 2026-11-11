const http = new XMLHttpRequest()
http.onload = function () {
    if (http.status == 200) {
        const termek = JSON.parse(http.responseText)
        megjelenites(termek)
    }
    else {
        hibaKiiras()
    }
}
http.onerror = function () {
    hibaKiiras()
}
http.open("GET", "termek.json")
http.send()

function megjelenites(termek) {
    document.getElementById("termekNev").textContent = termek.name
    document.getElementById("termekLeiras").textContent = termek.description
    document.getElementById("termekErtekeles").textContent = termek.rating
    document.getElementById("termekAr").textContent = termek.price.toLocaleString("hu-HU")
    document.getElementById("termekPenznem").textContent = termek.currency
    document.getElementById("termekKeszlet").textContent = termek.stock
    document.getElementById("gyartoNev").textContent = termek.manufacturer.name
    document.getElementById("gyartoOrszag").textContent = termek.manufacturer.country

    document.getElementById("foKep").src = termek.image
    for (const belyegkep of document.getElementsByClassName("belyegkep")) {
        belyegkep.src = termek.image
    }

    const jellemzokLista = document.getElementById("jellemzokLista")
    for (const jellemzo of termek.features) {
        jellemzokLista.innerHTML += `<li><span class="jellemzo-ikon">🔲</span>${jellemzo}</li>`
    }

    const velemenyekLista = document.getElementById("velemenyekLista")
    const velemenyDatumok = ["2024. 11. 03.", "2024. 10. 21."]
    for (let index = 0; index < termek.reviews.length; index++) {
        const velemeny = termek.reviews[index]
        velemenyekLista.innerHTML += `
            <div class="velemeny">
                <div class="avatar">${velemeny.user[0]}</div>
                <div class="velemeny-torzs">
                    <div class="velemeny-fejlec">${velemeny.user} <span class="velemeny-datum">${velemenyDatumok[index]}</span></div>
                    <div class="velemeny-csillagok">★★★★★</div>
                    <p class="velemeny-szoveg">${velemeny.comment}</p>
                </div>
            </div>
        `
    }
}

function hibaKiiras() {
    const hibaDoboz = document.getElementById("hibaUzenet")
    hibaDoboz.textContent = "A termék adatai nem érhetők el!"
    hibaDoboz.style.display = "block"
}