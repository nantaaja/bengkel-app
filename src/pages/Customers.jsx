import { useState } from "react";
import customersData from "../data/customers.json";
import PageHeader from "../components/PageHeader";

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    loyalty: "Gold",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
      id: customers.length + 1,
      ...form,
    };

    setCustomers([...customers, newCustomer]);
    setShowForm(false);

    setForm({
      name: "",
      email: "",
      phone: "",
      loyalty: "Gold",
    });
  };

  return (
    <div>
      <PageHeader
        title="Customers"
        breadcrumb={["Dashboard", "Customers"]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg"
        >
          Add Customer
        </button>
      </PageHeader>

      {showForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <select
              name="loyalty"
              value={form.loyalty}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
            </select>

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
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Loyalty</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{customer.id}</td>
                <td className="p-3">{customer.name}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${customer.loyalty === "Gold"
                      ? "bg-yellow-100 text-yellow-700"
                      : customer.loyalty === "Silver"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-orange-100 text-orange-700"
                      }`}
                  >
                    {customer.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}