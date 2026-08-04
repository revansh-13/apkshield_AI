import { Info } from "lucide-react";
import { AI_DISCLAIMER_TEXT } from "./constants";

export function DisclaimerCard() {
  return (
    <div className="flex items-center justify-center gap-2 text-center text-xs text-muted-foreground pt-2">
      <Info className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" aria-hidden="true" />
      <span>{AI_DISCLAIMER_TEXT}</span>
    </div>
  );
}
