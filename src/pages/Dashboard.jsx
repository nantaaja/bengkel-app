import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <PageHeader
      title = "Dashboard"
      breadcrumb={["Dashboard", "Statistik"]}></PageHeader>

      <div
        id="dashboard-grid"
        className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div
          id="dashboard-orders"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-8"
        >
          <div id="orders-icon" className="bg-dashboard1 rounded-full p-4">
            <img src="/public/img/group 121.png" alt="" />
          </div>
          <div id="orders-info" className="flex flex-col">
            <span id="orders-count" className="text-2xl font-bold">
              75
            </span>
            <span id="orders-text" className="text-gray-400">
              Total Sales
            </span>
          </div>
        </div>

        <div
          id="dashboard-delivered"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-8"
        >
          <div id="delivered-icon" className="bg-dashboard1 rounded-full p-4">
            <img src="/public/img/group 82.png" alt="" />
          </div>
          <div id="delivered-info" className="flex flex-col">
            <span id="delivered-count" className="text-2xl font-bold">
              175
            </span>
            <span id="delivered-text" className="text-gray-400">
              Total Revenue
            </span>
          </div>
        </div>

        <div
          id="dashboard-canceled"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-8"
        >
          <div id="canceled-icon" className="bg-dashboard1 rounded-full p-4">
            <img src="/public/img/group 121_1.png" alt="" />
          </div>
          <div id="canceled-info" className="flex flex-col">
            <span id="canceled-count" className="text-2xl font-bold">
              40
            </span>
            <span id="canceled-text" className="text-gray-400">
              Total Customers
            </span>
          </div>
        </div>

        <div
          id="dashboard-revenue"
          className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-8"
        >
          <div id="revenue-icon" className="bg-dashboard1 rounded-full p-4">
            <img src="/public/img/group 84.png" alt="" />
          </div>
          <div id="revenue-info" className="flex flex-col">
            <span id="revenue-amount" className="text-2xl font-bold">
              Rp.128
            </span>
            <span id="revenue-text" className="text-gray-400">
              Average Growth
            </span>
          </div>
        </div>
      </div>

      <div id="dashboard-piechart" className="p-5 grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div
          id="dashboard-orders"
          className="h-70 flex flex-col justify-center text-center items-center space-x-5 bg-white rounded-lg shadow-md p-4"
        >
          <div id="orders-icon" className="bg-dashboard1 rounded-full p-4 mr-0">
            <img src="/public/img/group 121.png" alt="" />
          </div>
          <div id="orders-info" className="flex flex-col pt-4">
            <span id="orders-count" className="text-2xl font-bold">
              Rp. 32,000,000
            </span>
            <span id="orders-text" className="text-gray-400">
              Annual Revenue
            </span>
          </div>
        </div>

        <div
          id="dashboard-orders"
          className="h-70 flex flex-col justify-center text-center items-center space-x-5 bg-white rounded-lg shadow-md p-4"
        >
          <div id="orders-icon" className="bg-dashboard1 rounded-full p-4 mr-0">
            <img src="/public/img/group 121.png" alt="" />
          </div>
          <div id="orders-info" className="flex flex-col pt-4">
            <span id="orders-count" className="text-2xl font-bold">
              Rp. 15,000,000
            </span>
            <span id="orders-text" className="text-gray-400">
              Net Profit
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
