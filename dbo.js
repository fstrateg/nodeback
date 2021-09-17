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

    getGoodById(res, id) {
        this.conn.query('Select * from goods where id='+id, (err, result) => {
            res.send(result)
        });
    }

    saveGoods(res, rw) {
        const columns = Object.keys(rw);
        const values = Object.values(rw);
        if (rw.id > 0)
            this.updateTable('goods',columns, values, rw.id, (err, data) => {
                if (!err) res.send('ok')
                else console.log(err)
            })
        else
            this.insertTable('goods' , columns, values, (err, data) => {
                if (!err) res.send('ok')
                else console.log(err)
            });
    }

    updateTable(table, columns, values, id, callback) {
        var query = ''
        query = 'update ' + table + ' set ' + columns.join('=?,') + '=? where id=' + id;
        this.conn.query(query,
            values, callback);
    }

    insertTable(table, columns, values, callback) {
        var query = ''
        query = 'insert into ' + table + ' set ' + columns.join('=?,') + '=?';
        console.log(query)
        this.conn.query(query,
            values, callback);
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
        this.conn.query('select * from v_supply',
            (err, result) => {
                res.send(result)
            })
    }

    saveSupply(res, rw) {
        const dat = rw.dat.substring(0, 10)
        var rw = { ...rw, dat }
        const columns = Object.keys(rw);
        const values = Object.values(rw);
        if (rw.id > 0)
            this.updateSupply(columns, values, res, rw);
        else
            this.insertSupply(columns, values, res, rw);
        
    }

    insertSupply(columns, values, res, rw) {
        var query = ''
        query = 'insert into supply set ' + columns.join('=?,') + '=?';
        console.log(columns)
        console.log(values)
        console.log(query);

        this.conn.query(query,
            values,
            (err, result) => {
                if (!err) res.send('ok')
                else console.error(err);
            });
    }

    updateSupply(columns, values, res, rw) {
        var query = ''
        query = 'update supply set ' + columns.join('=?,') + '=? where id=' + rw.id;
        this.conn.query(query,
            values,
            (err, result) => {
                if (!err) res.send('ok')
                else console.error(err);
            });
    }

}
module.exports = Database;