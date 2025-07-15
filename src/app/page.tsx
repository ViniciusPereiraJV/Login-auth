"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { login, register } from "../../lib/auth";


const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export default function LoginPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSwitch = () => {
      setError("")
    setIsRegistering(!isRegistering)
    setFullName("")
      setEmail("")
      setPassword("")
  }
  const handleSubmit = async (e: React.FormEvent) => {
     setError("");
    e.preventDefault();
   

    const schemas = isRegistering ? registerSchema : loginSchema
    const result = schemas.safeParse({ fullName, email, password });

    if (!result.success) {
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0];
      setError(firstError || "Invalid input");
      return;
    }
    setLoading(true);
    try {
      const user = isRegistering
        ? await register(email, password, fullName)
        : await login(email, password);

      localStorage.setItem("userName", user.displayName || "User");
      router.push("/home");
    } catch (err: any) {
      setError("Email or password is incorrect");
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <Card className="w-full max-w-sm m-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{isRegistering ? "Register" : "Login"}</CardTitle>
        <CardDescription>
          Enter your email below to {isRegistering ? "register" : "login"} to your account.
        </CardDescription>
        <div className="flex justify-center text-center items-center pt-3">{error && <p className="text-red-500 text-sm">{error}</p>}</div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {isRegistering && (
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-6 px-0">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : isRegistering ? "Register" : "Login"}
            </Button>
            
             <CardDescription>
       {isRegistering
  ? "Do you already have an account?"
  : "Don't have an account yet?"}.
        </CardDescription>
            <Button variant="link" onClick={handleSwitch} disabled={loading}>
          {isRegistering ? "Login" : "Register"}
        </Button>
            
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
