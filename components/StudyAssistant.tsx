"use client";

import { FormEvent, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type Mood = "happy" | "cute" | "confused";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const moodLabels: Record<Mood, string> = {
  happy: "开心",
  cute: "可爱",
  confused: "疑惑"
};

const quickQuestions = [
  "怎样完成一次自测？",
  "我应该从哪里开始复习？",
  "错题本应该怎么用？"
];

function randomMood() {
  const moods: Mood[] = ["happy", "cute", "confused"];
  return moods[Math.floor(Math.random() * moods.length)];
}

function AssistantAvatar({ mood, large = false }: { mood: Mood; large?: boolean }) {
  return (
    <span
      aria-label={`AI 助教正在待机活动，对话心情：${moodLabels[mood]}`}
      role="img"
      className={`study-assistant-avatar-frame ${large ? "h-24 w-24" : "h-11 w-11"}`}
    >
      <span className={`study-assistant-avatar study-assistant-avatar-${mood}`} />
    </span>
  );
}

export function StudyAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mood, setMood] = useState<Mood>("happy");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "你好，我是课程小助教。可以问我怎么使用自测、怎样安排复习，或当前页面涉及的知识点。"
    }
  ]);

  const currentMoodLabel = useMemo(() => moodLabels[mood], [mood]);

  function openAssistant() {
    setMood(randomMood());
    setIsOpen(true);
  }

  async function sendMessage(message: string) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    const nextMessages = [
      ...messages,
      { role: "user" as const, content: trimmedMessage }
    ];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setMood("confused");

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedMessage,
          history: messages.slice(-6),
          pathname
        })
      });
      const data = (await response.json()) as { answer?: string; error?: string };

      if (!response.ok || !data.answer) {
        const fallback =
          data.error === "configuration_missing"
            ? "AI 服务正在等待管理员配置。当前你仍可以从课程页选择章节，进入知识点后点击“开始自测”完成练习。"
            : "我暂时没有连上服务。稍后再试一次，或先从课程页继续学习。";
        setMessages((current) => [
          ...current,
          { role: "assistant", content: fallback }
        ]);
        setMood("cute");
        return;
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer ?? "" }
      ]);
      setMood("happy");
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "网络连接暂时不可用。你可以先继续查看知识点或进入错题本复习。"
        }
      ]);
      setMood("cute");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      <button
        type="button"
        onClick={openAssistant}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="study-assistant-trigger fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full border border-white/70 bg-white/95 py-1.5 pl-1.5 pr-3 shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl xl:bottom-5 xl:right-5"
      >
        <AssistantAvatar mood={mood} />
        <span className="text-sm font-semibold text-ink">AI 助教</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 bg-ink/25 p-3 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="study-assistant-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section className="absolute inset-x-3 bottom-16 mx-auto flex max-h-[min(660px,calc(100vh-6rem))] w-auto max-w-md flex-col overflow-hidden rounded-lg border border-line bg-[#fffef9] shadow-2xl sm:bottom-6 sm:right-6 sm:left-auto sm:mx-0 sm:w-[26rem]">
            <header className="flex items-center justify-between border-b border-line bg-white/85 px-4 py-3">
              <div className="flex items-center gap-3">
                <AssistantAvatar mood={mood} large />
                <div>
                  <p className="text-xs font-medium text-accent">对话心情：{currentMoodLabel}</p>
                  <h2 id="study-assistant-title" className="mt-1 text-lg font-semibold text-ink">
                    课程小助教
                  </h2>
                  <p className="mt-0.5 text-xs text-muted">帮你把学习的下一步说清楚</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="关闭 AI 助教"
                className="grid h-9 w-9 place-items-center rounded-md border border-line text-lg text-muted transition hover:border-accent hover:text-accent"
              >
                ×
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[88%] rounded-lg px-3 py-2.5 text-sm leading-6 ${
                    message.role === "assistant"
                      ? "border border-line bg-white text-ink"
                      : "ml-auto bg-accent text-white"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading ? (
                <div className="w-fit rounded-lg border border-line bg-white px-3 py-2 text-sm text-muted">
                  正在整理思路...
                </div>
              ) : null}
            </div>

            <div className="border-t border-line bg-white/75 p-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendMessage(question)}
                    disabled={isLoading}
                    className="rounded-md border border-accent/25 bg-paper px-2.5 py-1.5 text-xs font-medium text-accent transition hover:border-accent hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {question}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <label className="sr-only" htmlFor="assistant-message">
                  向 AI 助教提问
                </label>
                <input
                  id="assistant-message"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={800}
                  placeholder="例如：我该怎样复习第二章？"
                  className="min-w-0 flex-1 rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-md bg-accent px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#24595d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  发送
                </button>
              </form>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
