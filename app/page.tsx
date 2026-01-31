import Image from "next/image";
import Navbar from "./ui/navigation/navbar";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

export default function Home() {
  return (
    <>
      <p>Your code, everywhere</p>
      <Card>
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
      </Card>
    </>
  );
}
