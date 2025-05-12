'use client';

import { CheckboxWithText } from '@/components/shared';
import { GET_CART } from '@/components/shared/cart/cart.graphql';
import { InputWithValidations } from '@/components/shared/input-with-validations';
import { TCartItem } from '@/types/cart.type';
import { City } from '@/types/city.type';
import { Warehouse } from '@/types/warehouse.type';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useClickAway, useDebounce } from 'react-use';
import { toast } from 'sonner';
import { CREATE_ORDER, GET_CITIES, GET_WAREHOUSES } from '../checkout.graphql';
import { createOrderSchema, TCreateOrder } from '../create-order.schema';
import { DropItem } from './drop-item';
import { FormBlock } from './form-block';
import { ItemsBlock } from './items-block';

export const CheckoutForm: React.FC = () => {
   const [paymentMethod, setPaymentMethod] = useState<string | null>('online');
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
         city: '',
         warehouse: '',
         paymentMethod: 'online',
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

   const [createOrder, { loading, error: createOrderError }] =
      useMutation(CREATE_ORDER);

   const { data: cartData, error } = useQuery(GET_CART);

   console.log(cartData?.getItems?.totalPrice);

   const onSubmit = async (data: TCreateOrder) => {
      try {
         if (isLoadingCities || isLoadingWarehouses) return;

         await createOrder({
            variables: {
               args: {
                  total: cartData?.getCart?.totalPrice,
                  address: `${cityName}, ${warehouseName}`,
                  phone: data.phone,
                  email: data.email,
                  name: `${data.firstName} ${data.lastName} ${data.middleName}`,
                  orderItem: cartData?.getCart?.items.map(
                     (item: TCartItem) => ({
                        code: item.color.code,
                        quantity: item.quantity,
                        price: item.price,
                     }),
                  ),
                  paymentMethod: paymentMethod,
               },
            },
         });

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
      form.setValue('city', name);
      setCityName(name);
      setIsCityDropdownOpen(false);
      setWarehouseSearch('');
      setWarehouseName('');
      setWarehouseRef(null);
   };

   const handleWarehouseChange = (ref: string, name: string) => {
      setWarehouseRef(ref);
      form.setValue('warehouse', name);
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
         <div className="grid lg:grid-cols-2 gap-[30px] py-md">
            <form
               className="px-[10px] self-start border-[2px] border-primary py-[10px] lg:px-[30px] lg:py-[30px]"
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
                     name="phone"
                     className="max-w-[400px]"
                     mask="+38 (000) 000-00-00"
                  />
               </FormBlock>
               <FormBlock title="Спосіб оплати" className="space-y-[20px]">
                  <Controller
                     control={form.control}
                     name="paymentMethod"
                     defaultValue="online"
                     render={({ field }) => (
                        <>
                           <CheckboxWithText
                              text="Оплата онлайн"
                              checked={field.value === 'online'}
                              onCheckedChange={() => field.onChange('online')}
                           />
                           <CheckboxWithText
                              text="Оплата при отриманні"
                              checked={field.value === 'cash'}
                              onCheckedChange={() => field.onChange('cash')}
                           />
                        </>
                     )}
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
            <ItemsBlock
               items={cartData?.getCart.items || []}
               totalPrice={cartData?.getCart?.totalPrice}
               onSubmit={form.handleSubmit(onSubmit)}
            />
         </div>
      </FormProvider>
   );
};
