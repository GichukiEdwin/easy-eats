"use client";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import AdminTabs from "../../components/layout/AdminTabs";

function UsersPage() {
  const { loading, admin } = useProfile();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/users").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);
  if (loading) {
    return "Loading user info...";
  }
  if (!admin) {
    return "Not an admin";
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <AdminTabs admin={admin} />
      <div>
        {users?.length > 0 &&
          users.map((user) => (
            <div
              className="bg-gray-100 rounded-lg mb-2 mt-2 p-1 px-4 flex items-center gap-4"
              key=""
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                {" "}
                <div className="text-gray-500">
                  {user.name ? (
                    <span className="">{user.name}</span>
                  ) : (
                    <span className="italic">No name</span>
                  )}
                </div>
                <span className="text-gray-300">{user.email}</span>
              </div>
              <div>
                <button>Edit</button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default UsersPage;
