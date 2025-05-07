import { Container } from '@/components/ui';
import { Metadata } from 'next';
import { BreadcrumbWithName } from '../components/breadcrumb/breadcrumb-with-name';
import { ProductInfo } from '../components/product-info';
import { ProductTabs } from '../components/product-tabs/product-tabs';

interface GenerateMetadataProps {
   params: { id: string };
   searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({
   params,
}: GenerateMetadataProps): Promise<Metadata> {
   const { id } = await params;

   try {
      const response = await fetch('http://localhost:8000/graphql', {
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

interface PageProps {
   params: { id: string };
   searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ProductPage({ params }: PageProps) {
   const { id } = await params;
   return (
      <Container>
         <BreadcrumbWithName id={Number(id)} />
         <ProductInfo id={Number(id)} />
         <ProductTabs id={Number(id)} />
      </Container>
   );
}
