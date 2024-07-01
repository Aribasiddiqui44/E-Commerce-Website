// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   saleImgOne,
//   saleImgTwo,
//   saleImgThree,
// } from "../../../assets/images/index";
// import Image from "../../designLayouts/Image";
// import ShopNow from "../../designLayouts/buttons/ShopNow";

// const Sale = () => {
//   return (
//     <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
//       <div className="bg-[#f3f3f3] w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center text-black">
//         <div className="aspect-w-4 aspect-h-3 w-full mb-4">
//           <Image className="h-full w-full object-cover" imgSrc={saleImgOne} />
//         </div>
//         <div className="text-left h-140 md:h-200 lg:h-260 w-full mx-4 ">
//           <div className="mx-8">
//             <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
//               Imprimante sales
//             </h2>
//             <p className="text-lg md:text-xl lg:text-2xl mb-6">
//               Up to{" "}
//               <span className="text-4xl md:text-5xl lg:text-5xl font-bold">
//                 30%
//               </span>{" "}
//               sales for all impriamnte{" "}
//             </p>
//             <div className=" mb-8">
//               <ShopNow />
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
//         <div className="h-1/2 w-full">
//           <Link to="/shop">
//             <Image className="h-full w-full object-cover" imgSrc={saleImgTwo} />
//           </Link>
//         </div>
//         <div className="h-1/2 w-full">
//           <Link to="/shop">
//             <Image
//               className="h-full w-full object-cover"
//               imgSrc={saleImgThree}
//             />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sale;




import React from "react";
import { Link } from "react-router-dom";
// import {
//   electronicsImg,
//   clothesImg,
//   otherImg,
// } from "../../../assets/images/index";
import Image from "../../designLayouts/Image";
import ShopNow from "../../designLayouts/buttons/ShopNow";
import image from './../../../assets/images/image.png';
import imageCloths from './../../../assets/images/imageCloths.png';
import exImg from './../../../assets/images/exImg.png';
import sofa14 from "./../../../assets/sofa14[1].png"
import wall from "./../../../assets/wall.webp";
import table from "./../../../assets/table.jpg"
const Sale = () => {
  return (
    <div className="py-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-10">
      <div className="bg-[#f3f3f3] w-full md:w-2/3 lg:w-1/2 h-full flex flex-col justify-center items-center text-black">
        <div className="aspect-w-4 aspect-h-3 w-full mb-4">
          <Image className="h-full w-full object-cover" imgSrc={sofa14} />
        </div>
        <div className="text-left h-140 md:h-200 lg:h-260 w-full mx-4 ">
          <div className="mx-8">
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6">
              Electronics
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-6">
              New
              <span className="text-4xl md:text-5xl lg:text-5xl font-bold">
                Latest electronic items for you
              </span>{" "}
              
              Stay ahead of the tech curve
            </p>
            <Link to="/shop">
              <div className=" mb-8">
                <ShopNow />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 lg:w-1/2 h-auto flex flex-col gap-4 lg:gap-10">
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <Image className="h-full w-full object-cover" imgSrc={wall} />
          </Link>
          <div className="text-center mt-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Clothes Sale</h2>
            <p className="text-md md:text-lg lg:text-xl">Refresh your wardrobe with latest styles</p>
          </div>
        </div>
        <div className="h-1/2 w-full">
          <Link to="/shop">
            <Image className="h-full w-full object-cover" imgSrc={table} />
          </Link>
          <div className="text-center mt-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Exclusive Items</h2>
            <p className="text-md md:text-lg lg:text-xl">Explore our unique collection of exclusive items</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
