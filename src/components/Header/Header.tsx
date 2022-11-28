'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LinkModel } from '../../models';
import { GenericLink } from '../GenericLink';
import { AppOptions } from '../../constants';
import { FaGithub } from 'react-icons/fa';
import iconImage from '../../../public/bbon-icon-48.png';
import Link from 'next/link';

// import '../../app/globals.css';
// import '../../app/tailwind.css';
import './style.css';

interface HeaderProps {
    menuRoutes: LinkModel[];
}

export const Header = ({ menuRoutes }: HeaderProps) => {
    const [navbarMenuIsActive, setNavbarMenuIsActive] = useState(false);
    const handleClickMenu = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setNavbarMenuIsActive((prevState) => false);
    };

    const handleToggleMenu = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        event.preventDefault();
        setNavbarMenuIsActive((prevState) => !prevState);
    };

    const handleClickOuter = () => {
        setNavbarMenuIsActive((_) => false);
    };

    const handleWindowResize = () => {
        const headerNavElement =
            document.querySelector<HTMLDivElement>('#header-nav');
        if (headerNavElement) {
            const styles = window.getComputedStyle(headerNavElement);
            const displayValue = styles.getPropertyValue('display');

            if (displayValue === 'flex') {
                setNavbarMenuIsActive((_) => false);
            }
        }
    };

    useEffect(() => {
        // let observer: MutationObserver;

        // const headerNavElement = document.querySelector<HTMLDivElement>('#header-nav');
        // if (headerNavElement) {
        //     const config: MutationObserverInit = {
        //         attributes: true,
        //         childList: true,
        //         characterData: true,
        //     };
        //     const callback = (mutations: MutationRecord[], observer: MutationObserver) => {
        //         console.info(observer);
        //         for (const mutation of mutations) {
        //             if (mutation.type === 'childList') {
        //                 console.info('observer childList');
        //             }
        //             if (mutation.type === 'attributes') {
        //                 console.info('observer attributeName', mutation.attributeName);
        //             }
        //         }
        //     };
        //     observer = new MutationObserver(callback);
        //     observer.observe(headerNavElement, config);
        // }
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleWindowResize);
            handleWindowResize();
        }
        return () => {
            // if (observer) {
            //     observer.disconnect();
            // }
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleWindowResize);
            }
        };
    }, []);

    return (
        <>
            {navbarMenuIsActive && (
                <div
                    className={'dark-background'}
                    onClick={handleClickOuter}
                ></div>
            )}

            <nav className=" bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link href="/" className="flex items-center">
                        <React.Fragment>
                            <Image
                                className="h-6 mr-3 sm:h-9"
                                src={iconImage}
                                height={28}
                                alt="Bing Today Images App Logo"
                            />

                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                {AppOptions.Title}
                            </span>
                        </React.Fragment>
                    </Link>

                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                    <div
                        className="hidden w-full md:block md:w-auto"
                        id="navbar-default"
                    >
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {menuRoutes.map((menu) => {
                                return (
                                    <li key={menu.href}>
                                        <GenericLink
                                            classNames={[
                                                'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white',
                                            ]}
                                            record={{
                                                href: menu.href,
                                                title: menu.title,
                                            }}
                                            key={menu.href}
                                            onClick={handleClickMenu}
                                        />
                                    </li>
                                );
                            })}
                            <li>
                                <a
                                    className="button"
                                    href="https://github.com/bbonkr/bing-wallpaper"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title="Navigate to github bing-wallpaper page"
                                >
                                    <FaGithub />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* <nav
                className="navbar fixed top-0 has-dropdown"
                id="header-nav"
                role="navigation"
                aria-label="main navigation"
                style={{ zIndex: 1001 }}
            >
                <div className="navbar-brand">
                    <GenericLink
                        record={{ href: '/', title: '' }}
                        classNames={['navbar-item']}
                        onClick={handleClickMenu}
                    >
                        <Image
                            src={iconImage}
                            height={28}
                            alt="Bing Today Images App Logo"
                        />
                        <span className="ml-3">{AppOptions.Title}</span>
                    </GenericLink>
                    <a
                        role="button"
                        className={`navbar-burger ${
                            navbarMenuIsActive ? 'is-active' : ''
                        }`}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarMainHeader"
                        onClick={handleToggleMenu}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div
                    id="navbarMainHeader"
                    className={`navbar-menu ${
                        navbarMenuIsActive ? 'is-active' : ''
                    }`}
                    onBlurCapture={() => setNavbarMenuIsActive((_) => false)}
                >
                    <div className="navbar-start">
                        {menuRoutes.map((menu) => {
                            return (
                                <GenericLink
                                    classNames={['navbar-item']}
                                    record={{
                                        href: menu.href,
                                        title: menu.title,
                                    }}
                                    key={menu.href}
                                    onClick={handleClickMenu}
                                />
                            );
                        })}
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a
                                    className="button"
                                    href="https://github.com/bbonkr/bing-wallpaper"
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    title="Navigate to github bing-wallpaper page"
                                >
                                    <FaGithub />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav> */}
        </>
    );
};
