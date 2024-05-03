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

  const handleGPTSearch = async (searchText) => {
    // const gptQuery =
    //   "Act as a movie recommendation system and suggest some movies for the query :" +
    //   searchText +
    //   ". only give me 5 movies, comma seperated like example result given ahead. Example Result : Gadar, Gully Boy, Don, Sholay, Koi Mil Gaya";
    //     const gptResults = await openai.chat.completions.create({
    //       messages: [{ role: "user", content: searchText }],
    //       model: "gpt-3.5-turbo",
    //     });

    //    gptResults.choices?.[0]?.message?.content;

    // hardcoding gptresults for now
    const gptResults =
      "Love Mocktail, Gully Boy, Notebook, Sholay, Koi Mil Gaya";
    const getMovies = gptResults.split(", ");
    const promiseArray = getMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptMovieresult({ movieNames: getMovies, movieResults: tmdbResults })
    );
    console.log(tmdbResults);
  };

  return { handleGPTSearch };
};

export default useGPTResults;
