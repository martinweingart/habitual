import { LoginForm } from "@/components/auth/LoginForm";
import { PageTitle } from "@/components/PageTitle";

export default function Login() {
  return (
    <div className="h-full flex flex-col items-center justify-center py-8 px-2">
      <div className="flex flex-col gap-8  max-w-96">
        <PageTitle>Welcome back!</PageTitle>

        <div className="px-2 max-w-md">
          <LoginForm />;
        </div>
      </div>
    </div>
  );
}
