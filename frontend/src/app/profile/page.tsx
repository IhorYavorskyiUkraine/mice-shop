import { verifyAndRefreshTokens } from '@/lib/utils/tokens';
import { Main } from './components/main';

export default async function Profile() {
   const { accessToken } = await verifyAndRefreshTokens();

   return <Main accessToken={accessToken} />;
}
