import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Playground: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">드롭다운 열기</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>메뉴</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>항목 1</DropdownMenuItem>
        <DropdownMenuItem>항목 2</DropdownMenuItem>
        <DropdownMenuItem>항목 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const OpenCloseInteraction: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>메뉴 열기</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>항목 1</DropdownMenuItem>
        <DropdownMenuItem>항목 2</DropdownMenuItem>
        <DropdownMenuItem>항목 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);

    const menu = await within(document.body).findByRole("menu");
    await expect(menu).toBeVisible();

    const items = within(menu).getAllByRole("menuitem");
    await expect(items).toHaveLength(3);
  },
};

export const ItemClickInteraction: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>선택 테스트</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem data-testid="item-1">항목 1</DropdownMenuItem>
        <DropdownMenuItem data-testid="item-2">항목 2</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const menu = await within(document.body).findByRole("menu");
    const item = within(menu).getByText("항목 1");

    await userEvent.click(item);

    await expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>키보드 테스트</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>첫 번째</DropdownMenuItem>
        <DropdownMenuItem>두 번째</DropdownMenuItem>
        <DropdownMenuItem>세 번째</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    trigger.focus();
    await userEvent.keyboard("{Enter}");

    const menu = await within(document.body).findByRole("menu");
    await expect(menu).toBeVisible();

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");

    await userEvent.keyboard("{Escape}");
    await expect(menu).not.toBeVisible();
  },
};

export const CheckboxInteraction: Story = {
  render: function CheckboxStory() {
    const [checked, setChecked] = useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>체크박스 테스트</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={setChecked}
          >
            효과음
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const menu = await within(document.body).findByRole("menu");
    const checkbox = within(menu).getByRole("menuitemcheckbox");

    await expect(checkbox).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkbox);
  },
};

export const RadioInteraction: Story = {
  render: function RadioStory() {
    const [value, setValue] = useState("light");

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>테마: {value}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>테마 선택</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            <DropdownMenuRadioItem value="light">라이트</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">다크</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">시스템</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const menu = await within(document.body).findByRole("menu");
    const darkOption = within(menu).getByRole("menuitemradio", { name: "다크" });

    await userEvent.click(darkOption);
  },
};

export const SubmenuInteraction: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>서브메뉴 테스트</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>일반 항목</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>친구 초대</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>링크 복사</DropdownMenuItem>
            <DropdownMenuItem>이메일 전송</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const menu = await within(document.body).findByRole("menu");
    const subTrigger = within(menu).getByText("친구 초대");

    await userEvent.hover(subTrigger);

    await new Promise((r) => setTimeout(r, 300));
  },
};
