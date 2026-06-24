import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

function AddProduct() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    discountPercentage: "",
    category: "",
    gender: "Unisex",
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 },
    ],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFiles = async (e) => {
    try {
      const files = Array.from(e.target.files);

      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          return await imageCompression(file, {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
            fileType: "image/webp",
          });
        }),
      );

      setImages(compressedFiles);

      const previews = compressedFiles.map((file) => URL.createObjectURL(file));

      setPreviewImages(previews);

      const originalSize = files.reduce((sum, file) => sum + file.size, 0);

      const compressedSize = compressedFiles.reduce(
        (sum, file) => sum + file.size,
        0,
      );

      console.log(
        `Reduced from ${(originalSize / 1024 / 1024).toFixed(2)} MB to ${(compressedSize / 1024 / 1024).toFixed(2)} MB`,
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to compress images");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSizeStockChange = (index, value) => {
    const updatedSizes = [...form.sizes];

    updatedSizes[index].stock = Number(value);

    setForm({
      ...form,
      sizes: updatedSizes,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      toast.error("Please select a category");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }
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
          images: uploadedImages,
          sizes: form.sizes.filter((item) => item.stock > 0),
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

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-3"
        >
          <option value="Male">Male</option>

          <option value="Female">Female</option>

          <option value="Unisex">Unisex</option>
        </select>

        <div>
          <p className="mb-2 font-semibold">Size Inventory</p>

          {form.sizes.map((item, index) => (
            <div key={item.size} className="flex items-center gap-4 mb-2">
              <span className="w-12">{item.size}</span>

              <input
                type="number"
                min="0"
                value={item.stock}
                onChange={(e) => handleSizeStockChange(index, e.target.value)}
                className="border p-2 w-24"
              />
            </div>
          ))}
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
