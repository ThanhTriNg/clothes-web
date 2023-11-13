import React from "react";
import { useRouter } from "next/router";

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      DetailPage
      <div>Dynamic Route with ID: {id}</div>;
    </div>
  );
};

export default DetailPage;
