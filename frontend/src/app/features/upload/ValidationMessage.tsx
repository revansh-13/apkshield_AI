import { AlertCircle } from "lucide-react";

interface ValidationMessageProps {
  message: string;
}

export function ValidationMessage({ message }: ValidationMessageProps) {
  return (
    <div className="flex items-center gap-2 mt-4 text-sm text-destructive" role="alert">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="font-medium">{message}</span>
    </div>
  );
}
