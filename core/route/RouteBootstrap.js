const { BootstrapInterface } = require('../bootstrap/BootstrapInterface');
const { CONFIG } = require('../../config/Config');
const { ContainerProvider } = require('../container/ContainerProvider');
const { RouteManager } = require('./RouteManager');

class RouteBootstrap extends BootstrapInterface {
    static async run(app){
        const container = ContainerProvider.getContainer();
        const routeTable = require('../../config/RouteTable').RouteTable;
        RouteBootstrap._app = app;

        for(const method in routeTable){
            if(!routeTable.hasOwnProperty(method)){
                return;
            }

            for(const route of routeTable[method]){
                RouteBootstrap.createRoutes(method, route);
            }
        }


        const routeManager = new RouteManager(RouteBootstrap.routeMap);
        container.set('route_manager', routeManager);

        console.log(RouteBootstrap.routeMap);
    }

    static createRoute(method, parent, route){
        if(route.acl === undefined){
            if(parent.acl === undefined){
                parent.acl = 'logged';
            } else {
                route.acl = parent.acl;
            }
        }

        if(parent === null) {
            RouteBootstrap.finallyCreateRoute(method, route.path, route);
        } else {
            RouteBootstrap.finallyCreateRoute(method, parent.path + route.path, route);
        }
    }

    static finallyCreateRoute(method, path, route){
        const app = RouteBootstrap._app;

        if (method === "get") {
            let str = "";

            if(route.args !== undefined && route.args.length > 0){
                if(route.args.length === 1){
                    if(path[path.length - 1] === '/'){
                        str = ":" + route.args[0]
                    } else {
                        str = "/:" + route.args[0];
                    }
                } else {
                    str = "/:" + route.args.join("/:");
                }
            }
            path += str;
            app.get(path, CONFIG.ACL_ALLOWED_METHOD);
            app.get(path, ...route.actions);
        } else if (method === "post") {
            app.post(path, CONFIG.ACL_ALLOWED_METHOD);
            app.post(path, ...route.actions);
        }

        if(RouteBootstrap.routeMap[method] === undefined) RouteBootstrap.routeMap[method] = [];
        RouteBootstrap.routeMap[method][path] = route;
    }

    static createRoutes(method, data){
        if(data.child === undefined){
            RouteBootstrap.createRoute(method, null, data);
        } else {
            for(const route of data.child){
                RouteBootstrap.createRoute(method, data, route);
            }
        }
    }

    static getRequired(){
        return ['app'];
    }
}

RouteBootstrap.routeMap = [];

module.exports = { RouteBootstrap };