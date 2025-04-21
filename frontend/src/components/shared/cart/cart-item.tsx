import { TCartItem } from '@/types/cart.type';
import { useMutation, useQuery } from '@apollo/client';
import { Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Quantity } from '../quantity';
import { GET_CART, REMOVE_PRODUCT, UPDATE_QUANTITY } from './cart.graphql';

interface Props {
   item: TCartItem;
}

export const CartItem: React.FC<Props> = ({ item }) => {
   const [updateQuantity] = useMutation(UPDATE_QUANTITY);
   const [deleteItem] = useMutation(REMOVE_PRODUCT);
   const { refetch } = useQuery(GET_CART);

   const handleQuantity = async (option: 'plus' | 'minus') => {
      await updateQuantity({
         variables: {
            args: {
               modelId: item.model.id,
               quantity:
                  option === 'plus' ? item.quantity + 1 : item.quantity - 1,
               color: item.color.name,
            },
         },
      });
   };

   const handleDelete = async () => {
      await deleteItem({
         variables: {
            modelId: item.model.id,
         },
      });
      await refetch();
   };

   return (
      <article className="text-primary flex gap-4">
         <div>
            <Link href={`/product/${item.model.productId}`}>
               <Image
                  src={item.color.image}
                  alt={item.model.name}
                  width={120}
                  height={120}
               />
            </Link>
         </div>
         <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
               <Link href={`/product/${item.model.productId}`}>
                  <h3>{item.model.name}</h3>
               </Link>
               <button className="cursor-pointer" onClick={handleDelete}>
                  <Trash />
               </button>
            </div>
            <p>Колір: {item.color.name}</p>
            <div className="flex justify-between items-center">
               <p>{item.model.price}$</p>
               <Quantity
                  quantity={item.quantity}
                  updateQuantity={handleQuantity}
                  inStock={item.color.stock > item.quantity}
               />
            </div>
         </div>
      </article>
   );
};
