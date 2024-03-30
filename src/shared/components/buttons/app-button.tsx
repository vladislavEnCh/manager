import * as React from 'react';

import { cn } from '../../utils/cn';
import Loader from '../loader';

interface IAppButtonProps {
    text: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'submit' | 'reset' | 'button';
    onClick?: () => void;
    fullWidth?: boolean;
    margin?: boolean;
    whiteBack?: boolean;
    blueBack?: boolean;
    mobileWidth?: boolean;
    el?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    refresh?: boolean;
    className?: string;
}

export const AppButton: React.FunctionComponent<IAppButtonProps> = ({
    text,
    disabled,
    loading,
    type,
    fullWidth,
    margin,
    whiteBack,
    blueBack,
    mobileWidth,
    onClick,
    el: Icon,
    className: styles
}) => {
    const isLoading = Boolean(loading);
    const isDisabled = isLoading || disabled;

    const btn = 'border border-gray-500 rounded px-4 py-2';
    const fullWidthClass = 'w-full';
    const marginClass = 'm-4';
    const whiteClass = 'bg-white text-black';
    const blueClass = 'bg-blue-500 text-white';
    const mobileFullWidth = 'md:w-full';
    const hoverClass = 'hover:bg-blue-600 hover:text-white';
    const disabledClass = 'opacity-50 cursor-not-allowed';

    const className = `${btn} ${fullWidth && fullWidthClass} ${margin && marginClass} ${whiteBack && whiteClass} ${blueBack && blueClass} ${mobileWidth && mobileFullWidth} ${!isDisabled && hoverClass} ${isDisabled ? disabledClass : ''}`;

    return (
        <button
            onClick={!isLoading ? onClick : () => null}
            type={type}
            className={cn(className, styles)}
            disabled={isDisabled}
        >
            {Icon && <Icon />}
            {isLoading ? <Loader /> : text}
        </button>
    );
};
