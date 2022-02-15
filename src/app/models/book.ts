export interface BookDetail {
  authors?: [];
  created?: any;
  identifiers?: any;
  isbn_10: string[];
  isbn_13: string[];
  key?: string;
  last_modified?: any;
  latest_revision?: number;
  number_of_pages: number;
  physical_format: string;
  publish_date: string;
  publishers: string[];
  revision?: number;
  subjects?: string[];
  title: string[];
  type?: any;
  works?: any;
}

export interface BookBriefInfo {
  author_name: string[];
  cover_i: number;
  key: string;
  title: string;
}
