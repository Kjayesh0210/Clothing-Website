import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../services/api";
import OrderTimeline from "../components/OrderTimeline";
function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get(`/orders/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    setOrder(res.data);
  };

  if (!order) return <h1>Loading...</h1>;

  return (
    <div className="p-10">
      <h1 className="text-3xl mb-5">Order Details</h1>

      <p>
        Status:
        {order.status}
      </p>
      <OrderTimeline status={order.status} />
      <p>
        Payment:
        {order.isPaid ? " Paid" : " Unpaid"}
      </p>

      <p>
        Payment ID:
        {order.paymentId}
      </p>

      <p>Total: ₹{order.totalAmount}</p>

      <p>
        Address:
        {order.address}
      </p>

      <h2 className="text-2xl mt-5 mb-3">Products</h2>

      {order.products.map((item) => (
        <div
          key={`${item.product._id}-${item.size}`}
          className="
    border
    p-4
    mb-3
    rounded
    flex
    gap-4
    items-center
    "
        >
          <img
            src={item.product.images?.[0]}
            alt={item.product.title}
            className="
      w-20
      h-20
      object-cover
      rounded
      "
          />
          <div>
            <h3 className="font-semibold">{item.product.title}</h3>

            <p className="text-gray-600">Category: {item.product.category}</p>

            <p className="text-gray-600">Price: ₹{item.product.price}</p>

            <p className="text-gray-600">Size: {item.size || "N/A"}</p>

            <p className="text-gray-600">Quantity: {item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
