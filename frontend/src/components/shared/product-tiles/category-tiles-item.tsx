interface Props {
   category: string;
}

export const CategoryTilesItem: React.FC<Props> = ({ category }) => {
   return (
      <div className="md:w-full h-[300px] md:h-[400px] bg-primary">
         <p className="text-secondary p-6">{category}</p>
      </div>
   );
};
