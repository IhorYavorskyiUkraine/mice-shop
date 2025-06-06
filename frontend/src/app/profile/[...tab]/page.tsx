import { Breadcrumb } from '@/components/shared';
import { Container } from '@/components/ui';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Main } from '../components/main';

export const metadata: Metadata = {
   title: 'PixelMouse | Profile',
};

export default async function Profile({ params }: { params: any }) {
   const { tab } = await params;

   const currentTab = tab[0];

   const allowedTabs = ['info', 'orders', 'liked', 'addresses'];

   if (!allowedTabs.includes(currentTab)) {
      notFound();
   }

   return (
      // <ProtectedRoute>
      <Container>
         <Breadcrumb links={[{ name: 'Профіль', path: '/profile' }]} />
         <Main tab={currentTab} />
      </Container>
      // </ProtectedRoute>
   );
}
