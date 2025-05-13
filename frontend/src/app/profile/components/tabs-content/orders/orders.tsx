'use client';

import { useQuery } from '@apollo/client';
import { GET_ORDERS } from './orders.graphql';

export const Orders: React.FC = () => {
   const { data } = useQuery(GET_ORDERS);
   console.log(data);
   return <div>{JSON.stringify(data)}</div>;
};
