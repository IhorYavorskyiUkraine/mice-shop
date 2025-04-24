'use client';

export default function Profile() {
   const res = fetch('http://localhost:8000/graphql', {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         query: `query IsAuthenticated {
				isAuthenticated {
					userId
					message
				}
			}`,
      }),
   }).then(res => res.json());
   console.log(res);

   return (
      <div>
         <h1>Profile</h1>
         <p>User ID: </p>
      </div>
   );
}
