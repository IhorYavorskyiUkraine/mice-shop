import { Header } from '@/components/shared';
import { MainProvider } from '@/providers/mainProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
   title: 'PIXELMOUSE',
   description: 'PIXELMOUSE',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            <MainProvider>
               <Header />
               {children}
            </MainProvider>
         </body>
      </html>
   );
}
