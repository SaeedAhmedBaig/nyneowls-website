"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import type { BlogCitation, BlogPost } from "@backend/blog/database";
import { saveBlogPost, type BlogActionState } from "@backend/blog/actions";
import { Select } from "@/components/primitives/Select";

type CitationFormValue = Pick<
  BlogCitation,
  "order_index" | "title" | "author" | "publisher" | "url" | "published_at" | "accessed_at"
> & { key: string };
type CitationField = Exclude<keyof CitationFormValue, "key" | "order_index">;

const initialState: BlogActionState = {};
const inputClass =
  "h-[50px] w-full border border-line bg-paper px-3.5 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne";
const textareaClass =
  "w-full resize-y border border-line bg-paper px-3.5 py-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nyne";
const labelClass = "grid gap-2 text-xs font-semibold";
const toolbarClass =
  "min-h-9 border border-line px-2.5 text-xs font-semibold transition-colors hover:bg-card disabled:opacity-40";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120)
    .replace(/-$/, "");
}

function EditorToolbar({
  editor,
  citationNumbers,
  citationNumber,
  onCitationNumberChange,
}: {
  editor: Editor | null;
  citationNumbers: number[];
  citationNumber: number;
  onCitationNumberChange: (value: number) => void;
}) {
  if (!editor) return null;

  const toggleButton = (label: string, active: boolean, onClick: () => void) => (
    <button
      type="button"
      aria-pressed={active}
      className={`${toolbarClass} ${active ? "border-nyne text-nyne-text" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div role="toolbar" aria-label="Article formatting" className="flex flex-wrap gap-2 border-b border-line p-3">
      {toggleButton("Bold", editor.isActive("bold"), () => editor.chain().focus().toggleBold().run())}
      {toggleButton("Italic", editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run())}
      {toggleButton("H2", editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run())}
      {toggleButton("H3", editor.isActive("heading", { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run())}
      {toggleButton("Bullets", editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run())}
      {toggleButton("Numbered list", editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run())}
      {toggleButton("Quote", editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run())}
      <button
        type="button"
        className={toolbarClass}
        onClick={() => {
          const href = window.prompt("Link URL (https:// or mailto:)");
          if (!href) return;
          editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
        }}
      >
        Add link
      </button>
      <div className="flex items-center gap-1 border border-line px-2 text-xs">
        <span id="citation-number-label">Source</span>
        <Select
          id="citation-number"
          labelId="citation-number-label"
          options={citationNumbers.map((number) => ({ value: String(number), label: String(number) }))}
          value={citationNumbers.length ? String(citationNumber) : ""}
          onChange={(value) => onCitationNumberChange(Number(value))}
          placeholder="-"
          disabled={!citationNumbers.length}
          variant="light"
          triggerClassName="h-8 min-h-8 w-[72px] px-2 py-1 text-xs"
        />
      </div>
      <button
        type="button"
        className={toolbarClass}
        disabled={!citationNumbers.length}
        title="Insert a link to the selected source"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertContent(`<a href="#source-${citationNumber}">[${citationNumber}]</a>`)
            .run()
        }
      >
        Insert citation
      </button>
      <button type="button" className={toolbarClass} onClick={() => editor.chain().focus().undo().run()}>
        Undo
      </button>
      <button type="button" className={toolbarClass} onClick={() => editor.chain().focus().redo().run()}>
        Redo
      </button>
    </div>
  );
}

function CitationFields({
  values,
  onChange,
  onRemove,
}: {
  values: CitationFormValue[];
  onChange: (key: string, field: CitationField, value: string) => void;
  onRemove: (key: string) => void;
}) {
  return (
    <div className="grid gap-4">
      {values.map((citation) => (
        <fieldset key={citation.key} className="grid gap-4 border border-line p-4">
          <legend className="px-2 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground">
            Source {citation.order_index + 1}
          </legend>
          <div className="grid gap-4 min-[761px]:grid-cols-2">
            {([
              ["title", "Source title"],
              ["author", "Author"],
              ["publisher", "Publisher or website"],
              ["url", "Source URL"],
              ["published_at", "Publication date"],
              ["accessed_at", "Date accessed"],
            ] as const).map(([field, label]) => (
              <label key={field} className={labelClass}>
                {label}
                <input
                  className={inputClass}
                  type={field.endsWith("_at") ? "date" : "text"}
                  value={citation[field] ?? ""}
                  onChange={(event) => onChange(citation.key, field, event.target.value)}
                  required={field === "title" || field === "url"}
                  aria-label={`${label}, source ${citation.order_index + 1}`}
                />
              </label>
            ))}
          </div>
          <button
            type="button"
            className="justify-self-start text-xs font-semibold text-nyne-text underline underline-offset-4"
            onClick={() => onRemove(citation.key)}
          >
            Remove source
          </button>
        </fieldset>
      ))}
    </div>
  );
}

export function BlogEditor({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(saveBlogPost, initialState);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(post));
  const [bodyHtml, setBodyHtml] = useState(post?.body_html ?? "<p></p>");
  const [citationNumber, setCitationNumber] = useState(
    post?.citations[0] ? post.citations[0].order_index + 1 : 1
  );
  const [citationError, setCitationError] = useState("");
  const [publicationStatus, setPublicationStatus] = useState<BlogPost["status"]>(post?.status ?? "draft");
  const [citations, setCitations] = useState<CitationFormValue[]>(
    () =>
      post?.citations.map((citation) => ({
        key: citation.id,
        order_index: citation.order_index,
        title: citation.title,
        author: citation.author,
        publisher: citation.publisher,
        url: citation.url,
        published_at: citation.published_at ?? "",
        accessed_at: citation.accessed_at ?? "",
      })) ?? []
  );
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        link: false,
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https", "mailto"],
      }),
    ],
    []
  );
  const editor = useEditor({
    extensions,
    content: post?.body_html ?? "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => setBodyHtml(currentEditor.getHTML()),
    editorProps: {
      attributes: {
        class: "blog-editor-content",
        "aria-label": "Article body",
      },
    },
  });

  useEffect(() => {
    if (state.success && state.id && !post) {
      router.replace(`/admin/blog/${state.id}`);
    }
  }, [post, router, state.id, state.success]);

  const updateCitation = (key: string, field: CitationField, value: string) => {
    setCitations((current) =>
      current.map((citation) => (citation.key === key ? { ...citation, [field]: value } : citation))
    );
  };
  const citationsJson = JSON.stringify(
    citations.map((citation) => ({
      order_index: citation.order_index,
      title: citation.title,
      author: citation.author,
      publisher: citation.publisher,
      url: citation.url,
      published_at: citation.published_at ?? "",
      accessed_at: citation.accessed_at ?? "",
    }))
  );
  const citationNumbers = citations.map((citation) => citation.order_index + 1);
  const selectedCitationNumber = citationNumbers.includes(citationNumber)
    ? citationNumber
    : citationNumbers[0] ?? 1;

  return (
    <form action={formAction} className="grid gap-8">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="bodyHtml" value={bodyHtml} />
      <input type="hidden" name="citationsJson" value={citationsJson} />
      <input type="hidden" name="status" value={publicationStatus} />

      <section className="grid gap-5 border-b border-line pb-8 min-[761px]:grid-cols-2">
        <label className={`${labelClass} min-[761px]:col-span-2`}>
          Article title
          <input
            className={inputClass}
            name="title"
            value={title}
            onChange={(event) => {
              const nextTitle = event.target.value;
              setTitle(nextTitle);
              if (!slugEdited) setSlug(slugify(nextTitle));
            }}
            minLength={3}
            maxLength={120}
            required
          />
        </label>
        <label className={labelClass}>
          URL slug
          <input
            className={inputClass}
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlugEdited(true);
              setSlug(slugify(event.target.value));
            }}
            maxLength={120}
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            required
          />
          <span className="font-normal text-muted-foreground">/blog/{slug || "article-slug"}</span>
        </label>
        <label className={labelClass}>
          Author name
          <input className={inputClass} name="authorName" defaultValue={post?.author_name ?? "Nyne Owls"} maxLength={100} required />
        </label>
        <label className={`${labelClass} min-[761px]:col-span-2`}>
          Short summary
          <textarea className={`${textareaClass} min-h-24`} name="excerpt" defaultValue={post?.excerpt ?? ""} maxLength={320} required />
        </label>
      </section>

      <section className="grid gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-[-0.03em]">Article body</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Format headings, lists and links. Add sources below, then insert numbered citation markers as you write.
          </p>
        </div>
        <div className="overflow-hidden border border-line bg-paper">
          <EditorToolbar
            editor={editor}
            citationNumbers={citationNumbers}
            citationNumber={selectedCitationNumber}
            onCitationNumberChange={setCitationNumber}
          />
          <EditorContent editor={editor} />
        </div>
      </section>

      <section className="grid gap-4 border-b border-line pb-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.03em]">Sources and citations</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Add source details; cite them in the article using the numbered toolbar marker.
            </p>
          </div>
          <button
            type="button"
            disabled={citations.length >= 20}
            className="min-h-10 border border-line px-4 text-xs font-semibold hover:bg-card"
            onClick={() => {
              const markerNumbers = Array.from(
                bodyHtml.matchAll(/#source-(\d+)/g),
                (match) => Number(match[1])
              );
              const nextNumber = Math.max(
                ...citations.map((citation) => citation.order_index + 1),
                ...markerNumbers,
                0
              ) + 1;
              setCitationNumber(nextNumber);
              setCitationError("");
              setCitations((current) => [
                ...current,
                {
                  key: crypto.randomUUID(),
                  order_index: nextNumber - 1,
                  title: "",
                  author: "",
                  publisher: "",
                  url: "",
                  published_at: "",
                  accessed_at: "",
                },
              ]);
            }}
          >
            {citations.length >= 20 ? "Maximum sources reached" : "Add source"}
          </button>
        </div>
        {citationError && <p role="alert" className="text-sm text-nyne-text">{citationError}</p>}
        {citations.length ? (
          <CitationFields
            values={citations}
            onChange={updateCitation}
            onRemove={(key) => {
              const citation = citations.find((item) => item.key === key);
              if (!citation) return;
              const number = citation.order_index + 1;
              if (bodyHtml.includes(`#source-${number}`)) {
                setCitationError(`Remove citation marker [${number}] from the article before deleting this source.`);
                return;
              }
              setCitationError("");
              setCitations((current) => current.filter((item) => item.key !== key));
            }}
          />
        ) : (
          <p className="border border-dashed border-line p-4 text-sm text-muted-foreground">No sources added yet.</p>
        )}
      </section>

      <section className="grid gap-5 border-b border-line pb-8 min-[761px]:grid-cols-2">
        <label className={labelClass}>
          Cover image URL
          <input className={inputClass} name="coverImageUrl" type="url" defaultValue={post?.cover_image_url ?? ""} />
        </label>
        <label className={labelClass}>
          Cover image description
          <input className={inputClass} name="coverImageAlt" defaultValue={post?.cover_image_alt ?? ""} maxLength={200} />
        </label>
        <label className={labelClass}>
          Tags (comma-separated, max 10)
          <input className={inputClass} name="tags" defaultValue={post?.tags.join(", ") ?? ""} maxLength={400} />
        </label>
        <div className={labelClass}>
          <label id="publication-status-label" htmlFor="publication-status">Publication status</label>
          <Select
            id="publication-status"
            labelId="publication-status-label"
            options={[
              { value: "draft", label: "Draft (private)" },
              { value: "published", label: "Published" },
            ]}
            value={publicationStatus}
            onChange={(value) => {
              if (value === "draft" || value === "published") setPublicationStatus(value);
            }}
            variant="light"
          />
        </div>
      </section>

      <section className="grid gap-5 min-[761px]:grid-cols-2">
        <div className="min-[761px]:col-span-2">
          <h2 className="text-xl font-bold tracking-[-0.03em]">Search preview</h2>
          <p className="mt-1 text-xs text-muted-foreground">Optional overrides. The article title and summary are used when these are blank.</p>
        </div>
        <label className={labelClass}>
          SEO title
          <input className={`${inputClass} min-h-20`} name="seoTitle" defaultValue={post?.seo_title ?? ""} maxLength={70} />
        </label>
        <label className={labelClass}>
          SEO description
          <textarea className={`${textareaClass} min-h-20 resize-none`} name="seoDescription" defaultValue={post?.seo_description ?? ""} maxLength={160} />
        </label>
      </section>

      {state.error && <p role="alert" className="border border-nyne/40 bg-nyne/5 p-4 text-sm text-nyne-text">{state.error}</p>}
      {state.success && <p role="status" className="border border-line bg-card p-4 text-sm">{state.success}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 bg-ink px-6 text-sm font-semibold text-onink transition-colors hover:bg-nyne hover:text-white disabled:opacity-60"
        >
          {pending ? "Saving..." : post ? "Save article" : "Create article"}
        </button>
        {post?.status === "published" && (
          <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="text-xs font-semibold underline underline-offset-4">
            Preview published article
          </a>
        )}
      </div>
    </form>
  );
}
