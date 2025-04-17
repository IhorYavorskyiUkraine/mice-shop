import { Button } from '@/components/ui';
import { Model } from '@/types/model.type';

interface Props {
   models: Model[];
   active: string | undefined;
   setActive: (model: Model) => void;
}

export const ProductPickModel: React.FC<Props> = ({
   models,
   active,
   setActive,
}) => {
   return (
      <div className="py-sm">
         <p className="mb-sm">Модель: {active}</p>
         <div className="flex gap-[20px]">
            {models?.map((model: Model, i) => (
               <Button
                  key={i}
                  variant={active === model.name ? 'black' : 'white'}
                  disabled={!model.colors.some(color => color.stock > 0)}
                  onClick={() => setActive(model)}
               >
                  {model.name}
               </Button>
            ))}
         </div>
      </div>
   );
};
