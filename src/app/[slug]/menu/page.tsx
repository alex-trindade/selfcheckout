import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RestaurantHeader from "./components/header"
import RestaurantCategories from "./components/categories";

interface RestaurantMenuPageProps{
    params: Promise<{slug: string}>
    searchParams: Promise<{consuptionMethod:string}>
}

const isConsumptionMethodValid = (consuptionMethod: string) =>{
    return ["DINE_IN","TAKEWAY"].includes(consuptionMethod.toUpperCase())
}
const RestaurantMenuPage= async({params, searchParams}:RestaurantMenuPageProps) => {
    const {slug} = await params
    const {consuptionMethod} = await searchParams
    
    if(!isConsumptionMethodValid(consuptionMethod)){
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({where:{slug:slug}, include:{
        menuCategories: {
            include: {products: true}
        }
    }})
    
    if(!restaurant){
        return notFound();
    }
    console.log(restaurant?.menuCategories)
    return (
        <div>
            <RestaurantHeader restaurant={restaurant}></RestaurantHeader>
            <RestaurantCategories restaurant={restaurant}></RestaurantCategories>
        </div>
    );
}
 
export default RestaurantMenuPage;