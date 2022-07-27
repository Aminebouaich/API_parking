// variable pour appeller l'api ,j'ai choisi spécifiquement la ville de rouen 
let url = `https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&facet=etat_descriptif`;
//  On envoie une requète à l'API avec la variable let url ,fetch() qui procure un moyen facile et logique de récupérer des ressources à travers le réseau de manière asynchrone.
(function raff() {
    fetch(url)
        // On obtient une réponse que l'on convertit au format .json 



        .then((response) =>


            response.json()
            // La méthode then() renvoie un objet Promise
            .then((data) => {
                let parkings = data.records
                let tabHtml = document.querySelector("#tabprod")
                let tabData = " "
                // let statut = parkings.fields.etat_descriptif

                parkings.forEach(parking => {
                    console.log(parking.fields.nom_parking);
                    tabData += `<tr>

                <td>${parking.fields.nom_parking}</td>
                <td>${parking.fields.total}</td>`

                    tabData += parking.fields.etat_descriptif === "Fermé" ?

                        `<td class="ferme">${parking.fields.etat_descriptif} <i class="fa-solid fa-circle"></i></td>` :
                        parking.fields.etat_descriptif === "Ouvert" ?

                        `<td class="vert">${parking.fields.etat_descriptif} <i class="fa-solid fa-circle"></i></td>` :
                        `<td class="orange">${parking.fields.etat_descriptif} <i class="fa-solid fa-circle"></i></td>`;

                    tabData += parking.fields.libre < 30 ?
                        `<td class="ferme">${parking.fields.libre}</td>` :
                        `<td class="vert">${parking.fields.libre}</td>`
                    tabData += "</tr>"

                });
                tabHtml.innerHTML = tabData


            })


        )
    setTimeout(raff, 300000);

})();