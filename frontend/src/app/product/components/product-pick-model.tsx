import { Button, UniversalSkeleton } from '@/components/ui';
import { Model } from '@/types/model.type';

interface Props {
   models: Model[];
   active: string | undefined;
   setActive: (model: Model) => void;
   loading: boolean;
}

export const ProductPickModel: React.FC<Props> = ({
   models,
   active,
   setActive,
   loading,
}) => {
   return (
      <div className="py-sm">
         {loading ? (
            <UniversalSkeleton activeColorOrModelText />
         ) : (
            <p className="mb-sm">Модель: {active}</p>
         )}
         <div className="flex gap-[20px] flex-wrap">
            {loading ? (
               <UniversalSkeleton productPickModel />
            ) : (
               models?.map((model: Model, i) => (
                  <Button
                     key={i}
                     variant={active === model.name ? 'black' : 'white'}
                     disabled={!model.colors.some(color => color.stock > 0)}
                     onClick={() => setActive(model)}
                  >
                     {model.name}
                  </Button>
               ))
            )}
         </div>
      </div>
   );
};
