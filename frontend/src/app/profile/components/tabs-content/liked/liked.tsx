import { useQuery } from '@apollo/client';
import { GET_LIKED_PRODUCTS } from './liked.graphql';

export const Liked: React.FC = () => {
   const { data, loading, error } = useQuery(GET_LIKED_PRODUCTS);
   console.log(data);
   return <div className="px-md py-md">s</div>;
};
