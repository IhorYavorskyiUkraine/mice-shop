import {
   Breadcrumb as BreadcrumbContainer,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
} from '@/components/ui';

interface Props {
   links: { name: string; path: string }[];
}

export const Breadcrumb: React.FC<Props> = ({ links }) => {
   return (
      <BreadcrumbContainer>
         <BreadcrumbList className="text-t1 py-sm">
            <BreadcrumbItem>
               <BreadcrumbLink className="opacity-60" href="/">
                  Головна
               </BreadcrumbLink>
            </BreadcrumbItem>
            {links.map(link => (
               <div key={link.name} className="flex items-center gap-2">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem key={link.name}>
                     <BreadcrumbLink href={link.path}>
                        {link.name}
                     </BreadcrumbLink>
                  </BreadcrumbItem>
               </div>
            ))}
         </BreadcrumbList>
      </BreadcrumbContainer>
   );
};
