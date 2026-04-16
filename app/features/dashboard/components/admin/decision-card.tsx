import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";

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
        <h4 className="text-muted-foreground text-sm uppercase">Decision</h4>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground text-sm">
          Approving notifies the applicant. Disbursement is handled separately.
          Rejection cannot be undone.
        </CardDescription>
      </CardContent>

      <CardFooter className="bg-card">
        <div className="flex w-full items-center gap-4">
          <DialogTrigger asChild className="w-full flex-1">
            <Button className="w-full flex-1" onClick={() => approve()}>
              Approve
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild className="w-full flex-1">
            <Button
              className="w-full flex-1"
              onClick={() => reject()}
              variant={"destructive"}
            >
              Reject
            </Button>
          </DialogTrigger>
        </div>
      </CardFooter>
    </Card>
  );
}
