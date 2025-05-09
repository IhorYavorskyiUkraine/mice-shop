'use client';

import { CheckboxWithText } from '@/components/shared';
import { InputWithValidations } from '@/components/shared/input-with-validations';
import { City } from '@/types/city.type';
import { Warehouse } from '@/types/warehouse.type';
import { useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useClickAway, useDebounce } from 'react-use';
import { toast } from 'sonner';
import { GET_CITIES, GET_WAREHOUSES } from '../checkout.graphql';
import { createOrderSchema, TCreateOrder } from '../create-order.schema';
import { DropItem } from './drop-item';
import { FormBlock } from './form-block';

export const CheckoutForm: React.FC = () => {
   const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
   const [query, setQuery] = useState<string>('');
   const [debouncedQuery, setDebouncedQuery] = useState<string>('');
   const [cityRef, setCityRef] = useState<string | null>(null);
   const [warehouseRef, setWarehouseRef] = useState<string | null>(null);
   const [warehouseSearch, setWarehouseSearch] = useState('');
   const [warehouseDebouncedSearch, setWarehouseDebouncedSearch] =
      useState<string>('');

   const [cityName, setCityName] = useState<string>('');
   const [warehouseName, setWarehouseName] = useState<string>('');
   const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
   const [isWarehouseDropdownOpen, setIsWarehouseDropdownOpen] =
      useState(false);

   const cityRefElement = useRef<HTMLDivElement>(null);
   const warehouseRefElement = useRef<HTMLDivElement>(null);

   useClickAway(cityRefElement, () => {
      setIsCityDropdownOpen(false);
   });

   useClickAway(warehouseRefElement, () => {
      setIsWarehouseDropdownOpen(false);
   });

   const form = useForm<TCreateOrder>({
      resolver: zodResolver(createOrderSchema),
      defaultValues: {
         firstName: '',
         lastName: '',
         middleName: '',
         phone: '',
      },
   });

   useDebounce(() => setDebouncedQuery(query), 500, [query]);
   useDebounce(() => setWarehouseDebouncedSearch(warehouseSearch), 500, [
      warehouseSearch,
   ]);

   const { data: cities, loading: isLoadingCities } = useQuery(GET_CITIES, {
      skip: !query || !debouncedQuery,
      variables: { query: debouncedQuery },
   });

   const { data: warehouses, loading: isLoadingWarehouses } = useQuery(
      GET_WAREHOUSES,
      {
         skip: !cityRef,
         variables: { args: { cityRef, search: warehouseDebouncedSearch } },
      },
   );

   const onSubmit = async (data: TCreateOrder) => {
      try {
         if (isLoadingCities || isLoadingWarehouses) return;

         const {} = data;

         toast.success('Замовлення успішно оформлено');
      } catch (error: any) {
         const gqlError = error.graphQLErrors?.[0];

         // if (gqlError?.message) {
         //    form.setError('oldPassword', {
         //       type: 'server',
         //       message: gqlError.message,
         //    });
         // }
         toast.error('Не вдалося зробити замовлення');
      }
   };

   const handleCityChange = (ref: string, name: string) => {
      setCityRef(ref);
      setCityName(name);
      setIsCityDropdownOpen(false);
      setWarehouseSearch('');
      setWarehouseName('');
      setWarehouseRef(null);
   };

   const handleWarehouseChange = (ref: string, name: string) => {
      setWarehouseRef(ref);
      setWarehouseName(name);
      setIsWarehouseDropdownOpen(false);
   };

   const handleCityInputFocus = () => {
      if (cities?.getCities?.length > 0) {
         setIsCityDropdownOpen(true);
      }
   };

   const handleWarehouseInputFocus = () => {
      if (warehouses?.getWarehouses?.length > 0 && cityRef) {
         setIsWarehouseDropdownOpen(true);
      }
   };

   const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setCityName('');
      setCityRef(null);
      setIsCityDropdownOpen(true);
   };

   const handleWarehouseInputChange = (
      e: React.ChangeEvent<HTMLInputElement>,
   ) => {
      setWarehouseSearch(e.target.value);
      setWarehouseName('');
      setWarehouseRef(null);
      if (cityRef) {
         setIsWarehouseDropdownOpen(true);
      }
   };

   return (
      <FormProvider {...form}>
         <form
            className="px-[10px] border-[2px] border-primary py-[10px] lg:px-[30px] lg:py-[30px]"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <FormBlock
               title="Контактна інформація"
               className="grid lg:grid-cols-2 gap-[30px]"
            >
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Прізвище"
                  name="lastName"
                  className="max-w-[400px]"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Ім'я"
                  name="firstName"
                  className="max-w-[400px]"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="По батькові"
                  name="middleName"
                  className="max-w-[400px]"
               />
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Телефон"
                  name="lastName"
                  className="max-w-[400px]"
                  mask="+38 (000) 000-00-00"
               />
            </FormBlock>
            <FormBlock title="Спосіб оплати" className="space-y-[20px]">
               <CheckboxWithText
                  text="Оплата при отриманні"
                  checked={paymentMethod === 'cash'}
                  onCheckedChange={() => setPaymentMethod('cash')}
               />
               <CheckboxWithText
                  text="Оплата онлайн"
                  checked={paymentMethod === 'online'}
                  onCheckedChange={() => setPaymentMethod('online')}
               />
            </FormBlock>
            <FormBlock title="Адреса доставки" className="space-y-[30px]">
               <InputWithValidations
                  // disabled={isLoadingUser}
                  placeholder="Емаіл"
                  name="email"
               />
               <div ref={cityRefElement}>
                  <InputWithValidations
                     placeholder="Місто"
                     onChange={handleCityInputChange}
                     onFocus={handleCityInputFocus}
                     name="city"
                     value={cityName || query}
                  />
                  {isCityDropdownOpen && cities?.getCities?.length > 0 && (
                     <div className="space-y-[10px]flex flex-col">
                        {cities.getCities.map((city: City) => (
                           <DropItem
                              key={city.ref}
                              text={city.name}
                              onClick={() =>
                                 handleCityChange(city.ref, city.name)
                              }
                              active={city.ref === cityRef}
                           />
                        ))}
                     </div>
                  )}
               </div>
               <div ref={warehouseRefElement}>
                  <InputWithValidations
                     placeholder="Відділення нової пошти"
                     name="warehouse"
                     value={warehouseName || warehouseSearch}
                     onChange={handleWarehouseInputChange}
                     onFocus={handleWarehouseInputFocus}
                     disabled={!cityRef}
                  />
                  {isWarehouseDropdownOpen &&
                     warehouses?.getWarehouses?.length > 0 && (
                        <div className="space-y-[10px] pt-[10px] px-[10px] flex flex-col">
                           {warehouses.getWarehouses.map(
                              (warehouse: Warehouse) => (
                                 <DropItem
                                    key={warehouse.ref}
                                    text={warehouse.description}
                                    onClick={() =>
                                       handleWarehouseChange(
                                          warehouse.ref,
                                          warehouse.description,
                                       )
                                    }
                                    active={warehouse.ref === warehouseRef}
                                 />
                              ),
                           )}
                        </div>
                     )}
               </div>
            </FormBlock>
         </form>
      </FormProvider>
   );
};
