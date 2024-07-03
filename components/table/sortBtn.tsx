import { Button } from '@/components/ui/button';
import { SortAscending, SortDescending } from '@phosphor-icons/react';
interface SortIconProps {
    isSorted: boolean;
}

interface SortBtnProps {
    column: any;
    name: string;
}
const SortBtn = ({ column, name }: SortBtnProps) => {
    const SortIcon: React.FC<SortIconProps> = ({ isSorted }) => {
        if (isSorted) {
            return <SortAscending className="ml-2 h-4 w-4" />;
        } else {
            return <SortDescending className="ml-2 h-4 w-4" />;
        }
    };

    return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            {name}
            <SortIcon isSorted={column.getIsSorted() === 'asc'} />
        </Button>
    );
};

export default SortBtn;
