var mysql = require('mysql');

/**
 * Config requires host, user, password
 *
 * @param {Object} config
 * @param {Function} callback
 */
function MySQLDatabase(config, callback) {
    var connection = mysql.createConnection(config);

    connection.connect(function(connectionError) {
        if (connectionError) return callback(connectionError);

        return callback(null, {
            /**
             * @param {String} sql query
             * @param {Function} callback
             */
            query: function(sql, queryCallback) {
                connection.query(sql, function(err, rows) {
                    if (err) {
                        console.error(err);
                        return queryCallback(err);
                    }
                    queryCallback(err, rows);
                });
            }
        });
    });
}

module.exports = MySQLDatabase;
