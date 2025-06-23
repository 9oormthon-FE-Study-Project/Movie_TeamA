export interface SearchOverlayProps {
  searchTerm: string;
  onClose: () => void;
  onSearchTermChange: (v: string) => void;
  onResultClick?: (result: SearchResult) => void;
}

export interface SearchResult {
  title: string;
  year: string;
  img: string;
  desc: string;
  id?: number;
}

export interface MovieSearchResponse {
  results: Array<{
    id: number;
    title?: string;
    name?: string;
    release_date?: string;
    overview?: string;
    poster_path?: string;
  }>;
}
