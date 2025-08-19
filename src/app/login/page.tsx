import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { checkUserLogged } from "@/lib/route-guards";

const Login = () =>
  checkUserLogged(async () => {
    return (
      <div className="h-full flex flex-col items-center justify-center py-8 px-2">
        <div className="flex flex-col gap-8  max-w-96">
          <PageTitle>Welcome back!</PageTitle>

          <div className="px-2 max-w-md">
            <div className="flex flex-col gap-4 px-2 max-w-md">
              <LoginForm />

              <Link href="/register" className="text-center">
                <Button variant="link">
                  {"Don't have an account? Sign up"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  });

export default Login;
