import { getUser } from "@/app/features/auth/api";
import { AdminLoanDetails } from "@/app/features/dashboard/components/admin/admin-loan-details";
import { redirect } from "next/navigation";

export default async function LoanDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUser();
  const isAdmin = user?.roles.includes("ADMIN");
  const { id } = await params;
  if (!user) {
    redirect("/login");
  }
  return <>{isAdmin ? <AdminLoanDetails id={id} /> : <>user details</>}</>;
}
