interface Props {
   accessToken: string | undefined;
}

export const Main: React.FC<Props> = ({ accessToken }) => {
   if (!accessToken || accessToken === 'undefined') {
      return <div>Access token is missing</div>;
   }
   return <div>Profile</div>;
};
