import { fchmod } from 'fs'
import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostsDetail(){
      posts(
        orderBy: createdAt_ASC
        first:3
      ){
        title
        featuredImage{
          url
        }
        slug
        createdAt
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostsDetail($slug:String! , $categories:[String!]){
      posts(
        where:{slug_not:$slug, AND {categories_some:{slug_in: $categories} }}
        last:3
      ){
        title
        featuredImage{
          url
        }
        slug
        createdAt
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}
