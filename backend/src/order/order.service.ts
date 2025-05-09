import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateTTHArgs } from './dto/create-tth.args';
import { getWarehousesArgs } from './dto/get-warehouses.args';

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

      return data.data[0].Addresses.filter(
         (city: any) => city?.Present && city?.Ref,
      ).map((city: any) => ({
         name: city.Present,
         ref: city.DeliveryCity,
      }));
   }

   async getWarehouses(args: getWarehousesArgs) {
      const { cityRef, search } = args;
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
               ...(search ? { FindByString: search } : {}),
               Limit: 10,
               Offset: 0,
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

   async createTTH(args: CreateTTHArgs) {
      const body = {
         apiKey: this.config.get('NOVA_POST_API_KEY'),
         modelName: 'InternetDocument',
         calledMethod: 'save',
         methodProperties: {
            SenderWarehouseIndex: this.config.get('SENDER_WAREHOUSE_INDEX'),
            RecipientWarehouseIndex: args.recipientAddress,
            PayerType: 'Recipient',
            PaymentMethod: args.paymentMethod,
            DateTime: new Date().toISOString(),
            CargoType: args.cargoType,
            VolumeGeneral: '0.45',
            Weight: '2',
            ServiceType: args.serviceType,
            SeatsAmount: args.seatsAmount,
            Description: args.description,
            Cost: args.cost,
            CitySender: this.config.get('SENDER_CITY'),
            Sender: '00000000-0000-0000-0000-000000000000',
            SenderAddress: '00000000-0000-0000-0000-000000000000',
            ContactSender: '00000000-0000-0000-0000-000000000000',
            SendersPhone: this.config.get('SENDER_PHONE'),
            CityRecipient: '00000000-0000-0000-0000-000000000000',
            Recipient: '00000000-0000-0000-0000-000000000000',
            RecipientAddress: '00000000-0000-0000-0000-000000000000',
            ContactRecipient: '00000000-0000-0000-0000-000000000000',
            RecipientsPhone: args.phoneRecipient,
         },
      };

      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.errors?.length) {
         throw new Error(data.errors.join(', '));
      }

      return data.data?.[0] || null;
   }
}
