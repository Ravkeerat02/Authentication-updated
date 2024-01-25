"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { Social } from "./Social";
import { BackBtn } from "./BackBtn";

// setting the values(props) for the card
interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backBtnLabel,
  backBtnHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}></Header>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* 3rd party lgin  */}
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackBtn label={backBtnLabel} href={backBtnHref} />
      </CardFooter>
    </Card>
  );
};
