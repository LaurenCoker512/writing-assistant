import { useState } from "react";
import { StoryOptions, StoryRequest, StoryResponse } from "../types";

export const useStoryGenerator = () => {
  const API_URL = import.meta.env.API_URL || "http://localhost:5008/api";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<StoryOptions>({
    genres: [],
    themes: [],
    weirdnessLevels: [],
  });

  const fetchOptions = async () => {
    try {
      const response = await fetch(`${API_URL}/options`);
      const data = await response.json();
      setOptions(data);
    } catch (err) {
      setError("Failed to fetch options");
    }
  };

  const generateStory = async (
    request: StoryRequest
  ): Promise<StoryResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate story");
      }

      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      return { prompt: "", error: message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, options, fetchOptions, generateStory };
};
