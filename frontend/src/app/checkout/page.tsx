import { Breadcrumb } from '@/components/shared';
import { Container, Title } from '@/components/ui';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CheckoutForm } from './components/checkout-form';

const CART_QUERY = `query GetCart {
   getCart {
      items {
         id
      }
   }
}`;

export default async function CheckoutPage() {
   const cookieStore = await cookies();
   const accessToken = cookieStore.get('accessToken')?.value;
   const guestToken = cookieStore.get('guestToken')?.value;

   if (!accessToken && !guestToken) {
      redirect('/');
   }

   const response = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Cookie: `accessToken=${accessToken || ''}; guestToken=${
            guestToken || ''
         }`,
      },
      credentials: 'include',
      body: JSON.stringify({ query: CART_QUERY }),
   });

   const result = await response.json();
   const items = result?.data?.getCart?.items || [];

   if (items.length === 0) {
      redirect('/');
   }

   return (
      <Container>
         <Breadcrumb links={[{ name: 'Замовлення', path: '/checkout' }]} />
         <Title text="Оформлення замовлення" />
         <CheckoutForm />
      </Container>
   );
}
