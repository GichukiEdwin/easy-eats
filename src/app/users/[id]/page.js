"use client";
import AdminTabs from "./../../../components/layout/AdminTabs";
import { useProfile } from "./../../../components/UseProfile";

export default function EditUserPage() {
  const { loading, admin } = useProfile();

  if (loading) {
    return "Loading user profile...";
  }

  if (!admin) {
    return "Not an admin";
  }
  return (
    <section>
      <AdminTabs admin={admin} />
      <div className="mt-8">User form</div>
    </section>
  );
}
