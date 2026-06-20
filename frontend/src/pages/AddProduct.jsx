import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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
    category: "",
    stock: "",
    image: "",
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
          category: form.category,
          stock: Number(form.stock),
          images: uploadedImages,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      alert("Product Added");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert("Failed");
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
