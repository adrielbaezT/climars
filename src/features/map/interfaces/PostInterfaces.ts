export interface IPost {
  id: number;
  post: string;
  str_photoId: number;
  str_userId: number;
  user_img: string;
  user_name: string;
  img_id: number;
  __typename?: 'Post';
}

export interface PostData {
  getPosts: IPost[];
}

export interface PostVars {
  img_id?: number;
}
//
