import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import { FolderOpen, Plus, Trash2, Tag } from "lucide-react";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await api.get("/categories");

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async () => {
    if (!name.trim()) {
      toast.error("Enter category name");
      return;
    }

    try {
      if (adding) return;

      setAdding(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/categories",
        {
          name: name.trim(),
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Category Added");

      setName("");

      fetchCategories();
    } catch (error) {
      toast.error("Failed to add category");
    } finally {
      setAdding(false);
    }
  };

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Delete this category?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/categories/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Category Deleted");

      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-10">
        <div className="max-w-6xl mx-auto px-6 animate-pulse">
          <div className="h-10 w-72 rounded bg-neutral-200" />

          <div className="h-5 w-80 rounded bg-neutral-200 mt-4" />

          <div className="bg-white rounded-3xl border mt-10 h-36" />

          <div className="space-y-5 mt-10">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-3xl border h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto w-full px-2 xl:px-10">
        <div className="mx-auto flex items-center gap-4 w-full max-w-[1440px] px-4 mb-6 sm:px-6 lg:px-8 ">
          <div
            className="
              w-22
              h-20
              lg:w-16
              lg:h-16 
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
            "
          >
            <FolderOpen size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Category Management
            </h1>
          </div>
        </div>

        <div
          className="
          bg-white
          rounded-xl
          border
          border-neutral-200
          shadow-sm
          p-5 sm:p-8 lg:p-8
          mb-6
        "
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Add New Category
              </h2>

              <p className="text-neutral-500 mt-2">
                Create categories to better organize your inventory.
              </p>
            </div>

            <div
              className="
              hidden
              md:flex
              w-16
              h-16
              rounded-2xl
              bg-neutral-100
              items-center
              justify-center
            "
            >
              <Tag size={28} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="
              flex-1
              h-14
              rounded-2xl
              border
              border-neutral-300
              p-5
              outline-none
              transition-all
              duration-300
              focus:border-black
              focus:ring-4
              focus:ring-neutral-100
            "
            />

            <button
              onClick={addCategory}
              disabled={adding}
              className="
              h-14
              w-full md:w-auto px-8
              rounded-2xl
              bg-black
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition-all
              duration-300
              hover:bg-neutral-800
              hover:-translate-y-0.5
              active:scale-[0.98]
              disabled:opacity-60
            "
            >
              <Plus size={20} />

              {adding ? "Adding..." : "Add Category"}
            </button>
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Available Categories
              </h2>

              <p className="text-neutral-500 mt-2">
                {categories.length} Categories Available
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {" "}
            {categories.length === 0 ? (
              <div
                className="
                bg-white
                rounded-[32px]
                border
                border-dashed
                border-neutral-300
                p-8 sm:p-12 lg:p-12
                text-center
              "
              >
                <div
                  className="
                  w-20
                  h-20
                  mx-auto
                  rounded-full
                  bg-neutral-100
                  flex
                  items-center
                  justify-center
                "
                >
                  <FolderOpen size={36} className="text-neutral-500" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold">
                  No Categories Yet
                </h3>

                <p className="text-neutral-500 mt-3 max-w-md mx-auto leading-7">
                  Create your first category to organize your products and
                  improve inventory management.
                </p>
              </div>
            ) : (
              <div
                className="
                grid
                grid-cols-2
                lg:grid-cols-3
                2xl:grid-cols-4
                gap-4 sm:gap-5
                "
              >
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="
                    w-full
                    max-w-full
                    bg-white
                    rounded-2xl
                    border
                    border-neutral-200
                    shadow-sm
                    p-3 sm:p-5 lg:p-6
                    flex
                    flex-col
                    justify-between
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
                    transition-all
                    duration-300
                    "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className="
                          h-10
                          w-10
                          sm:h-12
                          sm:w-12
                          flex-shrink-0
                          rounded-xl
                          bg-neutral-100
                          flex
                          items-center
                          justify-center
                        "
                        >
                          <Tag size={22} />
                        </div>

                        <div>
                          <h3 className="text-sm sm:text-lg font-bold break-words leading-tight">
                            {category.name}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteCategory(category._id)}
                        className="
                        w-8 h-8 sm:w-10 sm:h-10
                        flex-shrink-0 
                        rounded-xl
                        border
                        border-red-200
                        text-red-500
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        hover:bg-red-500
                        hover:text-white
                      "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div
                      className="
                      mt-2
                      pt-2
                      border-t
                      border-neutral-200
                      flex
                      items-center
                      justify-between
                    "
                    >
                      <span className="text-sm text-neutral-500">Status</span>

                      <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-sm
                        font-semibold
                      "
                      >
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategories;
