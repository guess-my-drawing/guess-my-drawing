import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  args: {
    onOpenChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Playground: Story = {
  args: {
    defaultOpen: false,
    disabled: false,
  },
  render: (args) => (
    <Collapsible {...args} className="w-[300px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>접기/펼치기</span>
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border p-4 text-sm">
          숨겨진 콘텐츠입니다. 버튼을 클릭하여 토글하세요.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const ToggleInteraction: Story = {
  render: () => (
    <Collapsible className="w-[300px] space-y-2">
      <div className="flex items-center justify-between px-4">
        <span className="text-sm font-semibold">접기/펼치기 테스트</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="토글">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">항상 보이는 항목</div>
      <CollapsibleContent>
        <div className="rounded-md border px-4 py-2 text-sm">숨겨진 항목 1</div>
        <div className="rounded-md border px-4 py-2 text-sm mt-2">숨겨진 항목 2</div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "토글" });

    await expect(canvas.queryByText("숨겨진 항목 1")).not.toBeVisible();

    await userEvent.click(trigger);
    await expect(canvas.getByText("숨겨진 항목 1")).toBeVisible();
    await expect(canvas.getByText("숨겨진 항목 2")).toBeVisible();

    await userEvent.click(trigger);
    await expect(canvas.queryByText("숨겨진 항목 1")).not.toBeVisible();
  },
};

export const KeyboardInteraction: Story = {
  render: () => (
    <Collapsible className="w-[300px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>키보드로 열기</span>
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border p-4 text-sm">
          Enter 또는 Space로 열린 콘텐츠
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "키보드로 열기" });

    trigger.focus();
    await expect(trigger).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(canvas.getByText("Enter 또는 Space로 열린 콘텐츠")).toBeVisible();

    await userEvent.keyboard(" ");
    await expect(canvas.queryByText("Enter 또는 Space로 열린 콘텐츠")).not.toBeVisible();
  },
};

export const ControlledState: Story = {
  render: function ControlledCollapsible() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-[300px] space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>제어된 Collapsible</span>
              <ChevronsUpDown className="size-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="rounded-md border p-4 mt-2 text-sm">
              제어된 상태의 콘텐츠
            </div>
          </CollapsibleContent>
        </Collapsible>
        <p className="text-sm text-muted-foreground">
          상태: {isOpen ? "열림" : "닫힘"}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "제어된 Collapsible" });

    await expect(canvas.getByText("상태: 닫힘")).toBeVisible();

    await userEvent.click(trigger);
    await expect(canvas.getByText("상태: 열림")).toBeVisible();
    await expect(canvas.getByText("제어된 상태의 콘텐츠")).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[300px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>기본 열림</span>
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border p-4 text-sm">처음부터 보이는 콘텐츠</div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("처음부터 보이는 콘텐츠")).toBeVisible();

    const trigger = canvas.getByRole("button", { name: "기본 열림" });
    await userEvent.click(trigger);

    await expect(canvas.queryByText("처음부터 보이는 콘텐츠")).not.toBeVisible();
  },
};

export const MultipleItems: Story = {
  render: () => (
    <Collapsible className="w-[300px] space-y-2">
      <div className="flex items-center justify-between px-4">
        <span className="text-sm font-semibold">플레이어 목록 (4명)</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="플레이어 목록 토글">
            <ChevronsUpDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">Player1 - 1500점</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">Player2 - 1200점</div>
        <div className="rounded-md border px-4 py-2 text-sm">Player3 - 900점</div>
        <div className="rounded-md border px-4 py-2 text-sm">Player4 - 850점</div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "플레이어 목록 토글" });

    await expect(canvas.getByText("Player1 - 1500점")).toBeVisible();
    await expect(canvas.queryByText("Player2 - 1200점")).not.toBeVisible();

    await userEvent.click(trigger);

    await expect(canvas.getByText("Player2 - 1200점")).toBeVisible();
    await expect(canvas.getByText("Player3 - 900점")).toBeVisible();
    await expect(canvas.getByText("Player4 - 850점")).toBeVisible();
  },
};

export const DisabledState: Story = {
  render: () => (
    <Collapsible disabled className="w-[300px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between" disabled>
          <span>비활성 Collapsible</span>
          <ChevronsUpDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-md border p-4 text-sm">이 콘텐츠는 열리지 않습니다</div>
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "비활성 Collapsible" });

    await expect(trigger).toBeDisabled();
    await expect(canvas.queryByText("이 콘텐츠는 열리지 않습니다")).not.toBeVisible();
  },
};
