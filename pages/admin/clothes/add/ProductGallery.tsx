import MediaLibrary from '@/components/mediaLibrary';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ProductGallery = () => {
    const [openMediaLibrary, setOpenMediaLibrary] = useState<boolean>(false);

    const handleClickMedia = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setOpenMediaLibrary(true);
    };
    const handleClosePopup = async () => {
        console.log('Close');
        setOpenMediaLibrary(false);
    };
    return (
        <div>
            <Button variant="ghost" onClick={handleClickMedia}>
                Product Gallery
            </Button>
            <MediaLibrary isOpen={openMediaLibrary} onClose={handleClosePopup} identifier="productGallery" />
        </div>
    );
};

export default ProductGallery;
