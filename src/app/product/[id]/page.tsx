
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

import { getProductById, getCategories } from '@/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ChevronRight, Star, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { ProductGallery } from './product-gallery';
import { Separator } from '@/components/ui/separator';

interface Props {
   params: Promise<{ id: string }>;
}

export default async function ProductPage(props: Props) {
   const params = await props.params;
   const product = await getProductById(params.id);
   const categoriesPromise = getCategories();

   if (!product) {
      notFound();
   }

   const discount = Math.round(((product.mrpPrice - product.price) / product.mrpPrice) * 100);

   const whatsappMessage = `Hi MRV Group, I want to inquire about this product:

*Product Details:*
• *Name:* ${product.title}
• *Category:* ${product.category}
• *Type:* ${product.type || 'Standard'}
• *Price:* ₹${product.price}
• *SKU:* ${product.sku || 'N/A'}

Please provide more information regarding availability and delivery.`;

   const whatsappLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

   // Delivery Date Mock
   const date = new Date();
   date.setDate(date.getDate() + 5);
   const deliveryDate = date.toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' });

   return (
      <div className="min-h-screen bg-white font-sans flex flex-col">
         <Navbar categoriesPromise={categoriesPromise} />

         {/* Breadcrumb */}
         <div className="bg-[#f0f2f5] py-2 px-4 text-xs text-[#565959]">
            <div className="container max-w-[1500px] flex items-center gap-1">
               <Link href="/" className="hover:underline">Home</Link>
               <ChevronRight className="w-3 h-3" />
               <Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:underline">{product.category}</Link>
               <ChevronRight className="w-3 h-3" />
               <span className="truncate max-w-[200px] text-[#333] font-bold">{product.title}</span>
            </div>
         </div>

         <main className="container max-w-[1500px] flex-1 py-6 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

               {/* Left: Gallery (4 cols) */}
               <div className="lg:col-span-5 xl:col-span-4">
                  <div className="sticky top-24">
                     <ProductGallery images={product.images} title={product.title} />
                  </div>
               </div>

               {/* Middle: Details (5 cols) */}
               <div className="lg:col-span-4 xl:col-span-5 space-y-4">

                  <div className="border-b border-gray-200 pb-4">
                     <h1 className="text-2xl md:text-3xl font-medium text-[#0F1111] leading-tight mb-1">
                        {product.title}
                     </h1>
                     <Link href={`/?category=${encodeURIComponent(product.category)}`} className="text-[#007185] hover:text-[#C7511F] hover:underline text-sm font-medium">
                        Visit the {product.category} Store
                     </Link>

                     {/* <div className="flex items-center gap-2 mt-2">
                 <div className="flex text-[#FFA41C]">
                    {[1,2,3,4].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    <Star className="w-4 h-4 fill-current opacity-50" />
                 </div>
                 <span className="text-[#007185] text-sm hover:underline hover:text-[#C7511F] cursor-pointer">
                    124 ratings
                 </span>
               </div> */}
                  </div>

                  <div className="space-y-4">
                     <div>
                        <div className="flex items-start gap-2">
                           {/* <span className="text-2xl font-light text-[#565959] relative top-1.5 opacity-0 sm:opacity-100"></span> */}
                           <span className="text-2xl font-light text-[#cc0c39] relative top-1.5">-{discount}%</span>
                           <span className="text-3xl font-bold flex text-[#0F1111]">
                              <span className="text-sm relative top-1.5 font-normal">₹</span>
                              {product.price.toLocaleString('en-IN')}
                           </span>
                        </div>
                        <div className="text-sm text-[#565959]">
                           M.R.P.: <span className="line-through">₹{product.mrpPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-sm text-[#0F1111] mt-2">
                           Inclusive of all taxes
                        </div>
                     </div>

                     {/* Features / Icons */}
                     <div className="grid grid-cols-3 gap-2 py-4">
                        <div className="flex flex-col items-center text-center gap-1 p-2">
                           <div className="w-10 h-10 rounded-full bg-[#E5F7FF] flex items-center justify-center text-blue-700 mb-1">
                              <Truck className="w-5 h-5" />
                           </div>
                           <span className="text-xs text-[#007185] font-medium leading-tight">Free Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 p-2">
                           <div className="w-10 h-10 rounded-full bg-[#E5F7FF] flex items-center justify-center text-blue-700 mb-1">
                              <ShieldCheck className="w-5 h-5" />
                           </div>
                           <span className="text-xs text-[#007185] font-medium leading-tight">1 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1 p-2">
                           <div className="w-10 h-10 rounded-full bg-[#E5F7FF] flex items-center justify-center text-blue-700 mb-1">
                              <MessageCircle className="w-5 h-5" />
                           </div>
                           <span className="text-xs text-[#007185] font-medium leading-tight">Top Support</span>
                        </div>
                     </div>

                     <Separator />

                     <div className="space-y-2">
                        <h3 className="font-bold text-base">About this item</h3>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-[#0F1111]">
                           {product.description?.split('\n').filter((line: string) => line.trim().length > 0).map((line: string, i: number) => (
                              <li key={i}>{line}</li>
                           ))}
                           <li>Premium Quality Material</li>
                           <li>Designed for durability and style</li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* Right: Buy Box (3 cols) */}
               <div className="lg:col-span-3 xl:col-span-3">
                  <div className="border border-[#D5D9D9] rounded-lg p-4 sticky top-24 space-y-4 shadow-sm bg-white">
                     <div className="text-2xl font-bold text-[#0F1111]">
                        <span className="text-base font-normal align-super text-[#565959]">₹</span>
                        {product.price.toLocaleString('en-IN')}
                     </div>

                     <div className="text-sm">
                        <div className="text-[#007185] font-bold mb-1">FREE delivery <span className="text-[#0F1111] font-bold">Delivered in 2 days</span>.</div>
                        <div className="flex items-center gap-1 text-[#565959]">
                           <MapPin className="w-4 h-4" />
                           <a href="#" className="text-[#007185] hover:text-[#C7511F] text-xs">Delivering all over India</a>
                        </div>
                     </div>

                     <div className="text-lg font-medium text-[#007600]">
                        {product.stockStatus === 'Out of Stock' ? <span className="text-[#cc0c39]">Currently unavailable.</span> : 'In stock.'}
                     </div>

                     <div className="text-xs text-[#565959] space-y-1">
                        <div className="grid grid-cols-2">
                           <span>Payment</span>
                           <span className="text-[#007185]">Secure transaction</span>
                        </div>
                        <div className="grid grid-cols-2">
                           <span>Sold by</span>
                           <span className="text-[#007185]">MRV Furnitures</span>
                        </div>
                     </div>

                     {product.stockStatus !== 'Out of Stock' && (
                        <div className="space-y-3 pt-2">
                           {/* <Link href={whatsappLink} target="_blank">
                       <Button className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-normal rounded-full shadow-sm text-sm h-9 border border-[#FCD200]">
                          Add to Inquiry Cart
                       </Button>
                     </Link> */}
                           <Link href={whatsappLink} target="_blank">
                              <Button className="w-full bg-[#FFA41C] hover:bg-[#FA8900] text-black font-normal rounded-full shadow-sm text-sm h-9 border border-[#FF8F00]">
                                 Buy Now (Via WhatsApp)
                              </Button>
                           </Link>
                        </div>
                     )}

                     <div className="flex items-center gap-2 text-xs text-[#565959] border-t border-[#D5D9D9] pt-4 mt-2">
                        <ShieldCheck className="w-4 h-4 text-gray-400" />
                        <span>Secure transaction ensured by WhatsApp Encryption</span>
                     </div>
                  </div>
               </div>

            </div>

            <Separator className="my-8" />

            {/* Technical Details Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h2 className="text-xl font-bold text-[#cc0c39] mb-4">Product specifications</h2>
                  {product.attributes && Object.keys(product.attributes).length > 0 ? (
                     <div className="border border-[#D5D9D9] rounded bg-white">
                        <table className="w-full text-sm">
                           <tbody>
                              {Object.entries(product.attributes).map(([key, value], idx) => (
                                 <tr key={key} className={idx % 2 === 0 ? "bg-[#f0f2f5]" : "bg-white"}>
                                    <th className="text-left font-normal text-[#565959] p-2 pl-4 w-1/3 border-b border-[#D5D9D9] capitalize">{key}</th>
                                    <td className="text-[#333] p-2 pl-4 border-b border-[#D5D9D9]">{String(value)}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <p className="text-gray-500">No specific breakdown available.</p>
                  )}
               </div>
            </div>

         </main>
         <Footer />
      </div>
   );
}