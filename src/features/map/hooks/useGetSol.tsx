import {useLazyQuery, useReactiveVar} from '@apollo/client';
import {userVar} from 'graphql';
import {useEffect, useState} from 'react';
import {GET_PAGES, GET_PHOTOS} from '../graphql/queries';

export const useGetSol = () => {
  const [nsol, setNsol] = useState(-1);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [manifest, setManifest] = useState([]);
  const [currSol, setCurrSol] = useState(-1);

  const user = useReactiveVar(userVar);
  //=========== GraphQL queries ===========
  const [getPhotos, {loading, data, called, refetch}] = useLazyQuery(
    GET_PHOTOS,
    {
      context: {
        headers: {
          authorization: 'Bearer ' + user?.token,
        },
      },
    },
  );

  const [
    getPages,
    {loading: loading_pages, error: error_pages, data: data_pages},
  ] = useLazyQuery(GET_PAGES, {
    context: {
      headers: {
        authorization: 'Bearer ' + user?.token,
      },
    },
  });

  // ===========
  const getCurrentSol = async () => {
    if (currSol !== -1) {
      if (called) {
        setPages(Math.ceil(manifest.photos[-nsol].total_photos / 25));
        await refetch({sol: currSol, page});
        return null;
      }
      setPages(Math.ceil(manifest.photos[-nsol].total_photos / 25));
      await getPhotos({
        variables: {
          sol: currSol,
          page,
        },
      });
    }
  };
  useEffect(() => {
    getCurrentSol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currSol]);

  const getInitialData = async () => {
    setCurrSol(-1);
    const manifestData = await getPages();
    const sum = currSol + manifestData.data?.getPages.max_sol;

    setManifest(manifestData.data.getPages);
    setCurrSol(sum);
  };

  return {
    getInitialData,
    data,
    loading,
    setCurrSol,
    currSol,
    setNsol,
    nsol,
    loading_pages,
    error_pages,
    data_pages,
  };
};
