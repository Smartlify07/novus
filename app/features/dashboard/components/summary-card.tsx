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
  return (
    <Card className="gap-0 flex flex-row px-4 rounded-md shadow-none">
      {isLoading ? (
        <Skeleton className="size-10 rounded-full" />
      ) : (
        icon && (
          <div className="rounded-full bg-primary/5 [&>svg]:text-primary size-10 flex items-center justify-center">
            {icon}
          </div>
        )
      )}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <CardHeader className="flex items-center gap-2 text-sm text-muted-foreground">
            {isLoading ? (
              <Skeleton className="h-4 w-24" />
            ) : (
              <CardTitle className="text-muted-foreground shrink-0">
                {title}
              </CardTitle>
            )}
          </CardHeader>
          <CardContent className="">
            {isLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
                {value}
              </CardTitle>
            )}
          </CardContent>
        </div>
        <CardFooter className="rounded-none bg-transparent border-none px-4 pt-1 pb-2">
          {isLoading ? <Skeleton className="h-5 w-40" /> : children}
        </CardFooter>
      </div>
    </Card>
  );
}
