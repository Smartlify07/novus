"use client";

import { logoutAction } from "@/app/features/auth/actions";
import { useUser } from "@/app/features/auth/hooks/useUser";
import { useCallback, useEffect, useRef } from "react";

const TIMEOUT_DURATION = 20_000;
const LAST_ACTIVITY_KEY = "session-timeout:last-activity";
const LOGOUT_EVENT_KEY = "session-timeout:logout";
const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = [
  "pointerdown",
  "keydown",
  "scroll",
];

export function SessionTimeout({ children }: { children: React.ReactNode }) {
  const { data: user, isPending } = useUser();
  const isAuthenticated = !!user;
  const timerRef = useRef<number | null>(null);
  const isLoggingOutRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const redirectToLogin = useCallback(() => {
    console.log("Redirect to login...");
    window.location.replace("/login");
  }, []);

  const logoutCurrentTab = useCallback(async () => {
    if (isLoggingOutRef.current) {
      return;
    }

    isLoggingOutRef.current = true;
    clearTimer();
    localStorage.removeItem(LAST_ACTIVITY_KEY);
    localStorage.setItem(LOGOUT_EVENT_KEY, Date.now().toString());
    try {
      await logoutAction();
    } catch (error) {
      console.error(error);
    }
  }, [clearTimer]);

  const syncTimer = useCallback(() => {
    if (isLoggingOutRef.current) {
      return;
    }

    clearTimer();

    const storedTimestamp = localStorage.getItem(LAST_ACTIVITY_KEY);
    const lastActivity = storedTimestamp ? Number(storedTimestamp) : Date.now();

    if (!storedTimestamp) {
      localStorage.setItem(LAST_ACTIVITY_KEY, lastActivity.toString());
    }

    const timeRemaining = TIMEOUT_DURATION - (Date.now() - lastActivity);

    if (timeRemaining <= 0) {
      void logoutCurrentTab();
      return;
    }

    timerRef.current = window.setTimeout(() => {
      void logoutCurrentTab();
    }, timeRemaining);
  }, [clearTimer, logoutCurrentTab]);

  const resetTimer = useCallback(() => {
    if (isLoggingOutRef.current) {
      return;
    }

    localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
    syncTimer();
  }, [syncTimer]);

  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === LAST_ACTIVITY_KEY && event.newValue) {
        syncTimer();
      }

      if (event.key === LOGOUT_EVENT_KEY && event.newValue) {
        clearTimer();
        isLoggingOutRef.current = true;
        console.log("Logged out from another tab, redirecting to login...");
        logoutAction();
      }
    },
    [clearTimer, redirectToLogin, syncTimer],
  );

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      syncTimer();
    }
  }, [syncTimer]);

  useEffect(() => {
    if (isPending || !isAuthenticated) {
      return;
    }

    isLoggingOutRef.current = false;
    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", syncTimer);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resetTimer();

    return () => {
      clearTimer();
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", syncTimer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    clearTimer,
    handleStorageChange,
    handleVisibilityChange,
    isAuthenticated,
    isPending,
    resetTimer,
    syncTimer,
  ]);

  return <>{children}</>;
}
