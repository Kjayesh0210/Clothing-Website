import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="h-[80vh] flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-6xl font-bold">

            Wear Your Style

          </h1>

          <p className="mt-4 text-gray-600">

            Discover the latest fashion trends.

          </p>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded">

            Shop Now

          </button>

        </div>

      </div>
    </>
  );
}

export default Home;