"use client";
import Header from "@/app/features/loans/loan-application/components/header";
import LoanAmountStep from "@/app/features/loans/loan-application/components/loan-amount-step";
import LoanTypeStep from "@/app/features/loans/loan-application/components/loan-type-step";
import RepaymentPeriodStep from "@/app/features/loans/loan-application/components/repayment-period-step";
import PurposeStep from "@/app/features/loans/loan-application/components/purpose-step";
import ReviewStep from "@/app/features/loans/loan-application/components/review-step";
import ApplicationSuccess from "@/app/features/loans/loan-application/components/application-success";
import ApplicationSummary from "@/app/features/loans/loan-application/components/application-summary";
import Stepper, {
  Connector,
  StepContent,
  StepGroup,
  StepLabel,
  StepTrigger,
  useStepper,
} from "@/app/features/loans/loan-application/components/stepper";
import { cn } from "@/lib/utils";
import { Check } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLoanApplicationWorkflowStore } from "@/store/loan-application-workflow-store";

const steps = [
  {
    id: 1,
    label: "Type",
    value: "type",
  },
  { id: 2, label: "Amount", value: "amount" },
  { id: 3, label: "Term", value: "term" },
  { id: 4, label: "Purpose", value: "purpose" },
  {
    id: 5,
    label: "Review",
    value: "review",
  },
];

function StepperNav() {
  const { step } = useStepper();
  const currentStepId = step?.id ?? 1;
  return (
    <div className="grid max-w-xl grid-cols-5 items-center gap-2 lg:flex">
      {steps.map((item, index) => (
        <StepGroup key={item.id} className="flex flex-row items-center gap-1">
          <div className="flex flex-col items-center gap-1">
            <StepTrigger stepId={item.id} value={item.value}>
              {item.id === currentStepId && index + 1}
              {item.id < currentStepId && <HugeiconsIcon icon={Check} />}
              {item.id > currentStepId && index + 1}
            </StepTrigger>
            <StepLabel
              className={cn(item.id === currentStepId && "text-primary")}
            >
              {item.label}
            </StepLabel>
          </div>
          {index !== steps.length - 1 && (
            <Connector
              className="min-w-6 lg:min-w-20 lg:flex-1"
              stepId={item.id}
            />
          )}
        </StepGroup>
      ))}
    </div>
  );
}

export default function LoanApplicationPage() {
  const isSubmitted = useLoanApplicationWorkflowStore(
    (state) => state.isSubmitted,
  );
  const setIsSubmitted = useLoanApplicationWorkflowStore(
    (state) => state.setIsSubmitted,
  );

  if (isSubmitted) {
    return <ApplicationSuccess />;
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-10 lg:flex-row lg:gap-10">
      <div className="flex flex-1 flex-col gap-10">
        <Header />
        <Stepper
          className="flex flex-col gap-10 lg:max-w-xl"
          defaultValue={steps[0]}
        >
          <StepperNav />
          <StepContent stepId={1} value="type">
            <LoanTypeStep />
          </StepContent>
          <StepContent stepId={2} value="amount">
            <LoanAmountStep />
          </StepContent>
          <StepContent stepId={3} value="term">
            <RepaymentPeriodStep />
          </StepContent>
          <StepContent stepId={4} value="purpose">
            <PurposeStep />
          </StepContent>
          <StepContent stepId={5} value="review">
            <ReviewStep onSubmitSuccess={() => setIsSubmitted(true)} />
          </StepContent>
        </Stepper>
      </div>
      <div className="shrink-0 lg:w-80">
        <div className="lg:sticky lg:top-6 lg:mt-34">
          <ApplicationSummary />
        </div>
      </div>
    </div>
  );
}
