import type { CustomFlowbiteTheme } from "flowbite-react";
import { Tooltip } from "flowbite-react";

const customTheme: CustomFlowbiteTheme["tooltip"] = {
  target: "w-fit",
  animation: "transition-opacity",
  arrow: {
    base: "absolute z-10 h-2 w-2 rotate-45",
    style: {
      dark: "bg-neutral-50 dark:text-white text-neutral-700 dark:bg-neutral-900",
      light: "bg-white",
      auto: "bg-white dark:bg-gray-700",
    },
    placement: "-4px",
  },
  base: "absolute z-10 inline-block rounded-lg px-3 py-1 text-sm font-medium shadow-sm",
  hidden: "invisible opacity-0",
  style: {
    dark: "bg-neutral-50 dark:text-white text-neutral-700 dark:bg-neutral-900 w-32 items-center  flex justify-center",
    light: "border border-gray-200 bg-white text-gray-900",
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-gray-800 dark:text-white",
  },
  content: "relative z-20",
};

export default function TooltipComponent({
  children,
  content,
  placement,
  trigger,
  arrow,
}: {
  children: React.ReactNode;
  content: string;
  trigger?: "hover" | "click";
  placement?: "top" | "right" | "bottom" | "left";
  arrow?: boolean;
}) {
  return (
    <Tooltip
      content={content}
      trigger={trigger}
      theme={customTheme}
      placement={placement}
      arrow={arrow}
    >
      {children}
    </Tooltip>
  );
}
