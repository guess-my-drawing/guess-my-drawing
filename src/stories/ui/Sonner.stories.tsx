import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const meta: Meta<typeof Toaster> = {
  title: "UI/Sonner",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Playground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast("기본 토스트")}>기본</Button>
      <Button onClick={() => toast.success("성공 토스트")}>성공</Button>
      <Button onClick={() => toast.error("오류 토스트")} variant="destructive">
        오류
      </Button>
      <Button onClick={() => toast.warning("경고 토스트")} variant="outline">
        경고
      </Button>
      <Button onClick={() => toast.info("정보 토스트")} variant="secondary">
        정보
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
    await expect(buttons).toHaveLength(5);
  },
};

export const ShowToast: Story = {
  render: () => (
    <Button onClick={() => toast("기본 알림 메시지입니다.")}>
      알림 표시
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    const toastElement = await within(document.body).findByText(
      "기본 알림 메시지입니다."
    );
    await expect(toastElement).toBeVisible();
  },
};

export const SuccessToast: Story = {
  render: () => (
    <Button onClick={() => toast.success("성공적으로 완료되었습니다!")}>
      성공 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    const toastElement = await within(document.body).findByText(
      "성공적으로 완료되었습니다!"
    );
    await expect(toastElement).toBeVisible();
  },
};

export const ErrorToast: Story = {
  render: () => (
    <Button variant="destructive" onClick={() => toast.error("오류가 발생했습니다.")}>
      오류 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    const toastElement = await within(document.body).findByText(
      "오류가 발생했습니다."
    );
    await expect(toastElement).toBeVisible();
  },
};

export const WarningToast: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast.warning("주의가 필요합니다.")}>
      경고 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    const toastElement = await within(document.body).findByText(
      "주의가 필요합니다."
    );
    await expect(toastElement).toBeVisible();
  },
};

export const InfoToast: Story = {
  render: () => (
    <Button variant="secondary" onClick={() => toast.info("참고 정보입니다.")}>
      정보 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    const toastElement = await within(document.body).findByText(
      "참고 정보입니다."
    );
    await expect(toastElement).toBeVisible();
  },
};

export const LoadingToast: Story = {
  render: () => (
    <Button variant="outline" onClick={() => toast.loading("처리 중...")}>
      로딩 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    const toastElement = await within(document.body).findByText("처리 중...");
    await expect(toastElement).toBeVisible();
  },
};

export const ToastWithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("라운드 종료", {
          description: "다음 라운드가 5초 후에 시작됩니다.",
        })
      }
    >
      설명 포함 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    await expect(
      await within(document.body).findByText("라운드 종료")
    ).toBeVisible();
    await expect(
      within(document.body).getByText("다음 라운드가 5초 후에 시작됩니다.")
    ).toBeVisible();
  },
};

export const ToastWithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("친구 요청", {
          description: "Player456님이 친구 요청을 보냈습니다.",
          action: {
            label: "수락",
            onClick: () => toast.success("친구가 되었습니다!"),
          },
        })
      }
    >
      액션 포함 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    await expect(
      await within(document.body).findByText("친구 요청")
    ).toBeVisible();

    const actionButton = within(document.body).getByRole("button", {
      name: "수락",
    });
    await expect(actionButton).toBeVisible();

    await userEvent.click(actionButton);

    await expect(
      await within(document.body).findByText("친구가 되었습니다!")
    ).toBeVisible();
  },
};

export const PromiseToast: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = new Promise((resolve) => setTimeout(resolve, 1000));
        toast.promise(promise, {
          loading: "연결 중...",
          success: "연결 완료!",
          error: "연결 실패",
        });
      }}
    >
      Promise 알림
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);

    await expect(
      await within(document.body).findByText("연결 중...")
    ).toBeVisible();

    await expect(
      await within(document.body).findByText("연결 완료!", {}, { timeout: 2000 })
    ).toBeVisible();
  },
};

export const DismissToast: Story = {
  render: () => {
    let toastId: string | number;

    return (
      <div className="flex gap-2">
        <Button
          onClick={() => {
            toastId = toast("닫기 테스트 알림", { duration: Infinity });
          }}
        >
          알림 표시
        </Button>
        <Button variant="outline" onClick={() => toast.dismiss(toastId)}>
          닫기
        </Button>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const showButton = canvas.getByRole("button", { name: "알림 표시" });
    const dismissButton = canvas.getByRole("button", { name: "닫기" });

    await userEvent.click(showButton);

    const toastElement = await within(document.body).findByText(
      "닫기 테스트 알림"
    );
    await expect(toastElement).toBeVisible();

    await userEvent.click(dismissButton);

    await new Promise((r) => setTimeout(r, 500));
  },
};

export const DismissAllToasts: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button
        onClick={() => {
          toast("첫 번째 알림", { duration: Infinity });
          toast("두 번째 알림", { duration: Infinity });
          toast("세 번째 알림", { duration: Infinity });
        }}
      >
        여러 알림 표시
      </Button>
      <Button variant="destructive" onClick={() => toast.dismiss()}>
        모두 닫기
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const showButton = canvas.getByRole("button", { name: "여러 알림 표시" });
    const dismissAllButton = canvas.getByRole("button", { name: "모두 닫기" });

    await userEvent.click(showButton);

    await expect(
      await within(document.body).findByText("첫 번째 알림")
    ).toBeVisible();
    await expect(within(document.body).getByText("두 번째 알림")).toBeVisible();
    await expect(within(document.body).getByText("세 번째 알림")).toBeVisible();

    await userEvent.click(dismissAllButton);

    await new Promise((r) => setTimeout(r, 500));
  },
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast.success("정답입니다! +150점")}>
        정답
      </Button>
      <Button variant="destructive" onClick={() => toast.error("틀렸습니다!")}>
        오답
      </Button>
      <Button variant="outline" onClick={() => toast.info("Player123님 입장")}>
        입장
      </Button>
      <Button variant="secondary" onClick={() => toast.warning("10초 남음!")}>
        시간 경고
      </Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "정답" }));
    await expect(
      await within(document.body).findByText("정답입니다! +150점")
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "오답" }));
    await expect(
      await within(document.body).findByText("틀렸습니다!")
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "입장" }));
    await expect(
      await within(document.body).findByText("Player123님 입장")
    ).toBeVisible();

    await userEvent.click(canvas.getByRole("button", { name: "시간 경고" }));
    await expect(
      await within(document.body).findByText("10초 남음!")
    ).toBeVisible();
  },
};
