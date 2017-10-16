const _ = require('lodash');
const { CONFIG } = require('../../config/Config');

class ItemNotFoundError extends Error { }

class Container {
    constructor(){
        this._items = [];
    }

    get(key){
        if(_.isNil(this._items[key])){
            throw new ItemNotFoundError('Item not found: ' + key);
        }

        return this._items[key];
    }

    set(key, val){
        this._items[key] = val;
    }
}

module.exports = { Container, ItemNotFoundError };