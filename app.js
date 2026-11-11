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
    const jellemzoIkonok = [
        // processzor
        `<rect x="6" y="6" width="12" height="12" rx="1"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>`,
        // memória
        `<rect x="2" y="6" width="20" height="10" rx="1"/><path d="M6 10v2M10 10v2M14 10v2M18 10v2M5 16v2M9 16v2M13 16v2M17 16v2"/>`,
        // SSD
        `<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h4M16 14h.01"/>`,
        // videókártya
        `<rect x="2" y="6" width="20" height="11" rx="1"/><circle cx="9" cy="11.5" r="2.5"/><circle cx="16" cy="11.5" r="2.5"/><path d="M5 17v2M8 17v2"/>`,
        // kijelző
        `<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>`,
        // Windows
        `<g fill="currentColor" stroke="none"><rect x="3" y="3" width="8" height="8" rx="0.5"/><rect x="13" y="3" width="8" height="8" rx="0.5"/><rect x="3" y="13" width="8" height="8" rx="0.5"/><rect x="13" y="13" width="8" height="8" rx="0.5"/></g>`
    ]
    for (let index = 0; index < termek.features.length; index++) {
        jellemzokLista.innerHTML += `
            <li>
                <span class="jellemzo-ikon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${jellemzoIkonok[index]}</svg>
                </span>
                ${termek.features[index]}
            </li>
        `
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