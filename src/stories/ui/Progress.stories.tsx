import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  args: {
    value: 50,
    className: "w-[300px]",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByRole("progressbar");

    await expect(progress).toBeVisible();
    await expect(progress).toHaveAttribute("aria-valuenow", "50");
  },
};

export const Empty: Story = {
  render: () => <Progress value={0} className="w-[300px]" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByRole("progressbar");

    await expect(progress).toHaveAttribute("aria-valuenow", "0");
  },
};

export const Half: Story = {
  render: () => <Progress value={50} className="w-[300px]" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByRole("progressbar");

    await expect(progress).toHaveAttribute("aria-valuenow", "50");
  },
};

export const Full: Story = {
  render: () => <Progress value={100} className="w-[300px]" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByRole("progressbar");

    await expect(progress).toHaveAttribute("aria-valuenow", "100");
  },
};

export const ValueSteps: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-1">
        <span className="text-sm">0%</span>
        <Progress value={0} />
      </div>
      <div className="space-y-1">
        <span className="text-sm">25%</span>
        <Progress value={25} />
      </div>
      <div className="space-y-1">
        <span className="text-sm">50%</span>
        <Progress value={50} />
      </div>
      <div className="space-y-1">
        <span className="text-sm">75%</span>
        <Progress value={75} />
      </div>
      <div className="space-y-1">
        <span className="text-sm">100%</span>
        <Progress value={100} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progressBars = canvas.getAllByRole("progressbar");

    await expect(progressBars).toHaveLength(5);
  },
};

export const TimerProgress: Story = {
  render: function TimerProgressStory() {
    const [value, setValue] = useState(100);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-[300px] space-y-2">
        <div className="flex justify-between text-sm">
          <span>남은 시간</span>
          <span>{Math.ceil(value / 10)}초</span>
        </div>
        <Progress value={value} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const progress = canvas.getByRole("progressbar");

    await expect(progress).toBeVisible();
  },
};

export const RoundProgress: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <div className="flex justify-between text-sm">
        <span>라운드 진행률</span>
        <span>3 / 5 라운드</span>
      </div>
      <Progress value={60} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("라운드 진행률")).toBeVisible();
    await expect(canvas.getByText("3 / 5 라운드")).toBeVisible();
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-1">
        <span className="text-sm text-green-600">충분한 시간</span>
        <Progress value={80} className="[&>div]:bg-green-500" />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-yellow-600">주의</span>
        <Progress value={40} className="[&>div]:bg-yellow-500" />
      </div>
      <div className="space-y-1">
        <span className="text-sm text-red-600">급함!</span>
        <Progress value={15} className="[&>div]:bg-red-500" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("충분한 시간")).toBeVisible();
    await expect(canvas.getByText("주의")).toBeVisible();
    await expect(canvas.getByText("급함!")).toBeVisible();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="space-y-1">
        <span className="text-sm">Thin</span>
        <Progress value={60} className="h-1" />
      </div>
      <div className="space-y-1">
        <span className="text-sm">Default</span>
        <Progress value={60} className="h-2" />
      </div>
      <div className="space-y-1">
        <span className="text-sm">Thick</span>
        <Progress value={60} className="h-4" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Thin")).toBeVisible();
    await expect(canvas.getByText("Default")).toBeVisible();
    await expect(canvas.getByText("Thick")).toBeVisible();
  },
};
