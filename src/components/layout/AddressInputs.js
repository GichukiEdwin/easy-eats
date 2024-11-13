export default function AddressInputs({ addressProps, setAddressProps }) {
  const { phone, country, city, postalCode, streetAddress } = addressProps;
  return (
    <>
      <label>Phone number</label>
      <input
        value={phone}
        onChange={(e) => setAddressProps("phone", e.target.value)}
        type="tel"
        placeholder="Phone number"
      />
      <label>Country</label>
      <input
        value={country}
        onChange={(e) => setAddressProps("country", e.target.value)}
        type="text"
        placeholder="Country"
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="">
          <label>City</label>
          <input
            value={city}
            onChange={(e) => setAddressProps("city", e.target.value)}
            type="text"
            placeholder="City"
          />
        </div>
        <div>
          {" "}
          <label>Postal code</label>
          <input
            value={postalCode}
            onChange={(e) => setAddressProps("postalCode", e.target.value)}
            type="text"
            placeholder="Postal code"
          />
        </div>
      </div>
      <label>Street address</label>
      <input
        value={streetAddress}
        onChange={(e) => setAddressProps("streetAddress", e.target.value)}
        type="text"
        placeholder="Street address"
      />
    </>
  );
}
