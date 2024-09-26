import { useEffect, useRef, useState } from 'react'
import fetchGalleryPhotos from './api/photos-api';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [page, setPage] = useState(1);
	const [queryValue, setQueryValue] = useState('');
	



	useEffect(() => {
		setIsLoading(true);
		if (queryValue === '') return;

		const getData = async () => {
			
				setIsLoading(true);
				setIsError(false);
				const data = await fetchGalleryPhotos(queryValue, page);
				console.log('data: ', data);
				if (data.total === 0) return;
				setGallery((prevGallery) => {
					return [...prevGallery, ...data.results];
				});
				setTotalPages(data.total_pages);
		
		};
		getData();
	}, [page, queryValue]);
	const handleQuery = (newQuery) => {
		setQueryValue(newQuery);
		setPage(1);
		
	};
	



  return (
	<div>
		<SearchBar onSubmit={handleQuery} />
		{isLoading }
			{isError}
	</div>
  )
}

export default App