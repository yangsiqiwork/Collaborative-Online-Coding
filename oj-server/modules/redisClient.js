const redis = require('redis');

// create a Redis client
const client = redis.createClient({legacyMode: true});

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));

// handle Redis client errors
client.on('error', (err) => {
    console.log('Redis Client Error', err);
  });
  
  function set(key, value, callback) {
    client.set(key, value, (err, reply) => {
      if (err) {
        console.log(err);
        return;
      } 
        callback(reply);
    });
  }
  
  function get(key, callback) {
    client.get(key, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
        callback(res);
    });
  }
  
  function expire(key, timeInSeconds) { 
    client.expire(key, timeInSeconds);
  }
  
  function quit() {
    client.quit(); 
  }
  
  module.exports = {
    set: set,
    get: get,
    expire: expire,
    quit: quit,
    redisPrint: redis.print
  };