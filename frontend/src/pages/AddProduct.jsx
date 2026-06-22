import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setPreviewImages(previews);
  };

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    discountPercentage: "",
    category: "",
    stock: "",
    image: "",
    gender: "Unisex",
    sizes: [],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadedImages = [];

      for (const image of images) {
        const formData = new FormData();

        formData.append("image", image);

        const uploadRes = await api.post("/upload", formData);

        uploadedImages.push(uploadRes.data.url);
      }

      const token = localStorage.getItem("token");

      await api.post(
        "/products",
        {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          originalPrice: Number(form.originalPrice),
          discountPercentage: Number(form.discountPercentage),
          category: form.category,
          gender: form.gender,
          stock: Number(form.stock),
          images: uploadedImages,
          sizes: form.sizes,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      toast.success("Product Added");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    }
  };

  const handleSizeChange = (size) => {
    if (form.sizes.includes(size)) {
      setForm({
        ...form,
        sizes: form.sizes.filter((item) => item !== size),
      });
    } else {
      setForm({
        ...form,
        sizes: [...form.sizes, size],
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-4xl mb-6">Add Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="border p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border p-3"
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={form.originalPrice}
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="number"
          name="discountPercentage"
          placeholder="Discount %"
          value={form.discountPercentage}
          onChange={handleChange}
          className="border p-3"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-3"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="border p-3"
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="
          border
          p-3
          "
        >
          <option value="Male">Male</option>

          <option value="Female">Female</option>

          <option value="Unisex">Unisex</option>
        </select>

        <div>
          <p className="mb-2 font-semibold">Available Sizes</p>

          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label
                key={size}
                className="
          flex
          items-center
          gap-1
          "
              >
                <input
                  type="checkbox"
                  checked={form.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />

                {size}
              </label>
            ))}
          </div>
        </div>

        <input
          type="file"
          multiple
          onChange={handleFiles}
          className="border p-3"
        />
        <div className="flex gap-3 flex-wrap">
          {previewImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className="
        w-24
        h-24
        object-cover
        border
        rounded
        "
            />
          ))}
        </div>

        <button
          type="submit"
          className="
          bg-black
          text-white
          py-3
          "
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
