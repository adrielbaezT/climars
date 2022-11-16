import {gql} from '@apollo/client';

export const GET_PHOTOS = gql`
  query GetPhotos($sol: Int, $page: Int) {
    getPhotos(sol: $sol, page: $page) {
      sol
      id
      img_src
      earth_date
    }
  }
`;

export const GET_PAGES = gql`
  query GetPages {
    getPages {
      max_sol
      max_date
      photos {
        total_photos
        sol
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $sol: Int
    $img_id: Int
    $post: String
    $email: String
    $user_img: String
    $user_name: String
    $img_source: String
  ) {
    createPost(
      sol: $sol
      img_id: $img_id
      img_source: $img_source
      post: $post
      email: $email
      user_img: $user_img
      user_name: $user_name
    ) {
      id
      post
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts($img_id: Int) {
    getPosts(img_id: $img_id) {
      post
      id
      str_userId
      user_img
      user_name
      img_id
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($deletePostId: Int, $imgSource: String) {
    deletePost(id: $deletePostId, img_source: $imgSource) {
      id
      post
      str_photoId
      str_userId
      user_img
      user_name
      img_id
    }
  }
`;

export const EDIT_POST = gql`
  mutation EditPost($id: Int, $post: String, $img_source: String) {
    editPost(id: $id, post: $post, img_source: $img_source) {
      post
      id
      str_userId
      user_img
      user_name
      img_id
    }
  }
`;

export const ADD_LIKE = gql`
  mutation AddLike($sol: Int, $img_id: Int, $img_source: String) {
    addLike(sol: $sol, img_id: $img_id, img_source: $img_source) {
      id
    }
  }
`;

export const GET_LIKE = gql`
  query GetLikes($imgId: Int) {
    getLikes(img_id: $imgId) {
      id
      str_userId
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($img_id: Int, $img_source: String) {
    deleteLike(img_id: $img_id, img_source: $img_source) {
      id
    }
  }
`;
