  import React from "react";
import { FaTruckMoving } from "react-icons/fa6";
import { GiLightningShield } from "react-icons/gi";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Features = () => {
  return (
   <div className="py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
  <div className="max-w-7xl mx-auto px-4">

    <div className="flex flex-col md:flex-row justify-evenly gap-10">

      {/* Feature 1 */}
      <div className="flex items-center space-x-4 justify-center md:justify-start text-center md:text-left">

        <div className="h-12 w-12 bg-cyan-500/20 rounded-full flex items-center justify-center shrink-0">
          <FaTruckMoving className="w-6 h-6 text-cyan-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Free Shipping
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            On Orders over $50
          </p>
        </div>

      </div>

      {/* Feature 2 */}
      <div className="flex items-center space-x-4 justify-center md:justify-start text-center md:text-left">

        <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
          <GiLightningShield className="w-6 h-6 text-green-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Secure Payment
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            100% Secure Transactions
          </p>
        </div>

      </div>

      {/* Feature 3 */}
      <div className="flex items-center space-x-4 justify-center md:justify-start text-center md:text-left">

        <div className="h-12 w-12 bg-purple-500/20 rounded-full flex items-center justify-center shrink-0">
          <TfiHeadphoneAlt className="w-6 h-6 text-purple-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            24/7 Support
          </h3>
          <p className="text-slate-400 text-sm sm:text-base">
            Always here to help
          </p>
        </div>

      </div>

    </div>

  </div>
</div>
  );
};

export default Features;