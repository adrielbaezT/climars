import {useLazyQuery} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {GET_PAGES, GET_PHOTOS, GET_SOL} from '../graphql/queries';

export const useGetSol = () => {
  const [nsol, setNsol] = useState(-1);
  const [currSol, setCurrSol] = useState(-1);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [manifest, setManifest] = useState([]);
  //=========== GraphQL queries ===========
  const [getPhotos, {loading, error, data, called, refetch}] =
    useLazyQuery(GET_PHOTOS);

  const [
    getPages,
    {loading: loading_pages, error: error_pages, data: data_pages},
  ] = useLazyQuery(GET_PAGES);

  const [getSol, {loading: loading_sol, error: error_sol, data: data_sol}] =
    useLazyQuery(GET_SOL);
  // ===========
  const getCurrentSol = async () => {
    if (currSol !== -1) {
      if (called) {
        setPages(Math.ceil(manifest[-nsol].total_photos / 25));
        await refetch({sol: currSol, page});
        return null;
      }
      setPages(Math.ceil(manifest[-nsol].total_photos / 25));

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
    const res = await getSol();
    const sum = currSol + res.data?.getSol.max_sol;
    const manifestResp = await getPages();
    // console.log(manifest.data.getPages[0].sol);

    setManifest(manifestResp.data.getPages);
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
  };
};
