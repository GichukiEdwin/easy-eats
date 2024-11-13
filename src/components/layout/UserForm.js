"use client";
import { useState } from "react";
import { useProfile } from "./../../components/UseProfile";
import ImageUpload from "./../../components/layout/ImageUpload";
import AddressInputs from "./AddressInputs";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);
  const { data: loggedInUserData } = useProfile();
  console.log("Logged-in user data:", loggedInUserData);

  function handleAddressUpdate(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
  }

  return (
    <div className="flex gap-4 items-start">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <ImageUpload link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(e) =>
          onSave(e, {
            name: userName,
            admin,
            image,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
          })
        }
      >
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
          value={user.email}
          placeholder="email"
        />

        <AddressInputs
          addressProps={{ phone, city, country, postalCode, streetAddress }}
          setAddressProps={handleAddressUpdate}
        />

        {loggedInUserData?.admin && (
          <div>
            {JSON.stringify(admin)}
            <label
              className="inline-flex items-center gap-2 p-2 mb-2"
              htmlFor="adminCB"
            >
              <input
                id="adminCB"
                type="checkbox"
                value={"1"}
                checked={admin}
                onChange={(e) => setAdmin(e.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
