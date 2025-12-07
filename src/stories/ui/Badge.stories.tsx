import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    variant: "default",
    children: "Badge",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Badge");

    await expect(badge).toBeVisible();
  },
};

export const Default: Story = {
  render: () => <Badge>기본</Badge>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("기본")).toBeVisible();
  },
};

export const Secondary: Story = {
  render: () => <Badge variant="secondary">보조</Badge>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("보조")).toBeVisible();
  },
};

export const Destructive: Story = {
  render: () => <Badge variant="destructive">위험</Badge>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("위험")).toBeVisible();
  },
};

export const Outline: Story = {
  render: () => <Badge variant="outline">아웃라인</Badge>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("아웃라인")).toBeVisible();
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const variants = ["Default", "Secondary", "Destructive", "Outline"];

    for (const variant of variants) {
      await expect(canvas.getByText(variant)).toBeVisible();
    }
  },
};

export const GameBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">출제자</Badge>
      <Badge variant="secondary">관전자</Badge>
      <Badge variant="destructive">방장</Badge>
      <Badge variant="outline">150점</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("출제자")).toBeVisible();
    await expect(canvas.getByText("관전자")).toBeVisible();
    await expect(canvas.getByText("방장")).toBeVisible();
    await expect(canvas.getByText("150점")).toBeVisible();
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>
        <span className="mr-1">🎨</span>
        그리는 중
      </Badge>
      <Badge variant="secondary">
        <span className="mr-1">👁️</span>
        관전 중
      </Badge>
      <Badge variant="destructive">
        <span className="mr-1">⏰</span>
        시간 초과
      </Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/그리는 중/)).toBeVisible();
    await expect(canvas.getByText(/관전 중/)).toBeVisible();
    await expect(canvas.getByText(/시간 초과/)).toBeVisible();
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge className="bg-green-500">온라인</Badge>
      <Badge className="bg-yellow-500">자리비움</Badge>
      <Badge className="bg-gray-500">오프라인</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("온라인")).toBeVisible();
    await expect(canvas.getByText("자리비움")).toBeVisible();
    await expect(canvas.getByText("오프라인")).toBeVisible();
  },
};
