import DataManager from "./DataManager.js"
import Recettes from "./Recettes.js"

(async function()  {
    
    // DATAMANGER
    const dataManager = new DataManager()
    const chemin = "./javascript/json/data.json"
    const data = await dataManager.getData(chemin)
    const foundRecettes = data.recettes.filter(recettes => recettes)

    // RECETTES
    const recettes = new Recettes(foundRecettes)
    recettes.display()

})()