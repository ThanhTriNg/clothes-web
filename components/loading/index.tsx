import ReactLoading from 'react-loading';

interface LoadingProps {
    size?: 'small' | 'normal' | 'large';
}
const Loading = ({ size = 'normal' }: LoadingProps) => {
    let height: string;
    let width: string;
    if (size == 'normal') {
        const px = '18px';
        height = px;
        width = px;
    } else if (size === 'small') {
        const px = '12px';
        height = px;
        width = px;
    } else {
        const px = '24px';
        height = px;
        width = px;
    }

    console.log(height, width);
    return <ReactLoading type={'spin'} color="#0000ff80" height={height} width={width} className="mx-auto" />;
};

export default Loading;
