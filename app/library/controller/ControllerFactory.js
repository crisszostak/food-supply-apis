const path = "../../api/v1/";
const UserController = require(path + 'user/UserController.js');
const FoodController = require(path + 'food/FoodController.js');
const { ContainerProvider } = require('../../../core/container/ContainerProvider');

class ControllerFactory {
    static createController(key){
        const container = ContainerProvider.getContainer();
        switch(key){
            case 'user':
                return new UserController(container.get('user_repository'));
                break;
            case 'food':
                return new FoodController(container.get('food_repository'));
                break;
            default:
                throw new Error('Controller : ' + key + ' not exist');
        }
    }
}

module.exports = { ControllerFactory };