var express=require('express');
var dbo=require('./dbo');

var router=express.Router();


router.get("/", function (req,res)
{
    res.writeHead(200);
    res.end();
})

router.get("/api/goods", function (req,res) {
    var db=new dbo();
    db.getgoods(res);
})

router.get("/api/supply", function (req, res) {
    var db = new dbo();
    db.getsupply(res);
})

/*conn.end((err)=>{
    if (err)
        console.log(err);
});*/

module.exports = router;