import { useEffect, useState } from "react";
import { useStoryGenerator } from "../hooks/useStoryGenerator";
import StoryOutput from "./StoryOutput";

function StoryForm() {
  const { loading, error, options, fetchOptions, generateStory } =
    useStoryGenerator();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedWeirdness, setSelectedWeirdness] = useState(3);
  const [story, setStory] = useState("");

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGenre || !selectedTheme) return;

    const result = await generateStory({
      genre: selectedGenre,
      theme: selectedTheme,
      weirdness: selectedWeirdness,
    });
    if (result.prompt) {
      setStory(result.prompt);
    }
  };

  const handleRegenerate = async () => {
    if (!selectedGenre || !selectedTheme) return;

    const result = await generateStory({
      genre: selectedGenre,
      theme: selectedTheme,
      weirdness: selectedWeirdness,
    });

    if (result.prompt) {
      setStory(result.prompt);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Story Prompt Generator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700"
          >
            Genre
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a genre</option>
            {options.genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="theme"
            className="block text-sm font-medium text-gray-700"
          >
            Theme
          </label>
          <select
            id="theme"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a theme</option>
            {options.themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="weirdness"
            className="block text-sm font-medium text-gray-700"
          >
            Weirdness Factor (1=Normal, 5=Experimental)
          </label>
          <select
            id="weirdness"
            value={selectedWeirdness}
            onChange={(e) => setSelectedWeirdness(Number(e.target.value))}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            {options.weirdnessLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Story Prompt"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {story && (
        <StoryOutput
          story={story}
          onRegenerate={handleRegenerate}
          disabled={loading}
        />
      )}
    </div>
  );
}

export default StoryForm;
