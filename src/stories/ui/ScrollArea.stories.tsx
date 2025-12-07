import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Playground: Story = {
  args: {
    className: "h-[200px] w-[350px] rounded-md border p-4",
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            항목 {i + 1}: 스크롤 영역 테스트 콘텐츠입니다.
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("항목 1: 스크롤 영역 테스트 콘텐츠입니다.")).toBeVisible();
  },
};

export const VerticalScroll: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="text-sm border-b pb-2">
            메시지 {i + 1}: 채팅 메시지 예시입니다.
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/메시지 1/)).toBeVisible();
    await expect(canvas.getByText(/메시지 5/)).toBeVisible();
  },
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-[400px] whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md border bg-muted"
          >
            아이템 {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("아이템 1")).toBeVisible();
    await expect(canvas.getByText("아이템 2")).toBeVisible();
  },
};

export const ChatMessages: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="size-8 rounded-full bg-blue-500 shrink-0" />
          <div className="bg-muted rounded-lg p-2 text-sm">
            <p className="font-semibold">Player1</p>
            <p>안녕하세요!</p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <div className="bg-primary text-primary-foreground rounded-lg p-2 text-sm">
            <p>반갑습니다~</p>
          </div>
          <div className="size-8 rounded-full bg-green-500 shrink-0" />
        </div>
        <div className="flex gap-2">
          <div className="size-8 rounded-full bg-red-500 shrink-0" />
          <div className="bg-muted rounded-lg p-2 text-sm">
            <p className="font-semibold">Player2</p>
            <p>게임 시작하나요?</p>
          </div>
        </div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="size-8 rounded-full bg-purple-500 shrink-0" />
            <div className="bg-muted rounded-lg p-2 text-sm">
              <p className="font-semibold">Player{i + 3}</p>
              <p>채팅 메시지 {i + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("안녕하세요!")).toBeVisible();
    await expect(canvas.getByText("반갑습니다~")).toBeVisible();
  },
};

export const PlayerList: Story = {
  render: () => (
    <ScrollArea className="h-[250px] w-[200px] rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">참가자 목록</h4>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 py-2 border-b last:border-0">
            <div className="size-6 rounded-full bg-muted flex items-center justify-center text-xs">
              {i + 1}
            </div>
            <span className="text-sm">Player{i + 1}</span>
            {i === 0 && <span className="text-xs text-muted-foreground ml-auto">방장</span>}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("참가자 목록")).toBeVisible();
    await expect(canvas.getByText("Player1")).toBeVisible();
    await expect(canvas.getByText("방장")).toBeVisible();
  },
};

export const WordList: Story = {
  render: () => {
    const words = [
      "사과", "바나나", "포도", "수박", "딸기",
      "강아지", "고양이", "토끼", "햄스터", "앵무새",
      "자동차", "비행기", "자전거", "기차", "배",
      "컴퓨터", "스마트폰", "태블릿", "헤드폰", "카메라",
    ];

    return (
      <ScrollArea className="h-[200px] w-[150px] rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium">단어 목록</h4>
          {words.map((word, i) => (
            <div
              key={i}
              className="py-2 text-sm hover:bg-muted cursor-pointer rounded px-2"
            >
              {word}
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("단어 목록")).toBeVisible();
    await expect(canvas.getByText("사과")).toBeVisible();
    await expect(canvas.getByText("강아지")).toBeVisible();
  },
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[300px] rounded-md border">
      <div className="w-[500px] p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">순위</th>
              <th className="text-left p-2">이름</th>
              <th className="text-left p-2">점수</th>
              <th className="text-left p-2">정답수</th>
              <th className="text-left p-2">승률</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{i + 1}</td>
                <td className="p-2">Player{i + 1}</td>
                <td className="p-2">{1000 - i * 50}점</td>
                <td className="p-2">{20 - i}개</td>
                <td className="p-2">{90 - i * 3}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("순위")).toBeVisible();
    await expect(canvas.getByText("이름")).toBeVisible();
    await expect(canvas.getByText("Player1")).toBeVisible();
  },
};

export const KeyboardScroll: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
      <div className="space-y-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            항목 {i + 1}: 키보드로 스크롤할 수 있습니다.
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const scrollArea = canvasElement.querySelector("[data-slot='scroll-area-viewport']");

    if (scrollArea) {
      (scrollArea as HTMLElement).focus();
      await expect(canvas.getByText(/항목 1/)).toBeVisible();
    }
  },
};
