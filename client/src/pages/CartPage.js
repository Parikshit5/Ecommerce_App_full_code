import React, { useState,useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";



const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken,setClientToken]=useState("");
  const [instance,setInstance]=useState(null);
  const [loading,setLoading]=useState(false);
  

  //Total price
  const totalPrice = () => {
    try {
      let total=0;
        cart?.map(item=>(total = total+item.price))
        return total.toLocaleString("en-IN",{
            style:"currency",
            currency : "INR",
        });
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

 //get payment gateway token
 const getToken=async()=>{
  try {
    const response = await axios.get(`/api/v1/product/braintree/token`);
    setClientToken(response.data.clientToken);
  } catch (error) {
    console.log(error)
  }
 }

 useEffect(()=>{
  getToken();
 },[auth?.token])


//handle payments
const handlePayment=async()=>{
  try {
    setLoading(true)
    const {nonce}=await instance.requestPaymentMethod()
    const {data}=await axios.post(`/api/v1/product/braintree/payment`,{
      nonce,cart,
    })
    setLoading(false)
    localStorage.removeItem('cart')
    setCart([])
    navigate('/dashboard/user/orders')
    toast.success("Payment Done Successfully")
  } catch (error) {
    console.log(error)
    setLoading(false);
  }
}




  return (
    <Layout title={'Cart - MagnetMall'}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You have ${cart.length} items in you cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your cart is empty"}
            </h4>
        
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 card p-3 flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top img-fluid"
                    style={{
                      width: "100%",
                      height: "205px",
                    }}
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <>
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : <i className="fa fa-inr"></i> {p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button className="btn btn-warning"
                onClick={()=>navigate('/dashboard/user/profile')}
                >Update Address</button>
              </div>
              </>
            ) :
            (
              <div className="mb-3">
               {
                auth?.token ? (
                  <button type="button" class="btn btn-warning" 
                  onClick={()=>navigate('/dashboard/user/profile')}
                  >Update Address</button>
                ) : (
                  <button type="button" class="btn btn-warning" 
                  onClick={()=>navigate('/login',
                  {state:'/cart',}
                  )}
                  >Please Login to checkout </button>
                )
               } 
              </div>

            )
            } 
            {/* <button type="button" class="btn btn-warning mt-2" >Place Order</button> */}

            <div className="mt-2">
            {clientToken && cart.length > 0 && ( // Render DropIn only when clientToken is available
                <DropIn
                  options={{
                    authorization: clientToken,
                    
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              )}

              <button className="btn btn-primary mb-4"
              onClick={handlePayment}
              disabled={!cart.length || !auth?.user?.address} // Disable payment button if instance is not available
              >
               {loading?"Processing ....":"Make Payment"}
                </button>
            </div>



          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
