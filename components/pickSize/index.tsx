import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PickSize = ({ sizes }: { sizes: string[] }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<number>(-1);
  const { sizeCode } = router.query;

  useEffect(() => {
    if (typeof sizeCode === "string") {
      const index = sizes.indexOf(sizeCode);
      setIsActive(index);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handle choose size
  const handleClick = (idx: number, size: string) => {
    setIsActive(idx);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sizeCode: size },
    });
  };
  return (
    <div className="space-y-2">
      <h1 className="uppercase font-semibold">Size: {sizes[isActive]} </h1>
      <div className="flex gap-x-2">
        {sizes.map((item: string, idx: number) => {
          return (
            <div
              key={`size-${item}`}
              className={`cursor-pointer border-solid border border-black/10  w-11 h-11 grid justify-center items-center transition-all${
                isActive === idx ? "scale-110 bg-primary " : ""
              }`}
              onClick={() => handleClick(idx, sizes[idx])}
            >
              <h1 className="select-none">{item}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PickSize;
