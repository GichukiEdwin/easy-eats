import { CartContext } from "@/context/Provider";
import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
export const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientsPrices } =
    menuItem;
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);

  const handleAddToCartButtonClick = () => {
    if (sizes.length === 0 && extraIngredientsPrices.length === 0) {
      addToCart(menuItem);
      toast.success("Added to cart");
      setShowPopUp(true);
    } else {
    }
  };

  return (
    <>
      {showPopUp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <Image
              src={image}
              alt={"pizza"}
              width={"150"}
              height={"200"}
              className="max-h-auto max-h-24 mx-auto block"
            />
            <h4 className="font-semibold my-2 text-xl">{name}</h4>
            <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
            {/* {sizes?.length > 0 && (
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold my-2 text-xl">Pick a size</h4>
                {sizes.map((size) => (
                  <label key={size}>
                    <input type="radio" />
                    {size.name} ${basePrice + size.price}
                  </label>
                ))}
              </div>
            )} */}
            <button
              type="button"
              className="bg-primary text-white px-6 py-2 mt-4 rounded-full"
              onClick={() => setShowPopUp(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};
