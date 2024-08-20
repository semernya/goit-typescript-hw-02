import ImageCard from "../ImageCard/ImageCard"
import css from './ImageGallery.module.css'

import { Image } from "../../types";
import React from "react";

interface ImageGalleryPops {
    items: Image[];
    onClick: (url: string, likes: number, username: string) => void;
}

export default function ImageGallery({ items, onClick } : ImageGalleryPops) {
    return (
        <ul className={css.list}>
            {items.map((item : Image) => {
                return <li key={item.id} className={css.listItem}>
                    <ImageCard onClick={onClick} urls={item.urls} item={item} user={item.user} likes={item.likes} />
                </li>
            })}
        </ul>
    )
}
