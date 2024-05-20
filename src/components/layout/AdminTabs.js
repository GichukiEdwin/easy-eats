"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminTabs({ admin }) {
  const path = usePathname();

  return (
    <div className="flex mx-auto gap-2 justify-center tabs">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {admin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link
            className={path === "/menu-items" ? "active" : ""}
            href={"/menu-items"}
          >
            Menu items
          </Link>
          <Link className={path === "/users" ? "active" : ""} href={"/users"}>
            Users
          </Link>
        </>
      )}
    </div>
  );
}
