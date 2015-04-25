var Stickshift = require('stickshift/stickshift.js');


var database = {
    mysql: require('./databases/mysql.js')
};

console.log('connecting');

database.mysql({
    host: 'localhost',
    user: 'root',
    database: 'examples'
}, function(err, client) {
    if (err) {
        return console.error(err);
    }
    Stickshift(document.getElementById('page'), {
      mapboxToken: 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ',
      endpoint: client.query
    });
});
