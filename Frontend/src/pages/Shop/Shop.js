import React, { useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";

const Shop = () => {
  const [itemsPerPage, setItemsPerPage] = useState(48);
  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      {/* ================= Products Start here =================== */}
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <ShopSideNav />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
          <Pagination itemsPerPage={itemsPerPage} />
        </div>
      </div>
      {/* ================= Products End here ===================== */}
    </div>
  );
};

export default Shop;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
// import Pagination from "../../components/pageProps/shopPage/Pagination";
// import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
// import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
// import Product from "./../../components/home/Products/Product";

// const Shop = () => {
//   const [itemsPerPage, setItemsPerPage] = useState(48);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const itemsPerPageFromBanner = (itemsPerPage) => {
//     setItemsPerPage(itemsPerPage);
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/product/getAll");
//         console.log(response.data.data);
//         setProducts(response.data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-container mx-auto px-4">
//       <Breadcrumbs title="Products" />
//       {/* ================= Products Start here =================== */}
//       <div className="w-full h-full flex pb-20 gap-10">
//         <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
//           <ShopSideNav />
//         </div>
//         <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
//           <ProductBanner itemsPerPageFromBanner={itemsPerPageFromBanner} />
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.slice(0, itemsPerPage).map((product) => (
//               <Product key={product._id}
//               _id={product._id}
//               img={product.productImageUrl} // Ensure the API provides image URLs
//               productName={product.title}
//               price={product.price}
//               color={product.color}
//               badge={product.badge}
//               des={product.description}
//             />
//             ))}
//           </div>
//           <Pagination itemsPerPage={itemsPerPage} totalItems={products.length} />
//         </div>
//       </div>
//       {/* ================= Products End here ===================== */}
//     </div>
//   );
// };

// export default Shop;
