import { useEffect, useState } from "react";

import api from "../services/api";

function Addresses() {
  const [addresses, setAddresses] = useState([]);

  const [label, setLabel] = useState("");

  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/auth/addresses", {
      headers: {
        Authorization: token,
      },
    });

    setAddresses(res.data);
  };

  const addNewAddress = async () => {
    const token = localStorage.getItem("token");

    await api.post(
      "/auth/addresses",
      {
        label,
        address,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );

    setLabel("");
    setAddress("");

    fetchAddresses();
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-5">Addresses</h1>

      <div className="flex flex-col gap-3 mb-5">
        <input
          placeholder="Home / Office"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="
          border
          p-3
          "
        />

        <textarea
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="
          border
          p-3
          "
        />

        <button
          onClick={addNewAddress}
          className="
          bg-black
          text-white
          py-3
          "
        >
          Add Address
        </button>
      </div>

      {addresses.map((item, index) => (
        <div
          key={index}
          className="
            border
            p-4
            mb-3
            "
        >
          <h2>{item.label}</h2>

          <p>{item.address}</p>
        </div>
      ))}
    </div>
  );
}

export default Addresses;
