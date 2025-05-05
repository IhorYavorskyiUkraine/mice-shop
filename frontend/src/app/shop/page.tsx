import { Breadcrumb } from '@/components/shared';
import { Container } from '@/components/ui';
import { Metadata } from 'next';
import { Sidebar } from './components';
import { ProductsList } from './components/products-list/products-list';

export const metadata: Metadata = {
   title: 'PixelMouse | Shop',
};

export default function Shop() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Магазин', path: '/shop' }]} />
         <div className="grid items-start pb-sm gap-[30px] lg:grid-cols-[300px_1fr]">
            <Sidebar />
            <ProductsList />
         </div>
      </Container>
   );
}
