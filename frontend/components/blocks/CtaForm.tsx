"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ArrowUpRight, Check } from "lucide-react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Select } from "@/components/primitives/Select";

export type Field = {
  id: string;
  label: string;
  type: "text" | "email" | "area" | "select";
  options?: string[];
  full?: boolean;
  required?: boolean;
};

type Values = Record<string, string>;
type Status = "idle" | "sending" | "sent" | "error";

const controlClass =
  "w-full border border-white/35 bg-transparent p-3.5 text-base text-white placeholder:text-white/40 focus:outline-2 focus:outline-offset-2 focus:outline-nyne min-[761px]:text-sm";

export function CtaForm({
  id,
  eyebrow,
  title,
  text,
  fields,
  button,
  subject,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text: string;
  fields: Field[];
  button: string;
  subject: string;
}) {
  const defaultValues = fields.reduce<Values>((values, field) => {
    if (field.type === "select") values[field.id] = field.options?.[0] ?? "";
    return values;
  }, {});
  const { register, control: formControl, handleSubmit, reset, formState } = useForm<Values>({ defaultValues });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const onSubmit = async (values: Values) => {
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          email: values.e,
          name: values.n,
          website: values.website,
          fields: fields.map((f) => ({ label: f.label, value: values[f.id] ?? "" })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setSentTo(values.e);
      reset();
      setStatus("sent");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section id={id} className="py-[clamp(56px,8vw,104px)]">
      <div className="wrap">
        <Reveal className="grid items-center gap-[clamp(28px,5vw,72px)] bg-dark p-6 text-white min-[761px]:p-[clamp(28px,5vw,72px)] min-[901px]:grid-cols-[.9fr_1.1fr]">
          <div>
            <Eyebrow className="!text-white">{eyebrow}</Eyebrow>
            <h2 className="text-[clamp(32px,4.4vw,60px)] font-bold leading-[1.03] tracking-[-0.04em]">
              {title}
              <span className="text-nyne">.</span>
            </h2>
            <p className="mt-[18px] max-w-[430px] text-sm leading-[1.75] text-white/70">{text}</p>
          </div>

          {status === "sent" ? (
            <div role="status" className="border border-white/20 p-6 min-[761px]:p-8">
              <span className="mb-4 grid size-10 place-items-center bg-nyne">
                <Check className="size-5" aria-hidden />
              </span>
              <h3 className="text-xl font-bold tracking-[-0.03em]">Thank you. We have your message.</h3>
              <p className="mt-2.5 text-sm leading-[1.7] text-white/70">
                We will reply to {sentTo} with next steps. If you do not hear from us, check your spam folder.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-5 text-xs font-bold underline underline-offset-4 hover:text-nyne"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-3.5 min-[761px]:grid-cols-2">
              {/* Spam trap: hidden from people, visible to bots */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor={`${id}-website`}>Leave this empty</label>
                <input id={`${id}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              {fields.map((f) => {
                const fieldId = `${id ?? "cta"}-${f.id}`;
                const labelId = `${fieldId}-label`;
                return (
                  <div key={f.id} className={`grid min-w-0 gap-[7px] ${f.full ? "min-[761px]:col-span-2" : ""}`}>
                    <label id={labelId} htmlFor={fieldId} className="text-[10px] font-bold uppercase tracking-[0.11em] text-white/70">
                      {f.label}
                    </label>
                    {f.type === "select" ? (
                      <Controller
                        name={f.id}
                        control={formControl}
                        render={({ field }) => (
                          <Select
                            id={fieldId}
                            labelId={labelId}
                            options={(f.options ?? []).map((option) => ({ value: option, label: option }))}
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            variant="dark"
                            disabled={!f.options?.length}
                          />
                        )}
                      />
                    ) : f.type === "area" ? (
                      <textarea id={fieldId} className={`${controlClass} min-h-[90px] resize-y`} {...register(f.id)} />
                    ) : (
                      <input
                        id={fieldId}
                        type={f.type}
                        autoComplete={f.type === "email" ? "email" : f.id === "n" ? "name" : undefined}
                        aria-invalid={formState.errors[f.id] ? true : undefined}
                        className={controlClass}
                        {...register(f.id, {
                          required: f.type === "email" || f.required ? "Required" : false,
                          pattern: f.type === "email" ? { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" } : undefined,
                        })}
                      />
                    )}
                    {formState.errors[f.id] && (
                      <span role="alert" className="text-xs text-[#ff8a7d]">
                        {formState.errors[f.id]?.message as string}
                      </span>
                    )}
                  </div>
                );
              })}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex min-h-[46px] items-center justify-between gap-3 bg-nyne px-5 py-4 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#171717] disabled:opacity-60 min-[761px]:col-span-2"
              >
                {status === "sending" ? "Sending…" : button}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </button>

              {status === "error" && (
                <p role="alert" className="text-[13px] leading-[1.5] text-[#ff8a7d] min-[761px]:col-span-2">
                  {error}
                </p>
              )}
              <small className="text-[11px] leading-[1.5] text-white/60 min-[761px]:col-span-2">
                We use your details only to reply to this message.
              </small>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}