interface Props {}

export const ProductOverflow: React.FC<Props> = ({}) => {
   return (
      <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-primary/30 backdrop-blur-sm text-white p-4">
         <p>Сенсор: PixArt 3395</p>
         <p>Колір: Білий</p>
         <p>Ціна: 2599₴</p>
      </div>
   );
};
