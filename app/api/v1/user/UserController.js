const BaseController = require('../../../../core/controller/BaseController');
const SHA256 = require("crypto-js/sha256");
const { ErrorCodes } = require('../../../../config/ErrorCodes');
const { ContainerProvider } = require('../../../../core/container/ContainerProvider');

class UserController extends BaseController {
    constructor(userRepository){
        super();
        this._userRepository = userRepository;
    }

    async auth(req, res, next){
        const { login, password } = req.params;

        const user = await this._userRepository.matchUserByLoginAndPassword(login, password);
        const container = ContainerProvider.getContainer();
        const sessionManager = container.get('session_manager');

        if(user){
            const sid = sessionManager.createSession(user);

            res.status(200).json({
                "code": ErrorCodes.SUCCESS,
                "sid": sid
            });
        } else {
            res.status(400).json({
                "code": ErrorCodes.IDENTITY_FAILURE
            });
        }

        next();
    }

    async register(req, res, next) {
        const {login, password} = req.body;
        const userExists = await this._userRepository.userExists(login);

        if(userExists) {
            res.status(400).json({
                "code": ErrorCodes.USER_EXISTS
            });
        } else {
            const user = await this._userRepository.createUser(login, password);

            const container = ContainerProvider.getContainer();
            container.get('session_manager').createSession(user);

            res.status(200).json({
                "code": ErrorCodes.SUCCESS
            });
        }

        next();
    }
}

module.exports = UserController;