import React from 'react';
import { Image } from '../Image';
import { ImageItemModel } from '../../sdk';

import './style.css';

interface ImageCardProps {
    image: ImageItemModel;
    apiBaseUrl?: string;
    onClickCard?: (imageItemModel: ImageItemModel) => void;
}

export const ImageCard = ({
    image,
    apiBaseUrl,
    onClickCard,
}: ImageCardProps) => {
    const handleClick = () => {
        onClickCard && onClickCard(image);
    };

    const imageUri = `${apiBaseUrl}/api/v1/files/${encodeURIComponent(
        `${image.fileName}`,
    )}`;
    const imageThumbnailUri = `${apiBaseUrl}/api/v1/files/${encodeURIComponent(
        `${image.fileName}`,
    )}?type=thumbnail`;

    return (
        <div
            className="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd clickable image-card"
            onClick={handleClick}
        >
            <figure className="is-position-relative">
                <Image
                    imageSrc={imageUri}
                    imageThumbnailSrc={imageThumbnailUri}
                    imgProps={{
                        title: image.title ?? image.fileName ?? '',
                        alt: image.title ?? image.fileName ?? '',
                    }}
                    fill
                    objectFit="fill"
                />
                <figcaption className="card-title-over-image rounded-bottom">
                    {image.title ?? image.fileName}
                </figcaption>
            </figure>
        </div>
    );
};
