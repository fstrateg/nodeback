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

router.get("/api/sprgoods", function (req, res) {
    var db = new dbo();
    db.getgoods(res);
}
)

router.get("/api/supplybyid/:id", function (req, res) {
    var db = new dbo();
    console.log(req.params.id);
    //db.getgoods(res);
    db.getgoodById(res, req.params.id);
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