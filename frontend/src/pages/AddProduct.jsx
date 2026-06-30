import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

import {
  Package,
  ImagePlus,
  IndianRupee,
  Boxes,
  Shirt,
  Upload,
} from "lucide-react";

function AddProduct() {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const [uploading, setUploading] = useState(false);

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
        files.map((file) =>
          imageCompression(file, {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
            fileType: "image/webp",
          }),
        ),
      );

      setImages(compressedFiles);

      setPreviewImages(
        compressedFiles.map((file) => URL.createObjectURL(file)),
      );
    } catch (error) {
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
    const updated = [...form.sizes];

    updated[index].stock = Number(value);

    setForm({
      ...form,
      sizes: updated,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category) {
      toast.error("Select category");
      return;
    }

    if (images.length === 0) {
      toast.error("Upload images");
      return;
    }

    try {
      setUploading(true);

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
          ...form,
          price: Number(form.price),
          originalPrice: Number(form.originalPrice),
          discountPercentage: Number(form.discountPercentage),
          images: uploadedImages,
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
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="min-h-screen bg-neutral-50 flex justify-center">
      <div className="w-full max-w-5xl px-6 lg:px-8 mt-10">
        {/* Header */}

        <div
          className="
    mb-14
    bg-white
    rounded-3xl
    border
    border-neutral-200
    shadow-sm
    p-8
        mb-10
  "
        >
          <div className="flex items-center gap-5">
            <div
              className="
              w-16
              h-16
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
            "
            >
              <Package size={30} />
            </div>

            <div>
              <h1 className="text-5xl font-bold tracking-tight">Add Product</h1>

              <p className="text-lg text-neutral-500 mt-2">
                Create a new product for your clothing store.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Basic Information */}

          <div
            className="
            bg-white
            rounded-[32px]
            border
            border-neutral-200
            shadow-sm
            p-10
          "
          >
            <div className="flex items-center gap-4 mb-10">
              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-neutral-100
                flex
                items-center
                justify-center
              "
              >
                <Shirt size={26} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">Basic Information</h2>

                <p className="text-neutral-500 mt-2">
                  Product details visible to customers.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block font-semibold mb-3">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Oversized Hoodie"
                  className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-neutral-300
                  px-5
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-4
                  focus:ring-neutral-100
                "
                />
              </div>

              <div>
                <label className="block font-semibold mb-3">Category</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-neutral-300
                  px-5
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-4
                  focus:ring-neutral-100
                "
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8">
              <label className="block font-semibold mb-3">Description</label>

              <textarea
                rows={6}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a detailed product description..."
                className="
                w-full
                rounded-2xl
                border
                border-neutral-300
                p-5
                resize-none
                outline-none
                transition
                focus:border-black
                focus:ring-4
                focus:ring-neutral-100
              "
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <label className="block font-semibold mb-3">Gender</label>

                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-neutral-300
                  px-5
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-4
                  focus:ring-neutral-100
                "
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}

          <div
            className="
            bg-white
            rounded-[32px]
            border
            border-neutral-200
            shadow-sm
            p-10
          "
          >
            <div className="flex items-center gap-4 mb-10">
              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-neutral-100
                flex
                items-center
                justify-center
              "
              >
                <IndianRupee size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">Pricing</h2>

                <p className="text-neutral-500 mt-2">
                  Configure product pricing and discounts.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <label className="block font-semibold mb-3">
                  Selling Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-neutral-300
                  px-5
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-4
                  focus:ring-neutral-100
                "
                />
              </div>

              <div>
                <label className="block font-semibold mb-3">
                  Original Price
                </label>

                <input
                  type="number"
                  name="originalPrice"
                  value={form.originalPrice}
                  onChange={handleChange}
                  className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-neutral-300
                  px-5
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-4
                  focus:ring-neutral-100
                "
                />
              </div>

              <div>
                <label className="block font-semibold mb-3">Discount %</label>

                <input
                  type="number"
                  name="discountPercentage"
                  value={form.discountPercentage}
                  onChange={handleChange}
                  className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-neutral-300
                  px-5
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-4
                  focus:ring-neutral-100
                "
                />
              </div>
            </div>
          </div>
          {/* Inventory */}

          <div
            className="
            bg-white
            rounded-[32px]
            border
            border-neutral-200
            shadow-sm
            p-10
          "
          >
            <div className="flex items-center gap-4 mb-10">
              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-neutral-100
                flex
                items-center
                justify-center
              "
              >
                <Boxes size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">Inventory</h2>

                <p className="text-neutral-500 mt-2">
                  Configure available stock for every size.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {form.sizes.map((item, index) => (
                <div
                  key={item.size}
                  className="
                  rounded-3xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  p-6
                  text-center
                "
                >
                  <h3 className="text-2xl font-bold">{item.size}</h3>

                  <p className="text-sm text-neutral-500 mt-2">Available</p>

                  <input
                    type="number"
                    min="0"
                    value={item.stock}
                    onChange={(e) =>
                      handleSizeStockChange(index, e.target.value)
                    }
                    className="
                    mt-5
                    w-full
                    h-12
                    rounded-xl
                    border
                    border-neutral-300
                    text-center
                    font-semibold
                    outline-none
                    transition
                    focus:border-black
                    focus:ring-4
                    focus:ring-neutral-100
                  "
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Images */}

          <div
            className="
            bg-white
            rounded-[32px]
            border
            border-neutral-200
            shadow-sm
            p-10
          "
          >
            <div className="flex items-center gap-4 mb-10">
              <div
                className="
                w-14
                h-14
                rounded-2xl
                bg-neutral-100
                flex
                items-center
                justify-center
              "
              >
                <ImagePlus size={24} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">Product Images</h2>

                <p className="text-neutral-500 mt-2">
                  Upload high-quality product images.
                </p>
              </div>
            </div>

            <label
              className="
              flex
              flex-col
              items-center
              justify-center
              border-2
              border-dashed
              border-neutral-300
              rounded-[28px]
              p-16
              cursor-pointer
              transition-all
              duration-300
              hover:border-black
              hover:bg-neutral-50
            "
            >
              <Upload size={42} className="text-neutral-500" />

              <h3 className="text-xl font-semibold mt-5">
                Upload Product Images
              </h3>

              <p className="text-neutral-500 mt-2 text-center max-w-md">
                Click to browse or drag and drop multiple product images.
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFiles}
                className="hidden"
              />
            </label>

            {previewImages.length > 0 && (
              <div className="mt-10">
                <h3 className="text-2xl font-bold mb-6">Preview</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                  {previewImages.map((img, index) => (
                    <div
                      key={index}
                      className="
                      rounded-2xl
                      overflow-hidden
                      border
                      border-neutral-200
                      shadow-sm
                    "
                    >
                      <img
                        src={img}
                        alt=""
                        className="
                        w-full
                        h-56
                        object-cover
                        transition-transform
                        duration-300
                        hover:scale-105
                      "
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Publish */}

          <div
            className="
            bg-white
            rounded-[32px]
            border
            border-neutral-200
            shadow-sm
            p-10
          "
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <h2 className="text-3xl font-bold">Ready to Publish?</h2>

                <p className="text-neutral-500 mt-3 leading-7 max-w-2xl">
                  Review your product information before publishing. Images will
                  be uploaded automatically and the product will become
                  available in your admin inventory.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/products")}
                  className="
                  h-14
                  px-8
                  rounded-2xl
                  border
                  border-neutral-300
                  font-semibold
                  transition-all
                  duration-300
                  hover:bg-neutral-100
                "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={uploading}
                  className="
                  h-14
                  px-10
                  rounded-2xl
                  bg-black
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-3
                  transition-all
                  duration-300
                  hover:bg-neutral-800
                  hover:-translate-y-0.5
                  active:scale-[0.98]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
                >
                  {uploading ? (
                    <>
                      <div
                        className="
                        w-5
                        h-5
                        rounded-full
                        border-2
                        border-white
                        border-t-transparent
                        animate-spin
                      "
                      />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Package size={20} />
                      Publish Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
