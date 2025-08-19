import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { PageDescription } from "@/components/PageDescription";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { checkUserLogged } from "@/lib/route-guards";

const Register = () =>
  checkUserLogged(async () => {
    return (
      <div className="h-full flex flex-col items-center justify-center py-8 px-2">
        <div className="flex flex-col gap-8  max-w-96">
          <div>
            <PageTitle>Create your account</PageTitle>
            <PageDescription>Start tracking your habits!</PageDescription>
          </div>

          <div className="flex flex-col gap-4 px-2 max-w-md">
            <RegisterForm />

            <Link href="/login" className="text-center">
              <Button variant="link">Already have an account? Log in</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  });

export default Register;
