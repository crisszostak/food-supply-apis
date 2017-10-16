const {Acl} = require('../core/acl/Acl');

const CONFIG = {
    SEQUELIZE: {
        postgresURL: process.env.DATABASE_URL,
        externalConfig: {
            timestamp: false
        }
    },
    PORT: 8080,
    TOKEN: 'polsource',
    ACL_ALLOWED_METHOD: Acl.isAllowed,
    MODEL_PATH: __dirname + '/../app/model/',
    MODELS: {
        'salesforce': ['Food'],
        'public': ['User']
    },
    REPOSITORY_PATH: __dirname + '/../app/library/repository/',
    SESSION_EXPIRY_TIME: 100000
};

module.exports = { CONFIG };