import { useState } from "react";
import ordersData from "../data/orders.json";
import PageHeader from "../components/PageHeader";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    status: "Pending",
    totalPrice: "",
    orderDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      id: orders.length + 1,
      ...form,
    };

    setOrders([...orders, newOrder]);
    setShowForm(false);

    setForm({
      customerName: "",
      status: "Pending",
      totalPrice: "",
      orderDate: "",
    });
  };

  return (
    <div>
      <PageHeader
        title="Orders"
        breadcrumb={["Dashboard", "Orders"]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg"
        >
          Add Order
        </button>
      </PageHeader>

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              type="text"
              name="customerName"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>Pending</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <input
              type="number"
              name="totalPrice"
              placeholder="Total Price"
              value={form.totalPrice}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="date"
              name="orderDate"
              value={form.orderDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <div className="flex gap-2">
              <button className="bg-hijau text-white px-4 py-2 rounded">
                Simpan
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Batal
              </button>
            </div>

          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">Rp {order.totalPrice}</td>
                <td className="p-3">{order.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}