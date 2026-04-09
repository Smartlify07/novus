import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LoanApplicantCard({
  applicant,
}: {
  applicant: { email: string; firstName: string; lastName: string };
}) {
  return (
    <Card className="self-start w-full">
      <CardHeader>
        <div className="rounded-full size-12 bg-muted  flex justify-center items-center text-base font-medium">
          {applicant.firstName.charAt(0)}
          {applicant.lastName.charAt(0)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <h1 className="text-xl tracking-tight font-medium">
            {applicant.firstName} {applicant.lastName}
          </h1>
          <h4 className="text-sm text-muted-foreground">{applicant.email}</h4>
        </div>
      </CardContent>
    </Card>
  );
}
