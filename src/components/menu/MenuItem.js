// import MenuItemTile from "./MenuItemTile";

import Image from "next/image";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../context/Provider";
import MenuItemTile from "./MenuItemTile";

export const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientsPrices } =
    menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtraIngredient, setSelectedExtraIngredient] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const { addToCart } = useContext(CartContext);
  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 && extraIngredientsPrices.length > 0;

    if (hasOptions && !showPopUp) {
      setShowPopUp(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtraIngredient);
    toast.success("Added to cart!");
    setShowPopUp(false);
  }

  const handleExtraIngredientClick = (e, extraIngredient) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedExtraIngredient((prev) => [...prev, extraIngredient]);
    } else {
      setSelectedExtraIngredient((prev) => {
        return prev.filter((e) => e.name !== extraIngredient.name);
      });
    }
  };
  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtraIngredient?.length > 0) {
    for (const extra of selectedExtraIngredient) {
      selectedPrice += extra.price;
    }
  }
  return (
    <>
      {showPopUp && (
        <div
          onClick={() => setShowPopUp(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-4 rounded-lg my-8 max-w-sm"
          >
            <div
              className="overflow-y-scroll p-4"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={"pizza"}
                width={"150"}
                height={"200"}
                className="max-h-auto max-h-24 mx-auto block"
              />
              <h4 className="font-semibold text-center my-2 text-xl">{name}</h4>
              <p className="text-gray-600 text-center text-sm line-clamp-3 my-2">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className="p-4 bg-gray-100 rounded-lg mb-4">
                  <h4 className="font-semibold my-2 text-xl text-center">
                    Pick a Meal Portion
                  </h4>
                  {sizes.map((size) => (
                    <label
                      key={size}
                      className="flex bg-gray-200 items-center gap-2 mb-2 p-4 rounded-md border"
                    >
                      <input
                        type="radio"
                        name="size"
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />
                      {size.name} ${basePrice + size.price}
                    </label>
                  ))}
                </div>
              )}

              {extraIngredientsPrices?.length > 0 && (
                <div className="p-4 bg-gray-100 rounded-lg mb-4">
                  <h4 className="font-semibold my-2 text-xl text-center">
                    Pick Optional Enhancements
                  </h4>
                  {extraIngredientsPrices.map((extraIngredient) => (
                    <label
                      key={extraIngredient}
                      className="flex bg-gray-200 items-center gap-2 mb-2 p-4 rounded-md border"
                    >
                      <input
                        type="checkbox"
                        name={extraIngredient.name}
                        onClick={(e) =>
                          handleExtraIngredientClick(e, extraIngredient)
                        }
                      />
                      {extraIngredient.name} ${extraIngredient.price}
                    </label>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCartButtonClick}
                className="primary sticky bottom-2"
                type="button"
              >
                Add to cart KSH {selectedPrice}
              </button>
              <button
                className="mt-2 text-center justify-center"
                onClick={() => setShowPopUp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};
