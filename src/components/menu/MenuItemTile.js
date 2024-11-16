import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientsPrices } =
    item;

  const hasSizesOrExtraIngredients =
    sizes?.length > 0 || extraIngredientsPrices?.length > 0;

  return (
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
      <AddToCartButton
        hasSizesOrExtraIngredients={hasSizesOrExtraIngredients}
        onClick={onAddToCart}
        basePrice={basePrice}
        image={image}
      />
    </div>
  );
}
