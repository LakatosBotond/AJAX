function betoltes(){
    const http = new XMLHttpRequest();
    http.onload = function(){
        if(this.status == 200){
            const termek = JSON.parse(this.responseText)
            megjelenites(termek)
        }
        else{
            hibaKiiras()
        }
    }
    http.onerror = function(){
        hibaKiiras()
    }
    http.open("GET", "termek.json")
    http.send()
}

function megjelenites(termek){
    document.getElementById("termekNev").innerHTML = termek.name
    document.getElementById("termekLeiras").innerHTML = termek.description
    document.getElementById("termekErtekeles").innerHTML = termek.rating
    document.getElementById("termekAr").innerHTML = termek.price.toLocaleString("hu-HU")
    document.getElementById("termekPenznem").innerHTML = termek.currency
    document.getElementById("termekKeszlet").innerHTML = termek.stock
    document.getElementById("gyartoNev").innerHTML = termek.manufacturer.name
    document.getElementById("gyartoOrszag").innerHTML = termek.manufacturer.country

    document.getElementById("foKep").src = termek.image
    const belyegkepek = document.getElementsByClassName("belyegkep")
    for(let index = 0; index < belyegkepek.length; index++){
        belyegkepek[index].src = termek.image
    }

    const jellemzokLista = document.getElementById("jellemzokLista")
    const jellemzoIkonok = ["🔲", "💾", "💽", "🎮"]
    for(let index = 0; index < termek.features.length; index++){
        jellemzokLista.innerHTML += `
            <li><span class="jellemzo-ikon">${jellemzoIkonok[index]}</span>${termek.features[index]}</li>
        `
    }

    const velemenyekLista = document.getElementById("velemenyekLista")
    const velemenyDatumok = ["2024. 11. 03.", "2024. 10. 21."]
    for(let index = 0; index < termek.reviews.length; index++){
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

function hibaKiiras(){
    const hibaDoboz = document.getElementById("hibaUzenet")
    hibaDoboz.innerHTML = "A termék adatai nem érhetők el!"
    hibaDoboz.style.display = "block"
}

betoltes()