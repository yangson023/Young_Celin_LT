"use client";

import { BellRing, Check, Clock3, NotebookPen, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  addMemo,
  getMemos,
  removeMemo,
  toggleMemoCompleted,
  type MemoRecord
} from "@/lib/storage";

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export function MemosClient() {
  const [memos, setMemos] = useState<MemoRecord[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => setMemos(getMemos()), []);

  const sortedMemos = useMemo(
    () => [...memos].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [memos]
  );

  function createMemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    const next = addMemo({ title: title.trim(), content: content.trim() });
    setMemos(next);
    setTitle("");
    setContent("");
  }

  async function enableNotifications() {
    if (!("Notification" in window)) {
      setNotificationMessage("当前浏览器不支持系统通知，仍会在网站内弹出提醒。");
      return;
    }
    const permission = await Notification.requestPermission();
    setNotificationMessage(permission === "granted" ? "系统通知已开启。网站保持打开时，也会尝试显示提醒。" : "没有开启系统通知，仍会在网站内弹出提醒。");
  }

  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-lg border border-line bg-white/95 p-5 shadow-sm sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-accent"><NotebookPen className="h-4 w-4" /> 学习备忘录</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">把要紧的事先记下来</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">备忘录按创建时间排序。当天创建的未完成事项，会在晚上 21:00 和 22:00 由小助教礼貌提醒一次。</p>
          </div>
          <button type="button" onClick={() => void enableNotifications()} className="inline-flex w-fit items-center gap-2 rounded-md border border-accent/25 bg-paper px-3 py-2 text-sm font-semibold text-accent transition hover:border-accent">
            <BellRing className="h-4 w-4" /> 开启系统提醒
          </button>
        </div>
        {notificationMessage ? <p className="mt-4 rounded-md bg-paper px-3 py-2 text-sm text-muted">{notificationMessage}</p> : null}
      </section>

      <section className="mt-6 rounded-lg border border-line bg-white/95 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">新建备忘</h2>
        <form onSubmit={createMemo} className="mt-4 grid gap-3">
          <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} required placeholder="例如：复习第二章克拉默法则" className="rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-accent" />
          <textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={300} rows={3} placeholder="补充一点具体提醒也可以。" className="resize-none rounded-md border border-line bg-white px-3 py-2.5 text-sm outline-none transition focus:border-accent" />
          <button type="submit" className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24595d]"><NotebookPen className="h-4 w-4" /> 记下它</button>
        </form>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-end justify-between"><div><p className="text-sm font-medium text-muted">按创建时间排列</p><h2 className="mt-1 text-xl font-semibold text-ink">我的备忘</h2></div><p className="text-sm text-muted">{sortedMemos.length} 条</p></div>
        {sortedMemos.length ? <div className="grid gap-3">{sortedMemos.map((memo) => <article key={memo.id} className={`rounded-lg border bg-white/95 p-4 shadow-sm ${memo.completed ? "border-line opacity-65" : "border-accent/25"}`}><div className="flex gap-3"><button type="button" onClick={() => setMemos(toggleMemoCompleted(memo.id))} aria-label={memo.completed ? "标记为未完成" : "标记为已完成"} className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition ${memo.completed ? "border-accent bg-accent text-white" : "border-line text-transparent hover:border-accent"}`}><Check className="h-4 w-4" /></button><div className="min-w-0 flex-1"><h3 className={`font-semibold text-ink ${memo.completed ? "line-through" : ""}`}>{memo.title}</h3>{memo.content ? <p className="mt-2 text-sm leading-6 text-muted">{memo.content}</p> : null}<p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted"><Clock3 className="h-3.5 w-3.5" /> {formatTime(memo.createdAt)}</p></div><button type="button" onClick={() => setMemos(removeMemo(memo.id))} aria-label={`删除备忘：${memo.title}`} className="grid h-8 w-8 place-items-center rounded-md text-muted transition hover:bg-paper hover:text-warning"><Trash2 className="h-4 w-4" /></button></div></article>)}</div> : <div className="rounded-lg border border-dashed border-line bg-white/80 px-5 py-10 text-center text-sm text-muted">还没有备忘。把今晚要复习的一个小目标先记下来吧。</div>}
      </section>
      <p className="mt-6 text-xs leading-5 text-muted">提醒目前保存在此浏览器的 localStorage 中，且网站需在 21:00 或 22:00 附近保持打开。要实现关闭网页后仍提醒，需要后续接入账号、服务器定时任务和推送服务。</p>
    </div>
  );
}
