// import { IconProps, XCircle } from '@phosphor-icons/react';
// import { useState } from 'react';

// interface PopUpProps {
//     icon: React.ElementType<IconProps>;
//     title: string;
//     message: string;
//     description: string;
//     colorIcon: string;
//     sizeIcon: number;
// }
// const PopUp = ({ icon: Icon, colorIcon, sizeIcon, title, message, description }: PopUpProps) => {
//     const [isOpen, setIsOpen] = useState<boolean>(true);

//     const handleClickClose = () => {
//         setIsOpen(false);
//     };

//     return (
//         isOpen && (
//             <div className="py-4 rounded-lg fixed left-0 translate-x-1/2 top-1/4 -translate-y-1/2 bg-primary w-1/2  text-white text-center space-y-2 ">
//                 <XCircle
//                     size={32}
//                     color="white"
//                     className="absolute right-5 cursor-pointer"
//                     onClick={handleClickClose}
//                 />
//                 <div className="h-12 w-12 rounded-full bg-white mx-auto flex justify-center items-center">
//                     <Icon size={sizeIcon} color={colorIcon} />
//                 </div>

//                 <div className="uppercase text-base">{title}</div>
//                 <div className="uppercase font-bold text-lg">{message}</div>
//                 <div className="text-sm"> {description}</div>
//             </div>
//         )
//     );
// };

// export default PopUp;

import { IconProps, XCircle } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

interface PopUpProps {
    icon: React.ElementType<IconProps>;
    title: string;
    message: string;
    description: string;
    colorIcon: string;
    sizeIcon: number;
    isOpen: boolean;
    onClose: () => void;
}

const PopUp = ({ icon: Icon, colorIcon, sizeIcon, title, message, description, isOpen, onClose }: PopUpProps) => {
    return (
        <div
            className={`p-6 fixed left-1/2 duration-500 transform -translate-x-1/2  -translate-y-1/2 bg-primary w-1/2 text-white text-center space-y-2 rounded-lg ${
                isOpen ? 'opacity-100 visible  top-1/2' : 'opacity-0 invisible top-[40%]'
            }`}
        >
            <XCircle size={32} color="white" className="absolute right-5 top-5 cursor-pointer" onClick={onClose} />
            <div className="h-12 w-12 rounded-full bg-white mx-auto flex justify-center items-center">
                <Icon size={sizeIcon} color={colorIcon} />
            </div>
            <div className="uppercase text-base">{title}</div>
            <div className="font-bold">{message}</div>
            <div className="text-sm">{description}</div>
        </div>
    );
};

export default PopUp;
