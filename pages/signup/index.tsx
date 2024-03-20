import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const LoginPage = () => {
  return (
    <div className="h-[calc(100vh-80px-1rem)] bg-white">
      <div className="grid grid-cols-12 px-12 py-6 gap-10">
        <div className="col-span-5  ">
          <SignUpForm />
          {/* <div className="border-r-5 border-s border-black"/> */}
        </div>
        <div className=" col-span-2  border-l-2 mx-auto border-solid border-black/20" />

        <div className="col-span-5 my-auto space-y-4">
          <h1 className="uppercase font-bold text-3xl ">Đã có tài khoản?</h1>
          <p className="text-justify">
            Hãy đăng nhập ngay ! Bạn có thể nhận được các dịch vụ đặc biệt
            cho riêng bạn như kiểm tra lịch sử mua hàng và nhận phiếu giảm giá
            cho thành viên.
          </p>

          <Button className="font-bold uppercase text-2xl ">
            <Link href="/login" className="p-5">
              Đăng nhập
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
