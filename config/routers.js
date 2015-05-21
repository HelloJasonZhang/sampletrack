var index = require('../app/controllers/index');
var users = require('../app/controllers/users');


module.exports = function(app) {
    // Index
    app.get('/',index.index)

    //User
    app.get('/user', users.index)
}