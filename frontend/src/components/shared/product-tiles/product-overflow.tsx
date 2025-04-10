import { Specs } from '@/types/specs.type';

interface Props {
   specs: Specs[];
   price: number;
}

export const ProductOverflow: React.FC<Props> = ({ specs, price }) => {
   return (
      <div className="absolute cursor-default  bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary/30 backdrop-blur-sm text-white p-4">
         {specs
            .filter(
               (spec: Specs) =>
                  spec.key !== 'Розміри' && spec.key !== 'Покриття',
            )
            .map((spec: Specs) => (
               <p key={spec.key}>
                  {spec.key}: {spec.value}
               </p>
            ))}
         <p className="mb-sm">Ціна від {price}$</p>
         <button className="cursor-pointer">Додати до кошику</button>
      </div>
   );
};
