var express=require('express');
var dbo = require('./dbo');



var router=express.Router();


router.get("/", function (req,res)
{
    res.writeHead(200);
    res.end();
})

router.get("/api/goods", (req,res)=>{
    dbo.instanceDbo().getgoods((err, rez) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rez)
    })
})

router.get("/api/good/:id", (req, res)=>{

    dbo.instanceDbo().getGoodById(req.params.id, (err, vl) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.send(vl)
    })
})

router.post("/api/savegoods", (req, res)=>{
    dbo.instanceDbo().saveGoods(req.body, (err, rez) => {
            if (!err) res.send(rez)
        else {
                console.log(err)
                res.status(400).json({message: err})
            }
    });
})

router.get("/api/sprgoods", (req, res) => {
    dbo.instanceDbo().sprgoods((err, rez) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rez)
    })
})

router.get("/api/supplybyid/:id", (req, res) => {
    dbo.instanceDbo().getSupplyById(req.params.id, (err, rez) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rez)
    })
})

router.get("/api/supply/", (req, res) => {
    dbo.instanceDbo().getsupply(req.query,(err, rez) => {
        res.header("Access-Control-Allow-Origin", "*")
        if (err)
            console.log(err)
        else
            res.send(rez)
    })
})

router.delete("/api/supply/del/:id", (req,res)=>{
    dbo.instanceDbo().delSupply(req.params.id, (err,rez)=>{
        res.send(rez)
    })
    console.log('Delete id='+req.params.id)
})

router.get("/api/moving",(req, res)=>{
    dbo.instanceDbo().getMoving((err,rez)=>{ res.header("Access-Control-Allow-Origin", "*"); res.send(rez)}, req.query)
})

router.get("/api/movingsize", (req, res)=>{
    dbo.instanceDbo().getMovingSize((err,rez)=>{
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rez)
    })
})

router.post("/api/savemoving", (req, res)=>{
    dbo.instanceDbo().saveMoving(req.body, (err,rez)=>{
        if(!err) res.send("ok")
        else {
            console.log(err)
            res.status(500).send(err)
        }
    })
    console.log(req.body)
})

router.get("/api/move/:id", (req, res) => {
    dbo.instanceDbo().getMoveById(req.params.id, (err, rez) => { res.send(rez) })
})

router.get("/api/sprstatus", (req, res) => {
    dbo.instanceDbo().sprstatus((err, rez) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rez)
    })
})

router.post("/api/savesupply", function (req, res) {
    dbo.instanceDbo().saveSupply(req.body, (err, rez) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rez)
    })
})

router.get("/api/remains", (req,res)=>{
    dbo.instanceDbo().getRemains((err,rez)=>{
        res.header("Access-Control-Allow-Origin", "*")
        res.send(rez)
    })
})
module.exports = router;