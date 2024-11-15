import Image from "next/image";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientsPrices } =
    item;

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
      <button
        type="button"
        className="bg-primary text-white px-6 py-2 mt-4 rounded-full"
        onClick={onAddToCart}
      >
        {sizes?.length > 0 || extraIngredientsPrices?.length > 0 ? (
          <span>From KSH {basePrice}</span>
        ) : (
          <span>Add to cart KSH {basePrice}</span>
        )}
      </button>
    </div>
  );
}
