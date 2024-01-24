import { Header } from "./header";
import { BackBtn } from "./BackBtn";
import { Card, CardFooter, CardHeader } from "../ui/card";

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Something went worng "></Header>
      </CardHeader>
      <CardFooter>
        <BackBtn label="Back to login" href="/auth/login"></BackBtn>
      </CardFooter>
    </Card>
  );
};
