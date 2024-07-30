import MediaLibrary from '@/components/mediaLibrary';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ProductImage = () => {
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
        <div className=''>
            <Button variant="link" onClick={handleClickMedia}>
                Product Image
            </Button>
            <MediaLibrary isOpen={openMediaLibrary} onClose={handleClosePopup} identifier="productImage" />
        </div>
    );
};

export default ProductImage;
