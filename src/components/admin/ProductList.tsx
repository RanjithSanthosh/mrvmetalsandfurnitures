
'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { toast } from 'sonner';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProductList() {
  const [search, setSearch] = useState('');
  const { data: products, error, isLoading } = useSWR(`/api/products?search=${search}`, fetcher);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const router = useRouter();

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/products/${deleteId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      
      toast.success('Product deleted');
      mutate(`/api/products?search=${search}`); // Refresh list
    } catch (e) {
      toast.error('Error deleting product');
    } finally {
      setDeleteId(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center h-24">Loading...</TableCell>
               </TableRow>
            ) : error ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center text-red-500">Error loading products</TableCell>
               </TableRow>
            ) : products?.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center h-24">No products found.</TableCell>
               </TableRow>
            ) : (
               products?.map((product: any) => (
                 <TableRow key={product._id}>
                   <TableCell className="font-medium max-w-[200px] truncate" title={product.title}>{product.title}</TableCell>
                   <TableCell>{product.category}</TableCell>
                   <TableCell>{product.type}</TableCell>
                   <TableCell>₹{product.price}</TableCell>
                   <TableCell>
                     <Badge variant={product.stockStatus === 'In Stock' ? 'default' : 'destructive'}>
                       {product.stockStatus}
                     </Badge>
                   </TableCell>
                   <TableCell className="text-right space-x-2">
                     <Link href={`/admin/products/${product._id}`}>
                       <Button size="icon" variant="ghost">
                         <Edit className="h-4 w-4" />
                       </Button>
                     </Link>
                     <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => setDeleteId(product._id)}>
                       <Trash2 className="h-4 w-4" />
                     </Button>
                   </TableCell>
                 </TableRow>
               ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
