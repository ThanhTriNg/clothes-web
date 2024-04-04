import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CommonFormLoginSigninProps {
  isAccountText: string;
  description: string;
  buttonText: string;
  myComponent: React.ReactElement;
  href: string;
}
const CommonFormLoginSignin = (props: CommonFormLoginSigninProps) => {
  return (
    <div className="min-h-[calc(100vh-80px-1rem)] bg-white">
      <div className="grid grid-cols-12 px-12 py-6 gap-4 md:gap-10">
        <div className="col-span-full md:col-span-5">
          {props.myComponent}
          {/* <div className="border-r-5 border-s border-black"/> */}
        </div>
        <div className=" col-span-2 border-l-2 mx-auto border-solid border-black/20" />

        <div className="col-span-full md:col-span-5 my-auto space-y-4">
          <h1 className="uppercase font-bold text-xl md:text-3xl">
            {props.isAccountText}
          </h1>
          <p className="text-justify">{props.description}</p>

          <Button className="font-bold uppercase text-lg lg:text-2xl flex mx-auto md:inline-flex md:mx-0">
            <Link href={props.href} className="px-4">
              {props.buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommonFormLoginSignin;
