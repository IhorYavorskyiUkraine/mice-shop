interface Props {
   id: number;
   active: boolean;
}

export const ProductDetails: React.FC<Props> = ({ active }) => {
   return active && <div className="text-center py-xl">У розробці</div>;
};
