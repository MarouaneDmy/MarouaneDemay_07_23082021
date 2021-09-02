const recettes = document.querySelector(".recettes")
const tags = document.querySelector(".tags")
const ingredients = document.querySelector(".ingredients")
const appareils = document.querySelector(".appareils")
const ustensiles = document.querySelector(".ustensiles")
const arrow_ingredient = document.querySelector(".arrow-ingredient")
const arrow_appareil = document.querySelector(".arrow-appareil")
const arrow_ustensile = document.querySelector(".arrow-ustensile")
const search_list = document.querySelectorAll(".search-list")


export default class Recettes {
    constructor(data) {
        this.data = data
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.times
        this.description = data.description
        this.appliance = data.appliance
        this.ustensils = data.ustensils
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

    // Crée une liste des ingrédients
    listeIngredients(){        
        let listeIngredientsDoublons = []
        for(const recette of this.data){
            for(const ingredient of recette.ingredients) {
                listeIngredientsDoublons.push(ingredient.ingredient)
            }
        }
        let listeIngredients = [...new Set(listeIngredientsDoublons)]
        
        for(let i = 0; i < 30; i++){
            let ingredient = document.createElement('span')

            ingredient.classList.add("tagList")

            ingredient.textContent = listeIngredients[i]
            ingredient.setAttribute("name", ingredient.textContent)

            search_list[0].appendChild(ingredient)
        }
    }

    // Crée une liste des appareils
    listeAppareils(){
        let listeAppareilsDoublons = []
        for(const recette of this.data){
            listeAppareilsDoublons.push(recette.appliance)
        }
        let listeAppareils = [...new Set(listeAppareilsDoublons)]
        
        for(let i = 0; i < 30; i++){
            let appareil = document.createElement('span')

            appareil.classList.add("tagList")

            appareil.textContent = listeAppareils[i]

            search_list[1].appendChild(appareil)
        }
    }

    // Crée une liste des ustenciles de cuisine
    listeUstensils(){
        let listeUstensilsDoublons = []
        for(const recette of this.data){
            for(const ustensil of recette.ustensils){
                listeUstensilsDoublons.push(ustensil)
            } 
        }
        let listeUstensils = [...new Set(listeUstensilsDoublons)]
        
        for(let i = 0; i < 30; i++){
            let ustensile = document.createElement('span')

            ustensile.classList.add("tagList")

            if (i < listeUstensils.length == true) {
                ustensile.textContent = this.strUcFirst(listeUstensils[i])
            }

            search_list[2].appendChild(ustensile)
        }
    }

    dropdownAll(){
        ingredients.addEventListener("click", this.dropdownIngredients.bind(this))
        appareils.addEventListener("click", this.dropdownAppareils.bind(this))
        ustensiles.addEventListener("click", this.dropdownUstensiles.bind(this))
    }

    dropdownIngredients(){
        if(ingredients.classList.contains("search-open") == false){
            this.clearSearchList()
            this.listeIngredients()
            this.tagList("#3282F7", "blue")
        }
        arrow_ingredient.classList.add("rotate")
        ingredients.classList.add("search-open")
        appareils.classList.remove("search-open")
        ustensiles.classList.remove("search-open") 
        this.closeSearch()
    }

    dropdownAppareils(){
        if(appareils.classList.contains("search-open") == false){
            this.clearSearchList()
            this.listeAppareils()
            this.tagList("#68D9A4", "green")
        }
        arrow_appareil.classList.add("rotate")
        appareils.classList.add("search-open")
        ingredients.classList.remove("search-open")
        ustensiles.classList.remove("search-open")
        this.closeSearch()
    }

    dropdownUstensiles(){
        if(ustensiles.classList.contains("search-open") == false){
            this.clearSearchList()
            this.listeUstensils()
            this.tagList("#ED6454", "red")
        }
        arrow_ustensile.classList.add("rotate")
        ustensiles.classList.add("search-open")
        ingredients.classList.remove("search-open")
        appareils.classList.remove("search-open")
        this.closeSearch()
    }

    // VIde la div Search-List
    clearSearchList(){
        for(let i = 0; i < search_list.length; i++){
            search_list[i].innerHTML = ""
        }   
    } 

    // Transforme la première lettre de la chaîne de caractère en majuscule
    strUcFirst(a) {
        return (a+'').charAt(0).toUpperCase()+a.substr(1)
    }

    closeSearch(){
        // Ferme la recherche par ingrédient, appareil ou ustensiles
        window.addEventListener("click", function(){
            let elemCourant = document.activeElement

            const recette = new Recettes(elemCourant)

            if (elemCourant.classList.contains("search-ingredient") || elemCourant.classList.contains("search-appareil") || elemCourant.classList.contains("search-ustensile") || elemCourant.classList.contains("tagElement") == true){

            } else if (elemCourant.classList.contains("search-open") == false){
                recette.clearSearchList()
                ingredients.classList.remove("search-open")
                appareils.classList.remove("search-open")
                ustensiles.classList.remove("search-open") 
            }
        })
    }

    tagList(color, colorText){
        let tagList = document.querySelectorAll(".tagList")
        for(const tag of tagList){
            tag.addEventListener("click", function(){ 
                let button = document.createElement("button")
                let em = document.createElement("em")
                let tagName = document.createElement("p")

                button.classList.add("tagElement")
                em.classList.add("far")
                em.classList.add("fa-times-circle")

                button.style.background = color

                tagName.textContent = tag.textContent
                button.setAttribute("name", tagName.textContent)

                if (tag.style.color !== colorText){
                    tags.appendChild(button)
                    button.prepend(em)
                    button.appendChild(tagName)
                }

                tag.style.color = colorText
            
                // Supprime le tag
                window.addEventListener("click", function(){
                    let elemCourant = document.activeElement
                
                    if (elemCourant.classList.contains("tagElement")){
                        tags.removeChild(elemCourant)
                    }
                })
            })
        }
        
    }

}