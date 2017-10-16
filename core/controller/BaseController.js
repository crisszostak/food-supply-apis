const { Container } = require('../container/Container');
const { RouteResponseUtil } = require('../util/RouteResponseUtil');

class BaseController {
    getContainer(){
        return Container;
    }

    async init(){ }

    getModel(key){
        return Container.get('database_manager').getModel(key);
    }

    getSequelize(){
        return Container.get('database_manager').getSequelize();
    }

   getRouteResponseUtil(){
        return RouteResponseUtil;
    }
}

module.exports = BaseController;