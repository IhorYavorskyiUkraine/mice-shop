'use client';

import { Breadcrumb } from '@/components/shared';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT } from '../../product.graphql';

interface Props {
   id: number;
}

export const BreadcrumbWithName: React.FC<Props> = ({ id }) => {
   const { data } = useQuery(GET_PRODUCT, {
      variables: { id },
   });
   return <Breadcrumb links={[{ name: data?.getProductById.name }]} />;
};
