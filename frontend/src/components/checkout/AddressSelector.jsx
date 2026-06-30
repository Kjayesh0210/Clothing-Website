import { Home, PlusCircle, Check, MapPin } from "lucide-react";

function AddressSelector({
  addresses,
  selectedAddress,
  setSelectedAddress,
  useSavedAddress,
  setUseSavedAddress,
  address,
  setAddress,
}) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => setUseSavedAddress(true)}
          className={`
            flex-1
            rounded-2xl
            border-2
            p-5
            text-left
            transition-all
            duration-300
            ${
              useSavedAddress
                ? "border-black bg-neutral-50"
                : "border-neutral-200 hover:border-neutral-400"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home size={22} />

              <div>
                <p className="font-semibold">Saved Address</p>

                <p className="text-sm text-neutral-500 mt-1">
                  Choose from your saved addresses
                </p>
              </div>
            </div>

            {useSavedAddress && (
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                <Check size={16} />
              </div>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setUseSavedAddress(false)}
          className={`
            flex-1
            rounded-2xl
            border-2
            p-5
            text-left
            transition-all
            duration-300
            ${
              !useSavedAddress
                ? "border-black bg-neutral-50"
                : "border-neutral-200 hover:border-neutral-400"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlusCircle size={22} />

              <div>
                <p className="font-semibold">New Address</p>

                <p className="text-sm text-neutral-500 mt-1">
                  Deliver somewhere else
                </p>
              </div>
            </div>

            {!useSavedAddress && (
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                <Check size={16} />
              </div>
            )}
          </div>
        </button>
      </div>

      {useSavedAddress ? (
        addresses.length > 0 ? (
          <div className="grid gap-4">
            {addresses.map((item, index) => {
              const active = selectedAddress === item.address;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedAddress(item.address)}
                  className={`
                    w-full
                    text-left
                    rounded-2xl
                    border-2
                    p-6
                    transition-all
                    duration-300
                    ${
                      active
                        ? "border-black bg-neutral-50 shadow-sm"
                        : "border-neutral-200 hover:border-neutral-400 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <MapPin size={20} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg">{item.label}</h3>

                        <p className="mt-2 text-neutral-600 leading-7">
                          {item.address}
                        </p>
                      </div>
                    </div>

                    {active && (
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                        <Check size={18} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 p-10 text-center bg-neutral-50">
            <Home size={40} className="mx-auto text-neutral-400" />

            <p className="mt-4 text-lg font-semibold">No Saved Addresses</p>

            <p className="mt-2 text-neutral-500">
              Add a new address to continue.
            </p>
          </div>
        )
      ) : (
        <div>
          <label className="block mb-3 font-semibold">Delivery Address</label>

          <textarea
            rows={6}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your complete delivery address..."
            className="
              w-full
              rounded-2xl
              border
              border-neutral-300
              p-5
              resize-none
              outline-none
              transition-all
              duration-300
              focus:border-black
              focus:ring-4
              focus:ring-neutral-100
            "
          />
        </div>
      )}
    </div>
  );
}

export default AddressSelector;
