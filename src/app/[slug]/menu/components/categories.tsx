"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Products from "./products";

interface RestaurantCategoriesProps{
    restaurant : Prisma.RestaurantGetPayload<{
        include:{
            menuCategories:{
                include:{
                    products: true
                }
            }
        }
    }>
}

type menuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {products: true};
}>

const RestaurantCategories = ({restaurant}:RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<menuCategoriesWithProducts>(restaurant.menuCategories[0])

    const handleClickCategoryClick = (category: menuCategoriesWithProducts) => {
        setSelectedCategory(category);
    }

    const getCategoryButtonVariant =(category:menuCategoriesWithProducts)=>{
        return selectedCategory.id == category.id ? "default" : "secondary"
    }
    
    return (  
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border p-5 bg-white">
            <div className="flex items-center gap-3">
                <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={45} height={45}/>
                <div>
                    <h2 className="font-semibold text-lg">{restaurant.name}</h2>
                    <p className="text-sx opacity-55">{restaurant.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-green-500 mt-3">
                <ClockIcon size={12}/>
                <p>Aberto</p>
            </div>
            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 mt-3">
                    {restaurant.menuCategories.map(category => (                        
                        <Button onClick={()=> handleClickCategoryClick(category)} key={category.id} 
                            variant={getCategoryButtonVariant(category)} size="sm" className="rounded-full">{category.name}</Button>                        
                    ))}
                </div>
                <ScrollBar orientation="horizontal"></ScrollBar>
            </ScrollArea>
            <h3 className="px-5 pt-2 font-semibold">{selectedCategory.name}</h3>
            <Products products={selectedCategory.products} />
        </div>
    );
}
 
export default RestaurantCategories ;