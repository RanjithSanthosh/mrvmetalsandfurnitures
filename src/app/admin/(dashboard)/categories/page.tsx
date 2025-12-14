
import { CategoryManager } from '@/components/admin/CategoryManager';

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Category & Type Manager</h1>
      <CategoryManager />
    </div>
  );
}
