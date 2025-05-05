import { Breadcrumb } from '@/components/shared';
import { Container } from '@/components/ui';
import { Metadata } from 'next';
import { Main } from './components/main';

export const metadata: Metadata = {
   title: 'PixelMouse | Profile',
};

export default function Profile() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Профіль', path: '/profile' }]} />
         <Main />
      </Container>
   );
}
