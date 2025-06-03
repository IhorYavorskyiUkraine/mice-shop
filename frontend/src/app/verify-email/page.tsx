import { redirect } from 'next/navigation';

export default async function VerifyEmailPage({
   searchParams,
}: {
   searchParams: { token?: string };
}) {
   const { token } = await searchParams;

   if (!token) {
      redirect('/');
   }

   const res = await fetch('http://localhost:8000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         query: `
        mutation ConfirmEmail($token: String!) {
          confirmEmail(token: $token) {
			 	message}
        }
      `,
         variables: { token },
      }),
      cache: 'no-store',
   });

   const data = await res.json();

   if (res.ok && data?.data?.confirmEmail.message === 'success') {
      redirect('/');
   }

   return (
      <div className="text-red-600 h-screen text-center mt-10">
         ❌ Невірний токен або сталася помилка при підтвердженні електронної
         пошти.
      </div>
   );
}
