import { Breadcrumb } from '@/components/shared';
import { Container } from '@/components/ui';
import { Sidebar } from './components';

export default function Shop() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Магазин', path: '/shop' }]} />
         <div className="grid lg:grid-cols-[300px_1fr]">
            <Sidebar />
         </div>
      </Container>
   );
}
