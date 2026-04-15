"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginResponse } from "./api";
import { loginFormSchema, signupFormSchema } from "./schema";
import {
  SignupFormValues,
  signupOnboardingSchema,
} from "../signup-onboarding/schema";

export const signUpAction = async (initialState: any, formData: FormData) => {
  const data = Object.fromEntries(formData) as SignupFormValues;
  const parsed = signupOnboardingSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: null,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const signupResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          dateOfBirth: new Date(data.dateOfBirth as Date).toISOString(),
        }),
        signal: controller.signal,
      },
    );
    clearTimeout(timeoutId);

    const result = await signupResponse.json();

    if (!signupResponse.ok) {
      return {
        errors:
          signupResponse.status === 401
            ? "Incorrect email or password"
            : result.message,
        message:
          signupResponse.status === 401
            ? "Incorrect email or password"
            : result.message,
      };
    }
  } catch (error) {
    console.error(error);
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        errors:
          "Request timed out. Please check your connection and try again.",
        message:
          "Request timed out. Please check your connection and try again.",
      };
    }

    return {
      errors: "An unexpected error occurred. Please try again.",
      message: "An unexpected error occurred. Please try again.",
    };
  }
  return loginAction(initialState, formData, "/create-account");
};

export const loginAction = async (
  initialState: any,
  formData: FormData,
  redirectTo = "/dashboard",
) => {
  const cookieStore = await cookies();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const parsed = loginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: null,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      },
    );
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors:
          response.status === 401
            ? "Incorrect email or password"
            : errorData.message,
        message:
          response.status === 401
            ? "Incorrect email or password"
            : errorData.message,
      };
    }
    const result: LoginResponse = await response.json();
    const expiresAt = new Date(Date.now() + result.expiresIn * 1000);

    cookieStore.set({
      name: "token",
      value: result.token,
      expires: expiresAt,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    cookieStore.set({
      name: "token_expires_at",
      value: String(expiresAt.getTime()),
      expires: expiresAt,
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    cookieStore.set({
      name: "session",
      value: String(result.user.id),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  } catch (error) {
    console.error(error);
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        errors:
          "Request timed out. Please check your connection and try again.",
        message:
          "Request timed out. Please check your connection and try again.",
      };
    }
    console.log(error, "Error at auth action");
    return {
      errors: "An unexpected error occurred. Please try again.",
      message: "An unexpected error occurred. Please try again.",
    };
  }
  return redirect(redirectTo);
};

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    cookieStore.delete("token_expires_at");
    cookieStore.delete("session");
  } catch (error) {
    console.error("Logout failed:", error);
  }
  return redirect("/login");
};
