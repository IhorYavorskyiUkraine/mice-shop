import { CheckboxWithText } from '@/components/shared';
import { DualRangeSlider } from '@/components/ui';

export const renderSectionContent = (
   name: string,
   data: any,
   priceValues: [number, number],
   onPriceChange: (value: [number, number]) => void,
   hasBrand: (val: string) => boolean,
   toggleBrand: (val: string) => void,
   hasColor: (val: string) => boolean,
   toggleColor: (val: string) => void,
) => {
   switch (name) {
      case 'price':
         return (
            <DualRangeSlider
               label={value => <span>${value}</span>}
               labelPosition="top"
               min={data?.getAllProductFilters?.price.min || 0}
               max={data?.getAllProductFilters?.price.max || 1000}
               value={priceValues}
               onValueChange={onPriceChange}
               step={1}
            />
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
