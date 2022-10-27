import {gql} from '@apollo/client';

export const GET_SOL = gql`
  query GetSol($id: Int) {
    getSol(id: $id) {
      max_sol
      max_date
    }
  }
`;

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
  query GetPages($id: Int) {
    getPages(id: $id) {
      sol
      total_photos
    }
  }
`;
