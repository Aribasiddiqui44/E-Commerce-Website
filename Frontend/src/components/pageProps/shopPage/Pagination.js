// import React, { useState } from "react";
// import ReactPaginate from "react-paginate";
// import Product from "../../home/Products/Product";
// import { useSelector } from "react-redux";
// import { paginationItems } from "../../../constants";

// const items = paginationItems;

// function Items({ currentItems, selectedBrands, selectedCategories }) {
//   // Filter items based on selected brands and categories
//   const filteredItems = currentItems.filter((item) => {
//     const isBrandSelected =
//       selectedBrands.length === 0 ||
//       selectedBrands.some((brand) => brand.title === item.brand);

//     const isCategorySelected =
//       selectedCategories.length === 0 ||
//       selectedCategories.some((category) => category.title === item.cat);

//     return isBrandSelected && isCategorySelected;
//   });

//   return (
//     <>
//       {filteredItems.map((item) => (
//         <div key={item._id} className="w-full">
//           <Product
//             _id={item._id}
//             img={item.img}
//             productName={item.productName}
//             price={item.price}
//             color={item.color}
//             badge={item.badge}
//             des={item.des}
//             pdf={item.pdf}
//             ficheTech={item.ficheTech}
//           />
//         </div>
//       ))}
//     </>
//   );
// }

// const Pagination = ({ itemsPerPage }) => {
//   const [itemOffset, setItemOffset] = useState(0);
//   const [itemStart, setItemStart] = useState(1);

//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = items.slice(itemOffset, endOffset);
//   const selectedBrands = useSelector(
//     (state) => state.orebiReducer.checkedBrands
//   );
//   const selectedCategories = useSelector(
//     (state) => state.orebiReducer.checkedCategorys
//   );
//   const pageCount = Math.ceil(items.length / itemsPerPage);

//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     const newStart = newOffset + 1; // Adjust the start index

//     setItemOffset(newOffset);
//     setItemStart(newStart);
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
//         <Items
//           currentItems={currentItems}
//           selectedBrands={selectedBrands}
//           selectedCategories={selectedCategories}
//         />{" "}
//       </div>
//       <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
//         <ReactPaginate
//           nextLabel=""
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={3}
//           marginPagesDisplayed={2}
//           pageCount={pageCount}
//           previousLabel=""
//           pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
//           pageClassName="mr-6"
//           containerClassName="flex text-base font-semibold font-titleFont py-10"
//           activeClassName="bg-black text-white"
//         />

//         <p className="text-base font-normal text-lightText">
//           Products from {itemStart} to {Math.min(endOffset, items.length)} of{" "}
//           {items.length}
//         </p>
//         <button onClick={() => console.log(selectedBrands)}> test</button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;




// import React, { useState, useEffect } from "react";
// import ReactPaginate from "react-paginate";
// import Product from "../../home/Products/Product";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { paginationItems } from "../../../constants";

// const Pagination = ({ itemsPerPage }) => {
//   const [itemOffset, setItemOffset] = useState(0);
//   const [itemStart, setItemStart] = useState(1);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const selectedBrands = useSelector((state) => state.orebiReducer.checkedBrands);
//   const selectedCategories = useSelector((state) => state.orebiReducer.checkedCategorys);

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/product/getAll");
//         console.log(response.data.data);
//         setProducts(response.data.data.docs);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Filter items based on selected brands and categories
//   // const filteredItems = products.filter((item) => {
//   //   const isBrandSelected =
//   //     selectedBrands.length === 0 ||
//   //     selectedBrands.some((brand) => brand.title === item.brand);

//   //   const isCategorySelected =
//   //     selectedCategories.length === 0 ||
//   //     selectedCategories.some((category) => category.title === item.cat);

//   //   return isBrandSelected && isCategorySelected;
//   // });

//   const filteredItems = products;
//   // Calculate pagination
//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = filteredItems.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

//   // Handle page click
//   const handlePageClick = (event) => {
//     const newOffset = event.selected * itemsPerPage;
//     const newStart = newOffset + 1;

//     setItemOffset(newOffset);
//     setItemStart(newStart);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
//         {currentItems.map((item) => (
//           <div key={item._id} className="w-full">
//             <Product
//               _id={item._id}
//               img={item.productImageUrl}
//               productName={item.title}
//               price={item.price}
//               color={item.color}
//               badge={item.badge}
//               des={item.description}
//               // pdf={item.pdf}
//               // ficheTech={item.ficheTech}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
//         <ReactPaginate
//           nextLabel=""
//           onPageChange={handlePageClick}
//           pageRangeDisplayed={3}
//           marginPagesDisplayed={2}
//           pageCount={pageCount}
//           previousLabel=""
//           pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
//           pageClassName="mr-6"
//           containerClassName="flex text-base font-semibold font-titleFont py-10"
//           activeClassName="bg-black text-white"
//         />

//         <p className="text-base font-normal text-lightText">
//           Products from {itemStart} to {Math.min(endOffset, filteredItems.length)} of{" "}
//           {filteredItems.length}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Pagination;


import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useSelector } from "react-redux";
import axios from "axios";

const Pagination = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedBrands = useSelector((state) => state.orebiReducer.checkedBrands);
  const selectedCategories = useSelector((state) => state.orebiReducer.checkedCategorys);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/product/getAll");
        console.log(response.data.data);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected categories and brands
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 ||
      selectedCategories.some(category => category.title === product.category);

    const matchesBrand = selectedBrands.length === 0 ||
      selectedBrands.some(brand => brand.title === product.brand);

    return matchesCategory && matchesBrand;
  });

  // Calculate pagination
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle page click
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    const newStart = newOffset + 1;

    setItemOffset(newOffset);
    setItemStart(newStart);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {currentItems.map((item) => (
          <div key={item._id} className="w-full">
            <Product
              _id={item._id}
              img={item.productImageUrl}
              productName={item.title}
              price={item.price}
              color={item.color}
              badge={item.badge}
              des={item.description}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart} to {Math.min(endOffset, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
