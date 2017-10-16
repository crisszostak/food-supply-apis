const { BootstrapInterface } = require('../bootstrap/BootstrapInterface');
const { ContainerProvider } = require('../container/ContainerProvider');
const { CONFIG } = require('../../config/Config');
const { ControllerFactory } = require('../../app/library/controller/ControllerFactory');
const fs = require('fs-extra');

class RepositoryBootstrap extends BootstrapInterface {
    static async run(){
        const path = CONFIG.REPOSITORY_PATH;
        const pathExists = await fs.pathExists(path);

        if(!pathExists){
            return;
        }
        const files = await fs.readdir(path);

        const container = ContainerProvider.getContainer();

        const dbManager = container.get('database_manager');

        for(const file of files){
            const object = require(path + file.toString());
            if(!object.hasOwnProperty('repository')) continue;

            const key = file.replace(/([A-Z])/g, ' $1').trim().split('.')[0].replace(" ", "_").toLowerCase();
            const instance = new object.repository();

            if(instance.getModelName) instance.setModel(dbManager.getModel(instance.getModelName()));
            else continue;

            container.set(key, instance);
        }

        CONFIG.CONTROLLER_FACTORY = ControllerFactory;
    }
}

module.exports = { RepositoryBootstrap };