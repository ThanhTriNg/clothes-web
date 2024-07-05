import React, { useState, useEffect } from 'react';

import { AppDispatch, RootState } from '@/redux/store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { getColorNameThunk } from '@/redux/reducer/Clothes';
import { useRouter } from 'next/router';
interface PickColorProps {
    colors: string[];
    size?: number;
    spaceBetween?: number;
    showName?: boolean;
}

const PickColor = ({ colors, size = 20, spaceBetween = 4, showName = false }: PickColorProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { colorCode } = router.query;

    const [isActive, setIsActive] = useState<number>(-1);
    const [colorName, setColorName] = useState<string>();
    const { colorAPI } = useSelector((state: RootState) => state.clothes);

    useEffect(() => {
        if (typeof colorCode === 'string') {
            const color = '#' + colorCode;
            const index = colors.indexOf(color);
            setIsActive(index);
        }
    }, [colorCode, colors]);

    useEffect(() => {
        if (isActive != -1) {
            const color = removeHashFromColorCode(colors[isActive]);
            if (color) {
                //ex:
                //true: color == 000
                //false: color == #000
                dispatch(getColorNameThunk({ hex: color }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, isActive]);

    useEffect(() => {
        if (colorAPI && showName) {
            console.log(colorAPI);
            setColorName(colorAPI?.name?.value);
        }
    }, [colorAPI, showName]);

    const handleClick = (idx: number, color: string) => {
        const removeHash = removeHashFromColorCode(color);
        setIsActive(idx);
        if (router.asPath.startsWith('/store')) {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, colorCode: removeHash },
            });
        }
    };

    const sizeText = `${size}px`;
    const spaceBetweenText = `${spaceBetween}px`;
    return (
        <div className="space-y-2">
            {showName ? <h1 className="uppercase font-semibold">Color: {colorName} </h1> : ''}
            <div
                className="flex items-center "
                style={{
                    gap: spaceBetweenText,
                }}
            >
                {colors.map((color: string, idx: number) => {
                    return (
                        <div
                            onClick={() => handleClick(idx, color)}
                            key={`pick-color-${idx}`}
                            style={{
                                backgroundColor: color,
                                height: sizeText,
                                width: sizeText,
                            }}
                            className={`cursor-pointer transition-all ${
                                showName && isActive === idx ? `scale-110 border border-solid` : ``
                            }  `}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PickColor;

const removeHashFromColorCode = (colorCode: string): string => {
    // Check if the color code starts with '#'
    if (colorCode.startsWith('#')) {
        // Return the color code without the first character (i.e., '#')
        return colorCode.substring(1);
    }

    // If the color code doesn't start with '#', return it as is
    return colorCode;
};
