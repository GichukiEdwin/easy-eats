"use client";
import AdminTabs from "@/components/layout/AdminTabs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "./../../components/UseProfile";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { admin, loading } = useProfile();
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch("/api/categories").then((response) => {
      response.json().then((categories) => {
        setCategories(categories);
      });
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const createPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editCategory) {
        data._id = editCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editCategory ? "PUT" : "POST",
        headers: { ContentType: "application/json" },
        body: JSON.stringify(data),
      });

      setCategoryName("");

      fetchCategories();

      setEditCategory(null);

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(createPromise, {
      loading: editCategory ? "Updating category" : "Creating new category",
      success: editCategory ? "Category updated" : "Category created",
      error: "Error",
    });
  };

  if (loading) {
    return "Loading info...";
  }

  if (!admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-md">
      <AdminTabs admin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editCategory ? "Update category" : "New category name"}
              {editCategory && (
                <>
                  : <b>{editCategory.name}</b>
                </>
              )}
            </label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
            />
          </div>
          <div className="pb-2">
            <button className="border border-primary" type="submit">
              {editCategory ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </form>
      <div className="">
        <h2 className="mt-8 text-sm text-gray-500">Edit category</h2>
        {categories?.length > 0 &&
          categories.map((cat) => (
            <button
              onClick={() => {
                setEditCategory(cat);
                setCategoryName(cat.name);
              }}
              key=""
              className="rounded-xl p-2 px-4 flex gap-2 cursor-pointer mb-1"
            >
              <span className="">{cat.name}</span>
            </button>
          ))}
      </div>
    </section>
  );
}
