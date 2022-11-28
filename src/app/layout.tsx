import { Container } from '../components/Container';
import { Header } from '../components/Header/Header';
import { LinkModel } from '../models';

import './globals.css';
import './tailwind.css';

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
    return (
        <html lang="en">
            {/*
              <head /> will contain the components returned by the nearest parent
              head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
            */}
            <head />
            <body>
                <Header menuRoutes={menuRoutes} />
                <Container classNames={['mx-auto', 'p-2']}>
                    {children}
                </Container>
            </body>
        </html>
    );
}
