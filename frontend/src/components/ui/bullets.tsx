interface Props {
   slideCount: number;
   currentIndex: number;
   api?: (index: number) => void;
}

export const Bullets: React.FC<Props> = ({ slideCount, currentIndex, api }) => {
   return (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
         {Array.from({ length: slideCount }).map((_, index) => (
            <button
               key={index}
               className={`h-3 w-3 transition-width cursor-pointer duration-300 ${
                  currentIndex === index ? '!w-6 bg-[#808080]' : 'bg-secondary'
               }`}
               onClick={() => api?.(index)}
            />
         ))}
      </div>
   );
};
