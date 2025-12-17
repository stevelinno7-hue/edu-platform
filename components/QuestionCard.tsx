// components/QuestionCard.tsx
import Card from "@/components/Card";
import Button from "@/components/Button";
import type { Question } from "@/models/Question";

interface Props {
  question: Question;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function QuestionCard({ question, onEdit, onDelete }: Props) {
  return (
    <Card className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{question.title}</h3>
      </div>

      <div className="flex gap-3">
        {onEdit && (
          <Button variant="muted" onClick={onEdit}>
            編輯
          </Button>
        )}
        {onDelete && (
          <Button variant="danger" onClick={onDelete}>
            刪除
          </Button>
        )}
      </div>
    </Card>
  );
}
