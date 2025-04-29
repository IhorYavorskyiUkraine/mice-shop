import { Breadcrumb } from '@/components/shared';
import { Container } from '@/components/ui';
import { Main } from './components/main';

export default function Profile() {
   return (
      <Container>
         <Breadcrumb links={[{ name: 'Профіль', path: '/profile' }]} />
         <Main />
      </Container>
   );
}
