import ImageCard from "../ImageCard/ImageCard"
import css from './ImageGallery.module.css'

export default function ImageGallery({ items, onClick }) {
    return (
        <ul className={css.list}>
            {items.map(item => {
                return <li key={item.id} className={css.listItem}>
                    <ImageCard onClick={onClick} urls={item.urls} item={item} user={item.user} likes={item.likes} />
                </li>
            })}
        </ul>
    )
}