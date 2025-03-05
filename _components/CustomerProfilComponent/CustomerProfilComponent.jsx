"use client";
import { useEffect, useState } from "react";
import BillingAddresses from "@/_components/BillingAddresses/BillingAddresses";
import ShippingAddress from "@/_components/ShippingAddress/ShippingAddress";
import PreviousOrders from "@/_components/PreviousOrders/PreviousOrders";
import ChangePassword from "@/_components/ChangePassword/ChangePassword";
import MyProfile from "@/_components/MyProfile/MyProfile";

import ProfilNav from "@/_components/ProfilNav/ProfilNav";
import { useRouter } from "next/navigation";

const CustomerProfilComponent = ({
  customerData,
  billingAddress,
  shippingAddress,
  prevOrders,
}) => {
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };
  const renderRightSideContent = () => {
    switch (selectedButton) {
      case 0:
        return <MyProfile customerData={customerData} />;
        break;
      case 1:
        return <BillingAddresses billingAddress={billingAddress} />;
        break;
      case 2:
        return (
          <ShippingAddress
            shippingAddress={shippingAddress}
            handleButtonClick={handleButtonClick}
          />
        );
        break;
      case 3:
        return <PreviousOrders prevOrders={prevOrders} />;
        break;
      case 4:
        return <ChangePassword />;
        break;
      default:
        break;
    }
  };

  const router = useRouter();

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const is_logged = localStorage.getItem("loggedIn");
      if (is_logged === "false" || !is_logged) {
        router.replace("/nalog");
      }
    };
    checkLoggedInStatus();
  }, []);

  return (
    <div className="profilHolder lg:mt-[9rem] flex flex-row max-md:flex-col w-[90%] mx-auto ">
      <ProfilNav
        handleButtonClick={handleButtonClick}
        selectedButton={selectedButton}
      />
      <div className="rightSideContent md:ml-[4rem] col-span-2">
        {renderRightSideContent()}
      </div>
    </div>
  );
};

export default CustomerProfilComponent;
