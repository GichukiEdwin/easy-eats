"use client";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "./../../../../components/UseProfile";
import { Left } from "./../../../../components/icons/Left";
import AdminTabs from "./../../../../components/layout/AdminTabs";
import MenuItemForm from "./../../../../components/layout/MenuItemForm";

export default function EditMenuItem() {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { admin, loading } = useProfile();

  useEffect(() => {
    console.log(id);
    fetch("/api/menu_items").then((response) => {
      response.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      });
    });
  }, []);

  const handleFormSubmit = async (e, data) => {
    e.preventDefault();
    data = { ...data, _id: id };
    const savePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu_items", {
        method: "PUT",
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

      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
    </section>
  );
}
