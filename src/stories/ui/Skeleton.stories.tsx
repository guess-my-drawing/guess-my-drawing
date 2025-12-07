import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Skeleton } from "@/components/ui/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  args: {
    className: "w-[200px] h-[20px]",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeleton = canvas.getByRole("generic");

    await expect(skeleton).toBeVisible();
  },
};

export const Text: Story = {
  render: () => <Skeleton className="w-[250px] h-4" />,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("[data-slot='skeleton']")).toBeVisible();
  },
};

export const Circle: Story = {
  render: () => <Skeleton className="size-12 rounded-full" />,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("[data-slot='skeleton']")).toBeVisible();
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons.length).toBe(3);
  },
};

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons.length).toBe(3);
  },
};

export const PlayerCard: Story = {
  render: () => (
    <div className="w-[200px] rounded-lg border p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      <Skeleton className="h-8 w-full" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons.length).toBe(4);
  },
};

export const ChatMessage: Story = {
  render: () => (
    <div className="w-[350px] space-y-4">
      <div className="flex gap-3">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <div className="space-y-2">
          <Skeleton className="h-12 w-48 rounded-lg" />
        </div>
        <Skeleton className="size-8 rounded-full shrink-0" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-3/4 rounded-lg" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons.length).toBeGreaterThan(5);
  },
};

export const GameRoom: Story = {
  render: () => (
    <div className="w-[400px] rounded-lg border p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
        <Skeleton className="h-9 w-20" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons.length).toBeGreaterThan(8);
  },
};

export const Leaderboard: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border p-4 space-y-4">
      <Skeleton className="h-6 w-24" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-12" />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons.length).toBe(16);
  },
};

export const DrawingCanvas: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-[300px] w-[400px] rounded-lg" />
      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="size-8 rounded" />
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const skeletons = canvasElement.querySelectorAll("[data-slot='skeleton']");
    await expect(skeletons.length).toBe(11);
  },
};
