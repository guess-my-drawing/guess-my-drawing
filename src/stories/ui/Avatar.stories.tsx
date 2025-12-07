import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: {
    className: "size-10",
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="사용자 아바타" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatar = canvas.getByRole("img", { hidden: true });

    await expect(avatar).toBeInTheDocument();
  },
};

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="사용자" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await new Promise((r) => setTimeout(r, 500));

    const img = canvas.getByRole("img", { hidden: true });
    await expect(img).toHaveAttribute("src", "https://github.com/shadcn.png");
  },
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/invalid-image.png" alt="사용자" />
      <AvatarFallback>P1</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await new Promise((r) => setTimeout(r, 500));

    const fallback = canvas.getByText("P1");
    await expect(fallback).toBeVisible();
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar className="size-6">
        <AvatarFallback className="text-xs">XS</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarFallback className="text-sm">MD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback className="text-base">LG</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatars = ["XS", "SM", "MD", "LG", "XL"];

    for (const text of avatars) {
      const fallback = canvas.getByText(text);
      await expect(fallback).toBeVisible();
    }
  },
};

export const PlayerAvatars: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-red-500 text-white">P1</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-blue-500 text-white">P2</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-green-500 text-white">P3</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback className="bg-yellow-500 text-white">P4</AvatarFallback>
      </Avatar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const players = ["P1", "P2", "P3", "P4"];

    for (const player of players) {
      const avatar = canvas.getByText(player);
      await expect(avatar).toBeVisible();
    }
  },
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="relative">
        <Avatar>
          <AvatarFallback>온라인</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 ring-2 ring-background" />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarFallback>자리비움</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 size-3 rounded-full bg-yellow-500 ring-2 ring-background" />
      </div>
      <div className="relative">
        <Avatar>
          <AvatarFallback>오프라인</AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 size-3 rounded-full bg-gray-400 ring-2 ring-background" />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("온라인")).toBeVisible();
    await expect(canvas.getByText("자리비움")).toBeVisible();
    await expect(canvas.getByText("오프라인")).toBeVisible();
  },
};
