import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  args: {
    defaultValue: "option1",
    disabled: false,
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="pg-opt1" />
        <Label htmlFor="pg-opt1">옵션 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="pg-opt2" />
        <Label htmlFor="pg-opt2">옵션 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="pg-opt3" />
        <Label htmlFor="pg-opt3">옵션 3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");
    await expect(radios).toHaveLength(3);
  },
};

export const ClickInteraction: Story = {
  render: () => (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option1" id="opt1" />
        <Label htmlFor="opt1">옵션 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option2" id="opt2" />
        <Label htmlFor="opt2">옵션 2</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option3" id="opt3" />
        <Label htmlFor="opt3">옵션 3</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option1 = canvas.getByRole("radio", { name: "옵션 1" });
    const option2 = canvas.getByRole("radio", { name: "옵션 2" });

    await expect(option1).toBeChecked();
    await expect(option2).not.toBeChecked();

    await userEvent.click(option2);
    await expect(option1).not.toBeChecked();
    await expect(option2).toBeChecked();
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <RadioGroup defaultValue="easy">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="easy" id="easy" />
        <Label htmlFor="easy">쉬움</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="normal" id="normal" />
        <Label htmlFor="normal">보통</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="hard" id="hard" />
        <Label htmlFor="hard">어려움</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const easy = canvas.getByRole("radio", { name: "쉬움" });
    const normal = canvas.getByRole("radio", { name: "보통" });
    const hard = canvas.getByRole("radio", { name: "어려움" });

    easy.focus();
    await expect(easy).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    await expect(normal).toHaveFocus();
    await expect(normal).toBeChecked();

    await userEvent.keyboard("{ArrowDown}");
    await expect(hard).toHaveFocus();
    await expect(hard).toBeChecked();
  },
};

export const ControlledState: Story = {
  render: function ControlledRadio() {
    const [value, setValue] = useState("word1");

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue}>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="word1" id="w1" />
            <Label htmlFor="w1">강아지</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="word2" id="w2" />
            <Label htmlFor="w2">고양이</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="word3" id="w3" />
            <Label htmlFor="w3">토끼</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">선택: {value}</p>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("선택: word1")).toBeVisible();

    await userEvent.click(canvas.getByRole("radio", { name: "고양이" }));
    await expect(canvas.getByText("선택: word2")).toBeVisible();
  },
};

export const LabelClickInteraction: Story = {
  render: () => (
    <RadioGroup defaultValue="opt1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="opt1" id="label1" />
        <Label htmlFor="label1">라벨 클릭 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="opt2" id="label2" />
        <Label htmlFor="label2">라벨 클릭 2</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label2 = canvas.getByText("라벨 클릭 2");
    const radio2 = canvas.getByRole("radio", { name: "라벨 클릭 2" });

    await expect(radio2).not.toBeChecked();

    await userEvent.click(label2);
    await expect(radio2).toBeChecked();
  },
};

export const DisabledOption: Story = {
  render: () => (
    <RadioGroup defaultValue="active1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="active1" id="a1" />
        <Label htmlFor="a1">활성 옵션 1</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="disabled" id="dis" disabled />
        <Label htmlFor="dis" className="text-muted-foreground">
          비활성 옵션
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="active2" id="a2" />
        <Label htmlFor="a2">활성 옵션 2</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabled = canvas.getByRole("radio", { name: "비활성 옵션" });

    await expect(disabled).toBeDisabled();

    await userEvent.click(disabled);
    await expect(disabled).not.toBeChecked();
  },
};
