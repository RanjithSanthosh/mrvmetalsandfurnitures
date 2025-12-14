
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { X, Plus, Loader2 } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface ProductFormProps {
  initialData?: any;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const { data: categories } = useSWR('/api/categories', fetcher);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    type: initialData?.type || '',
    price: initialData?.price || '',
    mrpPrice: initialData?.mrpPrice || '',
    sku: initialData?.sku || '',
    stockStatus: initialData?.stockStatus || 'In Stock',
    images: initialData?.images || [''],
    attributes: initialData?.attributes 
      ? Object.entries(initialData.attributes).map(([key, value]) => ({ key, value }))
      : [] as {key:string, value:string}[],
  });

  // Derived types based on selected category
  const selectedCategoryObj = categories?.find((c: any) => c.name === formData.category);
  const availableTypes = selectedCategoryObj?.types || [];

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    if (formData.images.length < 5) {
      setFormData({ ...formData, images: [...formData.images, ''] });
    }
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_: string, i: number) => i !== index);
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleAttrChange = (index: number, field: 'key' | 'value', value: string) => {
    const newAttrs = [...formData.attributes];
    // @ts-ignore
    newAttrs[index][field] = value;
    setFormData({ ...formData, attributes: newAttrs });
  };

  const addAttrField = () => {
    setFormData({ ...formData, attributes: [...formData.attributes, { key: '', value: '' }] });
  };

  const removeAttrField = (index: number) => {
    const newAttrs = formData.attributes.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, attributes: newAttrs });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      const validImages = formData.images.filter((img: string) => img.trim() !== '');
      if (validImages.length === 0) throw new Error('At least one image URL is required');
      
      const attributesObj = formData.attributes.reduce((acc: any, curr: any) => {
        if (curr.key && curr.value) acc[curr.key] = curr.value;
        return acc;
      }, {});

      const payload = {
        ...formData,
        price: Number(formData.price),
        mrpPrice: Number(formData.mrpPrice),
        images: validImages,
        attributes: attributesObj
      };

      const url = initialData ? `/api/admin/products/${initialData._id}` : '/api/admin/products';
      const method = initialData ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      toast.success(initialData ? 'Product updated' : 'Product created');
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Product Title</Label>
            <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(val) => setFormData({...formData, category: val, type: ''})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c: any) => (
                    <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={formData.type} onValueChange={(val) => setFormData({...formData, type: val})} disabled={!formData.category}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  {availableTypes.map((t: string) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Price (₹)</Label>
              <Input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>MRP (₹)</Label>
              <Input type="number" required value={formData.mrpPrice} onChange={e => setFormData({...formData, mrpPrice: e.target.value})} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label>SKU (Optional)</Label>
              <Input value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
            </div>
             <div className="space-y-2">
              <Label>Stock Status</Label>
               <Select value={formData.stockStatus} onValueChange={(val) => setFormData({...formData, stockStatus: val})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                   <SelectItem value="In Stock">In Stock</SelectItem>
                   <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Description & Images */}
        <div className="space-y-4">
          <div className="space-y-2">
             <Label>Description</Label>
             <Textarea className="h-32" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>

          <div className="space-y-2">
             <Label>Images (Max 5) - Upload or Paste URL</Label>
             {formData.images.map((img: string, i: number) => (
               <div key={i} className="flex gap-2 items-center">
                 <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                        <Input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 5 * 1024 * 1024) {
                                    toast.error("File too large (max 5MB)");
                                    return;
                                  }
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    handleImageChange(i, reader.result as string);
                                  };
                                  reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <span className="text-xs text-muted-foreground self-center">OR</span>
                        <Input 
                        placeholder="https://..." 
                        value={img.startsWith('data:') ? '(Image Uploaded)' : img} 
                        onChange={(e) => handleImageChange(i, e.target.value)} 
                        disabled={img.startsWith('data:')}
                        />
                    </div>
                    {img && (
                        <div className="relative h-20 w-20 border rounded overflow-hidden">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="Preview" className="object-cover w-full h-full" />
                        </div>
                    )}
                 </div>
                 
                 
                 {formData.images.length > 1 && (
                   <Button type="button" variant="ghost" size="icon" onClick={() => removeImageField(i)}>
                     <X className="h-4 w-4" />
                   </Button>
                 )}
               </div>
             ))}
             {formData.images.length < 5 && (
               <Button type="button" variant="outline" size="sm" onClick={addImageField} className="mt-2">
                 <Plus className="h-4 w-4 mr-2" /> Add Image
               </Button>
             )}
          </div>
        </div>
      </div>

      {/* Attributes */}
      <Card>
        <CardContent className="pt-6">
           <Label className="mb-4 block">Product Attributes (Optional)</Label>
           <div className="space-y-2">
             {formData.attributes.map((attr: any, i: number) => (
               <div key={i} className="flex gap-2">
                 <Input placeholder="Name (e.g. Material)" value={attr.key as string} onChange={(e) => handleAttrChange(i, 'key', e.target.value)} />
                 <Input placeholder="Value (e.g. Steel)" value={attr.value as string} onChange={(e) => handleAttrChange(i, 'value', e.target.value)} />
                 <Button type="button" variant="ghost" size="icon" onClick={() => removeAttrField(i)}>
                    <X className="h-4 w-4" />
                 </Button>
               </div>
             ))}
             <Button type="button" variant="outline" size="sm" onClick={addAttrField}>
                <Plus className="h-4 w-4 mr-2" /> Add Attribute
             </Button>
           </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
         <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
         <Button type="submit" disabled={loading}>
           {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (initialData ? 'Update Product' : 'Create Product')}
         </Button>
      </div>
    </form>
  );
}
