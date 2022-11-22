import {useLazyQuery, useMutation} from '@apollo/client';
import {userVar} from 'graphql';
import {
  CREATE_POST,
  DELETE_POST,
  EDIT_POST,
  GET_POSTS,
} from '../graphql/queries';
import {PostData, PostVars} from '../interfaces/PostInterfaces';

export const usePost = () => {
  const token = userVar()?.token;

  const [
    getPosts,
    {
      loading: loading_posts,
      error: error_posts,
      data: data_posts,
      called: calledPosts,
      refetch: refetchPosts,
    },
  ] = useLazyQuery<PostData, PostVars>(GET_POSTS, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const requestPosts = async (imgId: number) => {
    if (calledPosts) {
      await refetchPosts();
    }
    await getPosts({
      variables: {
        img_id: imgId,
      },
    });
  };

  const [
    deletePost,
    {
      loading: loading_post_delete,
      error: error_post_delete,
      data: data_post_delete,
    },
  ] = useMutation(DELETE_POST, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const [
    createPost,
    {
      loading: loading_post_create,
      error: error_post_create,
      data: data_post_create,
    },
  ] = useMutation(CREATE_POST, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const [
    editPost,
    {loading: loading_post_edit, error: error_post_edit, data: data_post_edit},
  ] = useMutation(EDIT_POST, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  return {
    data_posts,
    error_posts,
    loading_posts,
    requestPosts,
    refetchPosts,
    deletePost,
    loading_post_delete,
    error_post_delete,
    createPost,
    editPost,
    loading_post_create,
    error_post_create,
    loading_post_edit,
    error_post_edit,
    data_post_create,
    data_post_edit,
    data_post_delete,
  };
};
