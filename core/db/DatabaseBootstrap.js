const { BootstrapInterface } = require('../bootstrap/BootstrapInterface');
const { ContainerProvider } = require('../container/ContainerProvider');
const { Sequelize } = require('sequelize');
const { CONFIG } = require('../../config/Config');
const { DatabaseManager } = require('./DatabaseManager');

class DatabaseBootstrap extends BootstrapInterface {
    static async run(){
        const sequelize = new Sequelize(CONFIG.SEQUELIZE.postgresURL, {
            dialectOptions: {
                ssl: true
            },
            timestamps: false,
        });

        const models = [];

        for(const key in CONFIG.MODELS){
            for(const model of CONFIG.MODELS[key]){
                models[model] = sequelize.import(CONFIG.MODEL_PATH + key + '/' + model);
            }
        }


        const container = ContainerProvider.getContainer();
        const databaseManager = new DatabaseManager(sequelize, models);
        container.set('database_manager', databaseManager);
    }
}

module.exports = { DatabaseBootstrap };