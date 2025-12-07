import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  args: {
    onCheckedChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  args: {
    disabled: false,
    defaultChecked: false,
  },
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch id="playground" {...args} />
      <Label htmlFor="playground">스위치</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole("switch");
    await expect(switchEl).toBeVisible();
  },
};

export const ClickInteraction: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="test" />
      <Label htmlFor="test">효과음</Label>
    </div>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole("switch");

    await expect(switchEl).toHaveAttribute("aria-checked", "false");

    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute("aria-checked", "true");
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);

    await userEvent.click(switchEl);
    await expect(switchEl).toHaveAttribute("aria-checked", "false");
  },
};

export const KeyboardInteraction: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="keyboard" />
      <Label htmlFor="keyboard">알림</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole("switch");

    switchEl.focus();
    await expect(switchEl).toHaveFocus();

    await userEvent.keyboard(" ");
    await expect(switchEl).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard(" ");
    await expect(switchEl).toHaveAttribute("aria-checked", "false");
  },
};

export const DisabledState: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off">비활성 (꺼짐)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="disabled-on" disabled defaultChecked />
        <Label htmlFor="disabled-on">비활성 (켜짐)</Label>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switches = canvas.getAllByRole("switch");

    for (const s of switches) {
      await expect(s).toBeDisabled();
    }
  },
};

export const ControlledState: Story = {
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Switch
            id="controlled"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <Label htmlFor="controlled">다크 모드</Label>
        </div>
        <p className="text-sm text-muted-foreground">
          상태: {checked ? "켜짐" : "꺼짐"}
        </p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const switchEl = canvas.getByRole("switch");

    await expect(canvas.getByText("상태: 꺼짐")).toBeVisible();

    await userEvent.click(switchEl);
    await expect(canvas.getByText("상태: 켜짐")).toBeVisible();
  },
};

export const LabelClickInteraction: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="label-click" />
      <Label htmlFor="label-click">라벨 클릭 테스트</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("라벨 클릭 테스트");
    const switchEl = canvas.getByRole("switch");

    await expect(switchEl).toHaveAttribute("aria-checked", "false");

    await userEvent.click(label);
    await expect(switchEl).toHaveAttribute("aria-checked", "true");
  },
};
