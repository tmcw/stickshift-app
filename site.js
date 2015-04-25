var Stickshift = require('stickshift/stickshift.js');

var database = {
    mysql: require('./databases/mysql.js'),
    pg: require('./databases/pg.js')
};

/*database.mysql({
    host: 'localhost',
    user: 'root',
    database: 'examples'
} */

database.pg('postgres://tmcw@localhost/examples', function(err, client) {
    if (err) {
        return console.error(err);
    }
    Stickshift(document.getElementById('page'), {
      mapboxToken: 'pk.eyJ1IjoidG1jdyIsImEiOiJIZmRUQjRBIn0.lRARalfaGHnPdRcc-7QZYQ',
      endpoint: client.query
    });
});
