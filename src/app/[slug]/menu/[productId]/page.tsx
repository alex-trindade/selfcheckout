import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import ProductHeader from "./components/productHeader";
import ProductDetails from "./components/productDetails";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    notFound();
  }

  if(product.restaurant.slug.toUpperCase() != slug.toUpperCase()){
    notFound();
  }
  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product}></ProductHeader>
      <ProductDetails product={product}></ProductDetails>
    </div>
  );
};

export default ProductPage;
