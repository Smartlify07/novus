import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SummaryCard({
  title,
  value,
  icon,
  children,
  percentageChange,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  percentageChange?: number;
}) {
  return (
    <Card className="gap-0 flex flex-row px-4 rounded-md shadow-none">
      <div className="rounded-full bg-primary/5 [&>svg]:text-primary size-10 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-1">
          <CardHeader className="flex items-center gap-2 text-sm text-muted-foreground">
            <CardTitle className="text-muted-foreground shrink-0">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
            <CardTitle className="text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </CardTitle>
          </CardContent>
        </div>
        <CardFooter className="rounded-none bg-transparent border-none px-2 pt-1 pb-2">
          {children}
        </CardFooter>
      </div>
    </Card>
  );
}
