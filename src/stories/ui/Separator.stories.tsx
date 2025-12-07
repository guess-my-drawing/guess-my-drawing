import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Separator } from "@/components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    decorative: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Playground: Story = {
  args: {
    orientation: "horizontal",
    decorative: true,
    className: "w-[300px]",
  },
  play: async ({ canvasElement }) => {
    const separator = canvasElement.querySelector("[data-slot='separator']");
    await expect(separator).toBeVisible();
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">게임 설정</h4>
        <p className="text-sm text-muted-foreground">게임 옵션을 설정하세요.</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">참가자</h4>
        <p className="text-sm text-muted-foreground">현재 4명이 참가 중입니다.</p>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("게임 설정")).toBeVisible();
    await expect(canvas.getByText("참가자")).toBeVisible();
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>홈</div>
      <Separator orientation="vertical" />
      <div>게임</div>
      <Separator orientation="vertical" />
      <div>순위</div>
      <Separator orientation="vertical" />
      <div>설정</div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("홈")).toBeVisible();
    await expect(canvas.getByText("게임")).toBeVisible();
    await expect(canvas.getByText("순위")).toBeVisible();
    await expect(canvas.getByText("설정")).toBeVisible();
  },
};

export const InCard: Story = {
  render: () => (
    <div className="w-[350px] rounded-lg border p-4">
      <div className="flex justify-between">
        <span className="font-medium">게임 방</span>
        <span className="text-muted-foreground">4/8명</span>
      </div>
      <Separator className="my-4" />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>라운드</span>
          <span>5 라운드</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>제한 시간</span>
          <span>60초</span>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex gap-2">
        <button className="flex-1 rounded bg-primary px-4 py-2 text-primary-foreground text-sm">
          참가
        </button>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separators = canvasElement.querySelectorAll("[data-slot='separator']");

    await expect(canvas.getByText("게임 방")).toBeVisible();
    await expect(separators.length).toBe(2);
  },
};

export const MenuSeparator: Story = {
  render: () => (
    <div className="w-[200px] rounded-md border p-2">
      <div className="px-2 py-1.5 text-sm hover:bg-muted rounded cursor-pointer">프로필</div>
      <div className="px-2 py-1.5 text-sm hover:bg-muted rounded cursor-pointer">설정</div>
      <Separator className="my-2" />
      <div className="px-2 py-1.5 text-sm hover:bg-muted rounded cursor-pointer">친구 목록</div>
      <div className="px-2 py-1.5 text-sm hover:bg-muted rounded cursor-pointer">게임 기록</div>
      <Separator className="my-2" />
      <div className="px-2 py-1.5 text-sm text-destructive hover:bg-muted rounded cursor-pointer">
        로그아웃
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separators = canvasElement.querySelectorAll("[data-slot='separator']");

    await expect(canvas.getByText("프로필")).toBeVisible();
    await expect(canvas.getByText("로그아웃")).toBeVisible();
    await expect(separators.length).toBe(2);
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("또는")).toBeVisible();
  },
};

export const ChatDivider: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div className="text-sm">이전 메시지...</div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            2024년 1월 15일
          </span>
        </div>
      </div>
      <div className="text-sm">새 메시지...</div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("2024년 1월 15일")).toBeVisible();
  },
};

export const ScoreSection: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <h3 className="font-semibold">라운드 결과</h3>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>정답자</span>
          <span className="font-medium">Player1, Player3</span>
        </div>
        <div className="flex justify-between">
          <span>정답</span>
          <span className="font-medium">사과</span>
        </div>
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>출제자 점수</span>
          <span className="text-green-600">+50점</span>
        </div>
        <div className="flex justify-between">
          <span>정답자 점수</span>
          <span className="text-green-600">+100점</span>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separators = canvasElement.querySelectorAll("[data-slot='separator']");

    await expect(canvas.getByText("라운드 결과")).toBeVisible();
    await expect(separators.length).toBe(2);
  },
};
