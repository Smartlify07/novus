"use server";

import { cookies } from "next/headers";
import {
  LoanApprovalPayload,
  LoanRepaymentPayload,
  LoanRepaymentsResponse,
  LoanResponse,
  PendingLoansResponse,
  SubmitLoanRepaymentResponse,
} from "../types";
import { Loan } from "@/types";

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getPendingLoanApplications =
  async (): Promise<PendingLoansResponse> => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/loans/pending`,
        {
          method: "GET",
          headers: await getAuthHeaders(),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch loans");
      }

      const data: PendingLoansResponse = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export const getLoans = async (): Promise<LoanResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/loans`, {
      method: "GET",
      headers: await getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch loans");
    }

    const data: LoanResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLoanRepayments = async (
  loanId: number,
): Promise<LoanRepaymentsResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/loans/${loanId}/repayments`,
      {
        method: "GET",
        headers: await getAuthHeaders(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch loan repayments");
    }

    const data: LoanRepaymentsResponse = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const approveLoan = async (
  loanId: number,
  payload: LoanApprovalPayload,
): Promise<Loan> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/loans/${loanId}/approve`,
      {
        method: "PUT",
        headers: await getAuthHeaders(),
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.fieldErrors) {
        const errors = Object.entries(errorData.fieldErrors);
        const errorString = errors.map(([key, value]) => `${value}`).join("");
        throw new Error(errorString);
      }
      throw new Error(errorData.message || `Failed to approve loan`);
    }

    const data = (await response.json()) as Loan;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const submitLoanRepayment = async (
  loanId: number,
  payload: LoanRepaymentPayload,
): Promise<SubmitLoanRepaymentResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/loans/${loanId}/repay`,
      {
        method: "POST",
        headers: await getAuthHeaders(),
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.fieldErrors) {
        const errors = Object.entries(errorData.fieldErrors);
        const errorString = errors.map(([key, value]) => `${value}`).join("");
        throw new Error(errorString);
      }
      throw new Error(errorData.message || "Failed to submit loan repayment");
    }

    const data = (await response.json()) as SubmitLoanRepaymentResponse;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
