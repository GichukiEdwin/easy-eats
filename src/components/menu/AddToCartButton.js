import FlyingButton from "react-flying-item";

export default function AddToCartButton({
  hasSizesOrExtraIngredients,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtraIngredients) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
          <div onClick={onClick}>Add to cart KSH {basePrice}</div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="bg-primary text-white px-6 py-2 mt-4 rounded-full"
      onClick={onClick}
    >
      <span>Add to cart starting at KSH {basePrice}</span>
    </button>
  );
}
