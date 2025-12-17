import Card from "@/components/Card";
import Button from "@/components/Button";
import type { Question } from "@/models/Question";

interface Props {
  question: Question;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome</h1>
    </div>
  );
}
