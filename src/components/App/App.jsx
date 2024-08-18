import "./App.css";
import { useState, useEffect } from "react";
import { fetchImages } from "../../articles-api";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import DotLoader from "react-spinners/DotLoader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";


export default function App() {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState(false);

  const [modal, setModal] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [userName, setUserName] = useState(null);
  const [likes, setLikes] = useState(null);

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  }

  const handleLoadMore = () => {
    setPage(page + 1);
  }

  const handleToast = (toast) => {
    setPage(toast);
  }

  const openModal = (url, likes, username) => {
    setModal(true);
    setImageURL(url);
    setUserName(username);
    setLikes(likes);
    // closeModal();
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
