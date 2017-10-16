const BaseController = require('../../../../core/controller/BaseController');
const { ErrorCodes } = require('../../../../config/ErrorCodes');
const { ContainerProvider } = require('../../../../core/container/ContainerProvider');

class FoodController extends BaseController {
    constructor(foodRepository){
        super();
        this._foodRepository = foodRepository;
    }
    async getFoodsAll(req, res, next){
        const foodRepository = ContainerProvider.getContainer().get('food_repository');
        res.json(await foodRepository.getAllFoods());
        next();
    }
}

module.exports = FoodController;