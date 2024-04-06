const crypto = require('crypto');

///sha224
function cryptoSha(password) {  
    //creating hash object 
    var hash = crypto.createHash('sha224');
    //passing the data to be hashed
    data = hash.update(password);
    //Creating the hash in the required format
    gen_hash= data.digest('hex');
    //Printing the output on the console
    console.log("hash : " + gen_hash);
    return gen_hash;
  }

  module.exports = { cryptoSha };