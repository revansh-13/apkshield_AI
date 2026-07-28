import { motion } from "framer-motion";

interface UploadProgressProps {
  progress: number; // 0 to 100
}

export function UploadProgress({ progress }: UploadProgressProps) {
  // Ensure progress is bound between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full space-y-2 mt-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground font-medium">Uploading and preparing analysis...</span>
        <span className="text-foreground font-mono">{Math.round(clampedProgress)}%</span>
      </div>
      
      {/* Progress Bar Container */}
      <div 
        className="h-2 w-full bg-muted rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* Progress Bar Fill */}
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
    </div>
  );
}
