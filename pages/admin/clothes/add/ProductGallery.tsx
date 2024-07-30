import MediaLibrary from '@/components/mediaLibrary';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductGalleryProps {
    existed?: {
        url: string;
    }[];
}
const ProductGallery = ({ existed }: ProductGalleryProps) => {
    const [openMediaLibrary, setOpenMediaLibrary] = useState<boolean>(false);

    const handleClickMedia = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        setOpenMediaLibrary(true);
    };
    const handleClosePopup = async () => {
        setOpenMediaLibrary(false);
    };
    return (
        <div>
            <Button variant="link" onClick={handleClickMedia}>
                Product Gallery
            </Button>
            <MediaLibrary
                isOpen={openMediaLibrary}
                onClose={handleClosePopup}
                identifier="productGallery"
                existed={existed}
            />
        </div>
    );
};

export default ProductGallery;
