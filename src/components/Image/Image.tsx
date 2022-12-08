import React, { useEffect, useState, useRef } from 'react';
import NextImage from 'next/image';
import './style.css';

type Size = { width: number; height: number };

export interface ImageProps {
    imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    imageSrc?: string;
    imageThumbnailSrc?: string;
    isRequestFullScreen?: boolean;
    objectFit?: 'fill' | 'contain' | 'cover';
    size?: Size;
    fill?: boolean;
    onClick?: () => void;
    onLoaded?: (el?: HTMLElement | null) => void;
    onRequestedFullscreen?: () => void;
}

export const Image = ({
    imageSrc,
    imageThumbnailSrc,
    isRequestFullScreen,
    imgProps,
    objectFit,
    size,
    fill,
    onClick,
    onRequestedFullscreen,
    onLoaded,
}: ImageProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);

    // const imageRef = useRef<HTMLImageElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver>();

    const handleImageLoaded = (
        event: React.SyntheticEvent<HTMLImageElement, Event>,
    ) => {
        event.persist();
        setThumbnailLoaded((_) => true);
    };

    const handleIntersection = (
        entries: IntersectionObserverEntry[],
        intersectionObserver: IntersectionObserver,
    ) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && thumbnailLoaded) {
                intersectionObserver.unobserve(entry.target);
                setImageLoaded((_) => true);
                // console.info(
                //     '🔨 Request image file: ',
                //     imageRef?.current?.src ||
                //         imageRef?.current?.srcset ||
                //         'Does not find image file uri',
                // );
            }
        });
    };

    useEffect(() => {
        if (thumbnailLoaded) {
            const imgEl = imageRef.current;

            if (!observerRef.current) {
                observerRef.current = new IntersectionObserver(
                    handleIntersection,
                    {
                        threshold: 0.4,
                    },
                );
            }

            if (imgEl) {
                observerRef.current.observe(imgEl);
            }

            if (onLoaded) {
                onLoaded(imgEl);
            }
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [thumbnailLoaded]);

    useEffect(() => {
        if (typeof isRequestFullScreen === 'boolean' && isRequestFullScreen) {
            // console.info(
            //     'Image => ',
            //     typeof imageRef.current?.requestFullscreen,
            // );
            if (typeof imageRef.current?.requestFullscreen === 'function') {
                // imageRef.current?.requestFullscreen();
                const imageEl = imageRef.current.querySelector('img');
                if (imageEl) {
                    imageEl.requestFullscreen();
                }
            }
            if (onRequestedFullscreen) {
                onRequestedFullscreen();
            }
        }
    }, [isRequestFullScreen]);

    return (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <div className="image-container" ref={imageRef}>
            <NextImage
                fill={fill}
                width={size?.width ?? 0}
                height={size?.height ?? 0}
                src={imageSrc ?? ''}
                className={`${imgProps?.className ?? ''} ${
                    imageSrc && imageThumbnailSrc ? 'lazy-load-image' : ''
                } ${imageLoaded ? 'loaded' : ''} ${
                    onClick ? 'is-clickable' : ''
                } object-fit-${objectFit ?? 'contain'}`}
                onLoad={handleImageLoaded}
                onClick={onClick}
                alt={imgProps?.alt ?? ''}
                loading="lazy"
                placeholder="blur"
                blurDataURL={imageThumbnailSrc}
            />
        </div>
    );
};
