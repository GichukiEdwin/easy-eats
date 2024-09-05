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
              width={"200"}
              height={"200"}
              className="max-h-auto max-h-24 mx-auto block"
            />
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};
