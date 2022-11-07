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
