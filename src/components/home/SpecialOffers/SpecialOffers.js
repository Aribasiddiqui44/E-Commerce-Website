// import React, { useEffect, useState } from "react";
// import Heading from "../Products/Heading";
// import Product from "../Products/Product";
// import { SplOfferData } from "../../../constants";
// import { useParams } from "react-router-dom";

// const SpecialOffers = () => {
//   const { category } = useParams();

//   const [data, setData] = useState([]);
//   useEffect(() => {
//     setData(SplOfferData);
//   }, [data]);

//   const catData = data.filter((item) => item.cat === category);
//   return (
//     <div className="w-full pb-20">
//       <Heading heading="Discount Coupons" />
//       <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
//         {catData.map((data) => (
//           <Product
//             key={data._id}
//             _id={data._id}
//             img={data.img}
//             productName={data.productName}
//             price={data.price}
//             color={data.color}
//             badge={true}
//             des={data.des}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpecialOffers;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Heading from "../Products/Heading";
// import Coupon from "../Products/Coupon";
// import { useParams } from "react-router-dom";

// const SpecialOffers = () => {
//   const { category } = useParams();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCoupons = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/coupon/getAll'); // Adjust the URL to your API endpoint
//         setData(response.data.data); // Adjust based on the actual API response structure
//         console.log(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchCoupons();
//   }, []); // Empty dependency array means this useEffect runs once after the initial render

//   // const catData = data.filter((item) => item.cat === category);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error fetching data</div>;
//   }

//   return (
//     <div className="w-full pb-20">
//       <Heading heading="Discount Coupons" />
//       <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
//         <h4>No Special Offers Currently listed</h4>
//         {/* {data.map((da) => (
//           <Coupon
//             key={da._id}
//             _id={da._id}
//             // img={data.img}
//             // productName={data.productName}
//             // price={data.price}
//             // color={data.color}
//             // badge={true}
//             // des={data.des}
//             code={da.code}
//             discountValue={da.discountValue}
//             discountType={da.discountType}
//           />
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default SpecialOffers;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Heading from "../Products/Heading";
import Coupon from "../Products/Coupon";
import { useParams } from "react-router-dom";

const SpecialOffers = () => {
  // const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/coupon/getAll'); // Adjust the URL to your API endpoint
        setData(response.data.data); // Adjust based on the actual API response structure
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []); // Empty dependency array means this useEffect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="w-full pb-20">
      <Heading heading="Discount Coupons" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-3 gap-10">
        {data.length === 0 ? (
          <h4>No Special Offers Currently listed</h4>
        ) : (
          data.map((da) => (
            <Coupon
              key={da._id}
              _id={da._id}
              // img={data.img}
              // productName={data.productName}
              // price={data.price}
              // color={data.color}
              // badge={true}
              // des={data.des}
              code={da.code}
              discountValue={da.discountValue}
              discountType={da.discountType}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;
