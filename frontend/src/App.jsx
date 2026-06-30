import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/tailwind.css";

const Loading = React.lazy(() => import("./components/Loading"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Orders = React.lazy(() => import("./pages/Orders"));

const Sparepart = React.lazy(() => import("./pages/sparepart/Index"));
const Service = React.lazy(() => import("./pages/service/Index"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

const NotFound = React.lazy(() => import("./pages/NotFound"));
const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
const Forbidden = React.lazy(() => import("./pages/Forbidden"));
const BadRequest = React.lazy(() => import("./pages/BadRequest"));

const TransactionHistory = React.lazy(() => import("./pages/transaction/Index"));

const OwnerLayout = React.lazy(() => import("./layouts/OwnerLayout"));
const OwnerDashboard = React.lazy(() => import("./pages/owner/Dashboard"));
const Report = React.lazy(() => import("./pages/Report"));
const OwnerRoute = React.lazy(() => import("./components/OwnerRoute"));
const Users = React.lazy(() => import("./pages/owner/Users"));

const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          
          {/* Main Layout Admin*/}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sparepart" element={<Sparepart />} />
            <Route path="/pelayanan-service" element={<Service />} />
            <Route path="/riwayat-transaksi" element={<TransactionHistory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Owner"]} />}>
        {/* Main Layout Owner*/}
        <Route element={<OwnerLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/laporan" element={<Report />} />
          <Route path="/owner/users" element={<Users />} />
        </Route>
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="/400" element={<BadRequest />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/403" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
