import { UserProps } from '@/redux/module';
import { Bell, Notification } from '@phosphor-icons/react';
import Image from 'next/image';

const iconSize = 32;

interface HeaderProps {
    userInfo: UserProps;
    className?: string;
}
const Header = ({ userInfo, className }: HeaderProps) => {
    return (
        <div className={`flex justify-between items-center ${className}`}>
            <div>
                <p>Admin Tshop</p>
                <Image src="/svg/logo.svg" className="mx-auto" alt="logo" width={50} height={50} />
            </div>

            <div className="flex gap-x-10 items-center">
                <Notification size={iconSize} />
                <Bell size={iconSize} />
                <div>
                    <p> {userInfo.fName}</p>
                    <p>Admin</p>
                </div>
            </div>
        </div>
    );
};

export default Header;
