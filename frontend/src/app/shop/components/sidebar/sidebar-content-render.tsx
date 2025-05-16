import { CheckboxWithText } from '@/components/shared';
import { DualRangeSlider, Input } from '@/components/ui';

export const renderSectionContent = (
   name: string,
   data: any,
   priceValues: [number, number],
   minInput: number,
   maxInput: number,
   changePriceInput: (
      e: React.ChangeEvent<HTMLInputElement>,
      type: 'min' | 'max',
   ) => void,
   applyPriceFilter: () => void,
   onPriceChange: (value: [number, number]) => void,
   hasBrand: (val: string) => boolean,
   toggleBrand: (val: string) => void,
   hasColor: (val: string) => boolean,
   toggleColor: (val: string) => void,
) => {
   switch (name) {
      case 'price':
         const minPrice = data?.getAllProductFilters?.price.min || 0;
         const maxPrice = data?.getAllProductFilters?.price.max || 1000;
         return (
            <div>
               <div className="flex gap-[15px] mb-sm items-center">
                  <Input
                     value={minInput}
                     onChange={e => changePriceInput(e, 'min')}
                  />
                  <div className="w-[60px] h-[2px] bg-primary"></div>
                  <Input
                     value={maxInput}
                     onChange={e => changePriceInput(e, 'max')}
                  />
                  <button onClick={applyPriceFilter}>Ok</button>
               </div>
               <DualRangeSlider
                  onPointerDown={e => e.stopPropagation()}
                  label={value => <span>${value}</span>}
                  labelPosition="top"
                  min={minPrice}
                  max={maxPrice}
                  value={priceValues}
                  onValueChange={onPriceChange}
                  step={1}
               />
            </div>
         );
      case 'brand':
         return (
            <div className="flex flex-col space-y-2 max-h-[286px] overflow-y-auto">
               {data?.getAllProductFilters?.brands?.map((brand: string) => (
                  <CheckboxWithText
                     key={brand}
                     text={brand}
                     checked={hasBrand(brand)}
                     onCheckedChange={() => toggleBrand(brand)}
                  />
               ))}
            </div>
         );
      case 'color':
         return (
            <div className="flex flex-col space-y-2 max-h-[286px] overflow-y-auto">
               {data?.getAllProductFilters?.colors?.map((color: string) => (
                  <CheckboxWithText
                     key={color}
                     text={color}
                     checked={hasColor(color)}
                     onCheckedChange={() => toggleColor(color)}
                  />
               ))}
            </div>
         );
      default:
         return null;
   }
};
