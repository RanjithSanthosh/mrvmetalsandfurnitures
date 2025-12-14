
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

  const [isCreating, setIsCreating] = useState(false);
  const createCategory = async () => {
    if (!newCategoryName) return;
    setIsCreating(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!res.ok) throw new Error('Failed to create');
      toast.success('Category created');
      setNewCategoryName('');
      mutate('/api/admin/categories');
    } catch {
      toast.error('Error creating category');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 items-end">
        <div className="space-y-2 flex-1 max-w-sm">
          <Label>New Category Name</Label>
          <Input 
            value={newCategoryName} 
            onChange={(e) => setNewCategoryName(e.target.value)} 
            placeholder="e.g. Metals"
          />
        </div>
        <Button onClick={createCategory} disabled={!newCategoryName || isCreating}>
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
        body: JSON.stringify({ name, types }),
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

  return (
    <Card className="relative overflow-hidden border-slate-200 shadow-sm hover:shadow-md transition-shadow rounded-xl">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center mb-2">
            <Input 
               value={name} 
               onChange={(e) => { setName(e.target.value); setHasChanges(true); }} 
               className="font-bold h-8 w-full mr-2"
            />
             <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={deleteCategory}>
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
