import { Breadcrumb } from '@/components/shared';
import { Container } from '@/components/ui';
import { Metadata } from 'next';
import { Content } from './components/content';

export const metadata: Metadata = {
   title: 'PixelMouse | Contact',
};

export default function Contact() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Контакти', path: '/contact' }]} />
         <Content />
      </Container>
   );
}
