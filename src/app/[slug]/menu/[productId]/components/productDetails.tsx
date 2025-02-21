"use client";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/formatCurrency";
import { Prisma, Product, Restaurant } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{ include: { restaurant: true } }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => {
        if (prev == 1) {
          return 1;
        }
        return prev - 1;
      });
    }
  };
  const handleIncreaseQuantity = () => {
    if (quantity < 99) {
      setQuantity((prev) => prev + 1);
    }
  };
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white p-5 flex flex-auto flex-col">
      <div className="flex-auto">
        <div className="flex items-center gap-1 rounded-full">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
          />
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
        {/*PRECO E QUANTIDADE*/}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="w-8 h-8 rounded-xl"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon></ChevronLeftIcon>
            </Button>
            <p className="w-4">{quantity}</p>
            <Button
              variant="destructive"
              className="w-8 h-8 rounded-xl"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon></ChevronRightIcon>
            </Button>
          </div>
        </div>
        {/**SOBRE */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        {/**INGREDIENTES */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1 5">
            <ChefHatIcon size={18}></ChefHatIcon>
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <p className="text-sm text-muted-foreground">{product.ingredients}</p>
        </div>
      </div>
      <Button className="mt-6 w-full rounded-full ">Adicionar à sacola</Button>
    </div>
  );
};

export default ProductDetails;
