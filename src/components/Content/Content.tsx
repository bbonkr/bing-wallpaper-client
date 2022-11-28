import React, { PropsWithChildren } from 'react';
import { UiHelper } from '../../lib/UiHelper';
// import { SizeStyles, OrderedListAlternatives } from '../../models';

interface ContentProps {
    size?: string; // SizeStyles;
    orderedListalternative?: string; //OrderedListAlternatives;
    classNames?: string[];
}

export const Content = ({
    size,
    orderedListalternative,
    classNames,
    children,
}: PropsWithChildren<ContentProps>) => {
    return (
        <div
            className={`content ${size ?? ''} ${
                orderedListalternative ?? ''
            } ${UiHelper.getClassNames(...(classNames ?? []))}`}
        >
            {children}
        </div>
    );
};
