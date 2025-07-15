"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "../../../lib/auth";
import { Button } from "../../components/ui/button";

export default function HomePage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) {
      router.push("/");
    } else {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("userName");
    router.push("/");
  };

  return (

    <div>
      <h1>Hey, {userName}! You’re successfully logged in.</h1>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
