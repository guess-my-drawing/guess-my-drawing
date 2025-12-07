import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  args: {
    defaultValue: "tab1",
    className: "w-[400px]",
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3">탭 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">첫 번째 탭 내용</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">두 번째 탭 내용</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">세 번째 탭 내용</div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabs = canvas.getAllByRole("tab");
    await expect(tabs).toHaveLength(3);
  },
};

export const ClickInteraction: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3">탭 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">첫 번째 탭 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">두 번째 탭 콘텐츠</div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">세 번째 탭 콘텐츠</div>
      </TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("첫 번째 탭 콘텐츠")).toBeVisible();

    await userEvent.click(canvas.getByRole("tab", { name: "탭 2" }));
    await expect(canvas.getByText("두 번째 탭 콘텐츠")).toBeVisible();

    await userEvent.click(canvas.getByRole("tab", { name: "탭 3" }));
    await expect(canvas.getByText("세 번째 탭 콘텐츠")).toBeVisible();
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <Tabs defaultValue="rooms" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="rooms">게임 방</TabsTrigger>
        <TabsTrigger value="friends">친구</TabsTrigger>
        <TabsTrigger value="history">전적</TabsTrigger>
      </TabsList>
      <TabsContent value="rooms">게임 방 목록</TabsContent>
      <TabsContent value="friends">친구 목록</TabsContent>
      <TabsContent value="history">전적 기록</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstTab = canvas.getByRole("tab", { name: "게임 방" });

    firstTab.focus();
    await expect(firstTab).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "친구" })).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "전적" })).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "게임 방" })).toHaveFocus();
  },
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="active">활성 탭</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          비활성 탭
        </TabsTrigger>
        <TabsTrigger value="another">다른 탭</TabsTrigger>
      </TabsList>
      <TabsContent value="active">활성 탭 콘텐츠</TabsContent>
      <TabsContent value="disabled">비활성 탭 콘텐츠</TabsContent>
      <TabsContent value="another">다른 탭 콘텐츠</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledTab = canvas.getByRole("tab", { name: "비활성 탭" });

    await expect(disabledTab).toBeDisabled();

    await userEvent.click(disabledTab);
    await expect(canvas.getByText("활성 탭 콘텐츠")).toBeVisible();
  },
};

export const AriaAttributes: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList aria-label="게임 설정 탭">
        <TabsTrigger value="tab1">일반</TabsTrigger>
        <TabsTrigger value="tab2">소리</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">일반 설정</TabsContent>
      <TabsContent value="tab2">소리 설정</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabList = canvas.getByRole("tablist");

    await expect(tabList).toHaveAttribute("aria-label", "게임 설정 탭");

    const selectedTab = canvas.getByRole("tab", { name: "일반" });
    await expect(selectedTab).toHaveAttribute("aria-selected", "true");

    const unselectedTab = canvas.getByRole("tab", { name: "소리" });
    await expect(unselectedTab).toHaveAttribute("aria-selected", "false");
  },
};
