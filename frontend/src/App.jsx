import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./assets/tailwind.css";

import { FaHome } from "react-icons/fa";

// const PageHeader = React.lazy(() => import("./components/PageHeader"));
const ErrorPage = React.lazy(() => import("./components/ErrorPage"));
const Loading = React.lazy(() => import("./components/Loading"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const NotFound = React.lazy(() => import("./pages/NotFound"));
const BadRequest = React.lazy(() => import("./pages/BadRequest"));
const Forbidden = React.lazy(() => import("./pages/Forbidden"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Orders = React.lazy(() => import("./pages/Orders"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// const Sparepart = React.lazy(() => import("./pages/Sparepart"));
const Service = React.lazy(() => import("./pages/Service"));

const TransactionHistory = React.lazy(() => import("./pages/TransactionHistory"));

const Report = React.lazy(() => import("./pages/Report"));
const Sparepart = React.lazy(() => import("./pages/sparepart/Index"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/orders" element={<Sparepart />} />
          <Route path="/pelayanan-service" element={<Service />} />
          
          <Route path="/riwayat-transaksi" element={<TransactionHistory />} />
          
          <Route path="/laporan" element={<Report />} />

          <Route path="/sparepart" element={<Sparepart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/401" element={<Unauthorized />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/400" element={<BadRequest />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
