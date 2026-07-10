import katex from "katex";

type FormulaProps = {
  children: string;
  block?: boolean;
};

const FULL_WIDTH_COLON = "\uff1a";
const FULL_WIDTH_LEFT_PAREN = "\uff08";

function replaceDeterminantShorthand(value: string) {
  return value.replace(/\|([^|;]+;[^|]+)\|/g, (_match, content: string) => {
    const rows = content
      .split(";")
      .map((row) => row.trim().split(/\s+/).join(" & "));

    return `\\begin{vmatrix}${rows.join(" \\\\ ")}\\end{vmatrix}`;
  });
}

function normalizeLatex(value: string) {
  return replaceDeterminantShorthand(value)
    .replaceAll("\u03a3", "\\sum")
    .replaceAll("\u2265", "\\ge ")
    .replaceAll("\u2264", "\\le ")
    .replaceAll("\u2260", "\\ne ")
    .replaceAll("\u21d2", "\\Rightarrow ")
    .replaceAll("\u21d4", "\\Leftrightarrow ")
    .replaceAll("\u2192", "\\to ")
    .replaceAll("\u00d7", "\\times ")
    .replace(/([A-Za-z])\*/g, "$1^*")
    .replace(/A\^\*\/\|A\|/g, "\\frac{A^*}{|A|}")
    .replace(/([A-Za-z])_([A-Za-z0-9]+)/g, "$1_{$2}");
}

function splitFormulaText(value: string) {
  const fullWidthColonIndex = value.indexOf(FULL_WIDTH_COLON);
  const halfWidthColonIndex = value.indexOf(":");
  const colonIndex =
    fullWidthColonIndex >= 0 && halfWidthColonIndex >= 0
      ? Math.min(fullWidthColonIndex, halfWidthColonIndex)
      : Math.max(fullWidthColonIndex, halfWidthColonIndex);

  const label = colonIndex >= 0 ? value.slice(0, colonIndex + 1) : "";
  const rest = colonIndex >= 0 ? value.slice(colonIndex + 1).trim() : value;
  const conditionIndex = rest.indexOf(FULL_WIDTH_LEFT_PAREN);

  if (conditionIndex < 0) {
    return {
      label,
      latex: rest,
      suffix: ""
    };
  }

  return {
    label,
    latex: rest.slice(0, conditionIndex).trim(),
    suffix: rest.slice(conditionIndex)
  };
}

function renderLatex(value: string, displayMode: boolean) {
  return katex.renderToString(normalizeLatex(value), {
    displayMode,
    output: "html",
    strict: false,
    throwOnError: false,
    trust: false
  });
}

export function Formula({ children, block = false }: FormulaProps) {
  const { label, latex, suffix } = splitFormulaText(children);
  const renderedLatex = renderLatex(latex, block);

  return (
    <span
      className={
        block ? "block max-w-full text-center leading-8 text-ink" : "inline text-ink"
      }
    >
      {label ? <span className="mr-2 text-sm text-muted">{label}</span> : null}
      <span
        className={
          block
            ? "inline-block min-w-0 max-w-full align-middle text-base sm:text-lg"
            : "inline-block"
        }
        dangerouslySetInnerHTML={{ __html: renderedLatex }}
      />
      {suffix ? <span className="ml-2 text-sm text-muted">{suffix}</span> : null}
    </span>
  );
}
