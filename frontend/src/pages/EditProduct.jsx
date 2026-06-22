import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    originalPrice: "",
    discountPercentage: "",
    category: "",
    stock: "",
    images: [],
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      setProduct(res.data);

      setForm({
        title: res.data.title || "",
        description: res.data.description || "",
        price: res.data.price || "",
        originalPrice: res.data.originalPrice || "",
        discountPercentage: res.data.discountPercentage || "",
        category: res.data.category || "",
        stock: res.data.stock || "",
        images: res.data.images || [],
      });
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

  const handleFiles = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          stock: Number(form.stock),
          images: uploadedImages,
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

      console.log(error.response?.data);

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
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-3"
          placeholder="Category"
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-3"
          placeholder="Stock"
        />

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
