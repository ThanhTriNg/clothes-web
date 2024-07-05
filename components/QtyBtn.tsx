import { Button } from './ui/button';

interface QtyBtnProps {
    onIncrease: () => void;
    onDecrease: () => void;
    qty: number;
}

const QtyBtn = (props: QtyBtnProps) => {
    // console.log(cartItems);

    return (
        <div className="flex gap-2 justify-center items-center">
            <Button variant="destructive" onClick={props.onDecrease}>
                -
            </Button>
            <p>{props.qty}</p>
            <Button onClick={props.onIncrease}>+</Button>
        </div>
    );
};

export default QtyBtn;
