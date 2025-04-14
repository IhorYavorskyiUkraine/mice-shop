import { Breadcrumb } from '@/components/shared';
import { Container, Title } from '@/components/ui';
import { Sidebar } from './components';
import { ProductsList } from './components/products-list/products-list';

export default function Shop() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Магазин', path: '/shop' }]} />
         <div className="grid pb-sm gap-[30px] lg:grid-cols-[300px_1fr]">
            <Sidebar />
            <div>
               <Title text="Магазин" className="hidden lg:block" />
               <ProductsList />
            </div>
         </div>
      </Container>
   );
}
