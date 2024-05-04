import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieresult } from "../utils/gptSlice";
import { useDispatch } from "react-redux";

const useGPTResults = () => {
  const dispatch = useDispatch();
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGeminiSearch = async (searchText) => {
    const prompt =
      "Act as a movie recommendation system and suggest some movies for the query :" +
      searchText +
      ". only give me 5 movies, comma seperated like example result given ahead. Example Result : Gadar, Gully Boy, Don, Sholay, Koi Mil Gaya";
    //   const gptResults = await openai.chat.completions.create({
    //     messages: [{ role: "user", content: searchText }],
    //     model: "gpt-3.5-turbo",
    //   });

    //  gptResults.choices?.[0]?.message?.content;
    // const gptResults = "Love Mocktail, Gully Boy, Notebook, Sholay, Koi Mil Gaya";

    const apiKey = import.meta.env.VITE_PALM_KEY;
    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
      apiKey;

    const data = {
      contents: [
        {
          parts: [
            {
              text:
                "Act as a movie recommendation system and suggest some movies for the query :" +
                searchText +
                ". only give me 5 movies, comma seperated like example result given ahead. Example Result : Gadar, Gully Boy, Don, Sholay, Koi Mil Gaya",
            },
          ],
        },
      ],
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then(async (data) => {
        const geminiResults = data?.candidates[0]?.content?.parts[0]?.text;
        const getMovies = geminiResults.split(", ");
        const promiseArray = getMovies.map((movie) => searchMovieTMDB(movie));

        const tmdbResults = await Promise.all(promiseArray);

        dispatch(
          addGptMovieresult({
            movieNames: getMovies,
            movieResults: tmdbResults,
          })
        );
      })
      .catch((error) => console.error(error));
  };

  return { handleGeminiSearch };
};

export default useGPTResults;
