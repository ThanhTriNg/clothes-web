interface MediaLibraryPageProps {
    isOpen: boolean;
    onClose: () => void;
    identifier: 'productGallery' | 'productImage';
    existed?: {
        url: string;
    }[];
}
import Loading from '@/components/loading';
import { MediaCloudinaryProps } from '@/redux/module';
import { getMediaThunk, getProductGallery, getProductImage, uploadImageThunk } from '@/redux/reducer/Media';
import { AppDispatch, RootState } from '@/redux/store/Store';
import { Check, XCircle } from '@phosphor-icons/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

const MediaLibrary = ({ isOpen, onClose, existed, identifier }: MediaLibraryPageProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const { mediaInfo, nextCursor, loading } = useSelector((state: RootState) => state.media);
    const [mediaList, setMediaList] = useState<MediaCloudinaryProps[]>([]);
    const [clickedItems, setClickedItems] = useState<MediaCloudinaryProps[] | null>(null);
    const [clickedItem, setClickedItem] = useState<MediaCloudinaryProps | null>(null);
    const [isPushExistedToMediaItem, setIsPushExistedToMediaItem] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            setMediaList([]);
            dispatch(getMediaThunk(null));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        if (mediaInfo && mediaInfo.length > 0) {
            // mediaInfo have 2 item for each api, i want add it into mediaList to store this
            setMediaList((prevMediaList) => [...prevMediaList, ...mediaInfo]);
        }
    }, [mediaInfo]);

    useEffect(() => {
        if (isOpen) {
            if (identifier === 'productImage' && clickedItem) {
                dispatch(getProductImage(clickedItem));
            } else if (identifier === 'productGallery' && clickedItems) {
                dispatch(getProductGallery(clickedItems));
            }
        }
    }, [clickedItem, clickedItems, dispatch, identifier, isOpen]);

    useEffect(() => {
        if (existed && mediaList.length > 0 && !isPushExistedToMediaItem) {
            setIsPushExistedToMediaItem(true);
            existed.forEach((existedItem) => {
                const mediaItem = mediaList.find((item) => item.url === existedItem.url);
                if (clickedItems) {
                    if (mediaItem && !clickedItems.some((item) => item.url === mediaItem.url)) {
                        setClickedItems((prevItems) => {
                            return [...(prevItems || []), mediaItem];
                        });
                    }
                } else {
                    if (mediaItem) {
                        setClickedItems((prevItems) => {
                            return [...(prevItems || []), mediaItem];
                        });
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [existed, mediaList]);

    const handleClickMultiImg = (item: MediaCloudinaryProps) => {
        setClickedItems((prevItems) => {
            if (prevItems?.some((clickedItem) => clickedItem.public_id === item.public_id)) {
                return prevItems?.filter((clickedItem) => clickedItem.public_id !== item.public_id);
            } else {
                return [...(prevItems || []), item];
            }
        });
    };

    const handleClickSingleImg = (item: MediaCloudinaryProps) => {
        setClickedItem(item);
    };

    const onDrop = useCallback(
        (acceptedFiles: any) => {
            dispatch(uploadImageThunk(acceptedFiles));
        },
        [dispatch],
    );
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, noClick: true });
    // const isClickedProductImageFn = (item: MediaCloudinaryProps) =>
    //     clickedItems?.some((clickedItem) => clickedItem.public_id === item.public_id);

    // const isClickedProductGalleryFn = (item: MediaCloudinaryProps) =>
    //     clickedItems?.some((clickedItem) => clickedItem.public_id === item.public_id);
    // let isClicked;

    // useEffect(() => {
    //     if (identifier === 'productImage') {
    //         isClicked = isClickedProductImageFn;
    //     } else if (identifier === 'productGallery') {
    //         isClicked = isClickedProductGalleryFn;
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [identifier]);

    // const isClickedFn = useMemo(() => {
    //     return (item: MediaCloudinaryProps) =>
    //         clickedItems?.some((clickedItem) => clickedItem.public_id === item.public_id);
    // }, [clickedItems]);

    const isClickedFn = (item: MediaCloudinaryProps) => {
        if (identifier === 'productImage') {
            return clickedItem?.public_id === item.public_id;
        } else {
            return clickedItems?.some((clickedItem) => clickedItem.public_id === item.public_id);
        }
    };
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    const handleOnClose = () => {
        onClose();
    };

    return (
        <div
            className={`p-4 bg-slate-400 h-[80vh] w-[80vw] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
                    ${isOpen ? 'opacity-100 visible  top-1/2' : 'opacity-0 invisible top-[40%]'}`}
        >
            <XCircle
                size={32}
                color="white"
                className="absolute right-5 top-5 cursor-pointer z-50"
                onClick={handleOnClose}
            />
            <div className="absolute w-full h-full top-0 left-0" {...getRootProps()}>
                <input {...getInputProps()} className="" />
                {isDragActive ? (
                    <p className="h-full flex justify-center items-center">Drop the files here ...</p>
                ) : (
                    <div className="h-full">
                        <h3 className="text-white text-center text-xl font-bold h-16 flex items-center justify-center">
                            Media Library
                        </h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-full">
                                <Loading />
                            </div>
                        ) : (
                            <div className="h-[calc(100%-64px)] overflow-y-scroll">
                                <div className="p-4 grid grid-cols-6 xl:grid-cols-8 gap-2 ">
                                    {mediaList?.map((item, idx) => {
                                        return (
                                            <div
                                                key={idx}
                                                className={`relative flex justify-center ${
                                                    isClickedFn(item) ? 'border-primary p-1 border-solid border-2' : ''
                                                }`}
                                                onClick={
                                                    identifier === 'productGallery'
                                                        ? () => handleClickMultiImg(item)
                                                        : () => handleClickSingleImg(item)
                                                }
                                            >
                                                <Image
                                                    src={item.url}
                                                    alt={`img-${idx}`}
                                                    width="0"
                                                    height="0"
                                                    sizes="100vw"
                                                    className="w-40 h-40 "
                                                />
                                                <div className="bg-slate-600 w-4 h-4 absolute right-2 top-2 flex justify-center items-center">
                                                    {isClickedFn(item) && (
                                                        <Check size={18} className="text-center" color="white" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        {/* <div className="text-center">
                            <Button onClick={handleLoadMore}>Load more</Button>
                        </div> */}
                    </div>
                )}
            </div>

            {/* <div {...getRootProps()}>
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div> */}
        </div>
    );
};

export default MediaLibrary;
