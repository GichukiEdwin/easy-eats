"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "../../components/UseProfile";
import AdminTabs from "./../../components/layout/AdminTabs";
import ImageUpload from "./../../components/layout/ImageUpload";

export default function ProfilePage() {
  const { loading, admin } = useProfile();
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // const [admin, setAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  const { status } = session;
  // console.log(session);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          // setAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  const handleProfileInfoUpdate = async (e) => {
    e.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image: image,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
        }),
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  };

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("login");
  }

  return (
    <section className="mt-8">
      <AdminTabs admin={admin} />
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-4 items-start">
          <div className="p-2 rounded-lg relative max-w-[120px]">
            <ImageUpload link={image} setLink={setImage} />
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>First name</label>
            <input
              type="text"
              placeholder="first and lastname"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              disabled="true"
              value={session.data.user.email}
              placeholder="email"
            />
            <label>Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="Phone number"
            />
            <label>Country</label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="Country"
            />
            <div className="flex gap-2">
              <div>
                <label>City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                  placeholder="City"
                />
              </div>
              <div>
                {" "}
                <label>Postal code</label>
                <input
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  type="text"
                  placeholder="Postal code"
                />
              </div>
            </div>
            <label>Street address</label>
            <input
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              type="text"
              placeholder="Street address"
            />

            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
