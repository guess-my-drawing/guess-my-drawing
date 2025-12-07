import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { useState } from "react";

const meta: Meta<typeof ContextMenu> = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Playground: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        우클릭하여 메뉴 열기
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuLabel>메뉴</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuItem>항목 1</ContextMenuItem>
        <ContextMenuItem>항목 2</ContextMenuItem>
        <ContextMenuItem>항목 3</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("우클릭하여 메뉴 열기");
    await expect(trigger).toBeVisible();
  },
};

export const RightClickInteraction: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        우클릭 테스트
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>항목 1</ContextMenuItem>
        <ContextMenuItem>항목 2</ContextMenuItem>
        <ContextMenuItem>항목 3</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("우클릭 테스트");

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    const menu = await within(document.body).findByRole("menu");
    await expect(menu).toBeVisible();
    await expect(within(menu).getByText("항목 1")).toBeVisible();
  },
};

export const MenuItemClick: Story = {
  args: {
    onOpenChange: fn(),
  },
  render: () => {
    const handleClick = fn();

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          메뉴 항목 클릭
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem onSelect={handleClick}>클릭 항목</ContextMenuItem>
          <ContextMenuItem>다른 항목</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("메뉴 항목 클릭");

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    const menuItem = await within(document.body).findByText("클릭 항목");
    await userEvent.click(menuItem);

    await expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        키보드 네비게이션
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>첫 번째</ContextMenuItem>
        <ContextMenuItem>두 번째</ContextMenuItem>
        <ContextMenuItem>세 번째</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("키보드 네비게이션");

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    await within(document.body).findByRole("menu");

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");

    await userEvent.keyboard("{Escape}");
    await expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
  },
};

export const CheckboxItems: Story = {
  render: function CheckboxContextMenu() {
    const [showGrid, setShowGrid] = useState(true);
    const [showGuide, setShowGuide] = useState(false);

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          체크박스 메뉴
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuLabel>보기 옵션</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
            격자 표시
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showGuide} onCheckedChange={setShowGuide}>
            가이드 표시
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("체크박스 메뉴");

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    const gridItem = await within(document.body).findByRole("menuitemcheckbox", {
      name: "격자 표시",
    });
    const guideItem = within(document.body).getByRole("menuitemcheckbox", {
      name: "가이드 표시",
    });

    await expect(gridItem).toHaveAttribute("aria-checked", "true");
    await expect(guideItem).toHaveAttribute("aria-checked", "false");

    await userEvent.click(guideItem);

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });
    const updatedGuide = await within(document.body).findByRole("menuitemcheckbox", {
      name: "가이드 표시",
    });
    await expect(updatedGuide).toHaveAttribute("aria-checked", "true");
  },
};

export const RadioItems: Story = {
  render: function RadioContextMenu() {
    const [tool, setTool] = useState("pencil");

    return (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          라디오 메뉴 (현재: {tool})
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuLabel>도구 선택</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value={tool} onValueChange={setTool}>
            <ContextMenuRadioItem value="pencil">펜</ContextMenuRadioItem>
            <ContextMenuRadioItem value="eraser">지우개</ContextMenuRadioItem>
            <ContextMenuRadioItem value="fill">채우기</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/현재: pencil/)).toBeVisible();

    const trigger = canvas.getByText(/라디오 메뉴/);
    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    const eraserItem = await within(document.body).findByRole("menuitemradio", {
      name: "지우개",
    });
    await userEvent.click(eraserItem);

    await expect(canvas.getByText(/현재: eraser/)).toBeVisible();
  },
};

export const SubMenuInteraction: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        서브메뉴 테스트
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>일반 항목</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>더 보기</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>서브 항목 1</ContextMenuItem>
            <ContextMenuItem>서브 항목 2</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("서브메뉴 테스트");

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    const subTrigger = await within(document.body).findByText("더 보기");
    await userEvent.hover(subTrigger);

    await new Promise((r) => setTimeout(r, 300));

    const subItem = await within(document.body).findByText("서브 항목 1");
    await expect(subItem).toBeVisible();
  },
};

export const DisabledItem: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        비활성 항목 테스트
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>활성 항목</ContextMenuItem>
        <ContextMenuItem disabled>비활성 항목</ContextMenuItem>
        <ContextMenuItem>활성 항목 2</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("비활성 항목 테스트");

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    const disabledItem = await within(document.body).findByText("비활성 항목");
    await expect(disabledItem).toHaveAttribute("aria-disabled", "true");
  },
};

export const WithShortcuts: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        단축키 표시
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          실행 취소
          <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          다시 실행
          <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          저장
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText("단축키 표시");

    await userEvent.pointer({ keys: "[MouseRight]", target: trigger });

    await within(document.body).findByRole("menu");
    await expect(within(document.body).getByText("⌘Z")).toBeVisible();
    await expect(within(document.body).getByText("⇧⌘Z")).toBeVisible();
  },
};
