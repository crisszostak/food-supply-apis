const BaseController = require('../../../../core/controller/BaseController');
const { ErrorCodes } = require('../../../../config/ErrorCodes');
const { ContainerProvider } = require('../../../../core/container/ContainerProvider');

class FoodController extends BaseController {
    constructor(foodRepository){
        super();
        this._foodRepository = foodRepository;
    }
    async getFoodsAll(req, res, next){
        res.json(await this._foodRepository.getAllFoods());
        next();
    }
}

module.exports = FoodController;