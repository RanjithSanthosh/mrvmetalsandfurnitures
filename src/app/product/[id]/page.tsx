
// import { getProductById } from '@/lib/data';
// import { Navbar } from '@/components/Navbar';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { MessageCircle } from 'lucide-react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"
// import { Card, CardContent } from "@/components/ui/card"

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default async function ProductPage(props: Props) {
//   const params = await props.params;
//   const product = await getProductById(params.id);

//   if (!product) {
//     notFound();
//   }

//   const discount = Math.round(((product.mrpPrice - product.price) / product.mrpPrice) * 100);

//   const whatsappMessage = `Hi, I'm interested in this product:
// - Name: ${product.title}
// - Category: ${product.category}
// - Type: ${product.type}
// - Price: ₹${product.price}
// - SKU: ${product.sku || 'N/A'}

// Please share more details.`;
  
//   const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col">
//       <Navbar />
      
//       <main className="container flex-1 py-12 px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
//           {/* Left: Images */}
//           <div className="w-full max-w-lg mx-auto md:max-w-none">
//              <Carousel className="w-full">
//                <CarouselContent>
//                  {product.images.map((img: string, idx: number) => (
//                    <CarouselItem key={idx}>
//                      <div className="p-1">
//                        <Card className="border-0 shadow-none bg-transparent">
//                          <CardContent className="flex aspect-square items-center justify-center p-0 relative overflow-hidden rounded-xl border bg-white">
//                            <Image 
//                              src={img} 
//                              alt={`${product.title} view ${idx + 1}`} 
//                              fill 
//                              className="object-contain" 
//                            />
//                          </CardContent>
//                        </Card>
//                      </div>
//                    </CarouselItem>
//                  ))}
//                </CarouselContent>
//                {product.images.length > 1 && (
//                  <>
//                    <CarouselPrevious className="left-2" />
//                    <CarouselNext className="right-2" />
//                  </>
//                )}
//              </Carousel>
//              <div className="flex gap-2 justify-center mt-4">
//                {product.images.map((img: string, idx: number) => (
//                  <div key={idx} className="w-20 h-20 relative border rounded cursor-pointer overflow-hidden bg-white">
//                    <Image src={img} alt="thumb" fill className="object-cover" />
//                  </div>
//                ))}
//              </div>
//           </div>

//           {/* Right: Details */}
//           <div className="flex flex-col gap-6">
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                  <Badge variant="outline">{product.category}</Badge>
//                  <Badge variant="secondary">{product.type}</Badge>
//                  {product.stockStatus === 'Out of Stock' && <Badge variant="destructive">Out of Stock</Badge>}
//               </div>
//               <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">{product.title}</h1>
//               {product.sku && <p className="text-sm text-slate-500 mt-1">SKU: {product.sku}</p>}
//             </div>

//             <div className="flex items-end gap-3 pb-6 border-b">
//                <span className="text-4xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
//                <div className="flex flex-col">
//                   <span className="text-lg text-slate-400 line-through">₹{product.mrpPrice.toLocaleString('en-IN')}</span>
//                   {discount > 0 && <span className="text-sm text-green-600 font-medium">{discount}% Discount</span>}
//                </div>
//             </div>

//             <div className="prose prose-slate max-w-none">
//               <h3 className="text-lg font-semibold mb-2">Description</h3>
//               <p className="whitespace-pre-line break-words text-slate-600 leading-relaxed">
//                 {product.description}
//               </p>
//             </div>

//             {product.attributes && Object.keys(product.attributes).length > 0 && (
//               <div className="grid grid-cols-2 gap-4 py-4 bg-slate-100 p-4 rounded-lg">
//                 {Object.entries(product.attributes).map(([key, value]) => (
//                   <div key={key}>
//                     <p className="text-sm font-medium text-slate-500 capitalize">{key}</p>
//                     <p className="text-base font-semibold text-slate-900">{String(value)}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <div className="mt-auto pt-6">
//               <Link href={whatsappLink} target="_blank">
//                 <Button size="lg" className="w-full md:w-auto gap-2 text-lg px-8 bg-green-600 hover:bg-green-700 text-white">
//                   <MessageCircle className="h-5 w-5" />
//                   Request Inquiry via WhatsApp
//                 </Button>
//               </Link>
//               <p className="text-xs text-muted-foreground mt-3 text-center md:text-left">
//                 No online payment. Click above to chat directly with our sales team.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { getProductById } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ChevronRight, Check, ShieldCheck } from 'lucide-react';
import { ProductGallery } from './product-gallery'; // Import the new component

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  const discount = Math.round(((product.mrpPrice - product.price) / product.mrpPrice) * 100);

  const whatsappMessage = `Hi, I'm interested in this product:
- Name: ${product.title}
- Price: ₹${product.price}
- SKU: ${product.sku || 'N/A'}

Please share more details.`;
  
  const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Breadcrumb (Optional but good for UX) */}
      <div className="container py-4 px-4 md:px-6">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="font-medium text-foreground truncate">{product.title}</span>
        </nav>
      </div>

      <main className="container flex-1 pb-16 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Interactive Gallery (Span 7 cols) */}
          <div className="lg:col-span-7">
             <ProductGallery images={product.images} title={product.title} />
          </div>

          {/* Right: Details (Span 5 cols) - Sticky on Desktop */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              
              {/* Header Section */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {/* <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-300">
                    {product.category}
                  </Badge>
                  {product.type && <Badge variant="outline">{product.type}</Badge>} */}
                  {product.stockStatus === 'Out of Stock' && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {product.title}
                </h1>
                
                {product.sku && (
                  <div className="flex items-center text-sm text-slate-500">
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">SKU: {product.sku}</span>
                  </div>
                )}
              </div>

              {/* Price Section */}
              <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-slate-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg text-slate-400 line-through decoration-slate-400/50">
                    ₹{product.mrpPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                
                {discount > 0 && (
                   <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                     <Check className="w-3.5 h-3.5" />
                     Save {discount}% today
                   </div>
                )}

                <div className="pt-4 border-t border-slate-100">
                  <Link href={whatsappLink} target="_blank" className="block">
                    <Button size="lg" className="w-full gap-2 text-lg h-12 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-md shadow-green-200 transition-all">
                      <MessageCircle className="h-5 w-5 fill-current" />
                      Inquire via WhatsApp
                    </Button>
                  </Link>
                  <p className="text-xs text-slate-400 mt-3 text-center flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 
                    Secure inquiry. No instant payment required.
                  </p>
                </div>
              </div>

              {/* Description & Attributes */}
              <div className="space-y-6">
                <div className="prose prose-slate max-w-none">
                  <h3 className="text-lg font-semibold text-slate-900">Description</h3>
                  <p className="whitespace-pre-line text-slate-600 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>

                {product.attributes && Object.keys(product.attributes).length > 0 && (
                  <div className="border border-slate-500 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b">
                      <h4 className="font-semibold text-slate-900">Product Specifications</h4>
                    </div>
                    <div className="divide-y">
                      {Object.entries(product.attributes).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
                          <dt className="text-slate-500 font-medium capitalize col-span-1">{key}</dt>
                          <dd className="text-slate-900 col-span-2">{String(value)}</dd>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}