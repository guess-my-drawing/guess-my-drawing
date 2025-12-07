import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta: Meta<typeof ToggleGroup> = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["single", "multiple"],
    },
    variant: {
      control: "radio",
      options: ["default", "outline"],
    },
    size: {
      control: "radio",
      options: ["default", "sm", "lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Playground: Story = {
  args: {
    type: "single",
    variant: "default",
    size: "default",
    disabled: false,
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="가운데 정렬">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("radio");

    await expect(items).toHaveLength(3);
    for (const item of items) {
      await expect(item).toBeVisible();
    }
  },
};

export const SingleSelection: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="가운데 정렬">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("radio");

    const centerItem = items[1];
    await expect(centerItem).toHaveAttribute("data-state", "on");

    await userEvent.click(items[0]);
    await expect(items[0]).toHaveAttribute("data-state", "on");
    await expect(centerItem).toHaveAttribute("data-state", "off");

    await userEvent.click(items[2]);
    await expect(items[2]).toHaveAttribute("data-state", "on");
    await expect(items[0]).toHaveAttribute("data-state", "off");
  },
};

export const MultipleSelection: Story = {
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
    const items = canvas.getAllByRole("button");

    await userEvent.click(items[0]);
    await expect(items[0]).toHaveAttribute("data-state", "on");

    await userEvent.click(items[1]);
    await expect(items[0]).toHaveAttribute("data-state", "on");
    await expect(items[1]).toHaveAttribute("data-state", "on");

    await userEvent.click(items[2]);
    await expect(items[0]).toHaveAttribute("data-state", "on");
    await expect(items[1]).toHaveAttribute("data-state", "on");
    await expect(items[2]).toHaveAttribute("data-state", "on");

    await userEvent.click(items[1]);
    await expect(items[1]).toHaveAttribute("data-state", "off");
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <ToggleGroup type="single">
      <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="가운데 정렬">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("radio");

    items[0].focus();
    await expect(items[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(items[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(items[2]).toHaveFocus();

    await userEvent.keyboard(" ");
    await expect(items[2]).toHaveAttribute("data-state", "on");
  },
};

export const VariantOutline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline">
      <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="가운데 정렬">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole("group");

    await expect(group).toHaveAttribute("data-variant", "outline");
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
          <AlignLeft className="size-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="가운데 정렬">
          <AlignCenter className="size-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
          <AlignRight className="size-3" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="default">
        <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
          <AlignLeft className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="가운데 정렬">
          <AlignCenter className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
          <AlignRight className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
          <AlignLeft className="size-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="가운데 정렬">
          <AlignCenter className="size-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
          <AlignRight className="size-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole("group");

    await expect(groups).toHaveLength(3);
    await expect(groups[0]).toHaveAttribute("data-size", "sm");
    await expect(groups[1]).toHaveAttribute("data-size", "default");
    await expect(groups[2]).toHaveAttribute("data-size", "lg");
  },
};

export const DisabledGroup: Story = {
  render: () => (
    <ToggleGroup type="single" disabled>
      <ToggleGroupItem value="left" aria-label="왼쪽 정렬">
        <AlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="가운데 정렬">
        <AlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="오른쪽 정렬">
        <AlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("radio");

    for (const item of items) {
      await expect(item).toBeDisabled();
    }
  },
};
