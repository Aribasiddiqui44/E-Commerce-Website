import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="About" prevLocation={prevLocation} />
      <div className="pb-10">
        <h1 className="max-w-[600px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">Decor Dreams</span>{" "}
          aims to create an eCommerce platform that transforms the interior design shopping experience. By offering a wide range of high-quality home decor products, this platform is tailored to meet the needs of design enthusiasts and homeowners looking to enhance their living spaces. The development team comprises Ariba Siddiqui, Aiman Amir, Zainab Iman Khan, and Khawar Khan, who collectively bring diverse skills and expertise to the project. <br />
The product catalog includes a diverse selection of furniture such as sofas, chairs, and tables, providing customers with various options to furnish their homes in style. In addition to furniture, the platform offers an extensive array of decorative pieces, including wall hangings, rugs, paintings, and plants. These items are curated to help customers add personal touches to their interiors, making their spaces unique and inviting. <br />
A key aspect of the platform is the integration of secure user authentication and efficient product catalog management. This ensures that customers can easily browse and purchase items, with accurate and up-to-date product information. The shopping cart and checkout process is designed to be straightforward and user-friendly, supporting various payment methods, including cryptocurrency transactions through Metamask.<br />The platform is committed to sustainability and ethical sourcing, providing eco-friendly options for environmentally conscious consumers. Additionally, a robust order management system and  customer support ensure that customers receive their purchases promptly and can get assistance whenever needed. This eCommerce project aims to set new standards in the online interior design market, offering a user-friendly platform that caters to a wide range of customer preferences and needs.

        </h1>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
