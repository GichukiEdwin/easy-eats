"use client";
import { useProfile } from "@/components/UseProfile";
import { Right } from "@/components/icons/Right";
import AdminTabs from "@/components/layout/AdminTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);

  const { admin, loading } = useProfile();

  useEffect(() => {
    fetch("/api/menu_items").then((response) => {
      response.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Loading...";
  }

  if (!admin) {
    return "Not an admin";
  }
  return (
    <section className="mt-8">
      <AdminTabs admin={true} />
      <div className="mt-8">
        <Link
          className="button flex justify-center gap-2"
          href={"/menu_items/new"}
        >
          <span>Create new menu item</span>

          <Right />
        </Link>
      </div>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Edit items</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu_items/edit/" + item._id}
                className="bg-gray-300 rounded-lg p-4"
                key=""
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt={""}
                    width={"200"}
                    height={"200"}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
