import DataManager from "./DataManager.js"
import Recettes from "./Recettes.js"
import AlgoTri from "./AlgoTri.js"

(async function()  {
    
    // DATAMANGER
    const dataManager = new DataManager()
    const chemin = "./javascript/json/data.json"
    const data = await dataManager.getData(chemin)
    const foundRecettes = data.recettes.filter(recettes => recettes)

    // RECETTES
    const recettes = new Recettes(foundRecettes)
    recettes.display()
    recettes.dropdownAll()

    // ALGOTRI
    const algo = new AlgoTri(foundRecettes)
    console.log(foundRecettes[0].ustensils[0])
    algo.executeFilterList()

})()