import { PostData } from './postData';
export interface LocalizedPostData {
  [key: string]: PostData | undefined;
}
