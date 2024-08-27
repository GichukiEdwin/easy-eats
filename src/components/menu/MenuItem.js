import { CartContext } from "@/context/Provider";
import Image from "next/image";
import { useContext } from "react";
export const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientsPrices } =
    menuItem;
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
        <div className="text-center">
          <Image
            src={image}
            alt={"pizza"}
            width={"150"}
            height={"200"}
            className="max-h-auto max-h-24 mx-auto block"
          />
        </div>
        <h4 className="font-semibold my-2 text-xl">{name}</h4>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        <button
          className="bg-primary text-white px-6 py-2 mt-4 rounded-full"
          onClick={() => addToCart(menuItem)}
        >
          Add to cart ${basePrice}
        </button>
      </div>
    </>
  );
};
