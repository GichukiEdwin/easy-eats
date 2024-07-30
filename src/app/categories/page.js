"use client";
import DeleteButton from "@/components/DeleteButton";
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

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });

    fetchCategories();
  }

  if (loading) {
    return "Loading info...";
  }

  if (!admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
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
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div className="">
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 &&
          categories.map((cat) => (
            <div
              key=""
              className="bg-gray-100 items-center rounded-xl p-2 px-4 flex gap-2 mb-1"
            >
              <div className="grow">{cat.name}</div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    setEditCategory(cat);
                    setCategoryName(cat.name);
                  }}
                  type="button"
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteClick(cat._id)}
                />
                {/* <button
                  onClick={() => handleDeleteClick(cat._id)}
                  type="button"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
