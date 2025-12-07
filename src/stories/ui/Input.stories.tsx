import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  args: {
    placeholder: "입력하세요...",
    type: "text",
    disabled: false,
  },
  argTypes: {
    type: {
      control: "radio",
      options: ["text", "password", "email", "number", "search"],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");
    await expect(input).toBeVisible();
  },
};

export const TypeInteraction: Story = {
  args: {
    placeholder: "입력 테스트",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.type(input, "Hello World");
    await expect(input).toHaveValue("Hello World");
    await expect(args.onChange).toHaveBeenCalled();
  },
};

export const FocusBlurInteraction: Story = {
  args: {
    placeholder: "포커스 테스트",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await expect(input).toHaveFocus();
    await expect(args.onFocus).toHaveBeenCalled();

    await userEvent.tab();
    await expect(input).not.toHaveFocus();
    await expect(args.onBlur).toHaveBeenCalled();
  },
};

export const ClearAndRetype: Story = {
  args: {
    placeholder: "수정 테스트",
    defaultValue: "기존 텍스트",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toHaveValue("기존 텍스트");

    await userEvent.clear(input);
    await expect(input).toHaveValue("");

    await userEvent.type(input, "새로운 텍스트");
    await expect(input).toHaveValue("새로운 텍스트");
  },
};

export const DisabledState: Story = {
  args: {
    placeholder: "비활성화",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await expect(input).toBeDisabled();
  },
};

export const MaxLengthValidation: Story = {
  render: () => <Input placeholder="최대 10자" maxLength={10} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.type(input, "12345678901234567890");
    await expect(input).toHaveValue("1234567890");
  },
};

export const KeyboardSubmit: Story = {
  args: {
    placeholder: "Enter 키 테스트",
    onKeyDown: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.type(input, "테스트 입력");
    await userEvent.keyboard("{Enter}");

    await expect(args.onKeyDown).toHaveBeenCalled();
  },
};

export const PasteInteraction: Story = {
  args: {
    placeholder: "붙여넣기 테스트",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox");

    await userEvent.click(input);
    await userEvent.paste("붙여넣은 텍스트");
    await expect(input).toHaveValue("붙여넣은 텍스트");
  },
};
