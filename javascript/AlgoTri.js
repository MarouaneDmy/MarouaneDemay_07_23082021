import Recettes from "./Recettes.js"

const searchBar = document.querySelector(".search")

export default class Algo {
    constructor(listeRecette){
        this.listeRecette = listeRecette
        this.filteredListeRecette = []
    }

    // Tri linéaire 
    linearSearchNumber() {   
        let list = [1, 4, 100, 76, 34, 49, 56, 12, 42, 8, 17, 24];
        let filterList = [];        
        let nombre = "40";    

        for (let i = 0; i < list.length; i++){
            if(list[i] > nombre){
                filterList.push(list[i]);
            } 
            if (i == list.length - 1){
                console.log(filterList);
            }
        }
    }

    linearSearchRecette(){
        const recettes = []
        if(searchBar.value.length > 2){
            // Parcours toutes les recettes
            for (let i = 0; i < this.listeRecette.length; i++){
                
                // Recherche les noms de recettes
                if(this.listeRecette[i].name.toLowerCase().includes(searchBar.value.toLowerCase())) {
                    recettes.push(this.listeRecette[i])
                }    

                // Parcours les recettes par ingrédients
                for(let a = 0; a < this.listeRecette[i].ingredients.length; a++){
                    if(this.listeRecette[i].ingredients[a].ingredient.toLowerCase().includes(searchBar.value.toLowerCase())){
                        recettes.push(this.listeRecette[i]) 
                    }
                }

                // Parcours les recettes par appareil
                for(let a = 0; a < this.listeRecette[i].appliance.length; a++){
                    if(this.listeRecette[i].appliance.toLowerCase().includes(searchBar.value.toLowerCase())){
                        recettes.push(this.listeRecette[i]) 
                    }
                }

                // Parcours les recettes par ustensile
                for(let a = 0; a < this.listeRecette[i].ustensils.length; a++){
                    if(this.listeRecette[i].ustensils[a].toLowerCase().includes(searchBar.value.toLowerCase())){
                        recettes.push(this.listeRecette[i]) 
                    }
                }
            }
            
            const recettesFilter = [...new Set(recettes)]
            const recette = new Recettes(recettesFilter)
            recette.display()
        } else if (searchBar.value.length < 3) {
            const recette = new Recettes(this.listeRecette)
            recette.display()
        }
    }

    filterListNumber(){
        let list = [1, 4, 100, 76, 34, 49, 56, 12, 42, 8, 17, 24];       
        let nombre = "40"; 
        const foundNumber = list.filter(number => number > nombre);
        console.log(foundNumber);
    }


    filterListRecette(){
        if(searchBar.value.length > 2){
            const recettesFilter = this.listeRecette.filter(recette =>  recette.name.toLowerCase().indexOf(searchBar.value.toLowerCase()) !== -1);
            const recette = new Recettes(recettesFilter)
            recette.display()
        } else if (searchBar.value.length < 3) {
            const recette = new Recettes(this.listeRecette)
            recette.display()
        }
    }

    executeFilterList(){
        searchBar.addEventListener('keyup', () =>{
            this.linearSearchRecette()
        })
    }
}