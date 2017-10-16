const { ContainerProvider } = require('../container/ContainerProvider');
const _ = require('lodash');

class Acl {
    static isAllowed(req, res, next) {
        const routeManager = ContainerProvider.getContainer().get('route_manager');
        const role = routeManager.getRoute(req.method.toLowerCase(), req.route.path).acl;
        const sessionManager = ContainerProvider.getContainer().get('session_manager');

        if(role === 'guest') next();
        else {
            const sid = req.headers.sid || '';
            const session = sessionManager.getSession(sid);
            if(_.isNil(session)){
                res.status(403).json({
                   "message": "Not allowed",
                   "code": 2
                });
            } else {
                if(role === 'logged' && (session.data.role === 'admin' || session.data.role === 'logged')){
                    next();
                } else if(role === 'admin' && session.data.role === 'admin'){
                    next();
                } else {
                    res.status(403).json({
                        "message": "Not allowed",
                        "code": 2
                    });
                }
            }
        }
    }
}

module.exports = { Acl };