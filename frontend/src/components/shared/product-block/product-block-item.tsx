import Image from 'next/image';
import Link from 'next/link';

interface Props {
   product: any;
}

export const ProductBlockItem: React.FC<Props> = ({ product }) => {
   return (
      <div className="md:size-[379px] bg-secondary">
         <div className="relative w-full h-full mb-sm">
            <Link href={`/product/${product.id}`}>
               <Image src={product.models[0].image} alt={product.name} fill />
            </Link>
         </div>
         <div className="flex justify-between text-m2">
            <Link href={`/product/${product.id}`}>
               <p>{product.name}</p>
            </Link>
            <p>FROM {product.models[0].price}$</p>
         </div>
      </div>
   );
};
