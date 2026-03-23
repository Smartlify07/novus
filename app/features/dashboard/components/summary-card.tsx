import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
      <Card className="gap-0 flex flex-row px-4 rounded-md shadow-none">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <CardHeader className="flex items-center gap-2 text-sm text-muted-foreground">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="">
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </div>
          <CardFooter className="rounded-none bg-card border-none px-4 pt-1 pb-2">
            <Skeleton className="h-5 w-40" />
          </CardFooter>
        </div>
      </Card>
    );
  }

  return (
    <Card className="gap-0 flex flex-row px-4 rounded-md shadow-none">
      {icon && (
        <div className="rounded-full bg-primary/5 [&>svg]:text-primary size-10 flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <CardHeader className="flex items-center gap-2 text-sm text-muted-foreground">
            <CardTitle className="text-muted-foreground font-normal shrink-0 tracking-tighter">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <CardTitle className="text-2xl font-normal tracking-tighter text-foreground">
              {value}
            </CardTitle>
          </CardContent>
        </div>
        <CardFooter className="rounded-none bg-card border-none px-4 pt-1 pb-2">
          {children}
        </CardFooter>
      </div>
    </Card>
  );
}
