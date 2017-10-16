const SHA256 = require("crypto-js/sha256");

class FoodRepository {
    getModelName(){
        return 'Food';
    }

    setModel(model){
        this._model = model;
    }

    async getAllFoods(){
       const foods = await this._model.findAll();
       return foods;
    }
}

module.exports = {repository: FoodRepository };