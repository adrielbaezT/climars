import {useLazyQuery, useMutation} from '@apollo/client';
import {userVar} from 'graphql';
import {ADD_LIKE, DELETE_LIKE, GET_LIKE} from '../graphql/queries';
import {
  GetLikeResponse,
  GetLikesVars,
  LikeData,
  LikeVars,
} from '../interfaces/LikesInterfaces';

export const useLikes = () => {
  const token = userVar()?.token;
  const [
    addLike,
    {
      loading: loading_like_create,
      error: error_like_create,
      data: data_like_create,
    },
  ] = useMutation<LikeData, LikeVars>(ADD_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const [
    deleteLike,
    {
      loading: loading_like_delete,
      error: error_like_delete,
      data: data_like_delete,
    },
  ] = useMutation<LikeData, LikeVars>(DELETE_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const [
    getLikes,
    {
      loading: loading_like_get,
      error: error_like_get,
      data: data_like_get,
      called: calledLikes,
      refetch: refetchLikes,
    },
  ] = useLazyQuery<GetLikeResponse, GetLikesVars>(GET_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });

  const requestLikes = async (id: number) => {
    if (calledLikes) {
      await refetchLikes({
        imgId: id,
      });
    }
    await getLikes({
      variables: {
        imgId: id,
      },
    });
  };

  return {
    addLike,
    deleteLike,
    requestLikes,
    getLikes,
    refetchLikes,
    data_like_get,
    loading_like_get,
    data_like_create,
    error_like_create,
    calledLikes,
  };
};
