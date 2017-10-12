var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CounterSchema = schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});

urlSchema.pre('save', function(next){
  var doc = this;
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error) return next(error);
      doc.created_at = new Date();
      doc._id = counter.seq;
      next();
  });
});

var url = mongoose.model('url', urlSchema);

module.exports = url;