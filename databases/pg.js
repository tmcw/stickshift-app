var pg = require('pg');

/**
 * @param {string} connectionString
 * @param {Function} callback
 */
function PGDatabase(connectionString, callback) {
    pg.connect(connectionString, function(connectionError, connection) {
        if (connectionError) return callback(connectionError);

        return callback(null, {
            /**
             * @param {String} sql query
             * @param {Function} callback
             */
            query: function(sql, queryCallback) {
                connection.query(sql, function(err, result) {
                    if (err) {
                        console.error(err);
                        return queryCallback(err);
                    }
                    queryCallback(err, result.rows);
                });
            }
        });
    });
}

module.exports = PGDatabase;
