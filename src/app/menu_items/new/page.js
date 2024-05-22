"use client";
import { Left } from "@/components/icons/Left";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "../../../components/UseProfile";
import ImageUpload from "../../../components/layout/ImageUpload";
import AdminTabs from "./../../../components/layout/AdminTabs";

export default function NewMenuItemPage() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { admin, loading } = useProfile();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = { image, name, description, basePrice };
    const savePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu_items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savePromise, {
      loading: "Saving...",
      success: "Saved",
      error: "Failed to save",
    });

    setRedirectToItems(true);
  };

  if (redirectToItems) {
    return redirect("/menu_items");
  }

  if (loading) {
    return "Loading ...";
  }

  if (!admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8">
      <AdminTabs admin={true} />

      <div className="mt-8 mx-auto max-w-md">
        <Link className="button gap-2 justify-center" href={"/menu_items"}>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>

      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
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
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
