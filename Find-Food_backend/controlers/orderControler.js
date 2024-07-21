import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import  Stripe  from "stripe"


// Placing User Order from Frontend
const stripe = new Stripe("sk_test_51PeevY2Lz1xusNQA9ulKYi4zo1CZrncUYlDKHTc5zo07CjaLRbMrgwNVuRNMdapjvR2TRamGaGowl9ydsjPPB3WL00EH6fHfV7")
const frontend_url = "http://localhost:5173"

const placeOrder = async(req,res)=>{
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity,
          }));
          
          line_items.push({
            price_data: {
              currency: "inr",
              product_data: {
                name: "Delivery Charges",
              },
              unit_amount: 2 * 100 * 80,
            },
            quantity: 1,
          });

          const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?sucess=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?sucess=false&orderId=${newOrder._id}`,
          })
          res.json({success:true,session_url:session.url})
          
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"something Went wrong"})
    }


}

const verifyOrder = async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Someting webt wrong while checking the payment"})

        
    }

}

const userOrder =  async (req,res)=>{
  try {
    
    const orders=await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Unable to feth the order details"})

    
  }
}

// Listing orders for admin panel
const listOrders = async (req,res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Enable to fetch the list of Order"})
    
  }
}
// api for updating orderStatus
const updateStatus = async (req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({success:true,message:"Status Updated Successfully"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Failed to  Updated Status"})
  }
}

export {placeOrder,verifyOrder,userOrder,listOrders,updateStatus};