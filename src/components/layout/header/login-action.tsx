"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginAction = () => {
  return (
    <Button aria-label="Masuk" variant="outline" onClick={() => signIn()}>
      <LogIn className="mr-2 h-4 w-4" /> Masuk
    </Button>
  );
};

export default LoginAction;
