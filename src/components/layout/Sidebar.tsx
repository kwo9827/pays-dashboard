export default function Sidebar() {
  return (
    <aside className="w-60 bg-white p-4 shadow-lg">
      <h1 className="mb-6 text-xl font-bold">PayService</h1>

      <nav className="space-y-2">
        <div className="font-medium text-gray-700">Dashboard</div>
        <div className="text-gray-500">Payments</div>
        <div className="text-gray-500">Merchants</div>
      </nav>
    </aside>
  );
}
