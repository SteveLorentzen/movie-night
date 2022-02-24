import * as React from 'react';
import Image from 'next/image';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { getMovieData, Result, SearchResult, searchTitle } from 'lib/tmdb';
import '@reach/combobox/styles.css';
import { useDebounce } from 'hooks/useDebounce';
import { getMovieDetails, IMDBDetails } from 'lib/omdb';

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

export default function AddMovie() {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce(query, 500);

  const [options, setOptions] = React.useState<SearchResult>();
  const [searching, setIsSearching] = React.useState(false);

  const [movie, setMovie] = React.useState<Result>();
  const [imdbData, setImdbData] = React.useState<IMDBDetails>();

  React.useEffect(() => {
    async function init() {
      if (debouncedQuery) {
        setIsSearching(true);
        const results = await searchTitle(debouncedQuery);
        setOptions(results.data);
        setIsSearching(false);
      } else {
        setOptions(undefined);
        setIsSearching(false);
      }
    }
    init();
  }, [debouncedQuery]);

  React.useEffect(() => {
    async function init() {
      const results = await getMovieData(movie?.id);

      if (results && results.data.imdb_id) {
        const imdbResults = await getMovieDetails(results.data.imdb_id);
        setImdbData(imdbResults?.data);
      }
    }
    init();
  }, [movie]);

  return (
    <div className='flex flex-col justify-center'>
      <Combobox aria-labelledby='demo' className='flex justify-center'>
        <ComboboxInput
          onChange={e => setQuery(e.target.value)}
          placeholder='Search...'
          className='w-1/4 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
          type='search'
          autoComplete='off'
          id='movie-title-search'
        />
        {searching && <div>loading...</div>}
        <ComboboxPopover>
          <ComboboxList>
            {options?.results?.map(option => (
              <ComboboxOption
                key={option.id}
                value={option.title}
                onClick={() => setMovie(option)}
              />
            ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
      <section>
        {movie && (
          <>
            <h2 className='mb-4 text-2xl font-bold text-gray-900'>{movie.title}</h2>
            <Image
              alt={`Poster for${movie.title}`}
              src={`${BASE_IMG_URL}${movie.poster_path}`}
              width={330}
              height={500}
            />
          </>
        )}
        <pre>{JSON.stringify(imdbData)}</pre>
      </section>
    </div>
  );
}
