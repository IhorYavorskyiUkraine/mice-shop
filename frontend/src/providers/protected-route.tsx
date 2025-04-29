import { verifyTokens } from '@/lib/utils/tokens';
import { redirect } from 'next/navigation';

export default async function ProtectedRoute({
   children,
}: {
   children: React.ReactNode;
}) {
   const result = await verifyTokens();

   if ('needsRedirect' in result) {
      redirect(result.redirectPath || '/');
   }

   return <>{children}</>;
}
