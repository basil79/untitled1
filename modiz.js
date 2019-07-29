//'use strict';

var mysql = require('mysql');

class SqlParam {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class JDBCClient {
    createShared(config) {
        if(this.conn == undefined) {
            this.conn = mysql.createConnection(config);
            this.conn.connect((err) => {
                if (err) {
                    console.log('Error connection to MySQL');
                    return;
                }
                console.log('Connection established');
            });
        }
        return this;
    }
    getConnection(callback) {
        if(callback != undefined
            && typeof callback == 'function') {
            callback(this.conn);
        }
    }
    close() {
        this.conn.end((err) => {
            // The connection is terminated gracefully
            // Ensure all previously enqueued are still
            // before sending a COM_QUIT packet to the MySQL server
        });
    }
}

class JDBCRepository {
    constructor(jdbcClient) {
        this.jdbcClient = jdbcClient;
    }
    procedureQuery(procedureName, params, callback) {
        let query = `CALL ${procedureName}(${params.map(() => '?')})`;
        this.jdbcClient.getConnection(function(conn) {
            // check conn
            conn.query(query, params.map(param => param.value), (err, rows) => {
                //if(err) throw err;
                //console.log('Data received from MySQL\n');
                if(callback != undefined
                    && typeof callback == 'function') {
                    callback(err, rows);
                }
            });

        });
    }
}



const ID = "$id";
const PORTAL_ID = "$portal_id";
const URI = "$uri";
const FROM = "$from";
const SIZE = "$size";
const SORT_COLUMN = "$sort_column";
const SORT_ORDER = "$sort_order";

class PagesRepository extends JDBCRepository {
    constructor(jdbcClient) {
        super(jdbcClient);
    }
    get(id, portalId, uri, callback) {

        this.procedureQuery('get_pages', [
            new SqlParam(ID, id),
            new SqlParam(PORTAL_ID, portalId),
            new SqlParam(URI, uri),
            new SqlParam(FROM, null),
            new SqlParam(SIZE, null),
            new SqlParam(SORT_COLUMN, null),
            new SqlParam(SORT_ORDER, null)
        ], function(err, rows) {

            //if(err) throw err;

            /*
            console.log("OK get()");
            console.log(rows[0].length);

            rows[0].forEach((row) => {
                console.log(row.uri);
            });
            */

            if(callback != undefined
                && typeof callback == 'function') {
                callback(err, rows);
            }

        });
    }
    getMany(id, portalId, uri, from, size, sortColumn, sortOrder, callback) {

        this.procedureQuery('get_pages', [
            new SqlParam(ID, id),
            new SqlParam(PORTAL_ID, portalId),
            new SqlParam(URI, uri),
            new SqlParam(FROM, from),
            new SqlParam(SIZE, size),
            new SqlParam(SORT_COLUMN, sortColumn),
            new SqlParam(SORT_ORDER, sortOrder)
        ], function(err, rows) {
            if(err) throw err;

            /*
            console.log("OK getMany()");
            console.log(rows[0].length);

            rows[0].forEach((row) => {
                console.log(row.uri);
            });
            */

            if(callback != undefined
                && typeof callback == 'function') {
                callback(err, rows);
            }

        });

    }
}



var jdbcClient = new JDBCClient();

class Modiz {
    constructor(config) {
        this.config = config;
    }
    pages() {
        let pagesRepository = new PagesRepository(jdbcClient.createShared(this.getJDBCClientConfig(this.config)));
        return pagesRepository;
    }
    getJDBCDefaultClientConfig() {
        return {
            host : "localhost",
            user : "root",
            password : "glb21aas",
            database : "modiz",
            multipleStatements : true
        }
    }
    getJDBCClientConfig(config) {
        let jdbcConfig = config.jdbc;
        if(jdbcConfig == undefined) {
            return this.getJDBCDefaultClientConfig()
        }
        return jdbcConfig;
    }
    toString() {
        return JSON.stringify(this.config);
    }
}

module.exports = Modiz;

