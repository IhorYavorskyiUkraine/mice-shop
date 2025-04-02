import Link from 'next/link';

interface Props {
   product: any;
}

export const SearchItem: React.FC<Props> = ({ product }) => {
   return (
      <Link href={`/product/${product.id}`} className="p-sm text-secondary">
         <div className="flex gap-4">
            <div className="size-[120px]">
               <img src={product.models[0].image} alt="product image" />
            </div>
            <div>
               <h2>{product.name}</h2>
               <p className="text-sm">RATING: {product.rating}</p>
               <p className="text-b">${product.models[0].price}</p>
            </div>
         </div>
      </Link>
   );
};
