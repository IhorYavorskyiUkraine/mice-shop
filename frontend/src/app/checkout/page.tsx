import { Breadcrumb } from '@/components/shared';
import { Container, Title } from '@/components/ui';
import { CheckoutForm } from './components/checkout-form';

export default function CheckoutPage() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Замовлення', path: '/checkout' }]} />
         <Title text="Оформлення замовлення" />
         <div className="grid lg:grid-cols-2 gap-[30px] py-md">
            <CheckoutForm />
         </div>
      </Container>
   );
}
