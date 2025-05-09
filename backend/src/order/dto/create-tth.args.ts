import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTTHArgs {
   @Field(() => String)
   citySender: string;

   @Field(() => String)
   senderAddress: string;

   @Field(() => String)
   senderRef: string;

   @Field(() => String)
   contactSender: string;

   @Field(() => String)
   cityRecipient: string;

   @Field(() => String)
   recipientAddress: string;

   @Field(() => String)
   recipientRef: string;

   @Field(() => String)
   contactRecipient: string;

   @Field(() => String)
   phoneRecipient: string;

   @Field(() => Float)
   weight: number;

   @Field(() => String)
   serviceType: 'WarehouseWarehouse' | 'WarehouseDoors';

   @Field(() => String)
   paymentMethod: 'Cash' | 'NoCash';

   @Field(() => String)
   cargoType: string;

   @Field(() => String)
   seatsAmount: string;

   @Field(() => Float)
   cost: number;

   @Field(() => String)
   description: string;
}
