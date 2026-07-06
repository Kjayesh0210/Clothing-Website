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
      {/* Address Type */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() => setUseSavedAddress(true)}
          className={`flex-1 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
            useSavedAddress
              ? "border-black bg-neutral-50"
              : "border-neutral-200 hover:border-neutral-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home size={22} />

              <div>
                <p className="font-semibold">Saved Address</p>

                <p className="mt-1 text-sm text-neutral-500">
                  Choose from your saved addresses
                </p>
              </div>
            </div>

            {useSavedAddress && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <Check size={16} />
              </div>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setUseSavedAddress(false)}
          className={`flex-1 rounded-2xl border-2 p-5 text-left transition-all duration-300 ${
            !useSavedAddress
              ? "border-black bg-neutral-50"
              : "border-neutral-200 hover:border-neutral-400"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlusCircle size={22} />

              <div>
                <p className="font-semibold">New Address</p>

                <p className="mt-1 text-sm text-neutral-500">
                  Deliver somewhere else
                </p>
              </div>
            </div>

            {!useSavedAddress && (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                <Check size={16} />
              </div>
            )}
          </div>
        </button>
      </div>

      {useSavedAddress ? (
        addresses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {addresses.map((item, index) => {
              const active = selectedAddress === item.address;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedAddress(item.address)}
                  className={`w-full rounded-2xl border-2 p-2 text-left transition-all duration-300 ${
                    active
                      ? "border-black bg-neutral-50 shadow-sm"
                      : "border-neutral-200 hover:border-neutral-400 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-2">
                      <MapPin size={20} className="mt-1 shrink-0" />

                      <div>
                        <h3 className="text-lg font-semibold">{item.label}</h3>

                        <p className="text-sm leading-6 text-neutral-600">
                          {item.address}
                        </p>
                      </div>
                    </div>

                    {active && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        <Check size={18} />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
            <Home size={40} className="mx-auto text-neutral-400" />

            <p className="mt-4 text-lg font-semibold">No Saved Addresses</p>

            <p className="mt-2 text-neutral-500">
              Add a new address to continue.
            </p>
          </div>
        )
      ) : (
        <div>
          <label className="mb-3 block font-semibold">Delivery Address</label>

          <textarea
            rows={6}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your complete delivery address..."
            className="w-full resize-none rounded-2xl border border-neutral-300 p-5 outline-none transition-all duration-300 focus:border-black focus:ring-4 focus:ring-neutral-100"
          />
        </div>
      )}
    </div>
  );
}

export default AddressSelector;
