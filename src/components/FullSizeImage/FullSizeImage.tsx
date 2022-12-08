/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { FaExpandArrowsAlt, FaTimes } from 'react-icons/fa';
import { ImageItemModel } from '../../sdk';
import { Image } from '../Image';
import './style.css';

interface FullSizeImageProps {
    apiBaseUrl?: string;
    picture?: ImageItemModel;
    onClose?: () => void;
}

export const FullSizeImage = ({
    apiBaseUrl,
    picture,
    onClose,
}: FullSizeImageProps) => {
    const [isRequestedFullScreen, setIsRequestedFullScreen] = useState(false);
    const [canRequestedFullScreen, setCanRequestedFullScreen] = useState(false);

    const imageUri = `${apiBaseUrl}/api/v1/files/${encodeURIComponent(
        picture?.fileName ?? '',
    )}`;
    const imageThumbnailUri = `${apiBaseUrl}/api/v1/files/${encodeURIComponent(
        picture?.fileName ?? '',
    )}?type=thumbnail`;

    const handleClickClose = () => {
        onClose && onClose();
    };

    const handleClickFullScreen = () => {
        setIsRequestedFullScreen((_) => true);
    };

    const handleRequestedFullScreen = () => {
        setIsRequestedFullScreen((_) => false);
    };

    const handleImageElementLoaded = (el?: HTMLElement | null) => {
        if (el) {
            setCanRequestedFullScreen(
                (_) => typeof el.requestFullscreen === 'function',
            );
        }
    };

    const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
            onClose && onClose();
        }
    };

    useEffect(() => {
        if (picture) {
            window.addEventListener('keyup', handleKeyUp);
        } else {
            window.removeEventListener('keyup', handleKeyUp);
        }

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [picture]);

    if (!picture) {
        return <React.Fragment />;
    }
    return (
        picture && (
            <div className="full-size-image-container">
                <div className="tools">
                    <div>
                        <button
                            className="button"
                            title="Full screen"
                            onClick={handleClickFullScreen}
                            disabled={!canRequestedFullScreen}
                        >
                            <FaExpandArrowsAlt />
                        </button>
                    </div>
                    <div>
                        <p>{picture.title ?? picture.fileName}</p>
                    </div>
                    <div>
                        <button
                            className="button"
                            title="Close"
                            onClick={handleClickClose}
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
                <figure>
                    <div>
                        <Image
                            imageSrc={imageUri}
                            imageThumbnailSrc={imageThumbnailUri}
                            isRequestFullScreen={isRequestedFullScreen}
                            imgProps={{
                                title: picture.title ?? '',
                                alt: picture?.fileName ?? '',
                            }}
                            onRequestedFullscreen={handleRequestedFullScreen}
                            onLoaded={handleImageElementLoaded}
                            objectFit="contain"
                            fill={false}
                            size={{
                                width: picture?.width ?? 0,
                                height: picture?.height ?? 0,
                            }}
                        />
                    </div>
                    {picture.copyright && (
                        <figcaption>
                            {picture.copyrightLink ? (
                                <p>
                                    <a
                                        href={picture.copyrightLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {picture.copyright}
                                    </a>
                                </p>
                            ) : (
                                <p>{picture.copyright}</p>
                            )}
                        </figcaption>
                    )}
                </figure>
            </div>
        )
    );
};
