"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { FeatureMark } from "@/components/FeatureMark";
import { useEffect, useState } from "react";

export function FeedbackLetterDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="group inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent px-3 py-2 font-medium text-white shadow-sm shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-[#24595d] hover:shadow-md hover:shadow-accent/30"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        <span>反馈</span>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-letter-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <section className="relative w-full max-w-lg overflow-hidden rounded-lg border border-[#d8c9aa] bg-[#fffdf6] shadow-2xl">
            <div className="h-2 bg-accent" />
            <div className="p-5 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FeatureMark name="feedback" />
                  <div>
                    <p className="text-xs font-medium text-accent">一封来信</p>
                    <h2 id="feedback-letter-title" className="mt-1 text-xl font-semibold text-ink">
                      谢谢你愿意把想法告诉我们
                    </h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="关闭反馈信件"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line text-lg text-muted transition hover:border-accent hover:text-accent"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 border-y border-dashed border-[#d8c9aa] py-5 text-[15px] leading-7 text-ink">
                <p>
                  非常感谢对本网站的使用，如有 nice 的 idea 或认为需要改进的地方，务必大胆指出，作者 QQ 邮箱
                  <span className="mx-1 font-semibold text-accent">659268625@qq.com</span>
                  ，可邮件或直接加作者 QQ，欢迎大家吐槽讨论哈！（爱你
                  <span className="ml-1 inline-flex align-middle">
                    <Image
                      src="/images/feedback-love-avatar.png"
                      alt="眼冒爱心的作者卡通头像"
                      width={38}
                      height={38}
                      className="h-[38px] w-[38px] rounded-full border border-[#f2b8bd] bg-[#fff4f4] object-cover"
                    />
                  </span>
                  ）
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
                <div className="text-muted">
                  作者 QQ：<span className="font-semibold text-ink">659268625</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-accent px-4 py-2 font-semibold text-white transition hover:bg-[#24595d]"
                >
                  收下这封信
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
