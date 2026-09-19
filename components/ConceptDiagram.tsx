import type { KnowledgePoint } from "@/lib/types";

type Diagram = {
  title: string;
  caption: string;
  content: React.ReactNode;
};

function Grid({ skew = false }: { skew?: boolean }) {
  const lines = [-60, -30, 0, 30, 60];
  const transform = skew ? "skewX(-18)" : undefined;

  return (
    <g transform={transform}>
      {lines.map((position) => (
        <line key={"v" + position} x1={position} y1="-70" x2={position} y2="70" stroke="#7db7be" strokeWidth="1.2" />
      ))}
      {lines.map((position) => (
        <line key={"h" + position} x1="-70" y1={position} x2="70" y2={position} stroke="#7db7be" strokeWidth="1.2" />
      ))}
    </g>
  );
}

function getDiagram(point: KnowledgePoint): Diagram {
  if (point.chapter_id === "chapter-1-matrix-elementary-transformations") {
    return {
      title: "矩阵：按行列定位与操作",
      caption: "横向看“行”，纵向看“列”。矩阵运算先问阶数条件，再决定能否逐项或按行列组合计算。",
      content: (
        <>
          {[0, 1, 2].map((row) => [0, 1, 2, 3].map((column) => (
            <rect key={row + "-" + column} x={92 + column * 28} y={40 + row * 28} width="24" height="24" rx="3" fill={row === 1 || column === 2 ? "#dceff0" : "#fff"} stroke="#4a8990" />
          )))}
          <rect x="148" y="68" width="24" height="24" rx="3" fill="#f3b32b" stroke="#b47b00" />
          <path d="M72 80h12M92 122v10" stroke="#173f70" strokeWidth="2" />
          <text x="20" y="84" fill="#173f70" fontSize="13">第 2 行</text>
          <text x="128" y="145" fill="#173f70" fontSize="13">第 3 列</text>
          <text x="192" y="84" fill="#8b5b19" fontSize="13">a₂₃</text>
        </>
      )
    };
  }

  if (point.chapter_id === "chapter-2-determinants") {
    return {
      title: "行列式：面积/体积的缩放直觉",
      caption: "二维里，行列式的绝对值可理解为平行四边形面积的缩放因子；符号还记录了方向是否翻转。",
      content: (
        <>
          <path d="M74 120 L160 120 L208 48 L122 48 Z" fill="#dceff0" stroke="#167f8a" strokeWidth="2.5" />
          <path d="M74 120 L160 120" stroke="#173f70" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M74 120 L122 48" stroke="#f3b32b" strokeWidth="3" markerEnd="url(#arrow)" />
          <text x="114" y="145" fill="#173f70" fontSize="13">一列向量</text>
          <text x="32" y="78" fill="#8b5b19" fontSize="13">另一列向量</text>
          <text x="117" y="89" fill="#24595d" fontSize="14">面积</text>
        </>
      )
    };
  }

  if (point.chapter_id === "chapter-3-geometric-space") {
    return {
      title: "空间几何：先把位置关系翻译成向量",
      caption: "直线、平面和平行/垂直关系都可以先画出对象，再用方向向量、法向量或代入关系完成判断。",
      content: (
        <>
          <path d="M62 116 L164 142 L224 74 L122 48 Z" fill="#dceff0" fillOpacity=".85" stroke="#167f8a" strokeWidth="2" />
          <path d="M72 132 L210 52" stroke="#173f70" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M148 116 L148 36" stroke="#f3b32b" strokeWidth="3" markerEnd="url(#arrow)" />
          <circle cx="148" cy="116" r="4" fill="#173f70" />
          <text x="153" y="44" fill="#8b5b19" fontSize="13">法向量</text>
          <text x="178" y="78" fill="#173f70" fontSize="13">直线方向</text>
        </>
      )
    };
  }

  if (point.chapter_id === "chapter-4-n-dimensional-vector-space") {
    return {
      title: "向量组：张成、冗余与基",
      caption: "两条不共线的向量可以张成平面；若新增向量落在它们张成的范围内，它提供的是冗余而不是新方向。",
      content: (
        <>
          <path d="M88 122 L202 122 L157 52 Z" fill="#dceff0" fillOpacity=".8" />
          <path d="M88 122 L202 122" stroke="#173f70" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M88 122 L157 52" stroke="#167f8a" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M88 122 L174 99" stroke="#f3b32b" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow)" />
          <text x="206" y="126" fill="#173f70" fontSize="13">α₁</text>
          <text x="160" y="50" fill="#24595d" fontSize="13">α₂</text>
          <text x="178" y="96" fill="#8b5b19" fontSize="13">可表示</text>
        </>
      )
    };
  }

  if (point.chapter_id === "chapter-5-eigenvalues-eigenvectors") {
    return {
      title: "线性变换：一般方向与稳定方向",
      caption: "矩阵会整体改变网格。一般向量会转向；特征向量所在方向在变换前后保持共线，只改变长度或反向。",
      content: (
        <>
          <g transform="translate(75 92)"><Grid /></g>
          <g transform="translate(190 92)"><Grid skew /></g>
          <path d="M75 92 L115 60" stroke="#f3b32b" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M190 92 L232 59" stroke="#f3b32b" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M75 92 L104 78" stroke="#246ab0" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M190 92 L223 69" stroke="#246ab0" strokeWidth="3" markerEnd="url(#arrow)" />
        </>
      )
    };
  }

  if (point.chapter_id === "chapter-6-quadratic-forms-quadrics") {
    return {
      title: "二次型：等高线与符号",
      caption: "把函数值相同的位置连成等高线。全部方向都向上对应正定；若有方向向上、有方向向下，则需要警惕不定。",
      content: (
        <>
          {[18, 34, 50, 66].map((radius, index) => (
            <ellipse key={radius} cx="148" cy="94" rx={radius} ry={radius * .42} fill="none" stroke={index < 2 ? "#f3b32b" : "#167f8a"} strokeWidth="2" />
          ))}
          <path d="M148 94 C148 60 180 44 204 40" fill="none" stroke="#173f70" strokeWidth="3" markerEnd="url(#arrow)" />
          <path d="M148 94 C130 74 108 65 88 61" fill="none" stroke="#173f70" strokeWidth="3" markerEnd="url(#arrow)" />
          <circle cx="148" cy="94" r="5" fill="#f3b32b" />
          <text x="156" y="108" fill="#8b5b19" fontSize="13">最低点</text>
        </>
      )
    };
  }

  return {
    title: "线性变换：核与像",
    caption: "左侧是输入空间，右侧是输出空间。落入核的方向会被压到零；像是所有可能输出组成的范围。",
    content: (
      <>
        <ellipse cx="84" cy="94" rx="52" ry="58" fill="#dceff0" stroke="#167f8a" strokeWidth="2" />
        <ellipse cx="210" cy="94" rx="42" ry="58" fill="#e8eef5" stroke="#173f70" strokeWidth="2" />
        <path d="M128 72 C148 62 154 62 166 72" fill="none" stroke="#173f70" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <path d="M128 112 C148 128 154 128 166 112" fill="none" stroke="#173f70" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <circle cx="78" cy="112" r="5" fill="#f3b32b" />
        <circle cx="210" cy="114" r="5" fill="#f3b32b" />
        <circle cx="84" cy="94" r="4" fill="#173f70" />
        <text x="48" y="30" fill="#24595d" fontSize="13">输入 V</text>
        <text x="186" y="30" fill="#173f70" fontSize="13">输出 W</text>
        <text x="43" y="142" fill="#8b5b19" fontSize="12">核方向</text>
      </>
    )
  };
}

export function ConceptDiagram({ point }: { point: KnowledgePoint }) {
  const diagram = getDiagram(point);

  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-accent">图形化理解</p>
      <h2 className="mt-1 text-lg font-semibold text-ink">{diagram.title}</h2>
      <svg viewBox="0 0 300 180" role="img" aria-label={diagram.title} className="mt-3 h-auto w-full rounded-md bg-[#f8fbfb]">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#173f70" />
          </marker>
        </defs>
        {diagram.content}
      </svg>
      <figcaption className="mt-3 text-sm leading-6 text-muted">{diagram.caption}</figcaption>
    </figure>
  );
}
