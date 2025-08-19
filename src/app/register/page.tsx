import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Button } from "@/components/ui/button";
import { checkUserLogged } from "@/lib/route-guards";
import { PageHeader } from "@/components/PageHeader";

const Register = () =>
  checkUserLogged(async () => {
    return (
      <div className="h-full flex flex-col items-center justify-center py-8 px-2">
        <div className="flex flex-col gap-8  max-w-96">
          <PageHeader
            title="Create your account"
            description="Start tracking your habits!"
          />

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
