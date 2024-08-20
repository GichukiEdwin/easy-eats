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
    fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _id: id }),
    });
  };

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
