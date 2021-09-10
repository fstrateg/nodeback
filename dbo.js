var mysql = require('mysql')
const configDb = require('./config')

class Database {
    conn;
    constructor() {
        this.conn = mysql.createConnection(configDb);

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

    sprgoods(res) {
        this.conn.query('select id,name from goods order by name', (err, result) => {
            res.send(result)
        });
    }

    sprstatus(res) {
        this.conn.query('select id,status,icon from good_status', (err, result) => { res.send(result) })
    }

    getgoodById(res, id) {
        this.conn.query('Select * from supply where id='+id,
            (err, result) => {
            res.send(result)
        });
        
    }

    getsupply(res) {
        this.conn.query('SELECT a.*,b.name good_name,s.icon FROM supply a LEFT JOIN goods b ON b.id = a.goods_id LEFT JOIN good_status s ON s.id = a.status_id',
            (err, result) => {
                res.send(result)
            })
    }

    saveSupply(res, rw) {
        const dat = rw.dat.substring(0, 10)
        var rw = { ...rw, dat }
        const columns = Object.keys(rw);
        const values = Object.values(rw);
        var query = ''
        query='update supply set ' + columns.join('=?,') + '=? where id=' + rw.id;
        this.conn.query(query,
            values,
            (err, result) => {
                if (!err) res.send('ok')
                else console.error(err);
            });
    }

}
module.exports = Database;