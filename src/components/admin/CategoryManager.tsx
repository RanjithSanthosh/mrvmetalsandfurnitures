
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
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border p-4 rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold text-lg">Add New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
            <Label>Name</Label>
            <Input 
                value={newCategoryName} 
                onChange={(e) => setNewCategoryName(e.target.value)} 
                placeholder="e.g. Metals"
            />
            </div>
            <div className="space-y-2">
            <Label>Logo (Optional)</Label>
            <div className="flex gap-2">
                <Input type="file" accept="image/*" onChange={handleCreateImageUpload} className="text-xs" />
                {newCategoryImage && (
                    <div className="relative h-10 w-10 border rounded overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={newCategoryImage} alt="Preview" className="object-cover w-full h-full" />
                        <X className="h-3 w-3 absolute top-0 right-0 bg-white cursor-pointer" onClick={() => setNewCategoryImage('')} />
                    </div>
                )}
            </div>
            </div>
        </div>
        <Button onClick={createCategory} disabled={!newCategoryName || isCreating} className="self-end">
          {isCreating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />} 
          Create Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? <p>Loading...</p> : categories?.map((cat: any) => (
          <CategoryCard key={cat._id} category={cat} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: any }) {
  const [name, setName] = useState(category.name);
  const [types, setTypes] = useState<string[]>(category.types || []);
  const [image, setImage] = useState(category.image || '');
  const [newType, setNewType] = useState('');
  const [isOpen, setIsOpen] = useState(false);
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
    if (!confirm('Delete this category?')) return;
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
    <Card className="relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start mb-2 gap-2">
            <div className="flex flex-col gap-2 w-full">
                <Input 
                   value={name} 
                   onChange={(e) => { setName(e.target.value); setHasChanges(true); }} 
                   className="font-bold h-8"
                   placeholder="Category Name"
                />
                 {/* Image Edit */}
                 <div className="flex items-center gap-2">
                    {image ? (
                        <div className="relative h-10 w-10 border rounded overflow-hidden shrink-0 group">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                             <img src={image} alt="Logo" className="object-cover w-full h-full" />
                             <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center cursor-pointer" onClick={() => { setImage(''); setHasChanges(true); }}>
                                <X className="h-4 w-4 text-white" />
                             </div>
                        </div>
                    ) : (
                        <div className="h-10 w-10 border rounded flex items-center justify-center bg-slate-50 text-xs text-muted-foreground shrink-0">
                            Logo
                        </div>
                    )}
                    <div className="relative overflow-hidden">
                        <Input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-xs opacity-0 absolute inset-0 cursor-pointer" />
                        <Button variant="outline" size="sm" className="h-8 text-xs px-2 pointer-events-none">Change Logo</Button>
                    </div>
                </div>
            </div>
             <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 shrink-0" onClick={deleteCategory}>
                <Trash2 className="h-4 w-4" />
             </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
         <div className="space-y-4">
             <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Sub-Types</Label>
                <div className="flex flex-wrap gap-2">
                   {types.map(t => (
                     <span key={t} className="bg-slate-100 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        {t}
                        <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeType(t)} />
                     </span>
                   ))}
                </div>
                <div className="flex gap-2 mt-2">
                   <Input 
                      value={newType} 
                      onChange={e => setNewType(e.target.value)} 
                      placeholder="Add Type" 
                      className="h-8 text-sm"
                      onKeyDown={e => e.key === 'Enter' && addType()}
                   />
                   <Button size="sm" variant="outline" onClick={addType} disabled={!newType}>
                      <Plus className="h-3 w-3" />
                   </Button>
                </div>
             </div>
         </div>
      </CardContent>
      <CardFooter className="p-4 pt-2 border-t bg-slate-50 flex justify-end">
          <Button size="sm" disabled={!hasChanges || isSaving} onClick={saveChanges} variant={hasChanges ? 'default' : 'ghost'}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />} 
              {isSaving ? 'Saving' : 'Save Changes'}
          </Button>
      </CardFooter>
    </Card>
  );
}
