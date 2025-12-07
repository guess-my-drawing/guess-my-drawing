import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Pencil, Eraser, Trash2 } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">마우스를 올려보세요</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>툴팁 내용입니다</p>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const HoverInteraction: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">마우스 올리기</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>툴팁 내용</p>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);

    await new Promise((r) => setTimeout(r, 500));

    const tooltip = await within(document.body).findByRole("tooltip");
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent("툴팁 내용");
  },
};

export const UnhoverInteraction: Story = {
  render: () => (
    <div className="p-20">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>호버 해제 테스트</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>툴팁이 사라집니다</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.hover(trigger);
    await new Promise((r) => setTimeout(r, 500));

    const tooltip = await within(document.body).findByRole("tooltip");
    await expect(tooltip).toBeVisible();

    await userEvent.unhover(trigger);
  },
};

export const PositionVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">위</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>위쪽 툴팁</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">오른쪽</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>오른쪽 툴팁</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">아래</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>아래쪽 툴팁</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">왼쪽</Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>왼쪽 툴팁</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    for (const position of ["위", "오른쪽", "아래", "왼쪽"]) {
      const trigger = canvas.getByRole("button", { name: position });
      await userEvent.hover(trigger);
      await new Promise((r) => setTimeout(r, 400));
      await userEvent.unhover(trigger);
      await new Promise((r) => setTimeout(r, 200));
    }
  },
};

export const ToolbarWithTooltips: Story = {
  render: () => (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="펜">
            <Pencil className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>펜 (P)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="지우개">
            <Eraser className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>지우개 (E)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="전체 지우기">
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>전체 지우기</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const penButton = canvas.getByRole("button", { name: "펜" });
    await userEvent.hover(penButton);
    await new Promise((r) => setTimeout(r, 500));

    const tooltip = await within(document.body).findByRole("tooltip");
    await expect(tooltip).toHaveTextContent("펜 (P)");
  },
};

export const FocusInteraction: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>포커스 테스트</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>포커스시에도 표시</p>
      </TooltipContent>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    trigger.focus();
    await expect(trigger).toHaveFocus();

    await new Promise((r) => setTimeout(r, 500));
  },
};
