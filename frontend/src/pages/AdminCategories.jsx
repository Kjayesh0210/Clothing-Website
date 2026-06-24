import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get("/categories");

    setCategories(res.data);
  };

  const addCategory = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/categories",
        {
          name,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setName("");

      fetchCategories();

      toast.success("Category Added");
    } catch (error) {
      toast.error("Failed");
    }
  };

  const deleteCategory = async (id) => {
    const token = localStorage.getItem("token");

    await api.delete(`/categories/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    fetchCategories();

    toast.success("Deleted");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Categories</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="border p-3"
        />

        <button
          onClick={addCategory}
          className="
          bg-black
          text-white
          px-5
          "
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div
            key={category._id}
            className="
            border
            p-4
            rounded
            flex
            justify-between
            "
          >
            <span>{category.name}</span>

            <button
              onClick={() => deleteCategory(category._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;
