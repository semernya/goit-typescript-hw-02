import "./App.css";
import { useState, useEffect } from "react";
import { fetchImages } from "../../articles-api";
import SearchBar from '../SearchBar/SearchBar'
import ImageGallery from "../ImageGallery/ImageGallery";
import DotLoader from "react-spinners/DotLoader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import { Image } from "../../types";

export default function App() {

  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [toast, setToast] = useState<boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>('');
  const [userName, setUserName] = useState<null>(null);
  const [likes, setLikes] = useState<null>(null);
  // 
  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  }

  const handleLoadMore = (): void => {
    setPage(page + 1);
  }

  const handleToast = (toast: number): void => {
    setPage(toast);
  }
  // 
  const openModal = (url: string, likes: number, username: string): void => {
    setModal(true);
    setImageURL(url);
    setUserName(username);
    setLikes(likes);
  }

  const closeModal = () => {
    setModal(false);
  }

  useEffect(() => {
    if (query === "") {
      return;
    }

    const getImages = async () => {
      try {
        setLoading(true)
    const data = await fetchImages(query, page);
      setLoading(false);
    setImages((prevImages) => {
      return [...prevImages, ...data];
    });
  } catch (error) {
        setError(true);
  } finally {
        setLoading(false);
  }
};

      getImages();
  }, [page, query]);

      return (
      <div>
        <SearchBar onInput={handleSearch} toastState={handleToast} />

        {error && <ErrorMessage />}

        {images.length > 0 && <ImageGallery items={images} onClick={openModal} />}

        <DotLoader loading={loading} color="#01786F" size={50} />

        {images.length > 0 && !loading && (<LoadMoreBtn onClick={handleLoadMore} />)}

        {modal && <ImageModal img={imageURL} likes={likes} user={userName} modalState={modal} onClose={closeModal} />}

      </div>
      )
}
