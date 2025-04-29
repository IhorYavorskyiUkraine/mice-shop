import { Container } from '@/components/ui';
import { BreadcrumbWithName } from '../components/breadcrumb/breadcrumb-with-name';
import { ProductInfo } from '../components/product-info';
import { ProductTabs } from '../components/product-tabs/product-tabs';

export default function ProductPage({ params }: { params: any }) {
   const id = Number(params?.id);
   return (
      <Container>
         <BreadcrumbWithName id={id} />
         <ProductInfo id={id} />
         <ProductTabs id={id} />
      </Container>
   );
}
