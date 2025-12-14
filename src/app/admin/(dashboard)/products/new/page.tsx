
import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add New Product</h1>
       <ProductForm />
    </div>
  );
}
