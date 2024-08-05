"use client";
import { useState } from "react";
import ImageUpload from "./../../components/layout/ImageUpload";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");

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
  );
}
