"use client";
import { useProfile } from "@/components/UseProfile";
import { Right } from "@/components/icons/Right";
import AdminTabs from "@/components/layout/AdminTabs";
import Link from "next/link";
// import ImageUpload from "@/components/layout/ImageUpload";
// import { useState } from "react";
// import toast from "react-hot-toast";

export default function MenuItems() {
  const { admin, loading } = useProfile();

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
    </section>
  );
}
