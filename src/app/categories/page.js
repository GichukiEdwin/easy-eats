"use client";
import AdminTabs from "@/components/layout/AdminTabs";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setAdmin(data.admin);
      });
    });
  }, []);

  if (!admin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 mx-auto max-w-lg">
      <AdminTabs admin={true} />
      categories
    </section>
  );
}
