"use client";

import Link from "next/link";
import { Button } from "../ui/button";

interface BackBtnProps {
  href: string;
  label: string;
}

export const BackBtn = ({ href, label }: BackBtnProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
