import { Add } from "./../../components/icons/Add";
import { Trash } from "./../../components/icons/Trash";

export default function MenuItemPriceprops({ props, setProps }) {
  const addProp = () => {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  };

  const editProp = (e, index, prop) => {
    const newValue = e.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeProp = (indexToRemove) => {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  };

  return (
    <div className="bg-gray-200 rounded-md p-2 mb-2">
      {props?.length > 0 &&
        props.map((size, index) => (
          <div className="gap-2 items-end flex" key="">
            <div>
              <label>Size name</label>
              <input
                value={size.name}
                type="text"
                placeholder="Size name"
                onChange={(e) => editProp(e, index, "name")}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input
                value={size.price}
                type="text"
                placeholder="Extra price"
                onChange={(e) => editProp(e, index, "price")}
              />
            </div>
            <div>
              <button
                onClick={() => removeProp(index)}
                className="bg-white mb-2 px-2"
                type="button"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}

      <button
        className="bg-white mb-2 items-center gap-1"
        type="button"
        onClick={addProp}
      >
        <Add />
        <span>Add size specific price</span>
      </button>
    </div>
  );
}
