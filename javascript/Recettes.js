const recettes = document.querySelector(".recettes")

export default class Recettes {
    constructor(data) {
        this.data = data
        this.id = data.id;
        this.name = data.name;
        this.servings = data.servings
        this.ingredients = data.ingredients
        this.time = data.time
        this.description = data.description
        this.appliance = data.appliance
        this.ustensils = data.ustensils
    }

    display(){

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
}