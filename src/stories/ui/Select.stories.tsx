import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {
  args: {
    disabled: false,
  },
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeVisible();
  },
};

export const OpenCloseInteraction: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    await userEvent.click(trigger);

    const listbox = await within(document.body).findByRole("listbox");
    await expect(listbox).toBeVisible();

    const options = within(listbox).getAllByRole("option");
    await expect(options).toHaveLength(3);
  },
};

export const SelectionInteraction: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="카테고리 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="animals">동물</SelectItem>
        <SelectItem value="food">음식</SelectItem>
        <SelectItem value="objects">사물</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    await userEvent.click(trigger);

    const listbox = await within(document.body).findByRole("listbox");
    const foodOption = within(listbox).getByRole("option", { name: "음식" });

    await userEvent.click(foodOption);

    await expect(trigger).toHaveTextContent("음식");
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="라운드 수" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="3">3 라운드</SelectItem>
        <SelectItem value="5">5 라운드</SelectItem>
        <SelectItem value="7">7 라운드</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    trigger.focus();
    await userEvent.keyboard("{Enter}");

    const listbox = await within(document.body).findByRole("listbox");
    await expect(listbox).toBeVisible();

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    await expect(trigger).toHaveTextContent("라운드");
  },
};

export const WithGroupsInteraction: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="단어 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>동물</SelectLabel>
          <SelectItem value="dog">강아지</SelectItem>
          <SelectItem value="cat">고양이</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>음식</SelectLabel>
          <SelectItem value="pizza">피자</SelectItem>
          <SelectItem value="burger">햄버거</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    await userEvent.click(trigger);

    const listbox = await within(document.body).findByRole("listbox");

    await expect(within(listbox).getByText("동물")).toBeVisible();
    await expect(within(listbox).getByText("음식")).toBeVisible();

    await userEvent.click(within(listbox).getByRole("option", { name: "피자" }));
    await expect(trigger).toHaveTextContent("피자");
  },
};

export const DisabledState: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="비활성화됨" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    await expect(trigger).toBeDisabled();
  },
};
