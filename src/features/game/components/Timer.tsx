"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TimerProps {
  duration?: number; // 초 단위 (기본값: 60초)
  onComplete?: () => void;
  className?: string;
}

export function Timer({
  duration = 60,
  onComplete,
  className,
}: TimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(duration);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds, onComplete]);

  // 백분율 계산 (0-100)
  const progressValue = (remainingSeconds / duration) * 100;

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 색상 결정 (남은 시간에 따라)
  const getProgressColor = () => {
    if (progressValue > 50) return "[&>div]:bg-green-500";
    if (progressValue > 20) return "[&>div]:bg-yellow-500";
    return "[&>div]:bg-red-500";
  };

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium">남은 시간</span>
        <span className={cn(
          "font-mono font-semibold",
          progressValue > 50 && "text-green-600",
          progressValue > 20 && progressValue <= 50 && "text-yellow-600",
          progressValue <= 20 && "text-red-600"
        )}>
          {formatTime(remainingSeconds)}
        </span>
      </div>
      <Progress value={progressValue} className={cn("h-3", getProgressColor())} />
    </div>
  );
}

