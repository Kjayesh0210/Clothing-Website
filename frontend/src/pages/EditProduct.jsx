import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    discountPercentage: "",
    category: "",
    gender: "Unisex",
    images: [],
    sizes: [
      { size: "S", stock: 0 },
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 },
    ],
  });

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      console.log(res.data);
      setProduct(res.data);

      const defaultSizes = [
        { size: "S", stock: 0 },
        { size: "M", stock: 0 },
        { size: "L", stock: 0 },
        { size: "XL", stock: 0 },
        { size: "XXL", stock: 0 },
      ];

      const mergedSizes = defaultSizes.map((sizeObj) => {
        const existing = res.data.sizes?.find(
          (item) => item.size === sizeObj.size,
        );

        return existing || sizeObj;
      });

      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        price: res.data.price || "",
        originalPrice: res.data.originalPrice || "",
        discountPercentage: res.data.discountPercentage || "",
        category: res.data.category?._id || "",
        gender: res.data.gender || "Unisex",
        images: res.data.images || [],
        sizes: mergedSizes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");

      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      setNewImages(compressedFiles);

      toast.success("Images compressed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to compress images");
    }
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

    try {
      const token = localStorage.getItem("token");

      let uploadedImages = product?.images || [];

      if (newImages.length > 0) {
        uploadedImages = [];

        for (const image of newImages) {
          const formData = new FormData();

          formData.append("image", image);

          const uploadRes = await api.post("/upload", formData);

          uploadedImages.push(uploadRes.data.url);
        }
      }

      await api.put(
        `/products/${id}`,
        {
          title: form.title,
          description: form.description,
          price: Number(form.price),
          originalPrice: Number(form.originalPrice),
          discountPercentage: Number(form.discountPercentage),
          category: form.category,
          gender: form.gender,
          images: uploadedImages,
          sizes: form.sizes,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Product Updated");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-4xl mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-3"
          placeholder="Title"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-3"
          placeholder="Description"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border p-3"
          placeholder="Price"
        />

        <input
          type="number"
          name="originalPrice"
          value={form.originalPrice}
          onChange={handleChange}
          className="border p-3"
          placeholder="Original Price"
        />

        <input
          type="number"
          name="discountPercentage"
          value={form.discountPercentage}
          onChange={handleChange}
          className="border p-3"
          placeholder="Discount %"
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

        <div className="flex gap-3 flex-wrap">
          {form.images?.map((img, index) => (
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

        <input
          type="file"
          multiple
          onChange={handleFiles}
          className="border p-3"
        />

        {newImages.length > 0 && (
          <p className="text-sm text-gray-600">
            {newImages.length} new image(s) selected
          </p>
        )}

        <button
          type="submit"
          className="
          bg-black
          text-white
          py-3
          rounded
          "
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
