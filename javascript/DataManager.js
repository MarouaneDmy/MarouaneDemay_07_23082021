export default class DataManager {
    async getData(chemin) {
        let response = await fetch(chemin)
        let data = await response.json()   
        return data
    }
}