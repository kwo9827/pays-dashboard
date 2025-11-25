import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PaymentsPage from "../pages/Payments/PaymentsPage";
import MerchantsPage from "../pages/Merchants/MerchantsPage";
import MerchantDetailPage from "../pages/Merchants/MerchantDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/payments",
    element: <PaymentsPage />,
  },
  {
    path: "/merchants",
    element: <MerchantsPage />,
  },
  {
    path: "/merchants/:mchtCode",
    element: <MerchantDetailPage />,
  },
]);
