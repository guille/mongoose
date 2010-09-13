var assert = require('assert');

function now(){
  return Math.round(Date.now() + Math.random() * 100);
};

function timeout(goose){
  return setTimeout(function(){
    assert.ok(false, 'Connection timeout');
  });
}

module.exports = {
  
  'test connecting to mongodb': function(){
    var mongoose = require('../'),
        timer = timeout(mongoose);
    mongoose.connect('mongodb://localhost/' + now(), function(){
      clearTimeout(timer);
      assert.ok(mongoose.connected, 'Connected using uri / callback signature');
      
      mongoose.disconnect();
      assert.ok(!mongoose.disconnected);
      
      var timer = timeout(mongoose);
      mongoose.connect('mongodb://localhost/' + now(), { some: 'option' }, function(){
        clearTimeout(timer);
        assert.ok(mongoose.connected, 'Connected using uri / options / callback signature');
        mongoose.disconnect();
      })
    });
  }
  
};