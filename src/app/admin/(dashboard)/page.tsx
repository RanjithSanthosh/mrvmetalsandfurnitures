
import { ProductList } from '@/components/admin/ProductList';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
      </div>
      <ProductList />
    </div>
  );
}
