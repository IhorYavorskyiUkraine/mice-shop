interface Props {
   id: number;
   active: boolean;
}

export const ProductDetails: React.FC<Props> = ({ id, active }) => {
   return active && <div className="text-center py-xl">У розробці</div>;
};
