import React from "react";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import image from './../../../assets/images/sale/image.png';

const Coupons = ({ key, _id, code, discountValue, discountType }) => {
  return (
    <div className="coupon-container">
      {/* {coupons.map((coupon) => ( */}
        <div key={_id} className="w-full relative group coupon-item">
          <div className="relative overflow-hidden">
            <Image className="coupon-image" imgSrc={image} />
            {/* {badge && (
              <div className="absolute top-6 left-8">
                <Badge text={coupon.badge} />
              </div>
            )} */}
          </div>
          <div className="coupon-details py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
            <h2 className="text-lg text-primeColor font-bold">Use Code: {code}</h2>
            <p className="text-[#767676] text-[14px]">
              Get a {discountValue} {(discountType === 'percentage' ? '%' : '$')} discount on your order
            </p>
          </div>
        </div>
      {/* ))} */}
    </div>
  );
};

export default Coupons;
