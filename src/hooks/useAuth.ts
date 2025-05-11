"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Role, User } from "../generated/prisma";

type AuthPayload = {
  fullname: string;
  email: string;
  password: string;
  phone?: string;
  role?: Role;
};

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const user = useMemo(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedUser = window.localStorage.getItem("auth_user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null; // Retourne null si on est côté serveur
  }, []);

  const register = async (data: AuthPayload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok) throw new Error(result.error || "Erreur inconnue");

      router.push(`/m2/connexion`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      const user = result.user;

      const userRole = user.role.toLowerCase();
      console.log(userRole);

      if (!res.ok) throw new Error(result.error || "Erreur inconnue");

      localStorage.setItem("auth_user", JSON.stringify(result.user));
      router.push(`/m2/dashboard/${userRole}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      localStorage.removeItem("auth_user");
      router.push(`/m2/connexion`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const isAuthenticated = () => {
    return user !== null;
  };

  const isParent = () => {
    return user && user.role === Role.PARENT;
  };

  const isTeacher = () => {
    return user && user.role === Role.ENSEIGNANT;
  };

  return {
    register,
    login,
    logout,
    user,
    isAuthenticated,
    isParent,
    isTeacher,
    loading,
    error,
  };
}
