import { Container } from '@/components/ui';
import { Metadata } from 'next';
import { BreadcrumbWithName } from '../components/breadcrumb/breadcrumb-with-name';
import { ProductInfo } from '../components/product-info';
import { ProductTabs } from '../components/product-tabs/product-tabs';

export async function generateMetadata({
   params,
}: {
   params: { id: string };
}): Promise<Metadata> {
   const { id } = params;

   try {
      const response = await fetch(`http://localhost:8000/graphql`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            query: `query GetProductById($id: Int!) {
               getProductById(id: $id) {
                  name
               }
            }`,
            variables: { id: Number(id) },
         }),
      });

      const { data } = await response.json();

      if (!data?.getProductById) {
         throw new Error('Product not found');
      }

      return {
         title: `Миша ${data.getProductById.name}`,
      };
   } catch (error) {
      console.error('Failed to fetch product:', error);
      return {
         title: 'Product not found',
      };
   }
}

export default function ProductPage({ params }: { params: { id: string } }) {
   const id = Number(params?.id);
   return (
      <Container>
         <BreadcrumbWithName id={id} />
         <ProductInfo id={id} />
         <ProductTabs id={id} />
      </Container>
   );
}
