"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { Select } from "@/components/primitives/Select";
import { topics } from "@/content/contact";

type Values = { name: string; email: string; topic: string; message: string; website: string };
type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "w-full border border-white/35 bg-transparent p-3.5 text-base text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne aria-[invalid=true]:border-[#ff8a7d] min-[761px]:text-sm";
const labelCls = "text-[10px] font-bold uppercase tracking-[0.11em] text-white/70";
const errCls = "text-xs text-[#ff8a7d]";

function Form() {
  const params = useSearchParams();
  const topicParam = params.get("topic") ?? "";
  const topicValid = topics.some((t) => t.value === topicParam);
  const about = (params.get("about") ?? "").replace(/[^\w\s.&'-]/g, "").slice(0, 80);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      name: "",
      email: "",
      website: "",
      topic: topicValid ? topicParam : "",
      message: about ? `I would like to talk about ${about}.` : "",
    },
  });

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  // Pre-select the topic when someone arrives from a link like /work-with-us?topic=partner
  useEffect(() => {
    if (topicValid) setValue("topic", topicParam);
  }, [topicParam, topicValid, setValue]);

  const onSubmit = async (v: Values) => {
    setStatus("sending");
    setError("");
    const topicLabel = topics.find((t) => t.value === v.topic)?.label ?? v.topic;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Work with us: ${topicLabel}`,
          email: v.email,
          name: v.name,
          website: v.website,
          fields: [
            { label: "Name", value: v.name },
            { label: "Email", value: v.email },
            { label: "I am here to", value: topicLabel },
            { label: "Message", value: v.message },
          ],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setSentTo(v.email);
      reset();
      setStatus("sent");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
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
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-3.5 min-[761px]:grid-cols-2">
      {/* Spam trap: hidden from people, visible to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="wwu-website">Leave this empty</label>
        <input id="wwu-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-[7px]">
        <label htmlFor="wwu-name" className={labelCls}>Name <span aria-hidden="true">*</span></label>
        <input
          id="wwu-name"
          autoComplete="name"
          required
          aria-invalid={errors.name ? true : undefined}
          className={inputCls}
          {...register("name", { required: "Please enter your name" })}
        />
        {errors.name && <span role="alert" className={errCls}>{errors.name.message}</span>}
      </div>

      <div className="grid gap-[7px]">
        <label htmlFor="wwu-email" className={labelCls}>Email <span aria-hidden="true">*</span></label>
        <input
          id="wwu-email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={errors.email ? true : undefined}
          className={inputCls}
          {...register("email", {
            required: "Please enter your email",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
          })}
        />
        {errors.email && <span role="alert" className={errCls}>{errors.email.message}</span>}
      </div>

      <div className="grid gap-[7px] min-[761px]:col-span-2">
        <span id="wwu-topic-label" className={labelCls}>What brings you here? <span aria-hidden="true">*</span></span>
        <Controller
          name="topic"
          control={control}
          rules={{ required: "Please choose one" }}
          render={({ field }) => (
            <Select
              id="wwu-topic"
              labelId="wwu-topic-label"
              options={topics}
              value={field.value}
              onChange={field.onChange}
              required
              invalid={!!errors.topic}
            />
          )}
        />
        {errors.topic && <span role="alert" className={errCls}>{errors.topic.message}</span>}
      </div>

      <div className="grid gap-[7px] min-[761px]:col-span-2">
        <label htmlFor="wwu-message" className={labelCls}>Message <span aria-hidden="true">*</span></label>
        <textarea
          id="wwu-message"
          rows={4}
          required
          aria-invalid={errors.message ? true : undefined}
          className={`${inputCls} min-h-[110px] resize-y`}
          {...register("message", { required: "Tell us a little about it" })}
        />
        {errors.message && <span role="alert" className={errCls}>{errors.message.message}</span>}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-[46px] items-center justify-between gap-3 bg-nyne px-5 py-4 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-[#171717] disabled:opacity-60 min-[761px]:col-span-2"
      >
        {status === "sending" ? "Sending…" : "Send message"}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </button>

      {status === "error" && (
        <p role="alert" className="text-[13px] leading-[1.5] text-[#ff8a7d] min-[761px]:col-span-2">{error}</p>
      )}
      <small className="text-[11px] leading-[1.5] text-white/60 min-[761px]:col-span-2">
        Fields marked * are required. We use your details only to reply. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-white">Privacy Policy</Link>.
      </small>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="min-h-[420px]" aria-hidden />}>
      <Form />
    </Suspense>
  );
}