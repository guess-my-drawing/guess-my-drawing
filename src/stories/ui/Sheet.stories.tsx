import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Playground: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>시트 열기</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>시트 제목</SheetTitle>
          <SheetDescription>시트 설명 텍스트입니다.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>시트 본문 내용</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">취소</Button>
          </SheetClose>
          <Button>확인</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const OpenCloseInteraction: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>시트 열기</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>테스트 시트</SheetTitle>
          <SheetDescription>열기/닫기 테스트</SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button>닫기</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const sheet = await within(document.body).findByRole("dialog");
    await expect(sheet).toBeVisible();
    await expect(within(sheet).getByText("테스트 시트")).toBeVisible();

    await userEvent.click(within(sheet).getByRole("button", { name: "닫기" }));
    await expect(sheet).not.toBeVisible();
  },
};

export const EscapeKeyClose: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>ESC 테스트</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>ESC 키 테스트</SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const sheet = await within(document.body).findByRole("dialog");
    await expect(sheet).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await expect(sheet).not.toBeVisible();
  },
};

export const FormInteraction: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>설정 열기</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>게임 설정</SheetTitle>
          <SheetDescription>설정을 변경하세요</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="닉네임" />
          <Input placeholder="방 이름" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">취소</Button>
          </SheetClose>
          <Button>저장</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const sheet = await within(document.body).findByRole("dialog");
    const nicknameInput = within(sheet).getByPlaceholderText("닉네임");
    const roomInput = within(sheet).getByPlaceholderText("방 이름");

    await userEvent.type(nicknameInput, "플레이어123");
    await expect(nicknameInput).toHaveValue("플레이어123");

    await userEvent.type(roomInput, "재미있는 방");
    await expect(roomInput).toHaveValue("재미있는 방");
  },
};

export const SideVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">왼쪽</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>왼쪽 시트</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">오른쪽</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>오른쪽 시트</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "왼쪽" }));
    let sheet = await within(document.body).findByRole("dialog");
    await expect(sheet).toBeVisible();
    await userEvent.keyboard("{Escape}");

    await userEvent.click(canvas.getByRole("button", { name: "오른쪽" }));
    sheet = await within(document.body).findByRole("dialog");
    await expect(sheet).toBeVisible();
  },
};

export const FocusTrap: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>포커스 테스트</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>포커스 트랩</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="첫 번째" />
          <Input placeholder="두 번째" />
        </div>
        <SheetFooter>
          <Button>확인</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const sheet = await within(document.body).findByRole("dialog");
    const firstInput = within(sheet).getByPlaceholderText("첫 번째");
    const secondInput = within(sheet).getByPlaceholderText("두 번째");

    firstInput.focus();
    await expect(firstInput).toHaveFocus();

    await userEvent.tab();
    await expect(secondInput).toHaveFocus();
  },
};
