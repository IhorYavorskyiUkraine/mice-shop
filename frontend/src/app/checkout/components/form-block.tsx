interface Props {
   title: string;
   className?: string;
   children: React.ReactNode;
}

export const FormBlock: React.FC<Props> = ({ title, children, className }) => {
   return (
      <div className="mb-md last:mb-0">
         <h2 className="mb-sm">{title}</h2>
         <div className={className}>{children}</div>
      </div>
   );
};
