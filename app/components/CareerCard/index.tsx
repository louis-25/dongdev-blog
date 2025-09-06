import { Card, CardDescription, CardHeader, CardTitle } from "@/ui/card";

interface Career {
  title: string;
  description: string;
  date: string;
}
const CareerCard = ({ career }: { career: Career }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{career.title}</CardTitle>
        <CardDescription>{career.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
export default CareerCard;
