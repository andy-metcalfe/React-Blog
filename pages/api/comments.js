import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = 'https://api-eu-west-2.graphcms.com/v2/cl1c74tpr2z7601xmaehd4c3x/master';
const graphcmsToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDg2NDUxMTksImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuZ3JhcGhjbXMuY29tL3YyL2NsMWM3NHRwcjJ6NzYwMXhtYWVoZDRjM3gvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGQ0NjFmOTEtYjFiZi00MGUyLTgwOTUtNjRiNDdkNjVkMDNiIiwianRpIjoiY2wxZGtxamZqMHpudjAxejYyYjJsZGgwYSJ9.0Si9UTMwlEnhpnkSvE2KEu94r_df8VGP-z3n34UtT8jbRiH-4tmjdu58J9C1Di7raM9tVLvN6Z0OdAx5ePfVk1RPlcrv-vLaFJfD_qp0WTlhkPbO5Cl8IdLOM6RVnlC0SrXgfAG1EX3dMelJM_02vQChBqmVzFunyXQDxX6WvNSJnO9HLywoPwXir1n047I6raGJJZqMcZ9oi1aSlbXR4qVknQulIrTe2eggwAeDF0knWmqqzI8VT_xqFApFaDshM74-iqa2YmO3rsqFX1B9Ty_NmJVa3-qhvRyoi9a-becb-g1j91WX5ZxOKn_7Yu8DCa6YjvUIKkpzgDyHPPnuXcpyvAqyZz0v0Oznq-Lb2_YPkE96A5Y0TVypozmhJVvP-hbC3jTDX9S-Ly4bp3S26KCM5MN9t4c07C4sVTUCb1Ggfs2Zd4qHV0kn5Fc9sFaxbprWNt6ilYbmMil18bOzJ-pYYJ_pOKwXMwEV5-SaISjm7Nx30HiWZRcJcC1BdSwHWY1mAPX-yHCL_Qm_AcaUL_8T56HvSn_o3D7nNQFobbxvT6InXwxWGOt-oTWrpoCknQ36Yj0TCgitBnF4zmGzFTfkP1quP9KvJo-vijmsidffvUSAZboDrvdOQwWL87-ht34bEAVOODjcinL2wzqjxjJ4uB7dogzxxbVAwKaNDT4';

/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  });

  return res.status(200).send(result);
}