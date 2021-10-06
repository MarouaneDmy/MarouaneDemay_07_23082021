import DataManager from "./DataManager.js"
import Recettes from "./Recettes.js"
import Algorithme from "./AlgoForeach.js"

(async function()  {
    
    // DATAMANGER
    const dataManager = new DataManager()
    const chemin = "./javascript/json/data.json"
    const data = await dataManager.getData(chemin)
    const foundRecettes = data.recettes

    // RECETTES
    const recettes = new Recettes(foundRecettes)
    const algo = new Algorithme(foundRecettes)

    recettes.display()
    recettes.executeEventRecettes()

    algo.searchListOpen()

    // ALGOLINEAIRE (méthode ForEach)
    algo.executeForEachSearch()
    
})()