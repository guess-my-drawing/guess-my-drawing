import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Playground: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">팝오버 열기</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium">팝오버 제목</h4>
          <p className="text-sm text-muted-foreground">
            팝오버 내용입니다. 다양한 컨텐츠를 담을 수 있습니다.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeVisible();
  },
};

export const OpenCloseInteraction: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>팝오버 열기</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>팝오버 콘텐츠</p>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");

    await userEvent.click(trigger);

    const popover = await within(document.body).findByText("팝오버 콘텐츠");
    await expect(popover).toBeVisible();

    await userEvent.click(trigger);
  },
};

export const FormInteraction: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">설정</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h4 className="font-medium">캔버스 설정</h4>
          <div className="grid gap-2">
            <Input placeholder="너비" defaultValue="800" />
            <Input placeholder="높이" defaultValue="600" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const widthInput = await within(document.body).findByPlaceholderText("너비");
    const heightInput = within(document.body).getByPlaceholderText("높이");

    await userEvent.clear(widthInput);
    await userEvent.type(widthInput, "1024");
    await expect(widthInput).toHaveValue("1024");

    await userEvent.clear(heightInput);
    await userEvent.type(heightInput, "768");
    await expect(heightInput).toHaveValue("768");
  },
};

export const ColorPickerInteraction: Story = {
  render: function ColorPicker() {
    const [color, setColor] = useState("#000000");
    const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"];

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <div
              className="size-4 rounded border"
              style={{ backgroundColor: color }}
            />
            색상 선택
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <div className="grid grid-cols-4 gap-2">
            {colors.map((c) => (
              <button
                key={c}
                data-testid={`color-${c}`}
                className="size-8 rounded border-2"
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const redButton = await within(document.body).findByTestId("color-#FF0000");
    await userEvent.click(redButton);
  },
};

export const EscapeKeyClose: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>ESC 테스트</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>ESC 키로 닫기</p>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const content = await within(document.body).findByText("ESC 키로 닫기");
    await expect(content).toBeVisible();

    await userEvent.keyboard("{Escape}");
  },
};

export const OutsideClickClose: Story = {
  render: () => (
    <div className="p-20">
      <Popover>
        <PopoverTrigger asChild>
          <Button>외부 클릭 테스트</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p>외부 클릭시 닫힘</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));

    const content = await within(document.body).findByText("외부 클릭시 닫힘");
    await expect(content).toBeVisible();

    await userEvent.click(canvasElement);
  },
};
