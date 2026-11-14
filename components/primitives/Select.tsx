"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type SelectOption = { value: string; label: string; hint?: string };

type Props = {
  id: string;
  labelId: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
};

export function Select({ id, labelId, options, value, onChange, placeholder = "Choose one", invalid }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  const openList = () => {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  };
  const choose = (i: number) => {
    onChange(options[i].value);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [open, active, listId]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (open) setActive((a) => Math.min(a + 1, options.length - 1));
        else openList();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (open) setActive((a) => Math.max(a - 1, 0));
        else openList();
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          setActive(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) choose(active);
        else openList();
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}`}
        aria-invalid={invalid || undefined}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className="flex min-h-[50px] w-full items-center justify-between gap-3 border border-white/35 bg-transparent p-3.5 text-left text-base text-white transition-colors hover:border-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne aria-[invalid=true]:border-[#ff8a7d] min-[761px]:text-sm"
      >
        <span className={selected ? "" : "text-white/40"}>{selected?.label ?? placeholder}</span>
        <ChevronDown className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute inset-x-0 z-20 mt-1 max-h-64 overflow-auto border border-white/20 bg-[#1c1b19] py-1 shadow-[0_16px_40px_#00000066]"
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={o.value === value}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3.5 py-2.5 text-white ${
                i === active ? "bg-white/10" : ""
              }`}
            >
              <span>
                <span className="block text-sm font-semibold">{o.label}</span>
                {o.hint && <span className="mt-0.5 block text-xs text-white/55">{o.hint}</span>}
              </span>
              {o.value === value && <Check className="size-4 shrink-0 text-nyne" aria-hidden />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}