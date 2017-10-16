const { Session } = require('./Session');
const _ = require('lodash');
const SHA256 = require('crypto-js/sha256');

class SessionManager {
    constructor(){
        this._sessions = {};
    }

    expirySessions(){
        const temporarySessions = {};

        _.forEach(this._sessions, (session, sessionKey) => {
            if(session.expiryTime >= new Date()){
                temporarySessions[sessionKey] = session;
            }
        });

        this._sessions = temporarySessions;
    }

    generateSID(){
        return SHA256(new Date().toUTCString()).toString();
    }

    createSession(user){
        const SID = this.generateSID();
        this._sessions[SID] = new Session(user);

        return SID;
    }

    getSession(SID){
        if(_.isNil(this._sessions[SID])){
            return false;
        }

        return this._sessions[SID];
    }
}

module.exports = { SessionManager };