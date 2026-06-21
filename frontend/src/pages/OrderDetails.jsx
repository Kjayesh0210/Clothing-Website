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
          key={item.product._id}
          className="
            border
            p-3
            mb-2
            "
        >
          <p>{item.product.title}</p>

          <p>
            Qty:
            {item.quantity}
          </p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetails;
