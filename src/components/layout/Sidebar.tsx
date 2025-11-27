import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-screen w-60 bg-white p-4 shadow-lg">
      <h1 className="mb-6 text-xl font-bold">결제 대시보드</h1>

      <nav className="space-y-2">
        <NavItem to="/" label="Dashboard" />
        <NavItem to="/payments" label="Payments" />
        <NavItem to="/merchants" label="Merchants" />
      </nav>
    </aside>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `block rounded px-3 py-2 text-sm font-medium ${
          isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
