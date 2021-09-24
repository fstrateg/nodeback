const mysql = require('mysql')
const configDb = require('./config')

class Database {
    conn;
    sql;
    lastError;

    constructor() {
        this.conn = mysql.createConnection(configDb);
        this.conn.connect()
    }

    static instanceDbo() {
        return new Database();
    }

    getgoods(callb) {
        this.setQuery('Select * from goods').query(callb);
    }
    
    sprgoods(res) {
        this.conn.query('select id,name from goods order by name', (err, result) => {
            res.send(result)
        });
    }

    getGoodById(id, callb) {
        this.setQuery(`Select * from goods where id= ${id}`).query(callb);
    }

    validateGoods(rw)
    {
        this.lastError=''
        if (rw==undefined) {
            this.lastError='Goods is undefined!'
            return false
        }
        if (!rw.name) {
            this.lastError='Name is empty or undefined!'
            return false
        }
        if(!rw.name.trim()) {
            this.lastError='Name is empty or undefined!'
            return false
        }
        if (typeof rw.prep_defs!="number")
        {
            this.lastError='Prep service should be number!'
            return false
        }
        if (typeof rw.img_id!="number")
        {
            this.lastError='Image ID should be number!'
            return false
        }
        return true
    }

    saveGoods(rw,callb) {
        if (!this.validateGoods(rw))
        {
            callb(this.lastError,undefined)
            return;
        }
        const columns = Object.keys(rw);
        const values = Object.values(rw);
        if (rw.id > 0)
            this.updateTable('goods', columns, values, rw.id, callb)
        else
            this.insertTable('goods' , columns, values, callb);
    }

    updateTable(table, columns, values, id, callback) {
        let query = `update ${table}  set ${columns.join('=?,')}=? where id= ${id}`;
        this.conn.query(query,
            values, callback);
    }

    insertTable(table, columns, values, callback) {
        let query = `insert into ${table} set ${columns.join('=?,')}=?`;
        console.log(query)
        this.conn.query(query,
            values, callback);
    }

    sprstatus(callb) {
        this.setQuery('select id,status,icon from good_status').query(callb)
    }

    getSupplyById(id, callb) {
        this.setQuery(`Select * from supply where id=${id}`).query(callb)
    }

    getsupply(callb) {
        this.setQuery('select * from v_supply').query(callb)
    }

    saveSupply(rw, callb) {
        const dat = rw.dat.substring(0, 10)
        rw = {...rw, dat}
        const columns = Object.keys(rw);
        const values = Object.values(rw);
        if (rw.id > 0)
            this.updateTable('supply', columns, values, rw.id, callb)
        else
            this.insertTable('supply', columns, values, callb);

    }

    getMoving(callb)
    {
        this.getTable('v_moving', callb)
    }

    getMoveById(id, callb) {
        this.setQuery(`Select * from goods_moving where id=${id}`).query(callb)
    }

    setQuery(query) {
        this.sql = query
        return this
    }

    getRemains(callb) {
        this.getTable('v_goods_remains', callb)
    }

    query(callb) {
        this.conn.query(this.sql, callb)
    }

    getTable(table_name, callb) {
        this.setQuery(`Select * from ${table_name}`).query(callb)
    }
}
module.exports = Database;