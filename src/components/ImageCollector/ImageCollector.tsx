'use client';
import React, { useState } from 'react';
import { Content } from '../Content';
import { Section } from '../Section';
import Loading from '../Loading';
import { CollectorForm } from './CollectorForm';
import { useSWRConfig } from 'swr';
import { UiHelper } from '../../lib/UiHelper';
import { Fetcher } from '../../lib/Fetcher';
import { BingImagesApi, ObjectApiResponseModel } from '../../sdk';

export const ImageCollector = () => {
    const { axiosInstance, configuration, baseUrl } = new Fetcher({
        accessTokenScheme: 'Bearer',
        accessToken: 'xxx',
    });

    const [isLoadingCollectImages, setIsLoadingCollectImages] = useState(false);
    const [collectResult, setCollectResult] =
        useState<ObjectApiResponseModel>();
    const [hasError, setHasError] = useState(false);

    const { mutate } = useSWRConfig();

    const handleCollect = (startIndex: number, take: number) => {
        setIsLoadingCollectImages((_) => true);
        setHasError((_) => false);
        setCollectResult((_) => undefined);

        mutate(
            ['POST:/api/bingImages'],
            async (_: any) => {
                const api = new BingImagesApi(
                    configuration,
                    baseUrl,
                    axiosInstance,
                );
                try {
                    const response = await api.apiv10BingImagesCollectImages({
                        bingImageServiceGetRequestModel: {
                            startIndex: startIndex,
                            take: take,
                        },
                    });

                    const responseModel =
                        response.data as ObjectApiResponseModel;

                    if (responseModel) {
                        setCollectResult((_) => response.data);
                    }
                } catch (err) {
                    const data = err as ObjectApiResponseModel;
                    if (data) {
                        setCollectResult((_) => data);
                        setHasError((_) => true);
                    }
                } finally {
                    setIsLoadingCollectImages(false);
                }
            },
            false,
        );
    };

    return (
        <Content classNames={[]}>
            <Section
                title="Collector"
                useHero
                heroSize="is-small"
                heroColor="is-warning"
            />
            <Section>
                <CollectorForm
                    isLoading={isLoadingCollectImages}
                    onCollect={handleCollect}
                />
            </Section>
            <Section>
                {isLoadingCollectImages ? (
                    <Loading message="Collecting ..." />
                ) : (
                    <div
                        className={UiHelper.getClassNames(
                            ...[
                                'is-flex-grow-1',
                                'is-flex',
                                'is-flex-direction-column',
                                'is-justify-content-center',
                                'is-align-items-center',
                                hasError ? 'has-text-danger' : 'has-text-info',
                            ].filter(Boolean),
                        )}
                    >
                        {collectResult?.message}
                    </div>
                )}
            </Section>
        </Content>
    );
};

export default ImageCollector;
