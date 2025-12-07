import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    className: "w-[350px]",
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드 설명 텍스트입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 본문 내용입니다.</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">확인</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("카드 제목")).toBeVisible();
    await expect(canvas.getByText("카드 설명 텍스트입니다.")).toBeVisible();
    await expect(canvas.getByText("카드 본문 내용입니다.")).toBeVisible();
    await expect(canvas.getByRole("button")).toBeVisible();
  },
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>간단한 카드</CardTitle>
      </CardHeader>
      <CardContent>
        <p>가장 기본적인 카드 형태입니다.</p>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("간단한 카드")).toBeVisible();
  },
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>게임 방</CardTitle>
        <CardDescription>Player123님의 방</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            참가
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>현재 4명 / 최대 8명</p>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("게임 방")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "참가" })).toBeVisible();
  },
};

export const GameRoom: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>🎨 그림 퀴즈 방</CardTitle>
        <CardDescription>즐거운 게임 시간!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>참가자</span>
          <span>4 / 8</span>
        </div>
        <div className="flex justify-between">
          <span>라운드</span>
          <span>3 / 5</span>
        </div>
        <div className="flex justify-between">
          <span>제한 시간</span>
          <span>60초</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          나가기
        </Button>
        <Button className="flex-1">시작하기</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("🎨 그림 퀴즈 방")).toBeVisible();
    await expect(canvas.getByText("4 / 8")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "나가기" })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "시작하기" })).toBeVisible();
  },
};

export const PlayerCard: Story = {
  render: () => (
    <Card className="w-[200px]">
      <CardHeader className="items-center">
        <div className="size-16 rounded-full bg-muted flex items-center justify-center text-2xl">
          🎨
        </div>
        <CardTitle className="text-center">Player123</CardTitle>
        <CardDescription className="text-center">출제자</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-2xl font-bold">150점</p>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Player123")).toBeVisible();
    await expect(canvas.getByText("출제자")).toBeVisible();
    await expect(canvas.getByText("150점")).toBeVisible();
  },
};

export const ScoreBoard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>🏆 순위표</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <span>🥇 Player1</span>
          <span className="font-bold">450점</span>
        </div>
        <div className="flex justify-between items-center">
          <span>🥈 Player2</span>
          <span className="font-bold">380점</span>
        </div>
        <div className="flex justify-between items-center">
          <span>🥉 Player3</span>
          <span className="font-bold">290점</span>
        </div>
      </CardContent>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("🏆 순위표")).toBeVisible();
    await expect(canvas.getByText("🥇 Player1")).toBeVisible();
    await expect(canvas.getByText("450점")).toBeVisible();
  },
};

export const WithBorder: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card className="w-[200px] border-2 border-green-500">
        <CardHeader>
          <CardTitle className="text-green-600">정답!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>+150점 획득</p>
        </CardContent>
      </Card>
      <Card className="w-[200px] border-2 border-red-500">
        <CardHeader>
          <CardTitle className="text-red-600">오답</CardTitle>
        </CardHeader>
        <CardContent>
          <p>다시 시도하세요</p>
        </CardContent>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("정답!")).toBeVisible();
    await expect(canvas.getByText("오답")).toBeVisible();
  },
};
