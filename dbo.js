var mysql = require('mysql');

class Database {
    conn;
    constructor() {
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'sellena',
            password: 'Bynthytn142'
        });

        this.conn.connect(err => {
            if (err) {
                console.log(err);
                return err;
            }
        });
    }

    getgoods(res) {
        this.conn.query('Select * from goods', (err, result) => {
            res.send(result)
        });
    }

    getsupply(res) {
        this.conn.query('SELECT a.*,b.name good_name,s.icon FROM supply a LEFT JOIN goods b ON b.id = a.goods_id LEFT JOIN good_status s ON s.id = a.status_id',
            (err, result) => {
                res.send(result)
            })
    }


}
module.exports = Database;