var express=require('express');
const { Types } = require('mysql');
var dbo = require('./dbo');

var router=express.Router();


router.get("/", function (req,res)
{
    res.writeHead(200);
    res.end();
})

router.get("/api/goods", (req,res)=>{
    dbo.instanceDbo().getgoods((err, rez) => {
        res.send(rez)
    })
})

router.get("/api/good/:id", (req, res)=>{

    dbo.instanceDbo().getGoodById(req.params.id, (err, vl) => {
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
    dbo.instanceDbo().getgoods((err, rez) => {
        res.send(rez)
    })
})

router.get("/api/supplybyid/:id", (req, res) => {
    dbo.instanceDbo().getSupplyById(req.params.id, (err, rez) => {
        res.send(rez)
    })
})

router.get("/api/supply", (req, res) => {
    dbo.instanceDbo().getsupply((err, rez) => { res.send(rez) })
})

router.get("/api/sprstatus", (req, res) => {
    dbo.instanceDbo().sprstatus((err, rez) => {
        res.send(rez)
    })
})

router.post("/api/savesupply", function (req, res) {
    dbo.instanceDbo().saveSupply(req.body, (err, rez) => {
        res.send(rez)
    })
})

module.exports = router;