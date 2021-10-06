
import Algo from "./Algo.js"


const recettes = document.querySelector(".recettes")
const tags = document.querySelector(".tags")
const ingredients = document.querySelector(".ingredients")
const appareils = document.querySelector(".appareils")
const ustensiles = document.querySelector(".ustensiles")
const searchBarIngredient = document.querySelector(".search-ingredient")
const searchBarAppareil = document.querySelector(".search-appareil")
const searchBarUstensile = document.querySelector(".search-ustensile")

export default class Recettes {
    constructor(data) {
        this.data = data
        this.id = data.id
        this.name = data.name;
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.times
        this.description = data.description
        this.appliance = data.appliance
        this.ustensils = data.ustensils
        this.filteredListeRecette = []
    }

    // Affiche toutes les recettes de la liste
    display(){

        recettes.innerHTML = ""

        for(const recette of this.data) {
            let maRecette = document.createElement('article')
            let imageRecette = document.createElement('p')
            let footerRecette = document.createElement('footer')
            let nomRecette = document.createElement('h1')
            let tempsRecette = document.createElement('p')
            let iconHorloge = document.createElement('em')
            let minutes = document.createElement('p')
            let listeIngredients = document.createElement('div')
            let description = document.createElement('p')

            imageRecette.classList.add("imageRecette")
            footerRecette.classList.add("footerRecette")
            nomRecette.classList.add("nomRecette")
            tempsRecette.classList.add("tempsRecette")
            iconHorloge.classList.add("far")
            iconHorloge.classList.add("fa-clock")
            minutes.classList.add("minutes")
            listeIngredients.classList.add("listeIngredients")
            description.classList.add("description")
            
            nomRecette.textContent = recette.name
            minutes.textContent = recette.time + " min"
            description.textContent = recette.description

            recettes.appendChild(maRecette)
            maRecette.appendChild(imageRecette)
            maRecette.appendChild(footerRecette)
            footerRecette.appendChild(nomRecette)
            footerRecette.appendChild(tempsRecette)
            footerRecette.appendChild(listeIngredients)
            footerRecette.appendChild(description)
            tempsRecette.appendChild(iconHorloge)
            tempsRecette.appendChild(minutes)

            for(const ingredient of recette.ingredients) {
                let uniteIngredient = document.createElement("p")
                let titreIngredient = document.createElement("span")
                
                uniteIngredient.classList.add("ingredientRecette")

                titreIngredient.textContent = ingredient.ingredient

                if (ingredient.quantity && ingredient.unit !== undefined) {
                    uniteIngredient.innerText = ": " + ingredient.quantity + " " + ingredient.unit
                } else if (ingredient.quantity !== undefined) {
                    uniteIngredient.innerText = ": " + ingredient.quantity
                } else if (ingredient.quantity && ingredient.unit === undefined) {
                    uniteIngredient.innerText = ""
                }

                uniteIngredient.prepend(titreIngredient)
                listeIngredients.appendChild(uniteIngredient)
            }
        }
    }

    executeEventRecettes(){
        this.listeIngredients(this.data)
        this.listeAppareils(this.data)
        this.listeUstensils(this.data)
        this.searchListClose()
        this.executeSearchBar()
    }

    searchListClose(){
        const searchListIngredient = document.querySelector(".searchListIngredient")
        const searchListAppareil = document.querySelector(".searchListAppareil")
        const searchListUstensile = document.querySelector(".searchListUstensile")

        // Ferme la recherche par ingrédient, appareil ou ustensiles
        window.addEventListener("click", function(){
            let elemCourant = document.activeElement

            if (elemCourant.classList.contains("search-ingredient") || elemCourant.classList.contains("search-appareil") || elemCourant.classList.contains("search-ustensile") || elemCourant.classList.contains("tagElement") == true){

            } else if (elemCourant.classList.contains("search-open") == false){
                ingredients.classList.remove("search-open")
                appareils.classList.remove("search-open")
                ustensiles.classList.remove("search-open")  
                searchListIngredient.classList.remove("displayList")
                searchListAppareil.classList.remove("displayList")
                searchListUstensile.classList.remove("displayList")
            }
        })
    }

    // Crée une liste des ingrédients
    listeIngredients(listeRecette){    
        let listeIngredientsDoublons = []
        for(const recette of listeRecette){
            for(const ingredient of recette.ingredients) {
                listeIngredientsDoublons.push(ingredient.ingredient)
            }
        }
        let listeIngredients = [...new Set(listeIngredientsDoublons)]

        let search_list = document.createElement('div')

        ingredients.appendChild(search_list)

        search_list.classList.add('searchListIngredient')

        for(let i = 0; i < 30; i++){
            let ingredient = document.createElement('span')

            ingredient.classList.add("tagListIng")

            ingredient.textContent = listeIngredients[i]

            search_list.appendChild(ingredient)
        }   

    }

    // Crée une liste des appareils
    listeAppareils(listeRecette){
        let listeAppareilsDoublons = []
        for(const recette of listeRecette){
            listeAppareilsDoublons.push(recette.appliance)
        }
        let listeAppareils = [...new Set(listeAppareilsDoublons)]

        let search_list = document.createElement('div')

        appareils.appendChild(search_list)

        search_list.classList.add('searchListAppareil')
        
        for(let i = 0; i < 30; i++){
            let appareil = document.createElement('span')

            appareil.classList.add("tagListApp")

            appareil.textContent = listeAppareils[i]

            search_list.appendChild(appareil)
        }
    }

    // Crée une liste des ustenciles de cuisine
    listeUstensils(listeRecette){
        let listeUstensilsDoublons = []
        for(const recette of listeRecette){
            for(const ustensil of recette.ustensils){
                listeUstensilsDoublons.push(ustensil)
            } 
        }
        let listeUstensils = [...new Set(listeUstensilsDoublons)]

        let search_list = document.createElement('div')

        ustensiles.appendChild(search_list)

        search_list.classList.add('searchListUstensile')
        
        for(let i = 0; i < 30; i++){
            let ustensile = document.createElement('span')

            ustensile.classList.add("tagListUst")

            if (i < listeUstensils.length == true) {
                ustensile.textContent = this.strUcFirst(listeUstensils[i])
            }

            search_list.appendChild(ustensile)
        }
    }

    changeListIngredient(liste){
        const searchListIngredient = document.querySelector(".searchListIngredient")

        let listeIngredients = [...new Set(liste)]
                 
        searchListIngredient.innerHTML = ""

        for(let i = 0; i < 30; i++){
            let ingredient = document.createElement('span')

            ingredient.classList.add("tagListIng")

            if(tags.textContent.includes(listeIngredients[i])){
                ingredient.classList.add("tagBlue")
            }

            ingredient.textContent = listeIngredients[i]

            searchListIngredient.appendChild(ingredient)
        }
    }

    changeListAppareil(liste){
        const searchListAppareil = document.querySelector(".searchListAppareil")

        let listeAppareils = [...new Set(liste)]

        searchListAppareil.innerHTML = ""
        
        for(let i = 0; i < 30; i++){
            let appareil = document.createElement('span')

            appareil.classList.add("tagListApp")

            if(tags.textContent.includes(listeAppareils[i])){
                appareil.classList.add("tagGreen")
            }

            appareil.textContent = listeAppareils[i]

            searchListAppareil.appendChild(appareil)
        }
    }

    changeListUstensile(liste){
        const searchListUstensile = document.querySelector(".searchListUstensile")

        let listeUstensils = [...new Set(liste)]

        searchListUstensile.innerHTML = ""
        
        for(let i = 0; i < 30; i++){
            let ustensil = document.createElement('span')

            ustensil.classList.add("tagListUst")

            if(tags.textContent.includes(listeUstensils[i])){
                ustensil.classList.add("tagRed")
            }

            ustensil.textContent = listeUstensils[i]

            searchListUstensile.appendChild(ustensil)
        }
    }

    searchBarIngredient(){
        this.filteredListeRecette = []

        if(searchBarIngredient.value.length > 2){
            this.filteredListeRecette = []
            // Parcours toutes les recettes
            for(const recette of this.data){
                for(const ingredient of recette.ingredients) {
                    if(ingredient.ingredient.toLowerCase().includes(searchBarIngredient.value.toLowerCase())) {
                        this.filteredListeRecette.push(ingredient.ingredient)
                        this.changeListIngredient(this.filteredListeRecette)
                    }    
                }
            }     
        } else if (searchBarIngredient.value.length < 3){
            for(const recette of this.data){
                for(const ingredient of recette.ingredients) {
                    this.filteredListeRecette.push(ingredient.ingredient)
                    this.changeListIngredient(this.filteredListeRecette)  
                }
            }
        }
        this.searchListClose()
    }

    searchBarAppareil(){
        this.filteredListeRecette = []

        if(searchBarAppareil.value.length > 2){
            this.filteredListeRecette = []
            // Parcours toutes les recettes
            for(const recette of this.data){
                if(recette.appliance.toLowerCase().includes(searchBarAppareil.value.toLowerCase())){
                    this.filteredListeRecette.push(recette.appliance)
                    this.changeListAppareil(this.filteredListeRecette)
                }
            }     
        } else if (searchBarAppareil.value.length < 3){
            for(const recette of this.data){
                this.filteredListeRecette.push(recette.appliance)
                this.changeListAppareil(this.filteredListeRecette)     
            }  
        }
        this.searchListClose()
    }

    searchBarUstensile(){
        this.filteredListeRecette = []

        if(searchBarUstensile.value.length > 2){
            this.filteredListeRecette = []
            // Parcours toutes les recettes
            for(const recette of this.data){
                for(const ustensile of recette.ustensils){
                    if(ustensile.toLowerCase().includes(searchBarUstensile.value.toLowerCase())){
                        this.filteredListeRecette.push(this.strUcFirst(ustensile)) 
                        this.changeListUstensile(this.filteredListeRecette)
                    }   
                }
            }     
        } else if (searchBarUstensile.value.length < 3){
            for(const recette of this.data){
                for(const ustensile of recette.ustensils){
                    this.filteredListeRecette.push(this.strUcFirst(ustensile))
                    this.changeListUstensile(this.filteredListeRecette)   
                }    
            }  
        }
        this.searchListClose()
    }

    executeSearchBar(){
        searchBarIngredient.addEventListener('keyup', () =>{
            this.searchBarIngredient()
        })
        searchBarAppareil.addEventListener('keyup', () =>{
            this.searchBarAppareil()
        })
        searchBarUstensile.addEventListener('keyup', () =>{
            this.searchBarUstensile()
        })
    } 

    // Transforme la première lettre de la chaîne de caractère en majuscule
    strUcFirst(a) {
        return (a+'').charAt(0).toUpperCase()+a.substr(1)
    }
}