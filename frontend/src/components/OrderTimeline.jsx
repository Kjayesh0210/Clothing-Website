function OrderTimeline({ status }) {
  const statuses = ["Pending", "Confirmed", "Shipped", "Delivered"];

  const currentIndex = statuses.indexOf(status);

  return (
    <div className="mt-6">
      {statuses.map((item, index) => (
        <div
          key={item}
          className="
            flex
            items-center
            mb-4
            "
        >
          <div
            className={`
              w-4
              h-4
              rounded-full
              ${index <= currentIndex ? "bg-green-500" : "bg-gray-300"}
              `}
          />

          <span className="ml-3">{item}</span>
        </div>
      ))}
    </div>
  );
}

export default OrderTimeline;
