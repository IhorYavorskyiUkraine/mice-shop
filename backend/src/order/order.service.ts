import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
   constructor(private config: ConfigService) {}

   async getCities(query: string) {
      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            apiKey: this.config.get('NOVA_POST_API_KEY'),
            modelName: 'Address',
            calledMethod: 'searchSettlements',
            methodProperties: {
               CityName: query,
               Limit: 10,
            },
         }),
      });

      const data = await response.json();

      if (
         !data?.data?.[0]?.Addresses ||
         !Array.isArray(data.data[0].Addresses)
      ) {
         return [];
      }
      console.log(data.data[0].Addresses);

      return data.data[0].Addresses.filter(
         (city: any) => city?.Present && city?.Ref,
      ).map((city: any) => ({
         name: city.Present,
         ref: city.DeliveryCity,
      }));
   }

   async getWarehouses(cityRef: string) {
      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            apiKey: this.config.get('NOVA_POST_API_KEY'),
            modelName: 'AddressGeneral',
            calledMethod: 'getWarehouses',
            methodProperties: {
               CityRef: cityRef,
            },
         }),
      });

      const data = await response.json();

      if (!data?.data || !Array.isArray(data.data)) return [];

      return data.data.map((w: any) => ({
         number: w.Number,
         description: w.Description,
         ref: w.Ref,
      }));
   }
}
