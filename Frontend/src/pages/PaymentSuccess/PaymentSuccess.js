// import React from 'react';
// import { Link } from 'react-router-dom';
// import './PaymentSuccessPage.css';
// import { FaCheckCircle } from 'react-icons/fa';

// const Success = () => {
//   return (
//     <div className="container1">
//       <div className="card1">
//         <div className="carddd">        
//           <h1>Payment Successful</h1>
//             <div>
//               <FaCheckCircle className="tick-icon" />
//             </div> 
//           </div> 
//           <div>
//         <Link to="/shop">
//           <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
//             Continue Shopping
//           </button>
//         </Link>
//       </div>
//       </div>
//     </div>
//   );
// }
// export default Success;


import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-transform duration-500 ease-out" style={{ animation: 'fadeIn 1s ease-out' }}>
        <h1 className="text-3xl mb-6">Payment Successful</h1>
        <div className="mb-6">
          <FaCheckCircle className="text-green-500 text-6xl animate-bounce" />
        </div>
        <Link to="/shop">
          <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 rounded-md">
            Continue Shopping
          </button>
        </Link>
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default Success;
