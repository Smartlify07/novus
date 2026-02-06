import { LoginForm } from '@/app/features/auth/components/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-primary rounded-l-2xl relative hidden lg:flex lg:flex-col lg:gap-10 lg:p-10">
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
        <div className="flex justify-center gap-2 md:justify-start">
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
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
