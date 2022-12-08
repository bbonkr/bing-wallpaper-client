import React, { memo } from 'react';
import { Content } from '../Content';
import { ScrollToTop } from '../ScrollToTop';
import { AppOptions } from '../../constants';

interface FooterProps {
    onClickScrollToTop?: () => void;
}

const FooterComponent = ({ onClickScrollToTop }: FooterProps) => {
    return (
        <footer className="footer p-5">
            <Content
                classNames={[
                    'is-flex',
                    'is-flex-direction-row',
                    'is-justify-content-space-between',
                ]}
            >
                <div>
                    <span className="navbar-text ml-auto">
                        &copy; {AppOptions.Title}, All rights reserved
                    </span>
                </div>
                <div>
                    <ScrollToTop
                        containerClassName="navbar-content"
                        show
                        onClick={onClickScrollToTop}
                    />
                </div>
            </Content>
        </footer>
    );
};

export const Footer = memo(FooterComponent);
