import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Pencil, Eraser, PaintBucket, Bold, Italic, Underline } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {
  args: {
    disabled: false,
    defaultPressed: false,
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "outline"],
    },
    size: {
      control: "radio",
      options: ["default", "sm", "lg"],
    },
  },
  render: (args) => (
    <Toggle aria-label="굵게" {...args}>
      <Bold className="size-4" />
    </Toggle>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");
    await expect(toggle).toBeVisible();
  },
};

export const ClickInteraction: Story = {
  args: {
    onPressedChange: fn(),
  },
  render: (args) => (
    <Toggle {...args} aria-label="굵게">
      <Bold className="size-4" />
    </Toggle>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");

    await expect(toggle).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(args.onPressedChange).toHaveBeenCalledWith(true);

    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};

export const KeyboardInteraction: Story = {
  render: () => (
    <Toggle aria-label="기울임">
      <Italic className="size-4" />
    </Toggle>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button");

    toggle.focus();
    await expect(toggle).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    await userEvent.keyboard(" ");
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};

export const SingleSelectionGroup: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="pencil">
      <ToggleGroupItem value="pencil" aria-label="펜">
        <Pencil className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="eraser" aria-label="지우개">
        <Eraser className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="fill" aria-label="채우기">
        <PaintBucket className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pencil = canvas.getByRole("radio", { name: "펜" });
    const eraser = canvas.getByRole("radio", { name: "지우개" });

    await expect(pencil).toHaveAttribute("aria-checked", "true");
    await expect(eraser).toHaveAttribute("aria-checked", "false");

    await userEvent.click(eraser);
    await expect(pencil).toHaveAttribute("aria-checked", "false");
    await expect(eraser).toHaveAttribute("aria-checked", "true");
  },
};

export const MultipleSelectionGroup: Story = {
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="굵게">
        <Bold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="기울임">
        <Italic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="밑줄">
        <Underline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bold = canvas.getByRole("button", { name: "굵게" });
    const italic = canvas.getByRole("button", { name: "기울임" });

    await userEvent.click(bold);
    await expect(bold).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(italic);
    await expect(bold).toHaveAttribute("aria-pressed", "true");
    await expect(italic).toHaveAttribute("aria-pressed", "true");

    await userEvent.click(bold);
    await expect(bold).toHaveAttribute("aria-pressed", "false");
    await expect(italic).toHaveAttribute("aria-pressed", "true");
  },
};

export const GroupKeyboardNavigation: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="pencil">
      <ToggleGroupItem value="pencil" aria-label="펜">
        <Pencil className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="eraser" aria-label="지우개">
        <Eraser className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="fill" aria-label="채우기">
        <PaintBucket className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const pencil = canvas.getByRole("radio", { name: "펜" });
    const eraser = canvas.getByRole("radio", { name: "지우개" });

    pencil.focus();
    await expect(pencil).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(eraser).toHaveFocus();
  },
};

export const DisabledState: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="pencil">
      <ToggleGroupItem value="pencil" aria-label="펜">
        <Pencil className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="eraser" aria-label="지우개" disabled>
        <Eraser className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const eraser = canvas.getByRole("radio", { name: "지우개" });

    await expect(eraser).toBeDisabled();
  },
};
