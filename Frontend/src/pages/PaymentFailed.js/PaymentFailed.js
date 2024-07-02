import React from 'react';
import { Link } from 'react-router-dom';
import './../PaymentSuccess/PaymentSuccessPage.css';
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

const Success = () => {
  return (
    <div className="container1">
      <div className="card1">
        <div className="carddd">        
          <h1>Payment Successful</h1>
            <div>
              {/* <FaCheckCircle className="tick-icon" /> */}
              <FaTimesCircle className="cross-icon" />
            </div> 
          </div> 
          <div>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
}
export default Success;