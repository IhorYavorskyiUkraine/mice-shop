import { Container } from '@/components/ui';
import { BreadcrumbWithName } from '../components/breadcrumb/breadcrumb-with-name';
import { ProductInfo } from '../components/product-info';
import { ProductTabs } from '../components/product-tabs/product-tabs';

export default async function ProductPage({
   params,
}: {
   params: { id: string };
}) {
   const { id } = await params;

   return (
      <Container>
         <BreadcrumbWithName id={Number(id)} />
         <ProductInfo id={Number(id)} />
         <ProductTabs id={Number(id)} />
      </Container>
   );
}
