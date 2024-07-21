import userModal from "../models/userModel.js"

// Add Items to usebCart
const addToCart = async (req,res)=>{
    try {
        let userData = await userModal.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1
        }
        await userModal.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item Added to Cart"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to  Add to Cart"})
        
    }

}

// Remove items from user Cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModal.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
             await userModal.findByIdAndUpdate(req.body.userId,{cartData});
            res.json({ success: true, message: "Item removed from Cart" });
        } else {
            res.json({ success: false, message: "Item not found in Cart" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to remove the item" });
    }
}



// fetch UserCart Data
const getCart = async(req,res)=>{
    try {
        let useData = await userModal.findById(req.body.userId);
        let cartData = await useData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"failed to fetch the Data from the Cart"})
    }
    
}

export {addToCart,removeFromCart,getCart}