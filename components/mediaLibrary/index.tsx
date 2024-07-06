interface MediaLibraryPageProps {
    // title: string;
    // message: string;
    // description: string;
    // colorIcon: string;
    // sizeIcon: number;
    isOpen: boolean;
    onClose: () => void;
}
import { Button } from '@/components/ui/button';
import { getMediaThunk } from '@/redux/reducer/Media';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { XCircle } from '@phosphor-icons/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MediaCloudinaryProps } from '@/redux/module';

const MediaLibrary = ({ isOpen, onClose }: MediaLibraryPageProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { mediaInfo, nextCursor } = useSelector((state: RootState) => state.media);

    useEffect(() => {
        if (isOpen) {
            setMediaList([]);
            dispatch(getMediaThunk(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleLoadMore = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        await dispatch(getMediaThunk(nextCursor));
    };
    const [mediaList, setMediaList] = useState<MediaCloudinaryProps[]>([]);

    useEffect(() => {
        if (mediaInfo && mediaInfo.length > 0) {
            // mediaInfo have 2 item for each api, i want add it into mediaList to store this
            setMediaList((prevMediaList) => [...prevMediaList, ...mediaInfo]);
        }
    }, [mediaInfo]);

    return (
        <div
            className={`p-4 bg-slate-400 h-[80vh] w-[80vw] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
        
          ${isOpen ? 'opacity-100 visible  top-1/2' : 'opacity-0 invisible top-[40%]'}`}
        >
            <XCircle size={32} color="white" className="absolute right-5 top-5 cursor-pointer" onClick={onClose} />
            <h3 className="text-white text-center text-xl font-bold">Media Library</h3>
            <div className="p-4 grid grid-cols-6 gap-4">
                {mediaList?.map((item, idx) => {
                    // console.log(item)
                    return (
                        <div key={idx} className="relative">
                            <Image
                                src={item.url}
                                width="300"
                                height="300"
                                alt={`img-${idx}`}
                                sizes="(max-width: 640px) 50vw, 25vw"
                            />

                            <div className="bg-red-600 w-4 h-4 absolute right-2 top-2" />
                        </div>
                    );
                })}
            </div>
            <div className="text-center">
                <Button onClick={handleLoadMore}>Load more</Button>
            </div>
        </div>
    );
};

export default MediaLibrary;
