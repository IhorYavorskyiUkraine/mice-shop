import { Breadcrumb } from '@/components/shared';
import { Container } from '@/components/ui';
import { Content } from './components/content';

export default function Contact() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Контакти', path: '/contact' }]} />
         <Content />
      </Container>
   );
}
