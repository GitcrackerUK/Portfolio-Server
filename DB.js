const mongoose = require('mongoose');

function DB(url, var_name){
    console.log(`DB - url:${url}`);
    console.log(`DB - var_name:${var_name}`);
    const connection =  mongoose.createConnection(url, {
        // (node:9612) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
        // removes deprecation 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    });

    connection.once('open', () => {
        console.log(`----MongoDB database connection to ${var_name} established successfully!!`);
    });

    return connection
}

module.exports = DB