import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
const imgMenVar = '/img/men';

const OutStanding = () => {
    const [isTruncated, setIsTruncated] = useState<boolean>(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textRef.current) {
            setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
    }, []);

    return (
        <div className="bg-white p-3 rounded">
            <div className="text-center space-y-10">
                <h1 className="xl:text-4xl text-2xl font-bold uppercase">Featured categories</h1>
                <div className="grid grid-cols-12  xl:gap-4 gap-2 ">
                    {ListOutstanding.map((item, idx) => (
                        <Link
                            key={`outstanding-${idx}`}
                            href="/store/tops"
                            className="xl:col-span-3 sm:col-span-4 col-span-6 mx-auto space-y-2 transition-all hover:scale-105 w-full"
                        >
                            <Image
                                src={item.img}
                                // width="0"
                                // height="0"
                                // sizes="100vw"
                                // alt=""
                                // className="w-4/5 h-auto mx-auto "
                                width="300"
                                height="300"
                                alt={`img-${idx}`}
                                sizes="(max-width: 640px) 50vw, 25vw"
                            />

                            <TooltipProvider delayDuration={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <p ref={textRef} className="truncate">
                                            {item.name}
                                        </p>
                                    </TooltipTrigger>
                                    {isTruncated && <TooltipContent>{item.name}</TooltipContent>}
                                </Tooltip>
                            </TooltipProvider>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OutStanding;

const ListOutstanding = [
    {
        name: 'Outwears',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },
    {
        name: 'Sweatshirts',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },
    {
        name: 'Sweaters',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },
    {
        name: 'Fleece Turtleneck',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },

    {
        name: 'Shirts ',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },
    {
        name: 'T-shirts',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },
    {
        name: 'Pants',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },
    {
        name: 'Dresses',
        img: `${imgMenVar}/bottom/E463458-000/vngoods_06_463458.jpg`,
    },
];
