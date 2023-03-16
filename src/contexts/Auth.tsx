"use client"
import React, { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/router";

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";

type IProps = {
  children: React.ReactNode;
}

type SignInData = {
  email: string;
  password: string;
};

type User = {
  name?: string;
  email?: string;
  avatar_url?: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user?: User;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  signIn: () => Promise.resolve(),
});

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      const { token, user } = await signInRequest({ email, password });

      setCookie(undefined, "next13-auth.token", token, {
        maxAge: 60 * 60 * 24, // 24 hour
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setUser(user);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
