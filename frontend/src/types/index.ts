export interface StoryOptions {
  genres: string[];
  themes: string[];
  weirdnessLevels: number[];
}

export interface StoryRequest {
  genre: string;
  theme: string;
  weirdness: number;
}

export interface StoryResponse {
  prompt: string;
  error?: string;
}
