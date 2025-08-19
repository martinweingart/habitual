import { RegisterForm } from "@/components/auth/RegisterForm";
import { PageDescription } from "@/components/PageDescription";
import { PageTitle } from "@/components/PageTitle";

export default function Register() {
  return (
    <div className="h-full flex flex-col items-center justify-center py-8 px-2">
      <div className="flex flex-col gap-8  max-w-96">
        <div>
          <PageTitle>Create your account</PageTitle>
          <PageDescription>Start tracking your habits!</PageDescription>
        </div>

        <div className="px-2 max-w-md">
          <RegisterForm />;
        </div>
      </div>
    </div>
  );
}
