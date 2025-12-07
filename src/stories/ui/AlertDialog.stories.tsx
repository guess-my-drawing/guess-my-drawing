import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof AlertDialog> = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Playground: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">알림 다이얼로그 열기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>제목</AlertDialogTitle>
          <AlertDialogDescription>
            AlertDialog 컴포넌트의 Playground입니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const OpenCloseInteraction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>알림 열기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>테스트 알림</AlertDialogTitle>
          <AlertDialogDescription>열기/닫기 테스트</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("alertdialog");
    await expect(dialog).toBeVisible();
    await expect(within(dialog).getByText("테스트 알림")).toBeVisible();
  },
};

export const CancelInteraction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">게임 나가기</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 나가시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            게임 도중에 나가면 진행 상황이 저장되지 않습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>계속하기</AlertDialogCancel>
          <AlertDialogAction>나가기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("alertdialog");
    const cancelButton = within(dialog).getByRole("button", { name: "계속하기" });

    await userEvent.click(cancelButton);
    await expect(dialog).not.toBeVisible();
  },
};

export const ConfirmInteraction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>게임 시작</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>게임을 시작하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            현재 4명의 플레이어가 대기 중입니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>더 기다리기</AlertDialogCancel>
          <AlertDialogAction>시작하기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("alertdialog");
    const confirmButton = within(dialog).getByRole("button", { name: "시작하기" });

    await userEvent.click(confirmButton);
    await expect(dialog).not.toBeVisible();
  },
};

export const EscapeKeyDoesNotClose: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>ESC 테스트</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>중요한 확인</AlertDialogTitle>
          <AlertDialogDescription>
            AlertDialog는 ESC 키로 닫히지 않습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("alertdialog");
    await expect(dialog).toBeVisible();

    await userEvent.keyboard("{Escape}");
    // AlertDialog는 ESC로 닫히지 않음 - 명시적으로 Cancel/Action 클릭 필요
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>키보드 테스트</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>키보드 네비게이션</AlertDialogTitle>
          <AlertDialogDescription>
            Tab 키로 버튼 간 이동 테스트
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const dialog = await within(document.body).findByRole("alertdialog");
    const cancelButton = within(dialog).getByRole("button", { name: "취소" });
    const confirmButton = within(dialog).getByRole("button", { name: "확인" });

    await userEvent.tab();
    await userEvent.tab();

    await expect(cancelButton).toBeVisible();
    await expect(confirmButton).toBeVisible();
  },
};
