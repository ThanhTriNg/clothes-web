import CommonFormLoginSignin from "@/components/CommonFormLoginSignin";
import LoginForm from "@/components/LoginForm";
const data = {
  buttonText: "Tạo tài khoản",
  description:
    "Hãy tạo tài khoản ngay ! Bạn có thể nhận được các dịch vụ đặc biệt cho riêng bạn như kiểm tra lịch sử mua hàng và nhận phiếu giảm giá cho thành viên. Đăng ký miễn phí ngay hôm nay!",
  href: "/signup",
  isAccountText: "Tạo một tài khoản",
  myComponent: <LoginForm />,
};

const LoginPage = () => {
  return (
    <CommonFormLoginSignin
      buttonText={data.buttonText}
      href={data.href}
      isAccountText={data.isAccountText}
      myComponent={data.myComponent}
      description={data.description}
    />
    // <div className="min-h-[calc(100vh-80px-1rem)] bg-white">
    //   <div className="grid grid-cols-12 px-12 py-6 gap-4 md:gap-10">
    //     <div className="col-span-full md:col-span-5">
    //       <LoginForm />
    //     </div>
    //     <div className="col-span-2 border-l-2 mx-auto border-solid border-black/20" />

    //     <div className="col-span-full md:col-span-5 my-auto space-y-4">
    //       <h1 className="uppercase font-bold text-xl md:text-3xl">
    //         Tạo một tài khoản
    //       </h1>
    //       <p className="text-justify">
    //         Hãy tạo tài khoản ngay ! Bạn có thể nhận được các dịch vụ đặc biệt
    //         cho riêng bạn như kiểm tra lịch sử mua hàng và nhận phiếu giảm giá
    //         cho thành viên. Đăng ký miễn phí ngay hôm nay!
    //       </p>

    //       <Button className="font-bold uppercase text-lg lg:text-2xl flex mx-auto md:inline-flex md:mx-0">
    //         <Link href="/signup" className="px-4">
    //           Tạo tài khoản
    //         </Link>
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginPage;
