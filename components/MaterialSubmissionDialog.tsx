"use client";

import { FilePlus2, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { saveMaterialSubmission } from "@/lib/storage";

const supportedExtensions = ["pdf", "doc", "docx", "md"];

export function MaterialSubmissionDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  function closeDialog() {
    setIsOpen(false);
    setIsSaved(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || !fileName) {
      return;
    }

    saveMaterialSubmission({ title: title.trim(), note: note.trim(), fileName });
    setIsSaved(true);
    setTitle("");
    setNote("");
    setFileName("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24595d]"
      >
        <FilePlus2 className="h-4 w-4" aria-hidden="true" />
        提交资料
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="material-submission-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDialog();
            }
          }}
        >
          <section className="w-full max-w-lg rounded-lg border border-line bg-[#fffef9] p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-accent">资料征集</p>
                <h2 id="material-submission-title" className="mt-1 text-xl font-semibold text-ink">
                  提交一份待审核资料
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="关闭资料提交窗口"
                className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted transition hover:border-accent hover:text-accent"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {isSaved ? (
              <div className="mt-6 rounded-md border border-accent/25 bg-[#eff8f5] p-4 text-sm leading-6 text-ink">
                已登记为“待审核”。当前 Demo 只保存文件名、说明和提交时间；原文件不会上传或公开。审核后，管理员会决定是否整理为课程资料卡并制作封面。
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 grid gap-4">
                <label className="grid gap-1.5 text-sm font-medium text-ink">
                  资料标题
                  <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    maxLength={60}
                    placeholder="例如：第二章行列式复习笔记"
                    className="rounded-md border border-line bg-white px-3 py-2.5 text-sm font-normal outline-none transition focus:border-accent"
                  />
                </label>
                <label className="grid gap-1.5 text-sm font-medium text-ink">
                  选择文件
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.md"
                    required
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      setFileName(file?.name ?? "");
                    }}
                    className="block w-full rounded-md border border-dashed border-line bg-paper px-3 py-2 text-sm font-normal text-muted file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white"
                  />
                  <span className="text-xs font-normal text-muted">
                    支持 {supportedExtensions.join(" / ")}；当前仅登记，不上传原文件。
                  </span>
                </label>
                <label className="grid gap-1.5 text-sm font-medium text-ink">
                  内容说明（可选）
                  <textarea
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    maxLength={240}
                    rows={3}
                    placeholder="说明资料覆盖的章节、来源和适合用途。"
                    className="resize-none rounded-md border border-line bg-white px-3 py-2.5 text-sm font-normal outline-none transition focus:border-accent"
                  />
                </label>
                <p className="rounded-md bg-paper px-3 py-2 text-xs leading-5 text-muted">
                  请仅提交自己拥有分享权限的原创笔记、公开资料链接或已获授权内容。
                </p>
                <button type="submit" className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24595d]">
                  登记待审核资料
                </button>
              </form>
            )}
          </section>
        </div>
      ) : null}
    </>
  );
}
