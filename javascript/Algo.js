import Recettes from "./Recettes.js"

const searchBar = document.querySelector(".search")
const tags = document.querySelector(".tags")
const ingredients = document.querySelector(".ingredients")
const appareils = document.querySelector(".appareils")
const ustensiles = document.querySelector(".ustensiles")
const arrow_ingredient = document.querySelector(".arrow-ingredient")
const arrow_appareil = document.querySelector(".arrow-appareil")
const arrow_ustensile = document.querySelector(".arrow-ustensile")


export default class Algo {
    constructor(listeRecette){
        this.listeRecette = listeRecette
        this.searchResult = listeRecette
        this.filteredListeRecette = []
        this.listeTag = []
    }

    // Ouvre les différentes listes au click
    searchListOpen(){
        ingredients.addEventListener("click", this.dropdownIngredient.bind(this))
        appareils.addEventListener("click", this.dropdownAppareils.bind(this))
        ustensiles.addEventListener("click", this.dropdownUstensiles.bind(this))
    }

    // Rotate la flèche, ouvre la liste et donne la couleur aux tags cliqués
    dropdownIngredient(){
        const searchListIngredient = document.querySelector(".searchListIngredient")
        const searchListAppareil = document.querySelector(".searchListAppareil")
        const searchListUstensile = document.querySelector(".searchListUstensile")

        arrow_ingredient.classList.add("rotate")

        // Ouverture de la liste d'ingrédients et fermeture des autres
        ingredients.classList.add("search-open")
        appareils.classList.remove("search-open")
        ustensiles.classList.remove("search-open") 

        // Apparition de la liste lors de l'ouverture
        searchListIngredient.classList.add("displayList")
        searchListAppareil.classList.remove("displayList")
        searchListUstensile.classList.remove("displayList")

        if(ingredients.classList.contains("search-open")){
            this.tagList("tagBlue", "Ing")
        }
    }

    // Rotate la flèche, ouvre la liste et donne la couleur aux tags cliqués
    dropdownAppareils(){
        const searchListIngredient = document.querySelector(".searchListIngredient")
        const searchListAppareil = document.querySelector(".searchListAppareil")
        const searchListUstensile = document.querySelector(".searchListUstensile")

        arrow_appareil.classList.add("rotate")

        appareils.classList.add("search-open")
        ingredients.classList.remove("search-open")
        ustensiles.classList.remove("search-open") 

        searchListAppareil.classList.add("displayList")
        searchListIngredient.classList.remove("displayList")
        searchListUstensile.classList.remove("displayList")
       
        if(appareils.classList.contains("search-open")){ 
            this.tagList("tagGreen", "App") 
        }
    }

    // Rotate la flèche, ouvre la liste et donne la couleur aux tags cliqués
    dropdownUstensiles(){
        const searchListIngredient = document.querySelector(".searchListIngredient")
        const searchListAppareil = document.querySelector(".searchListAppareil")
        const searchListUstensile = document.querySelector(".searchListUstensile")

        arrow_ustensile.classList.add("rotate")
        
        ustensiles.classList.add("search-open")
        ingredients.classList.remove("search-open")
        appareils.classList.remove("search-open")

        searchListUstensile.classList.add("displayList")
        searchListIngredient.classList.remove("displayList")
        searchListAppareil.classList.remove("displayList")

        if(ustensiles.classList.contains("search-open")){ 
            this.tagList("tagRed", "Ust") 
        }
    }

    // Relance la recherche entière
    refreshSearchResult(tag){
        this.listeTag = [...new Set(this.listeTag)]
        this.listeTag = this.listeTag.filter(item => item !== tag)
        this.linearSearchRecette()
        for(const tag of this.listeTag){
            this.linearSearchRecetteByTag(tag)
        }
    }

    // Relance la recherche de tag
    refreshTagResult(){
        this.listeTag = [...new Set(this.listeTag)]
        for(const tag of this.listeTag){
            this.linearSearchRecetteByTag(tag)
        }
    }

    // Algorithme de recherche linéaire (boucle for)
    linearSearchRecette(){
        this.filteredListeRecette = []
        if(searchBar.value.length > 2){
            console.time("linearSearch");
            // Parcours toutes les recettes
            for (let i = 0; i < this.listeRecette.length; i++){
                
                // Recherche les noms de recettes
                if(this.listeRecette[i].name.toLowerCase().includes(searchBar.value.toLowerCase())) {
                    this.filteredListeRecette.push(this.listeRecette[i])
                    this.displayInstantly()
                }    

                // Parcours les recettes par ingrédients
                for(let a = 0; a < this.listeRecette[i].ingredients.length; a++){
                    if(this.listeRecette[i].ingredients[a].ingredient.toLowerCase().includes(searchBar.value.toLowerCase())){
                        this.filteredListeRecette.push(this.listeRecette[i]) 
                        this.displayInstantly()
                    }
                }

                if(this.listeRecette[i].appliance.toLowerCase().includes(searchBar.value.toLowerCase())){
                    this.filteredListeRecette.push(this.listeRecette[i]) 
                    this.displayInstantly()
                }

                // Parcours les recettes par ustensile
                for(let a = 0; a < this.listeRecette[i].ustensils.length; a++){
                    if(this.listeRecette[i].ustensils[a].toLowerCase().includes(searchBar.value.toLowerCase())){
                        this.filteredListeRecette.push(this.listeRecette[i]) 
                        this.displayInstantly()
                    }
                }
            }
            this.searchResult = [...new Set(this.filteredListeRecette)]
            this.refreshTagResult()
            this.refreshList()
        } else if (searchBar.value.length < 3) {
            const recette = new Recettes(this.listeRecette)
            recette.display()
            this.filteredListeRecette = this.listeRecette
            this.searchResult = this.listeRecette
            this.refreshList()
        }
        console.timeEnd("linearSearch");
    }

    linearSearchRecetteByTag(word){
        this.filteredListeRecette = []
        console.time("linearSearch");
        // Parcours toutes les recettes
        for (let i = 0; i < this.searchResult.length; i++){
            // Recherche les noms de recettes
            if(this.searchResult[i].name.toLowerCase().includes(word.toLowerCase())) {
                this.filteredListeRecette.push(this.searchResult[i])
                this.displayInstantly()
            }    

            // Parcours les recettes par ingrédients
            for(let a = 0; a < this.searchResult[i].ingredients.length; a++){
                if(this.searchResult[i].ingredients[a].ingredient.toLowerCase().includes(word.toLowerCase())){
                    this.filteredListeRecette.push(this.searchResult[i]) 
                    this.displayInstantly()
                }
            }

            if(this.searchResult[i].appliance.toLowerCase().includes(word.toLowerCase())){
                this.filteredListeRecette.push(this.searchResult[i]) 
                this.displayInstantly()
            }

            // Parcours les recettes par ustensile
            for(let a = 0; a < this.searchResult[i].ustensils.length; a++){
                if(this.searchResult[i].ustensils[a].toLowerCase().includes(word.toLowerCase())){
                    this.filteredListeRecette.push(this.searchResult[i]) 
                    this.displayInstantly()
                }
            }
        }
        this.searchResult = [...new Set(this.filteredListeRecette)]
        this.refreshList()
        console.timeEnd("linearSearch");
    }

    executeLinearSearch(){
        this.linearSearchRecette()
        searchBar.addEventListener('keyup', () =>{
            this.linearSearchRecette()
        })
    }

    refreshList(){
        let recettesFilter = this.searchResult
        const recettes = new Recettes(recettesFilter)
        this.filteredListeRecette = []
        for(const recette of recettesFilter){
            for(const ingredient of recette.ingredients){
                this.filteredListeRecette.push(ingredient.ingredient)
                recettes.changeListIngredient(this.filteredListeRecette)
            }
        }

        this.filteredListeRecette = []
        for(const recette of recettesFilter){
            this.filteredListeRecette.push(recette.appliance)
            recettes.changeListAppareil(this.filteredListeRecette)
        }

        this.filteredListeRecette = []
        for(const recette of recettesFilter){
            for(const ustensile of recette.ustensils){
                this.filteredListeRecette.push(ustensile)
                recettes.changeListUstensile(this.filteredListeRecette)
            }
        }
    }

    displayInstantly(){
        let recettesFilter = [...new Set(this.filteredListeRecette)]
        const recette = new Recettes(recettesFilter)
        recette.display()
    }

    tagList(colorText, categorie){
        let tagList = document.querySelectorAll(".tagList" + categorie)
        for(const tag of tagList){
            tag.addEventListener("click", () => { 
                if(tag.classList.contains(colorText) == false){
                    // Création du tag, de sa couleur et de son nom
                    let button = document.createElement("button")
                    let em = document.createElement("em")
                    let tagName = document.createElement("p")

                    button.classList.add("tagElement")
                    em.classList.add("far")
                    em.classList.add("fa-times-circle")

                    button.setAttribute("name", tagName.textContent)
                    button.setAttribute("id", colorText)

                    tagName.textContent = tag.textContent

                    tag.classList.add(colorText)

                    tags.appendChild(button)
                    button.prepend(em)
                    button.appendChild(tagName)

                    this.listeTag.push(tag.textContent)
                    this.linearSearchRecetteByTag(tag.textContent)
                }
            }) 
        } 
        // Supprime le tag
        window.addEventListener("click", () => {
            const searchListIngredient = document.querySelector(".searchListIngredient")
            const searchListAppareil = document.querySelector(".searchListAppareil")
            const searchListUstensile = document.querySelector(".searchListUstensile")

            let elemCourant = document.activeElement
        
            if (elemCourant.classList.contains("tagElement")){
                tags.removeChild(elemCourant)
                
                // Retire la couleur bleu de l'ingrédient
                for(const ingredient of searchListIngredient.childNodes){
                    if(ingredient.innerText.includes(elemCourant.innerText)){
                        ingredient.classList.remove("tagBlue")
                    }
                }

                // Retire la couleur verte de l'appareil
                for(const appareil of searchListAppareil.childNodes){
                    if(appareil.innerText.includes(elemCourant.innerText)){
                        appareil.classList.remove("tagGreen")
                    }
                }

                // Retire la couleur rouge de l'ustensile
                for(const ustensile of searchListUstensile.childNodes){
                    if(ustensile.innerText.includes(elemCourant.innerText)){
                        ustensile.classList.remove("tagRed")
                    }
                }

                this.refreshSearchResult(elemCourant.innerText)
            }
        })
    }

    displayInstantlyForEach(listeTri){
        let recettesFilter = [...new Set(listeTri)]
        const recette = new Recettes(recettesFilter)
        recette.display()
    }

    forEachSearch(){
        const listeRecette = this.listeRecette
        const filteredList = []
        
        if(searchBar.value.length > 2){
            console.time("linearSearch");
            this.listeRecette.forEach(function(recette){
                const methForEach = new Algo(listeRecette)

                if(recette.name.toLowerCase().includes(searchBar.value.toLowerCase())) {
                    filteredList.push(recette)
                    methForEach.displayInstantlyForEach(filteredList)
                }   

                recette.ingredients.forEach(function(ingredients){
                    if(ingredients.ingredient.toLowerCase().includes(searchBar.value.toLowerCase())){
                        filteredList.push(recette)
                        methForEach.displayInstantlyForEach(filteredList)
                    }
                })

                if(recette.appliance.toLowerCase().includes(searchBar.value.toLowerCase())){
                    filteredList.push(recette)
                    methForEach.displayInstantlyForEach(filteredList)
                }

                // Parcours les recettes par ustensile
                recette.ustensils.forEach(function(ustensils){
                    if(ustensils.toLowerCase().includes(searchBar.value.toLowerCase())){
                        filteredList.push(recette)
                        methForEach.displayInstantlyForEach(filteredList)
                    }
                })
            })
        } else if (searchBar.value.length < 3) {
            const recette = new Recettes(this.listeRecette)
            recette.display()
        }
        console.timeEnd("linearSearch");
    }

    forEachSearchByTag(word){
        const listeRecette = this.listeRecette
        const filteredList = []
        
        if(word.length > 2){
            console.time("linearSearch");
            this.listeRecette.forEach(function(recette){
                const methForEach = new Algo(listeRecette)

                if(recette.name.toLowerCase().includes(word.toLowerCase())) {
                    filteredList.push(recette)
                    methForEach.displayInstantlyForEach(filteredList)
                }   

                recette.ingredients.forEach(function(ingredients){
                    if(ingredients.ingredient.toLowerCase().includes(word.toLowerCase())){
                        filteredList.push(recette)
                        methForEach.displayInstantlyForEach(filteredList)
                    }
                })

                if(recette.appliance.toLowerCase().includes(word.toLowerCase())){
                    filteredList.push(recette)
                    methForEach.displayInstantlyForEach(filteredList)
                }

                // Parcours les recettes par ustensile
                recette.ustensils.forEach(function(ustensils){
                    if(ustensils.toLowerCase().includes(word.toLowerCase())){
                        filteredList.push(recette)
                        methForEach.displayInstantlyForEach(filteredList)
                    }
                })
            })
        } 
        console.timeEnd("linearSearch");
    }

    executeForEachSearch(){
        searchBar.addEventListener('keyup', () =>{
            this.forEachSearch()
        })
    }    
}