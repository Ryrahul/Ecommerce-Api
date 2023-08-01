const Cart=require("../db/models/CartSchema")
const Order=require("../db/models/OrderSchema")

const addToOrder=async(req,res)=>{
   
    console.log(req.user)
    res.send("hi")
}
module.exports=addToOrder