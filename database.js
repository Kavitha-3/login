const {connect} = require('mongoose');

const DBConnection =() =>{
    return connect('mongodb://localhost/user', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    }
    
    module.exports={
      DBConnection
    }