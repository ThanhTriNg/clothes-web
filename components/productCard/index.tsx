import React from "react";
import Card from "../card";

interface productCardProps {
  className?: string;
}
const imgMenVar = "/img/men";

const ProductCard = ({ className }: productCardProps) => {
  return (
    <div className={className}>
    <Card cols={4}/>
    </div>
  );
};

export default ProductCard;
