"use client";

import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { PencilBrush } from "fabric";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2, Eraser, Pencil, MousePointer2, PaintBucket } from "lucide-react";

const DEFAULT_CANVAS_WIDTH = 800;
const DEFAULT_CANVAS_HEIGHT = 600;
const DEFAULT_BRUSH_COLOR = "#000000";
const DEFAULT_BRUSH_WIDTH = 5;

interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Canvas({
  width = DEFAULT_CANVAS_WIDTH,
  height = DEFAULT_CANVAS_HEIGHT,
  className,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [brushColor, setBrushColor] = useState(DEFAULT_BRUSH_COLOR);
  const [brushWidth, setBrushWidth] = useState(DEFAULT_BRUSH_WIDTH);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mode, setMode] = useState<"draw" | "erase" | "select">("draw");

  // 색상 팔레트 (skribbl.io 스타일)
  const colorPalette = [
    // 상단 행 (밝은 색상)
    "#FFFFFF", // 흰색
    "#E0E0E0", // 밝은 회색
    "#FF0000", // 빨강
    "#FF8800", // 주황
    "#FFFF00", // 노랑
    "#88FF00", // 라임
    "#00FFFF", // 밝은 파랑
    "#8800FF", // 보라
    "#FF88FF", // 밝은 핑크
    "#FFCC88", // 베이지
    // 하단 행 (어두운 색상)
    "#000000", // 검정
    "#808080", // 어두운 회색
    "#880000", // 어두운 빨강
    "#884400", // 어두운 주황
    "#888800", // 어두운 노랑
    "#008800", // 어두운 초록
    "#000088", // 어두운 파랑
    "#440088", // 어두운 보라
    "#880044", // 어두운 핑크
    "#884422", // 갈색
  ];

  // 브러시 크기 옵션
  const brushSizes = [2, 5, 10, 20];

  // 캔버스 초기화
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width,
        height,
        backgroundColor: "#ffffff",
      });

      // 그리기 모드 활성화
      canvas.isDrawingMode = true;

      // 브러시를 명시적으로 생성
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new PencilBrush(canvas);
      }

      // 브러시 설정
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingBrush.width = brushWidth;

      console.log("브러시 설정 완료:", {
        color: canvas.freeDrawingBrush.color,
        width: canvas.freeDrawingBrush.width,
        isDrawingMode: canvas.isDrawingMode,
        hasBrush: !!canvas.freeDrawingBrush,
      });

      fabricCanvasRef.current = canvas;

      // 초기 상태를 히스토리에 저장
      const saveInitialState = () => {
        try {
          const json = JSON.stringify(canvas.toJSON());
          setHistory([json]);
          setHistoryIndex(0);
        } catch (error) {
          console.error("초기 상태 저장 중 오류가 발생했습니다:", error);
        }
      };
      saveInitialState();

      // 그리기 이벤트 리스너
      const handlePathCreated = () => {
        if (fabricCanvasRef.current) {
          try {
            const json = JSON.stringify(fabricCanvasRef.current.toJSON());
            setHistory((prev) => {
              const newHistory = prev.slice(0, historyIndex + 1);
              newHistory.push(json);
              return newHistory;
            });
            setHistoryIndex((prev) => prev + 1);
          } catch (error) {
            console.error("히스토리 저장 중 오류가 발생했습니다:", error);
          }
        }
      };

      canvas.on("path:created", handlePathCreated);

      return () => {
        canvas.off("path:created", handlePathCreated);
        canvas.dispose();
        fabricCanvasRef.current = null;
      };
    } catch (error) {
      console.error("캔버스 초기화 중 오류가 발생했습니다:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  // 모드에 따른 캔버스 설정
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    try {
      if (mode === "draw") {
        // 그리기 모드: 그리기 모드 활성화
        fabricCanvasRef.current.isDrawingMode = true;
        fabricCanvasRef.current.selection = false;
        if (!fabricCanvasRef.current.freeDrawingBrush) {
          fabricCanvasRef.current.freeDrawingBrush = new PencilBrush(fabricCanvasRef.current);
        }
        fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
        fabricCanvasRef.current.freeDrawingBrush.width = brushWidth;
      } else if (mode === "erase") {
        // 지우개 모드: 그리기 모드 활성화하되 배경색으로 그리기
        fabricCanvasRef.current.isDrawingMode = true;
        fabricCanvasRef.current.selection = false;
        if (!fabricCanvasRef.current.freeDrawingBrush) {
          fabricCanvasRef.current.freeDrawingBrush = new PencilBrush(fabricCanvasRef.current);
        }
        // 배경색(흰색)으로 그려서 지우는 효과
        fabricCanvasRef.current.freeDrawingBrush.color = "#ffffff";
        fabricCanvasRef.current.freeDrawingBrush.width = brushWidth;
      } else {
        // 선택 모드: 그리기 모드 비활성화, 선택 모드 활성화
        fabricCanvasRef.current.isDrawingMode = false;
        fabricCanvasRef.current.selection = true;
      }
    } catch (error) {
      console.error("모드 전환 중 오류가 발생했습니다:", error);
    }
  }, [mode, brushColor, brushWidth]);

  // 브러시 색상 및 두께 업데이트 (그리기 모드일 때만)
  useEffect(() => {
    if (!fabricCanvasRef.current?.freeDrawingBrush || mode !== "draw") return;

    try {
      fabricCanvasRef.current.freeDrawingBrush.color = brushColor;
      fabricCanvasRef.current.freeDrawingBrush.width = brushWidth;
    } catch (error) {
      console.error("브러시 설정 업데이트 중 오류가 발생했습니다:", error);
    }
  }, [brushColor, brushWidth, mode]);

  // 전체 지우기
  const handleClear = () => {
    if (!fabricCanvasRef.current) return;

    try {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = "#ffffff";
      fabricCanvasRef.current.renderAll();
      
      // 히스토리 저장
      const json = JSON.stringify(fabricCanvasRef.current.toJSON());
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(json);
        return newHistory;
      });
      setHistoryIndex((prev) => prev + 1);
    } catch (error) {
      console.error("지우기 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* 캔버스 */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="border border-border rounded-lg"
          style={{
            cursor:
              mode === "erase"
                ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M7 21a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4Z'/%3E%3Cpath d='M7 21h10'/%3E%3Cpath d='M9 7h6'/%3E%3Cpath d='M9 11h6'/%3E%3Cpath d='M9 15h6'/%3E%3C/svg%3E") 12 12, auto`
                : mode === "draw"
                  ? "crosshair"
                  : "default",
          }}
        />
      </div>

      {/* 도구 바 (하단) */}
      <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
        {/* 색상 팔레트 */}
        <div className="grid grid-cols-10 gap-1">
          {colorPalette.map((color, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setBrushColor(color)}
              className={cn(
                "h-8 w-8 rounded border-2 transition-all hover:scale-110",
                brushColor === color && "ring-2 ring-primary ring-offset-2"
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* 도구 버튼 */}
        <div className="flex items-center gap-1 border-l pl-3">
          <Button
            variant={mode === "draw" ? "default" : "outline"}
            size="icon"
            className="h-10 w-10"
            onClick={() => setMode("draw")}
            title="그리기 모드"
          >
            <Pencil className="size-5" />
          </Button>
          <Button
            variant={mode === "erase" ? "default" : "outline"}
            size="icon"
            className="h-10 w-10"
            onClick={() => setMode("erase")}
            title="지우개 모드"
          >
            <Eraser className="size-5" />
          </Button>
          <Button
            variant={mode === "select" ? "default" : "outline"}
            size="icon"
            className="h-10 w-10"
            onClick={() => setMode("select")}
            title="선택 모드"
          >
            <MousePointer2 className="size-5" />
          </Button>
        </div>

        {/* 브러시 크기 */}
        <div className="flex items-center gap-1 border-l pl-3">
          {brushSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setBrushWidth(size)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded border transition-all hover:bg-accent",
                brushWidth === size && "bg-primary text-primary-foreground"
              )}
              title={`브러시 크기: ${size}px`}
            >
              <div
                className="rounded-full bg-current"
                style={{
                  width: `${size * 0.4}px`,
                  height: `${size * 0.4}px`,
                }}
              />
            </button>
          ))}
        </div>

        {/* 전체 지우기 */}
        <div className="flex items-center border-l pl-3">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10"
            onClick={handleClear}
            title="전체 지우기"
          >
            <Trash2 className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

