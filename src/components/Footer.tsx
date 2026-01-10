import Link from 'next/link';
import { Facebook, MapPin, Phone, Mail, Package2 } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-[#0F172A] text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-[1500px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white font-bold text-xl">
                        <Package2 className="h-6 w-6 text-amber-500" />
                        <span>MRV <span className="text-amber-500">GROUP</span></span>
                    </div>
                    <p className="text-sm text-slate-400">
                        Premium industrial solutions engineered for modern living. Quality furniture and steel products.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-4">Contact</h3>
                    <div className="space-y-3 text-sm">
                        <a href="tel:+919994812945" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                            <Phone className="h-4 w-4" /> +91 99948 12945
                        </a>
                        <a href="mailto:rameshmrv123@gmail.com" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                            <Mail className="h-4 w-4" /> rameshmrv123@gmail.com
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-4">Location</h3>
                    <div className="flex gap-2 text-sm">
                        <MapPin className="h-4 w-4 shrink-0 mt-1" />
                        <p>
                            9/77 F, Ambai Rd, Alangulam,<br />
                            Tamil Nadu 627851<br />
                            Tenkasi Dist, India
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-white font-bold mb-4">Social</h3>
                    <a
                        href="https://www.facebook.com/793310073866513/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:text-amber-500 transition-colors group"
                    >
                        <Facebook className="h-5 w-5 group-hover:fill-current" /> Facebook Page
                    </a>
                </div>
            </div>
            <div className="max-w-[1500px] mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} MRV Group of Technologies. All rights reserved.
            </div>
        </footer>
    )
}
