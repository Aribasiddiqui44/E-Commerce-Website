import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import Product from "./../../components/home/Products/Product";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const Wishlist = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  useEffect(() => {
    const fetchWishlist = async () => {
        // Replace with your actual wishlist API endpoint
        if ( Cookies.get('accessToken')){
            try {
            const response = await axios.get("http://localhost:8000/wishlist/get", {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`
                    // Cookies: {accessToken: Cookies.get('accessToken') }
                }
            });
            console.log(response.data.data);
            setWishlist(response.data.data.products);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }         
        } else {
            toast.error("You should login first to see the wishlist");
            console.log(Cookies.get('accessToken'));
        }
    };

    fetchWishlist();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Wishlist" />
      {/* ================= Wishlist Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.slice(0, itemsPerPage).map((product) => (
              <Product
                key={product._id}
                _id={product._id}
                img={product.productImageUrl}
                productName={product.title}
                price={product.price}
                color={product.color}
                badge={product.badge}
                des={product.description}
                quantity={product.quantity}
                isWishlistPage={true}
              />
            ))}
          </div>
          {/* <Pagination itemsPerPage={itemsPerPage} totalItems={wishlist.length} /> */}
        </div>
      </div>
      {/* ================= Wishlist End here ===================== */}
    </div>
  );
};

export default Wishlist;
