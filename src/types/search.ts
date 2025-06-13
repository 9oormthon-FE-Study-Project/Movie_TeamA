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
}
