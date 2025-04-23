interface Props {
   value: number;
   onChange: (value: number) => void;
   max?: number;
}

export const PixelRatingInputText: React.FC<Props> = ({
   value,
   onChange,
   max = 5,
}) => {
   return (
      <div className="flex flex-col items-start gap-1 max-w-[132px] ">
         <p>
            Рейтинг: {value} / {max}
         </p>
         <div className="flex gap-[2px] w-full">
            {Array.from({ length: max }).map((_, i) => (
               <div
                  key={i}
                  onClick={() => onChange(i + 1)}
                  className={`flex-1 h-4 cursor-pointer border border-primary transition-colors ${
                     i < value ? 'bg-primary' : 'bg-secondary'
                  }`}
               />
            ))}
         </div>
      </div>
   );
};
