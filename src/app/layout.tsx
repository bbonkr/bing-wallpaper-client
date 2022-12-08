'use client';
import { Container } from '../components/Container';
import { Header } from '../components/Header/Header';
import { LinkModel } from '../models';
import { Footer } from '../components/Footer';

import 'bulma/css/bulma.css';
import './globals.css';

const menuRoutes: LinkModel[] = [
    {
        href: '/',
        title: 'Images',
        // Component: <ImagesContent />,
    },
    {
        href: '/collector',
        title: 'Collector',
        // Component: <ImageCollector />,
    },
    {
        href: '/logs',
        title: 'Logs',
        // Component: <LogsContent />,
    },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const handleClickScrollToTop = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    };

    return (
        <html lang="en">
            {/*
              <head /> will contain the components returned by the nearest parent
              head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
            */}
            <head />
            <body>
                <Header menuRoutes={menuRoutes} />
                <Container
                    classNames={[
                        'is-fluid',
                        'pt-6',
                        'pl-0',
                        'pr-0',
                        'm-0',
                        'is-flex',
                        'is-flex-direction-column',
                    ]}
                >
                    {children}
                </Container>
                <Footer onClickScrollToTop={handleClickScrollToTop} />
            </body>
        </html>
    );
}
