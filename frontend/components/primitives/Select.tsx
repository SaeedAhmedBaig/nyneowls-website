"use client";

import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";

export type SelectOption = { value: string; label: string; hint?: string };

type Props = {
  id: string;
  labelId: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  variant?: "dark" | "light";
  triggerClassName?: string;
};

export function Select({
  id,
  labelId,
  options,
  value,
  onChange,
  placeholder = "Choose one",
  invalid,
  disabled,
  variant = "dark",
  triggerClassName,
}: Props) {
  const isDark = variant === "dark";

  return (
    <SelectRoot
      value={value || undefined}
      onValueChange={(next) => {
        if (typeof next === "string") onChange(next);
      }}
      itemToStringValue={(next) => options.find((option) => option.value === next)?.label ?? next}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        aria-labelledby={labelId}
        aria-invalid={invalid || undefined}
        className={cn(
          "h-[50px] min-h-[50px] w-full rounded-none border px-3.5 py-3.5 text-left text-base font-normal whitespace-normal transition-colors focus-visible:border-nyne focus-visible:ring-2 focus-visible:ring-nyne/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[#ff8a7d] min-[761px]:text-sm [&_svg]:size-4",
          isDark
            ? "border-white/35 bg-transparent text-white hover:border-white/60 focus-visible:ring-offset-dark data-placeholder:text-white/50 [&_svg]:text-white/75"
            : "border-line bg-paper text-ink hover:border-nyne focus-visible:ring-offset-paper data-placeholder:text-muted-foreground [&_svg]:text-muted-foreground",
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        align="start"
        alignItemWithTrigger={false}
        className={cn(
          "max-w-[calc(100vw-2rem)] rounded-none border py-1 shadow-[0_16px_40px_#00000066] ring-0",
          isDark ? "border-white/20 bg-[#1c1b19] text-white" : "border-line bg-paper text-ink shadow-lg"
        )}
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={cn(
              "min-h-11 cursor-pointer rounded-none px-3.5 py-2.5 text-sm focus:outline-none [&_svg]:text-nyne",
              isDark
                ? "text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white focus:bg-white/10 focus:text-white"
                : "text-ink data-[highlighted]:bg-card data-[highlighted]:text-ink focus:bg-card focus:text-ink [&_svg]:text-nyne-text"
            )}
          >
            <span className="flex min-w-0 flex-col gap-0.5">
              <span>{option.label}</span>
              {option.hint && (
                <span className={cn("text-xs", isDark ? "text-white/55" : "text-muted-foreground")}>
                  {option.hint}
                </span>
              )}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
