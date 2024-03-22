import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginPage = () => {

  return (
    <div className="h-[calc(100vh-80px-1rem)] bg-white">
      <div className="grid grid-cols-12 px-12 py-6 gap-10">
        <div className="col-span-5  ">
          <LoginForm />
          {/* <div className="border-r-5 border-s border-black"/> */}
        </div>
        <div className=" col-span-2  border-l-2 mx-auto border-solid border-black/20" />

        <div className="col-span-5 my-auto space-y-4">
          <h1 className="uppercase font-bold text-3xl">tạo một tài khoản</h1>
          <p className="text-justify">
            Hãy tạo tài khoản ngay ! Bạn có thể nhận được các dịch vụ đặc biệt
            cho riêng bạn như kiểm tra lịch sử mua hàng và nhận phiếu giảm giá
            cho thành viên. Đăng ký miễn phí ngay hôm nay!
          </p>

          <Button className="font-bold uppercase text-2xl ">
            <Link href="/signup" className="p-5">
              Tạo tài khoản
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
