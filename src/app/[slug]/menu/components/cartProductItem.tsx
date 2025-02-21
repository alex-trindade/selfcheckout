import { formatCurrency } from "@/helpers/formatCurrency";
import { CartProduct } from "../context/cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

interface CartItemProps {
  product: CartProduct;
}

const CartProductItem = ({ product }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between">
        {/**Esquerda */}
      <div className="flex items-center gap-2">
        {/**Esquerda */}
        <div className="relative h-20 w-20 rounded-xl bg-gray-200">
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        {/**Centro */}
        <div className="space-y-1">
          <p className="text-xs max-w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button className="h-7 w-7 rounded-lg" variant="outline">
              <ChevronLeftIcon size={14} />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button className="h-7 w-7 rounded-lg" variant="destructive">
              <ChevronRightIcon size={14} />
            </Button>
          </div>
        </div>
      </div>
      <Button  className="w-7 h-7" variant="outline">
        <TrashIcon/>
      </Button>
    </div>
  );
};

export default CartProductItem;
