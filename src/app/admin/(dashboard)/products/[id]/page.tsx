
import { ProductForm } from '@/components/admin/ProductForm';
import { getProductById } from '@/lib/data';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage(props: Props) {
  const params = await props.params;
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold tracking-tight text-slate-900">Edit Product</h1>
       <ProductForm initialData={product} />
    </div>
  );
}
