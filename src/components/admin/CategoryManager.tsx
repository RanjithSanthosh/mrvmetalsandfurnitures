
'use client';

import { useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, Trash2, Plus, X, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function CategoryManager() {
  const { data: categories, isLoading } = useSWR('/api/admin/categories', fetcher);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState('');

  const [isCreating, setIsCreating] = useState(false);
  const createCategory = async () => {
    if (!newCategoryName) return;
    setIsCreating(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName, image: newCategoryImage }),
      });
      if (!res.ok) throw new Error('Failed to create');
      toast.success('Category created');
      setNewCategoryName('');
      setNewCategoryImage('');
      mutate('/api/admin/categories');
    } catch {
      toast.error('Error creating category');
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("File too large (max 2MB)");
      const reader = new FileReader();
      reader.onloadend = () => setNewCategoryImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">

      {/* ADD NEW CATEGORY CARD */}
      <Card className="border-2 border border-slate-300 bg-slate-50/50 hover:bg-white hover:border-amber-400 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-white">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Create New Category</h3>
                <p className="text-sm text-slate-500">Add a new main category for your products</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div className="space-y-3">
                <Label className="text-slate-700 font-semibold">Category Name</Label>
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Office Furnitures"
                  className="h-11 border-slate-300 focus:border-amber-400 text-lg"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-slate-700 font-semibold">Category Logo/Icon</Label>
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCreateImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                    />
                    <div className="h-11 border border-slate-300 rounded-md bg-white flex items-center px-4 text-sm text-slate-500 hover:border-amber-400 transition-colors">
                      {newCategoryImage ? "Image Selected" : "Click to Upload Image"}
                    </div>
                  </div>

                  {newCategoryImage && (
                    <div className="relative h-11 w-11 border rounded-lg overflow-hidden shrink-0 shadow-sm bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={newCategoryImage} alt="Preview" className="object-cover w-full h-full" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity" onClick={() => setNewCategoryImage('')}>
                        <X className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={createCategory}
                    disabled={!newCategoryName || isCreating}
                    className="h-11 min-w-[120px] bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-lg"
                  >
                    {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Creates"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-slate-400">Loading categories...</div>
        ) : categories?.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-400 italic">No categories found. Create one above.</div>
        ) : (
          categories?.map((cat: any) => (
            <CategoryCard key={cat._id} category={cat} />
          ))
        )}
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: any }) {
  const [name, setName] = useState(category.name);
  const [types, setTypes] = useState<string[]>(category.types || []);
  const [image, setImage] = useState(category.image || '');
  const [newType, setNewType] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/categories/${category._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, types, image }),
      });
      if (!res.ok) throw new Error('Failed to update');
      toast.success('Category updated');
      setHasChanges(false);
      mutate('/api/admin/categories');
    } catch {
      toast.error('Error updating category');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteCategory = async () => {
    if (!confirm('Are you sure you want to delete this category? This might affect products linked to it.')) return;
    try {
      await fetch(`/api/admin/categories/${category._id}`, { method: 'DELETE' });
      toast.success('Category deleted');
      mutate('/api/admin/categories');
    } catch {
      toast.error('Error deleting category');
    }
  }

  const addType = () => {
    if (newType && !types.includes(newType)) {
      setTypes([...types, newType]);
      setNewType('');
      setHasChanges(true);
    }
  };

  const removeType = (typeToRemove: string) => {
    setTypes(types.filter(t => t !== typeToRemove));
    setHasChanges(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("File too large (max 2MB)");
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="relative group border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300">
      <CardHeader className="p-5 pb-3 bg-gradient-to-br from-white to-slate-50 border-b border-slate-100">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1 space-y-3">
            {/* Image & Name Row */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                {image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image} alt="Logo" className="object-cover w-full h-full" />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all" onClick={() => { setImage(''); setHasChanges(true); }}>
                      <X className="h-4 w-4 text-white" />
                    </div>
                  </>
                ) : (
                  <span className="text-xs font-bold text-slate-300">LOGO</span>
                )}
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" title="Change Logo" />
              </div>
              <Input
                value={name}
                onChange={(e) => { setName(e.target.value); setHasChanges(true); }}
                className="font-bold text-lg border-transparent hover:border-slate-300 focus:border-amber-400 bg-transparent px-2 h-10 -ml-2 w-full"
                placeholder="Category Name"
              />
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity" onClick={deleteCategory}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-4 bg-white">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sub-Types / Styles</Label>
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {types.length === 0 && <span className="text-sm text-slate-400 italic py-1">No sub-types added.</span>}
              {types.map(t => (
                <span key={t} className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 hover:bg-slate-200 transition-colors">
                  {t}
                  <X className="h-3 w-3 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => removeType(t)} />
                </span>
              ))}
            </div>

            <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
              <Input
                value={newType}
                onChange={e => setNewType(e.target.value)}
                placeholder="Add new type..."
                className="h-9 text-sm border-slate-200 focus:border-amber-400"
                onKeyDown={e => e.key === 'Enter' && addType()}
              />
              <Button size="sm" variant="secondary" onClick={addType} disabled={!newType} className="h-9 w-9 p-0 bg-slate-100 hover:bg-slate-200 text-slate-600">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {hasChanges && (
        <CardFooter className="p-3 bg-amber-50/50 border-t border-amber-100 flex justify-center animate-in slide-in-from-top-2">
          <Button size="sm" onClick={saveChanges} className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold h-9">
            {isSaving ? <Loader2 className="h-3 w-3 mr-2 animate-spin" /> : <Save className="h-3 w-3 mr-2" />}
            Save Changes
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
