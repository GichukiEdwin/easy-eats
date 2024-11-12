import { useEffect, useState } from "react";

import ImageUpload from "./../../components/layout/ImageUpload";
import {
  default as MenuItemPriceProps,
  default as MenuItemPriceprops,
} from "./../../components/layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientsPrices, setExtraIngredientsPrices] = useState(
    menuItem?.extraIngredientsPrices || []
  );
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState(
    menuItem?.category || ""
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientsPrices,
          selectCategory,
        })
      }
      className="mt-8 max-w-md mx-auto"
    >
      <div
        className="grid gap-4 items-start"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div className="">
          <ImageUpload link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Category</label>
          <select
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>

          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />

          <MenuItemPriceProps
            name={"Size name"}
            addLabel={"Add size"}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceprops
            name={"Extra ingredient"}
            addLabel={"Add ingredients"}
            props={extraIngredientsPrices}
            setProps={setExtraIngredientsPrices}
          />

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
