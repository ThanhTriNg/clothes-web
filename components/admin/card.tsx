import { IconProps } from '@phosphor-icons/react';
interface CardAdminProps {
    icon: React.ElementType<IconProps>;
    bgColor: string;
    number: number;
    desc: string;
}

const CardAdmin = ({ icon: Icon, bgColor, number, desc }: CardAdminProps) => {
    return (
        <div
            style={{ backgroundColor: bgColor }}
            className="relative grid items-center justify-center text-center p-5  text-white"
        >
            <Icon size={28} className="absolute top-4 left-2" />
            <p className="font-bold text-2xl">{number} </p>
            <p>{desc} </p>
        </div>
    );
};

export default CardAdmin;
