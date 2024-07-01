import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";

const ShopSideNav = () => {
  return (
    <div className="w-full flex flex-col gap-6">
        {/* <div className="w-full flex flex-col gap-4 items-center text-center p-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg shadow-lg">
      <strong className="text-white text-4xl font-bold">
        Shop the Best
      </strong>

      <h1 className="text-white text-3xl font-semibold mt-2">
        Forget the Rest
      </h1>
    </div> */}
      <Category icons={false} />
      {/* <Brand /> */}
      {/* <Color />
      <Price /> */}
    </div>



  );
};

export default ShopSideNav;
