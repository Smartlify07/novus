import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { DialogTrigger } from '@/components/ui/dialog';

export function DecisionCard({
  approve,
  reject,
}: {
  approve: () => void;
  reject: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <h4 className="text-sm uppercase text-muted-foreground">Decision</h4>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-sm">
          Approving notifies the applicant. Disbursement is handled separately.
          Rejection cannot be undone.
        </CardDescription>
      </CardContent>

      <CardFooter className="bg-card">
        <div className="flex items-center gap-4 w-full">
          <DialogTrigger className="w-full flex-1">
            <Button className="flex-1 w-full" onClick={() => approve()}>
              Approve
            </Button>
          </DialogTrigger>
          <DialogTrigger className="w-full flex-1">
            <Button
              className="flex-1 w-full"
              onClick={() => reject()}
              variant={'destructive'}
            >
              Reject
            </Button>
          </DialogTrigger>
        </div>
      </CardFooter>
    </Card>
  );
}
