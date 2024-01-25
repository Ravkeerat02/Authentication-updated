"use client";

// import packages
import { useRouter } from "next/navigation";

interface LoginBtnProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild: boolean;
}

export const LoginBtn = ({
  children,
  mode = "redirect",
  asChild,
}: LoginBtnProps) => {
  const router = useRouter();

  // login route
  const onClick = () => {
    router.push("/auth/login");
  };
  if (mode == "modal") {
    return <span>Todo Implemenrt Modal</span>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
