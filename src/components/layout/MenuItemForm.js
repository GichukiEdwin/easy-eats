import { useState } from "react";

import ImageUpload from "./../../components/layout/ImageUpload";
import MenuItemPriceProps from "./../../components/layout/MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState([]);

  return (
    <form
      onSubmit={(e) => onSubmit(e, { image, name, description, basePrice })}
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
          <label>Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
          />

          <MenuItemPriceProps props={sizes} setProps={setSizes} />

          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
