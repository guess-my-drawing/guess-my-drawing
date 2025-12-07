import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  args: {
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    min: 0,
    step: 1,
    disabled: false,
  },
  render: (args) => (
    <div className="w-[300px]">
      <Slider {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");
    await expect(slider).toBeVisible();
  },
};

export const DragInteraction: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    await expect(slider).toHaveAttribute("aria-valuenow", "50");
  },
};

export const KeyboardInteraction: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} step={10} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    slider.focus();
    await expect(slider).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(slider).toHaveAttribute("aria-valuenow", "60");

    await userEvent.keyboard("{ArrowLeft}");
    await expect(slider).toHaveAttribute("aria-valuenow", "50");

    await userEvent.keyboard("{Home}");
    await expect(slider).toHaveAttribute("aria-valuenow", "0");

    await userEvent.keyboard("{End}");
    await expect(slider).toHaveAttribute("aria-valuenow", "100");
  },
};

export const ControlledValue: Story = {
  render: function ControlledSlider() {
    const [value, setValue] = useState([30]);

    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between text-sm">
          <span>브러시 크기</span>
          <span className="text-muted-foreground">{value[0]}px</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={1} max={50} step={1} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    await expect(canvas.getByText("30px")).toBeVisible();

    slider.focus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByText("31px")).toBeVisible();
  },
};

export const DisabledState: Story = {
  render: () => (
    <div className="w-[300px]">
      <Slider defaultValue={[50]} max={100} disabled />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    await expect(slider).toBeDisabled();
  },
};

export const RangeSlider: Story = {
  render: function RangeSliderComponent() {
    const [range, setRange] = useState([25, 75]);

    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between text-sm">
          <span>범위</span>
          <span className="text-muted-foreground">
            {range[0]} - {range[1]}
          </span>
        </div>
        <Slider value={range} onValueChange={setRange} min={0} max={100} step={5} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const sliders = canvas.getAllByRole("slider");

    await expect(sliders).toHaveLength(2);
    await expect(sliders[0]).toHaveAttribute("aria-valuenow", "25");
    await expect(sliders[1]).toHaveAttribute("aria-valuenow", "75");
  },
};

export const StepInteraction: Story = {
  render: function StepSlider() {
    const [value, setValue] = useState([5]);

    return (
      <div className="w-[300px] space-y-4">
        <div className="flex justify-between text-sm">
          <span>라운드 수</span>
          <span className="text-muted-foreground">{value[0]} 라운드</span>
        </div>
        <Slider value={value} onValueChange={setValue} min={3} max={10} step={1} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const slider = canvas.getByRole("slider");

    slider.focus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByText("6 라운드")).toBeVisible();

    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByText("7 라운드")).toBeVisible();
  },
};
