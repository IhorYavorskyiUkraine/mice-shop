import { Breadcrumb } from '@/components/shared';
import { Container, Title } from '@/components/ui';
import { Sidebar } from './components';

export default function Shop() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Магазин', path: '/shop' }]} />
         <div className="grid gap-[30px] lg:grid-cols-[300px_1fr]">
            <Sidebar />
            <div>
               <Title text="Магазин" />
            </div>
         </div>
      </Container>
   );
}
