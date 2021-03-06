export interface ResponseTopHeadlines {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}

export interface AsyncEvent extends CustomEvent {
  target: EventTarget & {
    disabled: boolean;
    threshold: string;
    position: string;
    complete(): void;
  };
}
