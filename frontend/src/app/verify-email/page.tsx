import { redirect } from 'next/navigation';

interface Props {
   searchParams: { token?: string };
}

export default function VerifyEmailPage({ searchParams }: Props) {
   const token = searchParams.token;

   if (!token) {
      return redirect('/');
   }

   const confirmEmail = async () => {
      const response = await fetch('http://localhost:8000/graphql', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ token }),
      });

      if (!response.ok) {
         throw new Error('Failed to verify email');
      }

      return redirect('/');
   };

   return <div>+</div>;
}
