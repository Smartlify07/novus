import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SummaryCard({
  title,
  value,
  icon,
  children,
  isLoading = false,
}: {
  title: string;
  value: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
}) {
  if (isLoading) {
    return (
      <Card className="flex flex-row gap-0 rounded-md px-4 shadow-none">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <CardHeader className="text-muted-foreground flex items-center gap-2 text-sm">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="">
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </div>
          <CardFooter className="bg-card rounded-none border-none px-4 pt-1 pb-2">
            <Skeleton className="h-5 w-40" />
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-row gap-0 rounded-md px-4 shadow-none">
      {icon && (
        <div className="bg-primary/5 [&>svg]:text-primary flex size-10 items-center justify-center rounded-full">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <CardHeader className="text-muted-foreground flex items-center gap-2 px-0 text-sm">
            <CardTitle className="text-muted-foreground shrink-0 text-sm font-normal tracking-tight">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <CardTitle className="text-foreground text-xl font-normal tracking-tighter lg:text-2xl">
              {value}
            </CardTitle>
          </CardContent>
        </div>
        <CardFooter className="bg-card rounded-none border-none px-0 pt-1 pb-4">
          {children}
        </CardFooter>
      </div>
    </Card>
  );
}
