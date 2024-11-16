"use client";
import AddressInputs from "@/components/layout/AddressInputs";
import { CartContext, cartProductPrice } from "@/context/Provider";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Trash } from "./../../components/icons/Trash";
import { SectionHeaders } from "./../../components/layout/SectionHeaders";
// import { useProfile } from "./../../components/UseProfile";
import { useUserData } from "./../../hooks/useUserData";

export default function CartPage() {
  const { cartProducts, removeFromCart } = useContext(CartContext);
  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }
  const [address, setAddress] = useState({});
  // const { data: profileData } = useProfile();
  const { data } = useUserData();
  useEffect(() => {
    if (data?.city) {
      const { phone, country, city, postalCode, streetAddress } = data;
      const profileAddress = {
        phone,
        country,
        city,
        postalCode,
        streetAddress,
      };
      setAddress(profileAddress);
    }
  }, [data]);

  function handleAddressUpdate(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }
  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid grid-cols-2 gap-12 mt-4">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <div className="flex items-center gap-4 border-b py-4" key="">
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={""}
                    width={"100"}
                    height={"100"}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm text-gray-800">
                      Serving Tiers:{" "}
                      <span className="text-gray-500">{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-800">
                      Meal Add-Ons :{" "}
                      {product.extras.map((extra) => (
                        <div key="" className="text-gray-500">
                          {extra.name} Ksh {extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  Ksh {cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="py-4 text-right pr-16">
            <span className="text-gray-500">Subtotal:</span>
            <span className="pl-1 text-lg font-semibold">Ksh{total}</span>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <AddressInputs
              addressProps={address}
              setAddressProps={handleAddressUpdate}
            />
            <button type="submit">Pay Ksh{total}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
