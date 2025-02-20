import ConsumerMethod from "./components/consumer-method"
import { db } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

interface RestaurantePageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantePage = async ({ params }: RestaurantePageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug: slug } });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
        {/*LOGO E TITULO*/}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        ></Image>
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>
      {/*BEM VINDO */}
      <div className="pt-24 text-center space-y-2">
        <h3 className="text-2xl font-semibold">
            Seja bem-vindo!
        </h3>
        <p className="opcaty-55">
            Escolha como prefere aproveitar sua refeição. Estamos a oferecer sabor e praticidade em cada detalhe.
        </p>

      </div>
        {/*METODO CONSUMO*/}
        <div className="pt-24 grid grid-cols-2">
            <ConsumerMethod 
              slug={slug}
              imageUrl="/dine_in.png"
              imageAlt="Para comer aqui"
              buttonText="Para comer aqui"
              option="DINE_IN">
            </ConsumerMethod>
            <ConsumerMethod 
              slug={slug}
              imageUrl="/take_away.png"
              imageAlt="Para levar"
              buttonText="Para levar"
              option="TAKEWAY">
            </ConsumerMethod>
        </div>
    </div>
  );
};

export default RestaurantePage;
