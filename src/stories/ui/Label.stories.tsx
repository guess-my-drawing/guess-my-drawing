import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  args: {
    children: "라벨 텍스트",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("라벨 텍스트");

    await expect(label).toBeVisible();
  },
};

export const Default: Story = {
  render: () => <Label>기본 라벨</Label>,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("기본 라벨")).toBeVisible();
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="nickname">닉네임</Label>
      <Input type="text" id="nickname" placeholder="닉네임을 입력하세요" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("닉네임");
    const input = canvas.getByPlaceholderText("닉네임을 입력하세요");

    await expect(label).toBeVisible();

    await userEvent.click(label);
    await expect(input).toHaveFocus();
  },
};

export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="sound" />
      <Label htmlFor="sound">효과음</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText("효과음");
    const switchEl = canvas.getByRole("switch");

    await expect(label).toBeVisible();
    await expect(switchEl).not.toBeChecked();

    await userEvent.click(label);
    await expect(switchEl).toBeChecked();
  },
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="roomName">
        방 이름 <span className="text-destructive">*</span>
      </Label>
      <Input type="text" id="roomName" placeholder="방 이름을 입력하세요" required />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("방 이름")).toBeVisible();
    await expect(canvas.getByText("*")).toBeVisible();
  },
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">비밀번호</Label>
      <Input type="password" id="password" placeholder="비밀번호" />
      <p className="text-sm text-muted-foreground">비밀번호는 8자 이상이어야 합니다.</p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("비밀번호")).toBeVisible();
    await expect(canvas.getByText("비밀번호는 8자 이상이어야 합니다.")).toBeVisible();
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5 group" data-disabled="true">
      <Label htmlFor="disabled-input">비활성화된 입력</Label>
      <Input type="text" id="disabled-input" placeholder="입력 불가" disabled />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("입력 불가");

    await expect(input).toBeDisabled();
  },
};

export const GameSettings: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="rounds">라운드 수</Label>
        <Input type="number" id="rounds" defaultValue={5} min={1} max={10} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="time">제한 시간 (초)</Label>
        <Input type="number" id="time" defaultValue={60} min={30} max={180} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="maxPlayers">최대 인원</Label>
        <Input type="number" id="maxPlayers" defaultValue={8} min={2} max={16} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("라운드 수")).toBeVisible();
    await expect(canvas.getByText("제한 시간 (초)")).toBeVisible();
    await expect(canvas.getByText("최대 인원")).toBeVisible();
  },
};

export const WithIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="search" className="flex items-center gap-2">
        <span>🔍</span>
        <span>검색</span>
      </Label>
      <Input type="search" id="search" placeholder="단어 검색..." />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("검색")).toBeVisible();
  },
};

export const FormExample: Story = {
  render: () => (
    <form className="w-[350px] space-y-6">
      <div className="space-y-4">
        <div className="grid gap-1.5">
          <Label htmlFor="form-nickname">
            닉네임 <span className="text-destructive">*</span>
          </Label>
          <Input id="form-nickname" placeholder="게임에서 사용할 닉네임" />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="form-public" />
          <Label htmlFor="form-public">공개 방으로 만들기</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="form-sound" defaultChecked />
          <Label htmlFor="form-sound">효과음 켜기</Label>
        </div>
      </div>
    </form>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("닉네임")).toBeVisible();
    await expect(canvas.getByText("공개 방으로 만들기")).toBeVisible();
    await expect(canvas.getByText("효과음 켜기")).toBeVisible();
  },
};
