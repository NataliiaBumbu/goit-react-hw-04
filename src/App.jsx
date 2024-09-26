import { useEffect, useMemo, useRef, useState } from 'react'
import fetchGalleryPhotos from './api/photos-api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [page, setPage] = useState(1);
	const [queryValue, setQueryValue] = useState('');
	const [gallery, setGallery] = useState([]);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [modalImage, setModalImage] = useState('');
	const [altDescription, setAltDescription] = useState('');
	const [totalPages, setTotalPages] = useState(0);




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
		setGallery([]);
		setPage(1);
		
	};
	const isActive = useMemo(() => page === totalPages, [page, totalPages]);
	const openModal = () => {
		setIsOpen(true);
	};
	const closeModal = () => {
		setIsOpen(false);
	};
	const modalStateData = (src, alt) => {
		setModalImage(src);
		setAltDescription(alt);
	};

	



  return (
	<div>
		<SearchBar onSubmit={handleQuery} />
		{isLoading }
	   {isError}
	   <ImageGallery
					gallery={gallery}
					openModal={openModal}
					modalStateData={modalStateData}
				/>
					<ImageModal
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
				src={modalImage}
				alt={altDescription}
			/>
	</div>
  )
}

export default App