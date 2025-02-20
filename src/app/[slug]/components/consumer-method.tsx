import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConsumpionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ConsumerMethodProps {
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumpionMethod;
  slug: string;
}

const ConsumerMethod = ({
  imageUrl,
  imageAlt,
  buttonText,
  option,
  slug
}: ConsumerMethodProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image src={imageUrl} fill alt={imageAlt}></Image>
        </div>
        <Button variant="secondary" className="rouded-full" asChild>            
          <Link href={'/'+slug+'/menu?consuptionMethod='+option}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumerMethod;
