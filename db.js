var mongoose = require('mongoose');
var config = require('./config')

const options = {
    useNewUrlParser: true,
    user : config['mongo']['user'],
    pass: config['mongo']['pass']
  };
//   mongoose.connect(uri, options);
const mongouri = "mongodb://"+config['mongo']['host']+':'+config['mongo']['port']+'/'+config['mongo']['db']+'?authSource='+config['mongo']['authDb']
mongoose.Promise = global.Promise;
mongoose.connect(mongouri, options)
  .then(() =>  console.log('Successfully connected to mongodb'))
  .catch((err) => console.error(err));