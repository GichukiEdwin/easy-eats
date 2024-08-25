"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminTabs from "./../../../components/layout/AdminTabs";
import UserForm from "./../../../components/layout/UserForm";
import { useProfile } from "./../../../components/UseProfile";

export default function EditUserPage() {
  const { loading, admin } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/profile?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  const handleSubmitButtonClick = async (e, data) => {
    e.preventDefault();

    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _id: id }),
    });
  };

  // const handleSubmitButtonClick = async (e, data) => {
  //   e.preventDefault();

  //   const promise = new Promise(async (resolve, reject) => {
  //     const response = await fetch("/api/profile", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ ...data, _id: id }),
  //     });
  //     if (response.ok) resolve();
  //     else reject();
  //   });

  //   await toast.promise(promise, {
  //     loading: "Saving...",
  //     success: "Profile saved!",
  //     error: "Error",
  //   });
  // };

  if (loading) {
    return "Loading user profile...";
  }

  if (!admin) {
    return "Not an admin";
  }
  return (
    <section>
      <AdminTabs admin={admin} />
      <div className="mt-8">
        <UserForm user={user} onSave={handleSubmitButtonClick} />
      </div>
    </section>
  );
}
