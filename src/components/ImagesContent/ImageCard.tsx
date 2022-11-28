import React from 'react';
import { Image } from '../Image';
import { ImageItemModel } from '../../sdk';

import './style.css';

interface ImageCardProps {
    image: ImageItemModel;
    apiBaseUrl?: string;
    onClose?: () => void;
}

export const ImageCard = ({ image, apiBaseUrl, onClose }: ImageCardProps) => {
    return (
        <div
            className="column is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd clickable "
            onClick={onClose}
        >
            <figure className="is-position-relative">
                <Image
                    imageSrc={`${
                        apiBaseUrl ?? ''
                    }/api/v1/files/${encodeURIComponent(`${image.fileName}`)}`}
                    imageThumbnailSrc={`${
                        apiBaseUrl ?? ''
                    }/api/v1/files/${encodeURIComponent(
                        `${image.fileName}`,
                    )}?type=thumbnail`}
                    imgProps={{
                        title: image.title ?? image.fileName ?? '',
                        alt: image.title ?? image.fileName ?? '',
                    }}
                />
                <figcaption className="card-title-over-image rounded-bottom">
                    {image.title ?? image.fileName}
                </figcaption>
            </figure>
        </div>
    );
};
