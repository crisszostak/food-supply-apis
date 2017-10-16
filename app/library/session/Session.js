class Session {
    constructor(user) {
        this._user = user || {};
        let date = new Date();
        date = new Date(date.getTime() + 500000).getTime();
        this._expiryTime = date;
        this._user = user;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
    }

    get expiryTime() {
        return this._expiryTime;
    }

    set expiryTime(value) {
        this._expiryTime = value;
    }
}

module.exports = { Session };