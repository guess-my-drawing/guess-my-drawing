import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Playground: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>다이얼로그 제목</DialogTitle>
          <DialogDescription>다이얼로그 설명 텍스트입니다.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>다이얼로그 본문 내용</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const OpenCloseInteraction: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>다이얼로그 열기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>테스트 다이얼로그</DialogTitle>
          <DialogDescription>열기/닫기 인터랙션 테스트</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "다이얼로그 열기" });

    await userEvent.click(trigger);

    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(within(dialog).getByText("테스트 다이얼로그")).toBeVisible();

    const closeButton = within(dialog).getByRole("button", { name: "닫기" });
    await userEvent.click(closeButton);

    await expect(dialog).not.toBeVisible();
  },
};

export const EscapeKeyClose: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ESC 테스트</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ESC 키 테스트</DialogTitle>
          <DialogDescription>ESC 키로 닫기 테스트</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);

    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await expect(dialog).not.toBeVisible();
  },
};

export const FormInteraction: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>방 만들기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게임 방</DialogTitle>
          <DialogDescription>방 정보를 입력하세요</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input id="room-name" placeholder="방 이름" />
          <Input id="password" type="password" placeholder="비밀번호 (선택)" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>만들기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("dialog");
    const roomNameInput = within(dialog).getByPlaceholderText("방 이름");
    const passwordInput = within(dialog).getByPlaceholderText("비밀번호 (선택)");

    await userEvent.type(roomNameInput, "재미있는 게임방");
    await expect(roomNameInput).toHaveValue("재미있는 게임방");

    await userEvent.type(passwordInput, "1234");
    await expect(passwordInput).toHaveValue("1234");

    const createButton = within(dialog).getByRole("button", { name: "만들기" });
    await expect(createButton).toBeEnabled();
  },
};

export const FocusTrap: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>포커스 트랩 테스트</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>포커스 트랩</DialogTitle>
          <DialogDescription>Tab 키로 포커스 이동 테스트</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="첫 번째 입력" />
          <Input placeholder="두 번째 입력" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">취소</Button>
          </DialogClose>
          <Button>확인</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("dialog");
    const firstInput = within(dialog).getByPlaceholderText("첫 번째 입력");
    const secondInput = within(dialog).getByPlaceholderText("두 번째 입력");

    firstInput.focus();
    await expect(firstInput).toHaveFocus();

    await userEvent.tab();
    await expect(secondInput).toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
  },
};

export const OverlayClickClose: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>오버레이 클릭 테스트</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>오버레이 테스트</DialogTitle>
          <DialogDescription>배경 클릭시 닫힘 테스트</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("dialog");
    await expect(dialog).toBeVisible();

    const overlay = document.querySelector("[data-state='open'][data-overlay]");
    if (overlay) {
      await userEvent.click(overlay as Element);
    }
  },
};
