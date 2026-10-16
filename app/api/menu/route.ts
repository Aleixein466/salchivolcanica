import { products } from "@/lib/menu-data";
export const dynamic = "force-static";
export async function GET() { return Response.json({ products, count: products.length }); }
