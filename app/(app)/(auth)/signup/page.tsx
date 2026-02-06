'use client';
import {
  OnboardingStep,
  SignupForm,
} from '@/app/features/auth/components/signup-form';
import { signupOnboardingSchema } from '@/app/features/signup-onboarding/schema';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const form = useForm<z.input<typeof signupOnboardingSchema>>({
    resolver: zodResolver(signupOnboardingSchema),
    defaultValues: {
      phone: '',
      firstName: '',
      otp: '',
      passcode: '',
      confirmPasscode: '',
    },
  });

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-primary rounded-r-2xl relative hidden lg:flex lg:flex-col lg:gap-10 lg:p-10">
        <div className="flex justify-center gap-2 md:justify-start h-12"></div>
        <div className="flex-1">
          <div>
            <h1 className="text-primary-foreground text-start text-4xl font-semibold mb-2">
              Banking, built for what’s next.
            </h1>
            <p className="text-primary-foreground">
              Total control, zero effort.
            </p>
          </div>

          <Image
            src={'https://placehold.co/600x400?text=Demo image'}
            width={600}
            height={400}
            alt="placeholder-image"
            className="mt-10 rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-between">
          <a href="/" className="flex items-center gap-2 font-bold">
            <svg
              fill="none"
              height="48"
              viewBox="0 0 40 48"
              width="40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="m20 44c11.0457 0 20-8.9543 20-20s-8.9543-20-20-20c-11.04572 0-20 8.9543-20 20s8.95428 20 20 20zm6.2393-30.6832c.3037-1.0787-.7432-1.7167-1.6993-1.0355l-13.3469 9.5083c-1.0369.7387-.8738 2.2104.245 2.2104h3.5146v-.0272h6.8498l-5.5813 1.9693-2.4605 8.7411c-.3037 1.0788.7431 1.7167 1.6993 1.0355l13.3469-9.5082c1.0369-.7387.8737-2.2105-.245-2.2105h-5.3298z"
                fill="var(--primary)"
                fillRule="evenodd"
              />
            </svg>{' '}
            Novus
          </a>
          <Button
            variant={'link'}
            className="text-muted-foreground flex items-center gap-1 text-sm p-0 hover:no-underline cursor-pointer"
            type="button"
            onClick={() => {
              setCurrentStep((prev) =>
                prev > 1 ? ((prev - 1) as OnboardingStep) : prev,
              );
            }}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
            Back
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <SignupForm
              form={form}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
