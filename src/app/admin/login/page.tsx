'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Package2, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      toast.success('Welcome back, Admin!');
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message, { description: "Please check your User ID and Password." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500 w-full" />

          <CardHeader className="space-y-4 text-center pb-2 pt-8">
            <div className="mx-auto h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 mb-2">
              <Package2 className="h-8 w-8 text-amber-400" />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">
                MRV Admin Panel
              </CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Secure access for management
              </CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6 px-8 py-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Admin ID</Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    <Input
                      id="userId"
                      placeholder="Enter Admin ID"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                      className="pl-10 h-11 border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <Label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</Label>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-11 border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400 transition-all"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <>Sign In to Dashboard <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </CardContent>
          </form>

          <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-medium">
              Authorized personnel only. <br /> IP address logged for security.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
