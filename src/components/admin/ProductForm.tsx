
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
      : [] as { key: string, value: string }[],
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl pb-32 md:pb-12 mx-auto">

      {/* Header / Actions - Desktop */}
      <div className="hidden md:flex items-center justify-between mb-8">
        <p className="text-slate-500">Fill in the details below to add a new product to your inventory.</p>
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading} className="bg-slate-900 hover:bg-slate-800 text-white min-w-[140px]">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : (initialData ? 'Update Product' : 'Create Product')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN - MAIN INFO */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Basic Information</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-slate-700 font-semibold">Product Title</Label>
                <Input
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="h-11 text-lg border-slate-300 focus:border-amber-400"
                  placeholder="e.g. Industrial Heavy Duty Steel Rack"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-700 font-semibold">Category</Label>
                  <Select value={formData.category} onValueChange={(val) => setFormData({ ...formData, category: val, type: '' })}>
                    <SelectTrigger className="h-11 border-slate-300">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((c: any) => (
                        <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-700 font-semibold">Type / Sub-Category</Label>
                  <Select value={formData.type} onValueChange={(val) => setFormData({ ...formData, type: val })} disabled={!formData.category}>
                    <SelectTrigger className="h-11 border-slate-300">
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

              <div className="space-y-3">
                <Label className="text-slate-700 font-semibold">Description</Label>
                <Textarea
                  className="min-h-[150px] border-slate-300 focus:border-amber-400 resize-y"
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed description of the product..."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800">Product Images</h3>
              <span className="text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border">Max 5 Images</span>
            </div>
            <CardContent className="p-6 space-y-4">
              {formData.images.map((img: string, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex-1 space-y-3">
                    <Label className="text-xs uppercase font-bold text-slate-400">Image {i + 1} Source</Label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                toast.error("File too large (max 5MB)");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => handleImageChange(i, reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <div className="h-10 w-full border border-dashed border-slate-300 rounded-md bg-white flex items-center px-3 text-sm text-slate-500 hover:bg-slate-50 transition-colors">
                          Click to Upload File
                        </div>
                      </div>
                      <span className="self-center font-bold text-xs text-slate-400">OR</span>
                      <Input
                        placeholder="Paste Image URL"
                        value={img.startsWith('data:') ? '(Uploaded File)' : img}
                        onChange={(e) => handleImageChange(i, e.target.value)}
                        disabled={img.startsWith('data:')}
                        className="flex-1 bg-white"
                      />
                    </div>
                  </div>

                  {img && (
                    <div className="relative h-20 w-20 bg-white border rounded-lg overflow-hidden shrink-0 shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Preview" className="object-cover w-full h-full" />
                    </div>
                  )}

                  {formData.images.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeImageField(i)} className="text-slate-400 hover:text-red-500">
                      <X className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              ))}

              {formData.images.length < 5 && (
                <Button type="button" variant="outline" onClick={addImageField} className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-amber-600 hover:border-amber-400 hover:bg-amber-50">
                  <Plus className="h-5 w-5 mr-2" /> Add Another Image
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - SIDEBAR */}
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Pricing & Inventory</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label className="text-slate-700 font-semibold">Selling Price (₹)</Label>
                <Input
                  type="number"
                  required
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  className="border-transparent h-11 border-slate-300 font-mono text-lg font-bold text-slate-900"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-slate-700 font-semibold">MRP (₹)</Label>
                <Input
                  type="number"
                  required
                  value={formData.mrpPrice}
                  onChange={e => setFormData({ ...formData, mrpPrice: e.target.value })}
                  className="border-transparent h-11 border-slate-300 font-mono text-lg font-bold text-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-700 font-semibold">Stock Status</Label>
                  <Select value={formData.stockStatus} onValueChange={(val) => setFormData({ ...formData, stockStatus: val })}>
                    <SelectTrigger className={`h-11 font-medium ${formData.stockStatus === 'In Stock' ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock" className="text-green-600 font-bold">In Stock</SelectItem>
                      <SelectItem value="Out of Stock" className="text-red-600 font-bold">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 ">
                  <Label className="text-slate-700 font-semibold ">SKU (Optional)</Label>
                  <Input value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} className="h-11 uppercase border-slate-300" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Attributes</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              {formData.attributes.map((attr: any, i: number) => (
                <div key={i} className="flex gap-2 items-center bg-slate-50 p-2 rounded border border-slate-100">
                  <Input placeholder="Key" value={attr.key} onChange={(e) => handleAttrChange(i, 'key', e.target.value)} className="h-8 text-xs bg-white" />
                  <Input placeholder="Value" value={attr.value} onChange={(e) => handleAttrChange(i, 'value', e.target.value)} className="h-8 text-xs bg-white" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeAttrField(i)} className="h-8 w-8 hover:bg-white text-slate-400 hover:text-red-500">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addAttrField} className="w-full text-xs">
                <Plus className="h-3 w-3 mr-2" /> Add New Attribute
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-50 flex justify-end gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={loading} className="bg-slate-900 text-white">
          {loading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
}


