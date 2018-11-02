var mongoose = require('mongoose');
var data = require('./seed.js')
// var { username, password } = require('../config.js')

mongoose.connect(process.env.DB_PROVIDER || 'mongodb://127.0.0.1:27017/description')

// mongoose.connect(`mongodb://${username}:${password}@ds141972.mlab.com:41972/description`)

// if(process.env.MLAB_URI) {
//   mongoose.connect(process.env.MLAB_URI)
// } else {
//   mongoose.connect('mongodb://localhost/description');
// }

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  // seedDatabase();
  console.log('mongoose connected successfully');
});

var overviewSchema = mongoose.Schema({
  prod_name: String,
  specs: Array,
  included: Array,
  boxContent: Array,
  descriptionHeader: Array,
  description: Array,
  imageHeader: Array,
  images: Array,
  shippingDate: String,
  details: Array,
  html: String
});


var Overview = mongoose.model('Overview', overviewSchema);

var getOverviewData = (params) => {
  return Overview.find({prod_name: params});
}

var getHtmlData = (params) => {
  return overviewMain.find();
}

module.exports = {getOverviewData, getHtmlData, db, Overview};