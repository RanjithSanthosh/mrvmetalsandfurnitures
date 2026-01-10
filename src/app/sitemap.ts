import { getProducts, getCategories } from "@/lib/data";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mrvgroup.in"; // Replace with your actual domain

  // 1. Static Pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  // 2. Fetch Dynamic Data
  // Note: Ensure getProducts() can run at build time or ISR
  let products = [];
  try {
    products = await getProducts({});
  } catch (error) {
    console.error("Sitemap: Failed to fetch products", error);
  }

  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/product/${product._id}`,
    lastModified: new Date(product.updatedAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productUrls];
}
