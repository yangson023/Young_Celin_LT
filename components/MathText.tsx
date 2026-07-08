import type { ReactNode } from "react";

function readGroupedText(text: string, startIndex: number) {
  const opener = text[startIndex];
  const closer = opener === "{" ? "}" : opener === "(" ? ")" : "";

  if (!closer) {
    return null;
  }

  let depth = 0;

  for (let index = startIndex; index < text.length; index += 1) {
    if (text[index] === opener) {
      depth += 1;
    }

    if (text[index] === closer) {
      depth -= 1;

      if (depth === 0) {
        return {
          value: text.slice(startIndex + 1, index),
          nextIndex: index + 1
        };
      }
    }
  }

  return null;
}

function readScriptText(text: string, startIndex: number) {
  const grouped = readGroupedText(text, startIndex);

  if (grouped) {
    return grouped;
  }

  let endIndex = startIndex;

  while (
    endIndex < text.length &&
    /[A-Za-z0-9+\-=×*/]/.test(text[endIndex])
  ) {
    endIndex += 1;
  }

  if (endIndex === startIndex) {
    return { value: text[startIndex] ?? "", nextIndex: startIndex + 1 };
  }

  return {
    value: text.slice(startIndex, endIndex),
    nextIndex: endIndex
  };
}

function renderDeterminant(content: string, key: string) {
  const rows = content
    .split(";")
    .map((row) => row.trim().split(/\s+/).filter(Boolean));

  if (rows.length < 2 || rows.some((row) => row.length < 2)) {
    return null;
  }

  return (
    <span
      key={key}
      className="mx-0.5 inline-grid translate-y-1 grid-flow-row border-x-2 border-ink px-1 py-0.5 align-middle font-serif text-[0.95em] leading-none text-ink"
    >
      {rows.map((row, rowIndex) => (
        <span
          key={`${key}-row-${rowIndex}`}
          className="grid grid-flow-col gap-2"
        >
          {row.map((cell, cellIndex) => (
            <span key={`${key}-cell-${rowIndex}-${cellIndex}`}>
              {renderMathNodes(cell, `${key}-${rowIndex}-${cellIndex}`)}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}

function renderMathNodes(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let buffer = "";
  let index = 0;

  function flushBuffer() {
    if (!buffer) {
      return;
    }

    nodes.push(
      <span key={`${keyPrefix}-text-${nodes.length}`}>{buffer}</span>
    );
    buffer = "";
  }

  while (index < text.length) {
    const char = text[index];

    if ((char === "^" || char === "_") && index + 1 < text.length) {
      flushBuffer();
      const script = readScriptText(text, index + 1);
      const Tag = char === "^" ? "sup" : "sub";

      nodes.push(
        <Tag key={`${keyPrefix}-script-${nodes.length}`} className="text-[0.75em]">
          {renderMathNodes(script.value, `${keyPrefix}-script-${nodes.length}`)}
        </Tag>
      );
      index = script.nextIndex;
      continue;
    }

    if (char === "|") {
      const endIndex = text.indexOf("|", index + 1);

      if (endIndex > index) {
        const content = text.slice(index + 1, endIndex);
        const determinant = renderDeterminant(
          content,
          `${keyPrefix}-det-${nodes.length}`
        );

        if (determinant) {
          flushBuffer();
          nodes.push(determinant);
          index = endIndex + 1;
          continue;
        }
      }
    }

    buffer += char;
    index += 1;
  }

  flushBuffer();
  return nodes;
}

export function MathText({ children }: { children: string }) {
  return (
    <span className="font-serif text-[1.03em] leading-7 text-ink">
      {renderMathNodes(children, "math")}
    </span>
  );
}
