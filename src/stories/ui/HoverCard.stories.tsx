import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Playground: Story = {
  args: {
    openDelay: 200,
    closeDelay: 0,
  },
  argTypes: {
    openDelay: {
      control: { type: "number", min: 0, max: 1000 },
    },
    closeDelay: {
      control: { type: "number", min: 0, max: 1000 },
    },
  },
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="link">마우스를 올려보세요</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">HoverCard 콘텐츠입니다.</p>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const HoverInteraction: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">마우스 올리기</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">호버 카드 콘텐츠입니다.</p>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);

    await new Promise((r) => setTimeout(r, 500));

    const content = await within(document.body).findByText("호버 카드 콘텐츠입니다.");
    await expect(content).toBeVisible();
  },
};

export const UnhoverInteraction: Story = {
  render: () => (
    <div className="p-20">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">호버 해제 테스트</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm">호버 해제 시 사라집니다.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);
    await new Promise((r) => setTimeout(r, 500));

    const content = await within(document.body).findByText("호버 해제 시 사라집니다.");
    await expect(content).toBeVisible();

    await userEvent.unhover(trigger);
  },
};

export const PositionTop: Story = {
  render: () => (
    <div className="pt-40">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">위쪽</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <p className="text-sm">위쪽에 표시됩니다.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);
    await new Promise((r) => setTimeout(r, 500));

    const content = await within(document.body).findByText("위쪽에 표시됩니다.");
    await expect(content).toBeVisible();
  },
};

export const PositionRight: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">오른쪽</Button>
      </HoverCardTrigger>
      <HoverCardContent side="right">
        <p className="text-sm">오른쪽에 표시됩니다.</p>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);
    await new Promise((r) => setTimeout(r, 500));

    const content = await within(document.body).findByText("오른쪽에 표시됩니다.");
    await expect(content).toBeVisible();
  },
};

export const PositionLeft: Story = {
  render: () => (
    <div className="pl-60">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">왼쪽</Button>
        </HoverCardTrigger>
        <HoverCardContent side="left">
          <p className="text-sm">왼쪽에 표시됩니다.</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);
    await new Promise((r) => setTimeout(r, 500));

    const content = await within(document.body).findByText("왼쪽에 표시됩니다.");
    await expect(content).toBeVisible();
  },
};

export const PlayerInfo: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <div className="size-6 rounded-full bg-muted flex items-center justify-center text-xs">
            P1
          </div>
          Player123
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-semibold">Player123</h4>
          <div className="text-sm text-muted-foreground">
            <p>승리: 15게임</p>
            <p>플레이: 32게임</p>
            <p>승률: 46.8%</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /Player123/ });

    await userEvent.hover(trigger);
    await new Promise((r) => setTimeout(r, 500));

    const winInfo = await within(document.body).findByText("승리: 15게임");
    await expect(winInfo).toBeVisible();
    await expect(within(document.body).getByText("승률: 46.8%")).toBeVisible();
  },
};

export const OpenDelayTest: Story = {
  render: () => (
    <HoverCard openDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="outline">즉시 열기</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">딜레이 없이 열립니다.</p>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);

    await new Promise((r) => setTimeout(r, 100));

    const content = await within(document.body).findByText("딜레이 없이 열립니다.");
    await expect(content).toBeVisible();
  },
};

export const RichContent: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-help border-b border-dashed">힌트 보기</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="space-y-2">
          <h4 className="font-semibold">단어 힌트</h4>
          <div className="text-sm space-y-1">
            <p>글자 수: 4글자</p>
            <p>카테고리: 동물</p>
            <p>첫 글자: ㄱ</p>
          </div>
          <div className="pt-2 border-t text-xs text-muted-foreground">
            남은 힌트: 2개
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("힌트 보기");

    await userEvent.hover(trigger);
    await new Promise((r) => setTimeout(r, 500));

    await expect(within(document.body).getByText("단어 힌트")).toBeVisible();
    await expect(within(document.body).getByText("글자 수: 4글자")).toBeVisible();
    await expect(within(document.body).getByText("카테고리: 동물")).toBeVisible();
    await expect(within(document.body).getByText("남은 힌트: 2개")).toBeVisible();
  },
};

export const FocusInteraction: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button>포커스 테스트</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p className="text-sm">포커스 시에도 표시됩니다.</p>
      </HoverCardContent>
    </HoverCard>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    trigger.focus();
    await expect(trigger).toHaveFocus();

    await new Promise((r) => setTimeout(r, 500));
  },
};
