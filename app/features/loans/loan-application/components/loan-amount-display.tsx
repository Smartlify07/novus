import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export default function LoanAmountDisplay({
  principalAmount,
}: {
  principalAmount: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm tracking-tighter uppercase">
          Principal amount{" "}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl tracking-tighter lg:text-5xl">
          {formatCurrency(principalAmount ?? 0, "NGN")}
        </h1>
      </CardContent>
    </Card>
  );
}
