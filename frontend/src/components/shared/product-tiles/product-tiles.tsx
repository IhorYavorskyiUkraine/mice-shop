import { Container, Title } from '@/components/ui';
import { cn } from '@/lib';

interface Props {
   title: string;
   children?: React.ReactNode;
   className?: string;
}

export const ProductTiles: React.FC<Props> = ({
   title,
   className,
   children,
}) => {
   return (
      <section>
         <Container className={cn(className, 'py-sm lg:py-md')}>
            <Title
               className="text-center mb-sm lg:mb-md"
               text={title}
               size="xl"
            />
            {children}
         </Container>
      </section>
   );
};
