export const MenuItem = () => {
  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25">
        <div className="text-center">
          <img
            src={"/pizza.png"}
            alt={"pizza"}
            className="max-h-auto max-h-24 mx-auto block"
          />
        </div>
        <h4 className="font-semibold my-2 text-xl">Pepperoni Pizza</h4>
        <p className="text-gray-600 text-sm">
          Because, let&apos;s face it, everything is better with pizza; and at
          Easy Eats, we have perfected the art of turning your cravings into
          extraordinary culinary adventures.
        </p>
        <button className="bg-primary text-white px-6 py-2 mt-4 rounded-full">
          Add to cart $12
        </button>
      </div>
    </>
  );
};
