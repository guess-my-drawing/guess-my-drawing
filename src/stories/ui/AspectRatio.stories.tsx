import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    ratio: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Playground: Story = {
  args: {
    ratio: 16 / 9,
  },
  render: (args) => (
    <div className="w-[450px]">
      <AspectRatio {...args} className="bg-muted rounded-md flex items-center justify-center">
        <span className="text-muted-foreground">16:9 비율</span>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("16:9 비율")).toBeVisible();
  },
};

export const Ratio16by9: Story = {
  render: () => (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
        <span className="text-muted-foreground">16:9 (영상)</span>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("16:9 (영상)")).toBeVisible();
  },
};

export const Ratio4by3: Story = {
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={4 / 3} className="bg-muted rounded-md flex items-center justify-center">
        <span className="text-muted-foreground">4:3 (클래식)</span>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("4:3 (클래식)")).toBeVisible();
  },
};

export const Square: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted rounded-md flex items-center justify-center">
        <span className="text-muted-foreground">1:1 (정사각형)</span>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1:1 (정사각형)")).toBeVisible();
  },
};

export const DrawingCanvas: Story = {
  render: () => (
    <div className="w-[500px]">
      <AspectRatio ratio={4 / 3} className="bg-white border-2 border-dashed rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <span className="text-4xl">🎨</span>
            <p className="mt-2">그림을 그려주세요</p>
          </div>
        </div>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("그림을 그려주세요")).toBeVisible();
  },
};

export const ImagePlaceholder: Story = {
  render: () => (
    <div className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted rounded-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">👤</span>
        </div>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const aspectRatio = canvasElement.querySelector("[data-slot='aspect-ratio']");
    await expect(aspectRatio).toBeVisible();
  },
};

export const VideoThumbnail: Story = {
  render: () => (
    <div className="w-[400px]">
      <AspectRatio ratio={16 / 9} className="bg-black rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-2xl ml-1">▶</span>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
          3:45
        </div>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("3:45")).toBeVisible();
  },
};

export const GamePreview: Story = {
  render: () => (
    <div className="w-[350px]">
      <AspectRatio ratio={16 / 10} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-5xl mb-2">🎮</span>
          <h3 className="text-xl font-bold">그림 맞추기</h3>
          <p className="text-sm opacity-80">4명 참가 중</p>
        </div>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("그림 맞추기")).toBeVisible();
    await expect(canvas.getByText("4명 참가 중")).toBeVisible();
  },
};

export const AllRatios: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-start">
      <div className="w-[200px]">
        <p className="text-sm mb-2">1:1</p>
        <AspectRatio ratio={1} className="bg-muted rounded" />
      </div>
      <div className="w-[200px]">
        <p className="text-sm mb-2">4:3</p>
        <AspectRatio ratio={4 / 3} className="bg-muted rounded" />
      </div>
      <div className="w-[200px]">
        <p className="text-sm mb-2">16:9</p>
        <AspectRatio ratio={16 / 9} className="bg-muted rounded" />
      </div>
      <div className="w-[200px]">
        <p className="text-sm mb-2">21:9</p>
        <AspectRatio ratio={21 / 9} className="bg-muted rounded" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aspectRatios = canvasElement.querySelectorAll("[data-slot='aspect-ratio']");

    await expect(aspectRatios.length).toBe(4);
    await expect(canvas.getByText("1:1")).toBeVisible();
    await expect(canvas.getByText("16:9")).toBeVisible();
  },
};
