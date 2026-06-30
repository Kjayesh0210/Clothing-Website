function CartSkeleton() {
  return (
    <div className="bg-neutral-50 min-h-screen py-10 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <div className="h-10 w-64 bg-neutral-200 rounded-lg" />
          <div className="h-5 w-40 bg-neutral-200 rounded mt-3" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-neutral-200
                  p-5
                "
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-36 h-44 rounded-xl bg-neutral-200" />

                  <div className="flex-1">
                    <div className="h-4 w-24 bg-neutral-200 rounded" />

                    <div className="h-7 w-72 bg-neutral-200 rounded mt-4" />

                    <div className="h-8 w-28 bg-neutral-200 rounded mt-6" />

                    <div className="flex gap-3 mt-6">
                      <div className="h-9 w-20 rounded-full bg-neutral-200" />
                      <div className="h-9 w-28 rounded-full bg-neutral-200" />
                    </div>

                    <div className="flex justify-between items-center mt-10">
                      <div className="h-12 w-36 rounded-xl bg-neutral-200" />

                      <div className="h-6 w-24 rounded bg-neutral-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-neutral-200
              p-6
              h-fit
            "
          >
            <div className="h-8 w-48 rounded bg-neutral-200" />

            <div className="mt-8 space-y-5">
              <div className="h-20 rounded-xl bg-neutral-200" />

              <div className="flex justify-between">
                <div className="h-5 w-24 rounded bg-neutral-200" />
                <div className="h-5 w-16 rounded bg-neutral-200" />
              </div>

              <div className="flex justify-between">
                <div className="h-5 w-24 rounded bg-neutral-200" />
                <div className="h-5 w-16 rounded bg-neutral-200" />
              </div>

              <div className="flex justify-between">
                <div className="h-5 w-24 rounded bg-neutral-200" />
                <div className="h-5 w-16 rounded bg-neutral-200" />
              </div>

              <hr />

              <div className="flex justify-between">
                <div className="h-7 w-20 rounded bg-neutral-200" />
                <div className="h-7 w-24 rounded bg-neutral-200" />
              </div>

              <div className="h-14 rounded-xl bg-neutral-200 mt-6" />

              <div className="h-24 rounded-xl bg-neutral-200 mt-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSkeleton;
