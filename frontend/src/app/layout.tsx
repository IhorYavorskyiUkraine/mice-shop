import { Footer, Header } from '@/components/shared';
import { MainProvider } from '@/providers/mainProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
   title: 'PixelMouse | Home',
   description:
      'Інтернет-магазин комп’ютерних мишок PIXELMOUSE — обирай ідеальну мишку для ігор, роботи та щоденного користування. Широкий вибір, надійні бренди, швидке оформлення замовлення.',
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   // const isAuth = await checkAuth();
   const isAuth = true;
   return (
      <html lang="en">
         <head>
            <meta name="color-scheme" content="only light" />
         </head>
         <body>
            <MainProvider>
               <Header isAuth={isAuth} />
               {children}
               <Footer />
            </MainProvider>
         </body>
      </html>
   );
}
