import { PageDescription } from "./PageDescription";
import { PageTitle } from "./PageTitle";

type PageHeaderProps = {
  className?: string;
  title: string;
  description?: string;
};

export function PageHeader({ className = "", ...props }: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <PageTitle>{props.title}</PageTitle>
      {props.description && (
        <PageDescription>{props.description}</PageDescription>
      )}
    </div>
  );
}
