// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import { resetCart } from "../../redux/orebiSlice";
// import { emptyCart } from "../../assets/images/index";
// import ItemCard from "./ItemCard";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.orebiReducer.products);
//   const [totalAmt, setTotalAmt] = useState("");
//   const [shippingCharge, setShippingCharge] = useState("");
//   useEffect(() => {
//     let price = 0;
//     products.map((item) => {
//       price += item.price * item.quantity;
//       return price;
//     });
//     setTotalAmt(price);
//   }, [products]);
//   useEffect(() => {
//     if (totalAmt <= 200) {
//       setShippingCharge(30);
//     } else if (totalAmt <= 400) {
//       setShippingCharge(25);
//     } else if (totalAmt > 401) {
//       setShippingCharge(20);
//     }
//   }, [totalAmt]);
//   return (
//     <div className="max-w-container mx-auto px-4">
//       <Breadcrumbs title="Cart" />
//       {products.length > 0 ? (
//         <div className="pb-20">
//           <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
//             <h2 className="col-span-2">Product</h2>
//             <h2>Price</h2>
//             <h2>Quantity</h2>
//             <h2>Sub Total</h2>
//           </div>
//           <div className="mt-5">
//             {products.map((item) => (
//               <div key={item._id}>
//                 <ItemCard item={item} />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => dispatch(resetCart())}
//             className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
//           >
//             Reset cart
//           </button>

//           <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
//             <div className="flex items-center gap-4">
//               <input
//                 className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
//                 type="text"
//                 placeholder="Coupon Number"
//               />
//               <p className="text-sm mdl:text-base font-semibold">
//                 Apply Coupon
//               </p>
//             </div>
//             <p className="text-lg font-semibold">Update Cart</p>
//           </div>
//           <div className="max-w-7xl gap-4 flex justify-end mt-4">
//             <div className="w-96 flex flex-col gap-4">
//               <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
//               <div>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                   Subtotal
//                   <span className="font-semibold tracking-wide font-titleFont">
//                     ${totalAmt}
//                   </span>
//                 </p>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                   Shipping Charge
//                   <span className="font-semibold tracking-wide font-titleFont">
//                     ${shippingCharge}
//                   </span>
//                 </p>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
//                   Total
//                   <span className="font-bold tracking-wide text-lg font-titleFont">
//                     ${totalAmt + shippingCharge}
//                   </span>
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <Link to={{ pathname: "/paymentgateway", state: { data: products } }}>
//                   <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
//                     Proceed to Checkout
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
//         >
//           <div>
//             <img
//               className="w-80 rounded-lg p-4 mx-auto"
//               src={emptyCart}
//               alt="emptyCart"
//             />
//           </div>
//           <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//             <h1 className="font-titleFont text-xl font-bold uppercase">
//               Your Cart feels lonely.
//             </h1>
//             <p className="text-sm text-center px-10 -mt-2">
//               Your Shopping cart lives to serve. Give it purpose - fill it with
//               books, electronics, videos, etc. and make it happy.
//             </p>
//             <Link to="/shop">
//               <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//                 Continue Shopping
//               </button>
//             </Link>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom"; // Updated import
// import { motion } from "framer-motion";
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import { resetCart } from "../../redux/orebiSlice";
// import { emptyCart } from "../../assets/images/index";
// import ItemCard from "./ItemCard";
// import axios from "axios";

// const Cart = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Updated hook
//   const products = useSelector((state) => state.orebiReducer.products);
//   const [totalAmt, setTotalAmt] = useState(0);
//   const [shippingCharge, setShippingCharge] = useState(0);

//   useEffect(() => {
//     let price = 0;
//     products.map((item) => {
//       price += item.price * item.quantity;
//       return price;
//     });
//     setTotalAmt(price);
//   }, [products]);

//   useEffect(() => {
//     if (totalAmt <= 200) {
//       setShippingCharge(30);
//     } else if (totalAmt <= 400) {
//       setShippingCharge(25);
//     } else if (totalAmt > 401) {
//       setShippingCharge(20);
//     }
//   }, [totalAmt]);

//   const handleCheckout = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/order", {
//         products: products.map(product => ({
//           productId: product._id,
//           quantity: product.quantity
//         }))
//       });

//       const orderData = response.data;
//       navigate("/paymentgateway", { state: { data: orderData } }); // Updated navigation
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   return (
//     <div className="max-w-container mx-auto px-4">
//       <Breadcrumbs title="Cart" />
//       {products.length > 0 ? (
//         <div className="pb-20">
//           <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
//             <h2 className="col-span-2">Product</h2>
//             <h2>Price</h2>
//             <h2>Quantity</h2>
//             <h2>Sub Total</h2>
//           </div>
//           <div className="mt-5">
//             {products.map((item) => (
//               <div key={item._id}>
//                 <ItemCard item={item} />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => dispatch(resetCart())}
//             className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
//           >
//             Reset cart
//           </button>

//           <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
//             <div className="flex items-center gap-4">
//               <input
//                 className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
//                 type="text"
//                 placeholder="Coupon Number"
//               />
//               <p className="text-sm mdl:text-base font-semibold">
//                 Apply Coupon
//               </p>
//             </div>
//             <p className="text-lg font-semibold">Update Cart</p>
//           </div>
//           <div className="max-w-7xl gap-4 flex justify-end mt-4">
//             <div className="w-96 flex flex-col gap-4">
//               <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
//               <div>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                   Subtotal
//                   <span className="font-semibold tracking-wide font-titleFont">
//                     ${totalAmt}
//                   </span>
//                 </p>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
//                   Shipping Charge
//                   <span className="font-semibold tracking-wide font-titleFont">
//                     ${shippingCharge}
//                   </span>
//                 </p>
//                 <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
//                   Total
//                   <span className="font-bold tracking-wide text-lg font-titleFont">
//                     ${totalAmt + shippingCharge}
//                   </span>
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <button
//                   onClick={handleCheckout}
//                   className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
//                 >
//                   Proceed to Checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <motion.div
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.4 }}
//           className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
//         >
//           <div>
//             <img
//               className="w-80 rounded-lg p-4 mx-auto"
//               src={emptyCart}
//               alt="emptyCart"
//             />
//           </div>
//           <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
//             <h1 className="font-titleFont text-xl font-bold uppercase">
//               Your Cart feels lonely.
//             </h1>
//             <p className="text-sm text-center px-10 -mt-2">
//               Your Shopping cart lives to serve. Give it purpose - fill it with
//               Home Decoration items and make it happy.
//             </p>
//             <Link to="/shop">
//               <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
//                 Continue Shopping
//               </button>
//             </Link>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import {toast} from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState(0.00);
  const [shippingCharge, setShippingCharge] = useState(0.00);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);
  useEffect(() => {
    // if (totalAmt <= 200) {
    //   setShippingCharge(1);
    // } 
    // // else if (totalAmt <= 400) {
    // //   setShippingCharge(25);
    // // } 
    // else if (totalAmt > 201) {
    //   setShippingCharge(10);
    // }
    let price = 0;
    products.map((item) => {
      price += (item.price*0.17) * item.quantity;
      return price;
    });
    setShippingCharge(parseFloat(price.toFixed(2)))
  }, [totalAmt]);

  const applyCode = () => {
    if (couponCode === "3456") {
      const discountAmount = totalAmt * 0.1;
      setDiscount(discountAmount);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };
  const placeOrder = async() => {
    try {
      console.log(products.length === 0 ? "Return problem" : "No");
      let response = await axios.post("http://localhost:8000/order/place", {
        products: products,
        amountBeforeTax:totalAmt,
        totalAfterTax: totalAmt + shippingCharge
      }, {
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      });
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const handlePayment = async () => {

    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      try {
        console.log("Requesting MetaMask accounts...");
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          alert("Please connect to MetaMask.");
          return;
        }
        const account = accounts[0];
        console.log("MetaMask account:", account);
        // await placeOrder();
        const totalAmountInEth = web3.utils.toWei(
          ((totalAmt + shippingCharge) / 1000).toString(),
          "ether"
        );
        console.log("Total amount in ETH:", totalAmountInEth);
  
        const balance = await web3.eth.getBalance(account);
        console.log("Account balance in Wei:", balance);
        const balanceInEth = web3.utils.fromWei(balance, "ether");
        console.log("Account balance in ETH:", balanceInEth);
  
        // Check if the account has enough balance
        if (parseFloat(balanceInEth) < parseFloat(web3.utils.fromWei(totalAmountInEth, "ether"))) {
          alert("Insufficient funds for transaction!");
          return;
        }
  
        const transactionParameters = {
          from: account,
          to: "0x46F13F95a4E8831C5000cacd32322c0ceEC8F7a1", // Replace with your wallet address
          value: totalAmountInEth,
          gas: 21000, // You may need to adjust this value
        };
  
        console.log("Sending transaction with parameters:", transactionParameters);
  
        await web3.eth.sendTransaction(transactionParameters);
  
        alert("Payment successful!");
        setIsCart(true);
        if(isCart === true){
          dispatch(resetCart());
        }
        
        
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed! See console for details.");
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };
  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PRAPv03Z4tzZiMX1RV5qtglAeWjlaX6J1tmN4wLokUSuLRbyplAN53w6RoeiYkmcSD5Wk4cCYsiRUgxrE0eb9F600TRs1I1h5");
    console.log(products);
    const body = {
      products: products,
      totalAmount: totalAmt + shippingCharge
    }
    const headers = {
      "Content-Type":"application/json"
    }
    await placeOrder();
    const response = await fetch('http://localhost:8000/stripe/create-checkout-session', {
      method: "POST",
      headers: headers,
      body:JSON.stringify(body)
    })
    if (!response.ok) {
      console.error('Error:', response.statusText);
      throw new Error('Network response was not ok');
    }  

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId:session.id
    })
    
  }



  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Product</h2>
            <h2>Price</h2>
            <h2>Quantity</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset cart
          </button>

          {/* <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </div>
            <button className="text-lg font-semibold text-sm mdl:text-base font-semibold"
            onClick={applyCode}>Update Cart</button>
          </div> */}
           <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Tax
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                  ${(totalAmt + shippingCharge)}
                  </span>
                </p>
              </div>
              {/* <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button onClick={handlePayment}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 ">
                    Pay With MetaMask
                  </button>
                </Link>
              </div> */}
              <div className="flex justify-end">
                  <button onClick={handlePayment}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 ">
                    Pay With Metamask
                  </button>
              </div>
              <div className="flex justify-end">
                  <button onClick={makePayment}
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 ">
                    Pay With Card
                  </button>
              </div>
              

            </div>
        //   </div>
        // </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              more products. and make it happy.
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;












