import { IconProps } from '@phosphor-icons/react';

interface SummaryChartProps {
    title: string;
    value: number;
    bgColor: string;
    icon: React.ElementType<IconProps>;
    colorIcon: string;
}

const SummaryChart = ({ title, value, icon: Icon, colorIcon }: SummaryChartProps) => {
    return (
        <div className="flex items-center space-x-2 p-4 border rounded-lg shadow">
            <div className="text-base font-medium">
                <span className="block text-lg font-bold">{value}</span>
                <span className="block text-sm">{title}</span>
            </div>
            <Icon size={32} color={colorIcon} />
        </div>
    );
};
export default SummaryChart;
