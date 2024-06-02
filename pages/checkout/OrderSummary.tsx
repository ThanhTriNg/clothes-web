interface OrderSummaryProps {
  className?: string;
}

const OrderSummary = ({ className }: OrderSummaryProps) => {
  return (
    <div className={`${className}`}>
      <div>Order Summary</div>
      
    </div>
  );
};

export default OrderSummary;
