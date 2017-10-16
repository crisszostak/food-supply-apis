const SHA256 = require("crypto-js/sha256");

class UserRepository {
    getModelName(){
        return 'User';
    }

    setModel(model){
        this._model = model;
    }

    async userExists(login){
        if(!login || login === '') return false;
        const user = await this._model.count({
            where: {
                login: login
            }
        });

        return (user === 1);
    }

    async matchUserByLoginAndPassword(login, password){
        const user = await this._model.findOne({where: { login: login, password: SHA256(password).toString() }});

        return user;
    }

    async createUser(username, password){
        const user =  await this._model.create({ login: username, password: SHA256(password).toString() });

        return user;
    }
}

module.exports = {repository: UserRepository };