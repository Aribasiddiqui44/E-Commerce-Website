import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { LuHeartOff } from "react-icons/lu";
import { IoHeartDislike } from "react-icons/io5";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const Product = (props) => {
  const dispatch = useDispatch();
  // const _id = props.productName;
  // const idString = (_id) => {
  //   return String(_id).toLowerCase().split(" ").join("");
  // };
  // const rootId = idString(_id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${props.productName}`, {
      state: {
        item: productItem,
      },
    });
    // make ApI call here.
  };

  const handleWishList = async () => {
    
    try {
      // let response = await axios.post('http://localhost:8000/wishlist/patch', {
        //   productId: props._id,
        // })
        
        if ( Cookies.get('accessToken')){
          
          const response = await axios.patch("http://localhost:8000/wishlist/patch",
            {
              productId: props._id
            },
            {
            headers: {
              Authorization: `Bearer ${Cookies.get('accessToken')}`
              // Cookies: {accessToken: Cookies.get('accessToken') }
            }
          });
          console.log(response);
          toast.success(`${props.productName} is added to Favourites`);
          setWishList(response.data.data.products);
          // console.log(wishList);
          
        } else {
      toast.error("Login to add item to wishlist.");
    }
   } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    
      try {
        // let response = await axios.post('http://localhost:8000/wishlist/patch', {
          //   productId: props._id,
          // })
          
          if ( Cookies.get('accessToken')){
            
            const response = await axios.patch("http://localhost:8000/wishlist/patch/remove",
              {
                productId: props._id
              },
              {
              headers: {
                Authorization: `Bearer ${Cookies.get('accessToken')}`
                // Cookies: {accessToken: Cookies.get('accessToken') }
              }
            });
            console.log(response);
            toast.success(`${props.productName} is removed from Favourites`);
            setWishList(response.data.data.products);
            // console.log(wishList);
            
          } else {
        toast.error("Login to remove item from wishlist.");
      }
     } catch (error) {
        toast.error(error.message);
      }

  }

  const availability = props.quantity > 0 ? 
  { color: 'green', text: 'In Stock' }
  : { color: 'red', text: 'Out of Stock' };

  return (
    <div className="flex flex-row flex-wrap">
      <div className="w-full relative group">
        <div className="max-w-80 max-h-90 relative overflow-y-hidden ">
          <div onClick={handleProductDetails}>
            <Image className="w-full h-full" imgSrc={props.img} />
          </div>
          <div className="absolute top-6 left-8">
            {props.badge && <Badge text="New" />}
          </div>
          <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
            <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
              {/* <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                Compare
                <span>
                  <GiReturnArrow />
                </span>
              </li> */}
              <li
                onClick={() =>
                  props.quantity > 0
                    ? dispatch(
                        addToCart({
                          _id: props._id,
                          name: props.productName,
                          quantity: 1,
                          image: props.img,
                          badge: props.badge,
                          price: props.price,
                          colors: props.color,
                        })
                      )
                    : null
                }
                className={`text-sm font-normal border-b-[1px] border-b-gray-200 flex items-center 
                  justify-end gap-2 pb-1 duration-300 w-full ${
                  props.quantity > 0
                    ? "hover:text-primeColor hover:border-b-primeColor hover:cursor-pointer"
                    : "text-gray-400 border-b-gray-300 cursor-not-allowed"
                }`}
              >
                Add to Cart
                <span>
                  <FaShoppingCart />
                </span>
              </li>
              {/* <li
                onClick={handleProductDetails}
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                View Details
                <span className="text-lg">
                  <MdOutlineLabelImportant />
                </span>
              </li> */}
              {/* <li
                onClick={handleWishList}
                className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
              >
                Add to Wish List
                <span>
                  <BsSuitHeartFill />
                </span>
              </li> */}
              {!props.isWishlistPage ? (
                <li
                  onClick={handleWishList}
                  className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                >
                  Add to Wish List
                  <span>
                    <BsSuitHeartFill />
                  </span>
                </li>
              ) : (
                <li
                  onClick={handleRemoveFromWishlist}
                  className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
                >
                  Remove from Wish List
                  <span>
                    {/* <BsSuitHeartFill /> */}
                    {/* <LuHeartOff /> */}
                    <IoHeartDislike />
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
          <div className="flex items-center justify-between font-titleFont">
            <h2 className="text-lg text-primeColor font-bold">
              {props.productName}
            </h2>
            <p className="text-[#767676] text-[14px]">${props.price}</p>
          </div>
          <div>
            <p className="text-[#767676] text-[14px]">{props.color}</p>
          </div>
          <div>
            <p 
              className={`text-[${availability.color}] text-[14px] font-bold`}
              style={{ color: availability.color }}
            >
              {availability.text}
            </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Product;




// before current product

// import React, { useState } from "react";
// import { BsSuitHeartFill } from "react-icons/bs";
// import { GiReturnArrow } from "react-icons/gi";
// import { FaShoppingCart } from "react-icons/fa";
// import { MdOutlineLabelImportant } from "react-icons/md";
// import Image from "../../designLayouts/Image";
// import Badge from "./Badge";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../../redux/orebiSlice";
// import { toast } from "react-toastify";

// const Product = (props) => {
//   const dispatch = useDispatch();
//   const _id = props.productName;
//   const idString = (_id) => {
//     return String(_id).toLowerCase().split(" ").join("");
//   };
//   const rootId = idString(_id);
//   const [wishList, setWishList] = useState([]);
//   const navigate = useNavigate();
//   const productItem = props;
//   const handleProductDetails = () => {
//     navigate(`/product/${rootId}`, {
//       state: {
//         item: productItem,
//       },
//     });
//     // make ApI call here.
//   };

//   const handleWishList = () => {
//     toast.success("Product add to wish List");
//     setWishList(wishList.push(props));
//     console.log(wishList);
//   };
//   return (
//     <div className="max-w-80 relative group">
//       <div className="max-w-80 max-h-80 relative overflow-y-hidden">
//         <div onClick={handleProductDetails}>
//           <Image className="w-full h-full" imgSrc={props.img} />
//         </div>
//         {/* <div className="absolute top-6 left-8">
//           {props.badge && <Badge text="New" />}
//         </div> */}
//         <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
//           <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
//             <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
//               Compare
//               <span>
//                 <GiReturnArrow />
//               </span>
//             </li>
//             <li
//               onClick={() =>
//                 dispatch(
//                   addToCart({
//                     _id: props._id,
//                     name: props.productName,
//                     quantity: 1,
//                     image: props.img,
//                     badge: props.badge,
//                     price: props.price,
//                     colors: props.color,
//                   })
//                 )
//               }
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               Add to Cart
//               <span>
//                 <FaShoppingCart />
//               </span>
//             </li>
//             <li
//               onClick={handleProductDetails}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               View Details
//               <span className="text-lg">
//                 <MdOutlineLabelImportant />
//               </span>
//             </li>
//             <li
//               onClick={handleWishList}
//               className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
//             >
//               Add to Wish List
//               <span>
//                 <BsSuitHeartFill />
//               </span>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
//         <div className="flex items-center justify-between font-titleFont">
//           <h2 className="text-lg text-primeColor font-bold">
//             {props.productName}
//           </h2>
//           <p className="text-[#767676] text-[14px]">${props.price}</p>
//         </div>
//         <div>
//           <p className="text-[#767676] text-[14px]">{props.color}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Product;



