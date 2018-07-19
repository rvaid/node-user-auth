const PropertiesReader = require('properties-reader')
const properties = PropertiesReader('./app.properties')

config = {
    'secret' : properties.get('secret'),
    'apiAccess' : {
                    '/api/user/balanced': ['admin', 'user'], 
                    '/api/user/delete': ['admin'],
                    '/api/user/all': ['admin']
                       
    },
    'mongo' : {
        'host' : properties.get('mongodb_host'),
        'port' : properties.get('mongodb_port'),
        'user': properties.get('mongodb_username'),
        'pass': properties.get('mongodb_password'),
        'authDb' : properties.get('mongodb_authdb'),
        'db' : properties.get('mongodb_db')
    }
}




module.exports = config