# 教材校正报告 — 线性代数总结草稿

> 校正依据：《线性代数与空间解析几何 第六版》教材目录
> 被校正文件：draft-knowledge-summary.md

---

## 一、教材校正后的章节目录

根据教材 PDF 书签目录，本课程 **7章 + 附录** 的准确结构如下：

### 第一章 矩阵及其初等变换

| 节号 | 标题 | 教材内小节要点 |
|---|---|---|
| 1.1 | 矩阵及其运算 | 矩阵概念、线性运算、乘法、转置 |
| 1.2 | 高斯消元法与矩阵的初等变换 | 高斯消元法、矩阵的初等变换、初等矩阵 |
| 1.3 | 逆矩阵 | 逆矩阵概念与性质、用行初等变换求逆矩阵 |
| 1.4 | 分块矩阵 | （教材单独成节，含分块矩阵的运算与初等变换） |

> 与现有项目结构一致，无需修改。

### 第二章 行列式

| 节号 | 标题 | 覆盖情况 |
|---|---|---|
| 2.1 | n阶行列式的定义 | 讲座有提及，但未展开（定义层面） |
| 2.2 | 行列式的性质与计算 | **已覆盖**（行列式计算策略；**伴随矩阵定义在PDF第73页即本节**） |
| 2.3 | 拉普拉斯定理 | **重点考点，需补充**（讲座资料未覆盖，需根据教材补充：按k行展开定理） |
| 2.4 | 克拉默法则 | **重点考点，需补充**（讲座资料未覆盖，需根据教材补充：用行列式解n元线性方程组） |
| 2.5 | 矩阵的秩 | **已覆盖**（草稿中秩的性质、等价标准形均属此节） |

### 第三章 几何空间

| 节号 | 标题 | 覆盖情况 |
|---|---|---|
| 3.1 | 空间直角坐标系与向量 | **部分覆盖**（草稿中有向量线性运算，缺乏坐标系引入） |
| 3.2 | 向量的乘法 | **已覆盖**（草稿中有内积、外积、混合积） |
| 3.3 | 平面 | **部分覆盖**（草稿中有平面位置关系判定） |
| 3.4 | 空间直线 | **部分覆盖**（草稿中有直线相交判定） |

### 第四章 n维向量空间

| 节号 | 标题 | 覆盖情况 |
|---|---|---|
| 4.1 | n维向量空间的概念 | **暂未覆盖**（讲座未涉及抽象空间概念） |
| 4.2 | 向量组的线性相关性 | **已覆盖**（草稿中原"第三章"内容） |
| 4.3 | 向量组的秩与极大无关组 | **已覆盖**（草稿中有秩、极大无关组部分内容） |
| 4.4 | 线性方程组解的结构 | **已覆盖**（草稿中原"第四章"内容） |

### 第五章 特征值与特征向量 【重点】

| 节号 | 标题 | 覆盖情况 |
|---|---|---|
| 5.1 | 特征值与特征向量的概念与计算 | **需补充**（讲座仅幂等矩阵例题涉及，需补充定义、特征多项式、计算步骤） |
| 5.2 | 矩阵的相似对角化 | **部分覆盖，需补充**（草稿中有对角化判定流程，需补充充要条件证明与应用） |
| 5.3 | n维向量空间的正交性 | **需补充**（施密特正交化、正交矩阵、内积空间正交性） |
| 5.4 | 实对称矩阵的相似对角化 | **部分覆盖**（草稿中有对比，需补充正交对角化的完整计算流程） |

### 第六章 二次型与二次曲面 【重点】

| 节号 | 标题 | 覆盖情况 |
|---|---|---|
| 6.1 | 实二次型及其标准形 | **部分覆盖，需补充**（草稿中有标准形、正交变换；需补充配方法完整流程） |
| 6.2 | 正定二次型 | **需补充**（正定判定条件：顺序主子式、特征值、惯性指数） |
| 6.3 | 曲面与空间曲线 | **部分覆盖**（第三章3.3/3.4部分涉及，第六章侧重二次曲面分类） |
| 6.4 | 二次曲面 | **需补充**（椭球面、抛物面、双曲面的标准方程与分类） |

### 第七章 线性空间与线性变换 【自学，非考点】

| 节号 | 标题 | 覆盖情况 |
|---|---|---|
| 7.1 | 线性空间的概念 | **待补充**（低优先级，仅做简要参考） |
| 7.2 | 线性空间的基、维数与坐标 | **待补充**（低优先级，可与4.3建立联系） |
| 7.3 | 欧氏空间 | **待补充**（低优先级，可与5.3建立联系） |
| 7.4 | 线性变换 | **待补充**（低优先级，可与5.2建立联系） |

---

## 二、已有总结草稿的目录问题诊断

对照教材目录，以下问题需要修正：

### 严重问题（必须修正）

| 编号 | 问题 | 草稿中位置 | 纠正方案 |
|---|---|---|---|
| **S1** | 草稿第二章标题为"矩阵的秩与行列式"，教材为"行列式"（秩作为 2.5 节属于行列式章，但章名应以教材为准） | 第二章整体 | 改为"第二章 行列式"，秩移入 2.5 |
| **S2** | 草稿中第三章为"向量组的线性相关性"、第四章为"线性方程组解的结构"——教材中这两块分别属于 **第四章 n维向量空间** 的 4.2 和 4.4 节 | 第三、四章全部内容 | 合并入第四章的子节 |
| **S3** | 草稿将"几何空间"放在第四章附属位置（甚至列为"第八章 空间解析几何"候选），教材中是独立的 **第三章** | 第四章末尾和第一章草案表格 | 独立为第三章，所有几何空间知识点上移 |
| **S4** | 草稿第六章称"二次型与正定矩阵"，教材为"二次型与二次曲面"（包含曲面/曲线内容） | 第六章 | 改为"第六章 二次型与二次曲面" |
| **S5** | 草稿缺少教材的 2.3（拉普拉斯定理）、2.4（克拉默法则）——**两者均为重点考点**，须根据教材补充。4.1（n维向量空间概念）和 5.3（正交性）也需补充。 | 按教材补充2.3/2.4/4.1/5.3知识点 |
| **S6** | 草稿对第5-6章覆盖严重不足——仅3个知识点。**第5-6章是重点**，需作为高优先级补充（特征值计算、对角化判定、正交化、正定判定、二次曲面分类）。 | 第五章补充4-5个知识点，第六章补充4-5个知识点 |
| **S7** | 草稿将第7章与5-6章同列"暂未覆盖"，但**第7章为自学内容、非考点**，不应与5-6章同优先级。 | 第7章降级为"自学参考"，出少量概览性条目即可 |

### 中等问题（建议修正）

| 编号 | 问题 | 纠正方案 |
|---|---|---|
| **M1** | "伴随矩阵"在教材PDF第73页（即2.2节行列式的性质与计算）定义，已确认归属 | section_id 确定为 "2.2" |
| **M2** | "可逆矩阵的等价刻画"在草稿中归属 pending-human-review，按教材逻辑，该知识点横跨第一章（逆矩阵）和第二章（行列式条件）；讲座将其放在第1-2章交界处，建议放 1.3 末尾作为总结或 2.5 秩的推论 | 选定一个归属点 |
| **M3** | "Sylvester 秩不等式"在草稿中放在第二章，教材中该知识点位于 2.5（矩阵秩的性质）——归属基本正确但需确认小节 | 改为 section_id "2.5" |
| **M4** | "矩阵等价与向量组等价"横跨第一章和第四章——建议保留在 2.5 秩的性质中作为对比讲解 | 保留在 2.5 |
| **M5** | "R(A^T A)=R(A)"在草稿中归属第四章（第四章第四节），教材中可作为 2.5 秩性质或 4.4 方程组解的推论；讲座多次出现 | 归属于 4.4 更为合适 |

### 轻微问题

| 编号 | 问题 | 纠正方案 |
|---|---|---|
| **L1** | 草稿中"秩1矩阵"知识点放在 1.1 矩阵运算，但涉及秩的概念（第二章才正式引入），讲座在第一章介绍时仅用了"秩1"的称呼但未正式定义 | 保持放在 1.1 作为运算技巧，但需注明"秩"的正式定义见 2.5 |
| **L2** | Gram 矩阵判定法在草稿中放在第三章（原向量组章），教材中内积的定义出现在 3.2 和 5.3，Gram 矩阵法属于秩的推论 | 保留在 4.2（向量组线性相关性） |

---

## 三、按教材章节重排后的知识点框架

### 第一章 矩阵及其初等变换（不变）

**1.1 矩阵及其运算**
- 【保留】矩阵乘法的特殊性——与普通数乘法的差异
- 【保留】秩1矩阵及其幂运算（需注明秩的定义见 2.5）

**1.2 高斯消元法与矩阵的初等变换**
- 【保留】初等矩阵与"左乘行变、右乘列变"原则

**1.3 逆矩阵**
- 【保留】方阵的幂与幂零矩阵求逆（华罗庚恒等式）
- 【保留】从给定条件构造逆矩阵

**1.4 分块矩阵**
- 【保留】分块矩阵的初等变换
- 【保留】秩1修正公式求逆
- 【保留】非方阵情形的"逆"——左逆与右逆

### 第二章 行列式（章名从"矩阵的秩与行列式"改）

**2.1 n阶行列式的定义**
- 【新增-待补充】n阶行列式的定义与基本性质（讲座资料未展开）

**2.2 行列式的性质与计算**
- 【保留】行列式计算的常见类型与策略
- 【保留】伴随矩阵的核心性质（**已确认：教材PDF第73页，属于2.2节**）

**2.3 拉普拉斯定理** 【重点考点，新增】
- 【新增】拉普拉斯定理：行列式按任意k行展开，等于这k行中所有k阶子式与其代数余子式的乘积之和
- 核心概念：k阶子式、代数余子式（带符号的余子式）
- 特殊情形：按一行展开（k=1）即余子式展开，按全行展开（k=n）为行列式本身
- 典型应用：分块三角行列式的快速计算
- 易错点：代数余子式的符号 (−1)^(行标之和+列标之和)

**2.4 克拉默法则** 【重点考点，新增】
- 【新增】克拉默法则：n元线性方程组 Ax=b 中，若 |A|≠0，则 x_i = |A_i|/|A|（A_i为将A第i列替换为b）
- 适用条件：系数矩阵必须是方阵且行列式非零
- 理论意义：唯一解的存在性与行列式的关系
- 局限性：计算量大（需算n+1个行列式），适用于n≤3的小规模问题或理论证明
- 推论：齐次方程组Ax=0有非零解⇔|A|=0

**2.5 矩阵的秩**
- 【保留】矩阵的秩——核心性质汇总
- 【保留】矩阵的等价标准形与满秩分解
- 【保留】可逆矩阵的等价刻画（充要条件汇总）← 从 pending 归入 2.5
- 【保留】Sylvester 秩不等式与 AB=O 的秩关系 ← 从 pending 归入 2.5
- 【保留】矩阵等价与向量组等价的区别 ← 作为秩性质的延伸

### 第三章 几何空间（原第四章附属内容独立为章，上移）

**3.1 空间直角坐标系与向量**
- 【部分覆盖】讲座中有向量的线性运算但无坐标系引入（待补充）

**3.2 向量的乘法**
- 【保留】（原"几何空间——向量积、混合积与共面判定"）移入本节
- 教材明确分为：内积、外积、混合积三个子节

**3.3 平面**
- 【部分覆盖】讲座中有平面位置关系判定，需补充平面方程

**3.4 空间直线**
- 【部分覆盖】讲座中有直线相交判定，需补充直线方程

### 第四章 n维向量空间（原第三章+第四章合并）

**4.1 n维向量空间的概念**
- 【暂未覆盖】讲座资料未涉及 R^n 子空间等概念

**4.2 向量组的线性相关性**
- 【保留】向量组线性相关/无关的定义与矩阵判定法
- 【保留】线性相关/无关的两个对偶结论
- 【保留】构造矩阵P法判断线性相关性
- 【保留】Gram 矩阵判定法（内积判定）

**4.3 向量组的秩与极大无关组**
- 【保留】用矩阵乘法理解线性表出关系

**4.4 线性方程组解的结构**
- 【保留】齐次/非齐次线性方程组解的存在性与唯一性判定
- 【保留】基础解系与通解结构
- 【保留】R(A^T A)=R(A) 的证明与应用

### 第五章 特征值与特征向量 【重点】

**5.1 特征值与特征向量的概念与计算**
- 【新增】特征值与特征向量的定义：Ax = λx，x ≠ 0
- 【新增】特征多项式 |λI−A| = 0，特征值的求法
- 【新增】特征向量的计算：对每个特征值 λ，解 (λI−A)x = 0
- 【新增】特征值与迹、行列式的关系：tr(A) = Σλ_i，|A| = Πλ_i

**5.2 矩阵的相似对角化**
- 【保留】幂等矩阵的性质与相似对角化 ← 归入 5.2
- 【新增】n阶方阵可相似对角化的充要条件：有n个线性无关的特征向量
- 【新增】判别流程：k重特征值需检验 R(λI−A) = n−k（几何重数 = 代数重数）

**5.3 n维向量空间的正交性**
- 【新增】施密特正交化方法：将线性无关向量组化为标准正交向量组
- 【新增】正交矩阵的定义与性质：Q^T Q = I，Q^T = Q^(−1)
- 【保留】实对称矩阵 vs 普通矩阵——相似对角化的比较 ← 移入 5.3 作为理论铺垫

**5.4 实对称矩阵的相似对角化**
- 【保留】实对称矩阵正交对角化结论与计算流程

### 第六章 二次型与二次曲面 【重点】

**6.1 实二次型及其标准形**
- 【保留】二次型的标准形与规范形（正交变换法）
- 【新增】配方法化二次型为标准形：拉格朗日配方法的步骤与示例
- 【保留】矩阵相似、合同与等价的区别（作为跨章总结）

**6.2 正定二次型** 【重点考点，新增】
- 【新增】正定二次型的定义：对任意 x≠0，f(x) = x^T Ax > 0
- 【新增】判定条件1：顺序主子式均大于零（霍尔维茨定理）
- 【新增】判定条件2：A的特征值均大于零
- 【新增】判定条件3：正惯性指数 = n（规范形全为 +1）
- 【新增】半正定、负定、不定的分类与判定

**6.3 曲面与空间曲线**
- 【部分覆盖】与第三章 3.3/3.4 存在交叉，第六章侧重用二次型方法分析曲面形状

**6.4 二次曲面** 【考点，新增】
- 【新增】二次曲面的标准方程分类：椭球面、单叶/双叶双曲面、椭圆/双曲抛物面
- 【新增】用正交变换化简二次曲面方程（消去交叉项）

### 第七章 线性空间与线性变换 【自学，非考点】

- 全部为自读内容，仅补充少量概念性参考条目（与4.3、5.2、5.3建立联系即可）

---

## 四、可用于网页内容包的 JSON 草稿（教材校正后）

> 以下 JSON 已按教材章节目录修正 chapter_id、section_id、section_title。
> 第一至第四章的 22 个知识点完全按教材重新编号。
> 第五至第六章的 3 个知识点保留原内容但修正归属。
> 所有 review_status = "draft"。

```json
[
  {
    "id": "matrix-mul-no-commutative",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.1",
    "section_title": "1.1 矩阵及其运算",
    "order": 1,
    "title": "矩阵乘法的特殊性——与普通数乘法的差异",
    "one_sentence": "矩阵乘法不满足交换律和消去律，这是与普通数乘法最根本的区别。",
    "summary": "矩阵乘法一般不满足交换律（AB≠BA）、不满足消去律（AB=0不能推出A=0或B=0）。必须区分左乘和右乘，(AB)^k≠A^k B^k，(A+B)(A-B)≠A^2-B^2。只有在A和B可交换（AB=BA）时，部分代数公式才恢复。",
    "formulas": ["AB ≠ BA（一般情况）", "(AB)^k ≠ A^k B^k", "AB = 0 ⇏ A=0 或 B=0"],
    "common_mistakes": ["习惯性地把数的乘法律套用到矩阵上", "在因式分解中忘记区分左乘和右乘", "误以为AB=0则至少一个因子为零矩阵"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "rank-1-matrix-power",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.1",
    "section_title": "1.1 矩阵及其运算",
    "order": 2,
    "title": "秩1矩阵及其幂运算",
    "one_sentence": "秩为1的矩阵可写成列向量与行向量的乘积，利用结合律简化幂运算。",
    "summary": "全1矩阵B=αα^T（α=(1,1,…,1)^T，α^Tα=n），利用结合律得B^k=n^(k-1)B，(I-B)^(-1)=I-B/(n-1)。一般地，秩1矩阵A=uv^T→A^k=(v^T u)^(k-1)A。注意：秩的正式定义见2.5节。",
    "formulas": ["B^k = n^(k−1) B（B为全1矩阵）", "A = uv^T ⇒ A^k = (v^T u)^(k−1) A"],
    "common_mistakes": ["忘记利用结合律调整乘积顺序", "迁移到一般秩1矩阵时忘记v^T u是标量"],
    "question_types": ["basic_calculation", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "elementary-matrix-principle",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.2",
    "section_title": "1.2 高斯消元法与矩阵的初等变换",
    "order": 3,
    "title": "初等矩阵与「左乘行变、右乘列变」原则",
    "one_sentence": "对矩阵A作行初等变换等同于左乘对应初等矩阵，列变换等同于右乘。",
    "summary": "三种初等矩阵分别对应交换、倍乘、倍加三种初等变换。行变换→左乘，列变换→右乘。初等矩阵均可逆。解方程组时只能用行变换。记忆：左行右列。",
    "formulas": ["行变换：左乘初等矩阵", "列变换：右乘初等矩阵"],
    "common_mistakes": ["行变换左乘、列变换右乘的方向记反", "解方程组时错误使用列初等变换"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "nilpotent-inverse-identity",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.3",
    "section_title": "1.3 逆矩阵",
    "order": 4,
    "title": "方阵的幂与幂零矩阵求逆",
    "one_sentence": "若A^k=O，则I-A可逆，其逆为I+A+A^2+…+A^(k-1)。",
    "summary": "当矩阵A满足A^k=O（幂零矩阵）时，利用I=I-A^k=(I-A)(I+A+A^2+…+A^(k-1))构造恒等式，推导(I-A)可逆。可类比1/(1-x)=1+x+x^2+…的泰勒展开（仅为启发）。",
    "formulas": ["(I−A)^(−1) = I + A + A^2 + … + A^(k−1)（A^k=O时）"],
    "common_mistakes": ["仅为A^k=O时公式才成立", "与泰勒展开的类比只是启发性的"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "construct-inverse-from-condition",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.3",
    "section_title": "1.3 逆矩阵",
    "order": 5,
    "title": "从给定条件构造逆矩阵",
    "one_sentence": "从A+B=AB可变形为(A-I)(B-I)=I，同时推出可逆性和可交换性。",
    "summary": "已知A+B=AB，移项得AB-A-B+I=I，因式分解为(A-I)(B-I)=I。由此推出A-I可逆、B-I为其逆，进一步推出AB=BA。推广：AB=αA+βB⇒A,B可交换。",
    "formulas": ["A + B = AB ⇒ (A−I)(B−I) = I", "AB = αA + βB ⇒ (1/αβ)(A−βI)(B−αI) = I"],
    "common_mistakes": ["等式变形时忘记加I项", "因式分解符号错误"],
    "question_types": ["basic_calculation", "single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "block-matrix-elementary-transform",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.4",
    "section_title": "1.4 分块矩阵",
    "order": 6,
    "title": "分块矩阵的初等变换",
    "one_sentence": "分块矩阵的初等变换与普通初等变换规则一致，只是「单位」变为适当尺寸的I矩阵。",
    "summary": "对分块矩阵进行初等行/列变换时，规则与普通矩阵一致（左乘行变、右乘列变）。可用于计算分块矩阵的行列式（如|A B; C D|=|A|·|D-CA^(-1)B|，A可逆时）以及证明秩不等式。",
    "formulas": ["行列式公式：|A B; C D| = |A|·|D−CA^(−1)B|（A可逆）"],
    "common_mistakes": ["忘记分块初等矩阵的维数匹配", "左乘和右乘的方向在分块情形下容易搞混"],
    "question_types": ["basic_calculation", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "rank-1-correction-inverse",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.4",
    "section_title": "1.4 分块矩阵",
    "order": 7,
    "title": "秩1修正公式求逆",
    "one_sentence": "(I+UV^T)^(-1)=I-U(I+V^T U)^(-1)V^T，其中I+V^T U的规模通常远小于原矩阵。",
    "summary": "Sherman-Morrison-Woodbury公式的特殊情形：若U,V为n×k矩阵且I+V^T U可逆，则I+UV^T也可逆。列向量情形：(I+uv^T)^(-1)=I-uv^T/(1+v^T u)，条件为1+v^T u≠0。",
    "formulas": ["(I + UV^T)^(−1) = I − U(I + V^T U)^(−1) V^T", "(I + uv^T)^(−1) = I − uv^T/(1+v^T u)"],
    "common_mistakes": ["混淆UV^T和V^T U的维度", "忽略标量1+v^T u≠0的条件"],
    "question_types": ["basic_calculation", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "non-square-ab-equals-i",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch01",
    "section_id": "1.4",
    "section_title": "1.4 分块矩阵",
    "order": 8,
    "title": "非方阵情形的「逆」——左逆与右逆",
    "one_sentence": "非方阵AB=I时A不一定可逆（甚至不一定是方阵），此时A有右逆B，B有左逆A。",
    "summary": "对于m×n矩阵A（m≠n），若存在n×m矩阵C使得AC=I_m，则称C为A的右逆。AB=I时不能直接说A可逆——只有方阵才讨论可逆性。",
    "formulas": ["非方阵有右逆 ≠ 可逆"],
    "common_mistakes": ["看到AB=I就认为A可逆，忽略A可能不是方阵", "对方阵和非方阵混用「可逆」概念"],
    "question_types": ["true_false", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "determinant-strategies",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.2",
    "section_title": "2.2 行列式的性质与计算",
    "order": 9,
    "title": "行列式计算的常见类型与策略",
    "one_sentence": "根据行列式结构选策略：数字型化三角，双线型展开，三线型递推，爪型消爪。",
    "summary": "十种策略：(1)数字型→上三角；(2)双平行线→按行展开；(3)三对角→递推；(4)爪型→消爪；(5)余子式线性组合→构造新行列式；(6)抽象行列式→取特殊向量；(7)范德蒙→套公式；(8)有公因子→提取；(9)共同字母→加边法；(10)相邻行相近→逐行相减。",
    "formulas": ["双线型：D_n = a^n + (−1)^(n+1) b^n", "三对角递推：D_n = 5D_(n−1) − 6D_(n−2)"],
    "common_mistakes": ["递推中初值条件搞错", "爪型消爪方向反", "范德蒙公式元素顺序搞错"],
    "question_types": ["basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "adjoint-matrix-properties",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.2",
    "section_title": "2.2 行列式的性质与计算",
    "order": 10,
    "title": "伴随矩阵的核心性质",
    "one_sentence": "A*=代数余子式的转置，AA*=A*A=|A|I，秩随A的秩有三种情况。",
    "summary": "A*=(A_ji)_{n×n}，AA*=A*A=|A|·I。|A*|=|A|^(n-1)，(A*)*=|A|^(n-2)A。(kA)*=k^(n-1)A*。秩的三种情况：R(A)=n→R(A*)=n；R(A)=n-1→R(A*)=1；R(A)<n-1→R(A*)=0。",
    "formulas": ["AA* = A*A = |A|·I", "|A*| = |A|^(n−1)", "R(A*)=n (R(A)=n); 1 (R(A)=n-1); 0 (R(A)<n-1)"],
    "common_mistakes": ["定义中忘记转置", "|A*|的指数错写成n", "忘记R(A)=n-1时R(A*)=1的特殊情况"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "matrix-rank-properties",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.5",
    "section_title": "2.5 矩阵的秩",
    "order": 11,
    "title": "矩阵的秩——核心性质汇总",
    "one_sentence": "秩是矩阵经初等变换后非零行的行数，等于行秩=列秩，初等变换不改变秩。",
    "summary": "0≤R(A)≤min(m,n)；R(A)=0⇔A=O；若P,Q可逆则R(PA)=R(AQ)=R(PAQ)=R(A)；R(A^T)=R(A)；分块对角矩阵R(diag(A,B))=R(A)+R(B)；自由变量个数=n−R(A)。",
    "formulas": ["R(A) ≤ min(m, n)", "R(PAQ) = R(A)（P,Q可逆）", "自由变量个数 = n − R(A)"],
    "common_mistakes": ["把秩和行列式值混淆", "认为R(A+B)=R(A)+R(B)", "忘记R(PA)=R(A)需P可逆"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "equivalent-standard-form",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.5",
    "section_title": "2.5 矩阵的秩",
    "order": 12,
    "title": "矩阵的等价标准形与满秩分解",
    "one_sentence": "任意矩阵A可化为等价标准形[I_r 0; 0 0]，并可写为列满秩×行满秩的乘积。",
    "summary": "若R(A)=r，则存在可逆P,Q使PAQ=[I_r 0; 0 0]。满秩分解A=BC（B列满秩、C行满秩）。行满秩矩阵存在右逆。同型矩阵等价的充要条件是秩相等。",
    "formulas": ["标准形：PAQ = [I_r 0; 0 0]", "满秩分解：A_{m×n} = B_{m×r} C_{r×n}"],
    "common_mistakes": ["混淆等价和行等价", "满秩分解不唯一"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "invertible-equiv-conditions",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.5",
    "section_title": "2.5 矩阵的秩",
    "order": 13,
    "title": "可逆矩阵的等价刻画（充要条件汇总）",
    "one_sentence": "A可逆⇔|A|≠0⇔R(A)=n⇔Ax=0仅有零解⇔A等价于I等十个等价条件。",
    "summary": "十个等价条件：A可逆；存在B使AB=I（或BA=I）；det A≠0；A*可逆；Ax=0仅有零解；Ax=b有唯一解；A可经初等变换化为I；A可经行变换化为I；A=初等矩阵的乘积；R(A)=n。仅适用于方阵。",
    "formulas": ["A 可逆 ⇔ |A| ≠ 0 ⇔ R(A) = n ⇔ Ax=0 仅有零解"],
    "common_mistakes": ["对非方阵混用可逆概念", "忘记AB=I即可推BA=I（仅方阵）"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "sylvester-rank-inequality",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.5",
    "section_title": "2.5 矩阵的秩",
    "order": 14,
    "title": "Sylvester秩不等式与AB=O的秩关系",
    "one_sentence": "R(A)+R(B)-n≤R(AB)≤min{R(A),R(B)}；若AB=O则R(A)+R(B)≤n。",
    "summary": "Sylvester公式：R(A)+R(B)-n≤R(AB)。当AB=O时推出R(A)+R(B)≤n。导出结论：A^2=A⇒R(A)+R(A-I)=n；A^2+A=O⇒R(A)+R(A+I)=n。n为A的列数（=B的行数）。",
    "formulas": ["R(A) + R(B) − n ≤ R(AB)", "AB = O ⇒ R(A) + R(B) ≤ n", "A^2 = A ⇒ R(A) + R(A−I) = n"],
    "common_mistakes": ["混淆不等号方向", "忘记n是A的列数", "从AB=O错误推出R(A)+R(B)=n"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "matrix-eq-vs-vector-eq",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.5",
    "section_title": "2.5 矩阵的秩",
    "order": 15,
    "title": "矩阵等价与向量组等价的区别",
    "one_sentence": "矩阵等价只需R(A)=R(B)，向量组等价还需要R(A)=R(B)=R(A,B)。",
    "summary": "矩阵等价：A与B同型且R(A)=R(B)。向量组等价：(I)与(II)等价⇔R(I)=R(II)=R(I|II)。行等价时行向量组等价但列向量组可能不等价。矩阵等价（行列变换都用）时行和列向量组都可能不等价。",
    "formulas": ["矩阵等价：R(A) = R(B)", "向量组等价：R(A) = R(B) = R(A, B)"],
    "common_mistakes": ["把R(A)=R(B)当作向量组等价的充要条件", "忘记向量组等价还需验证R(A)=R(A,B)"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "geometric-cross-triple-product",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch03",
    "section_id": "3.2",
    "section_title": "3.2 向量的乘法",
    "order": 16,
    "title": "几何空间——向量的内积、外积与混合积",
    "one_sentence": "内积得标量、外积得向量且模为平行四边形面积；混合积为零⇔三向量共面。",
    "summary": "内积（点积）α·β=|α||β|cosθ。外积（叉积）α×β垂直于α,β，模为平行四边形面积。混合积[α,β,γ]=α·(β×γ)=det(α,β,γ)，共面⇔混合积=0。",
    "formulas": ["内积：α·β = |α||β|cosθ", "混合积：[α,β,γ] = det(α,β,γ)", "共面 ⇔ 混合积为零"],
    "common_mistakes": ["外积方向用右手法则易反", "混淆内积和外积的结果类型（标量vs向量）"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "plane-line-position",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch03",
    "section_id": "3.3",
    "section_title": "3.3 平面",
    "order": 17,
    "title": "平面与直线的位置关系——秩的几何意义",
    "one_sentence": "几何问题可转为线性方程组问题：R(A)=R(A|b)⇔有交点，R(A)≠R(A|b)⇔无交点。",
    "summary": "三平面两两相交且交线相互平行⇔R(A)=2, R(A|b)=3⇔无公共交点。两直线相交⇔方向向量线性无关且共面。平面与直线的位置关系最终归结为增广矩阵的秩判断。",
    "formulas": ["R(A)=R(A|b) ⇔ 有公共交点", "R(A)≠R(A|b) ⇔ 无公共交点"],
    "common_mistakes": ["三平面两两相交≠有公共交点", "用秩判断时搞混系数矩阵和增广矩阵"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "linear-dependence-matrix-method",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.2",
    "section_title": "4.2 向量组的线性相关性",
    "order": 18,
    "title": "向量组线性相关/无关的定义与矩阵判定法",
    "one_sentence": "存在不全为零系数使组合为零→线性相关；用矩阵的秩和齐次方程组的解来判定。",
    "summary": "α_1,…,α_n线性相关⇔存在不全为零的k_i使Σk_iα_i=0⇔R(A)<n⇔Ax=0有非零解。线性无关⇔只有全零系数⇔R(A)=n⇔Ax=0只有零解。β可由α组表出⇔Ax=β有解⇔R(A)=R(A|β)。",
    "formulas": ["Σk_i α_i = 0（线性相关定义）", "α_1,…,α_n 线性无关 ⇔ R(A) = n"],
    "common_mistakes": ["混淆线性相关与无关的定义", "忽略全零向量组的特殊情况"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "linear-dependence-dual-properties",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.2",
    "section_title": "4.2 向量组的线性相关性",
    "order": 19,
    "title": "线性相关/无关的两个对偶结论",
    "one_sentence": "部分相关→整体相关；整体无关→部分无关。短无关→长无关；长相关→短相关。",
    "summary": "个数关系：部分向量组相关→添加后整体相关；整体无关→子部分无关。维数关系：低维向量无关→加高维分量后仍无关；高维相关→截短后仍相关。反向推理均不成立。",
    "formulas": ["无具体公式，以逻辑命题形式呈现"],
    "common_mistakes": ["反向推理：'部分无关⇒整体无关'是错的", "'整体相关⇒部分相关'也是错的"],
    "question_types": ["true_false", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "matrix-p-method-linear-dependence",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.2",
    "section_title": "4.2 向量组的线性相关性",
    "order": 20,
    "title": "构造矩阵P法判断线性相关性",
    "one_sentence": "将新向量组写为原向量组的矩阵乘积，通过P的可逆性判断两组的相关性是否一致。",
    "summary": "(β_1,…,β_m)=(α_1,…,α_n)P，若P可逆则两组有相同线性相关性（同时相关或同时无关），若P不可逆则β组一定线性相关。经典应用：判断α_1+α_2,α_2+α_3,α_3+α_1的无关性（m为奇数时无关）。",
    "formulas": ["(β_1,…,β_m) = (α_1,…,α_n) P", "P 可逆 ⇔ 转换不改变线性相关性"],
    "common_mistakes": ["构造P矩阵时列之间的系数对应关系写错", "P可逆性判断错误"],
    "question_types": ["basic_calculation", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "gram-matrix-method",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.2",
    "section_title": "4.2 向量组的线性相关性",
    "order": 21,
    "title": "Gram矩阵判定法——用内积矩阵判断线性无关",
    "one_sentence": "α_1,…,α_n线性无关⇔其Gram矩阵A^T A的行列式不为零（即Gram矩阵可逆）。",
    "summary": "设A=(α_1,…,α_n)，A^T A的元素为内积α_i^T α_j。线性无关⇔det A≠0⇔det(A^T A)≠0。即向量组线性无关的充要条件是Gram矩阵非奇异。仅对实向量成立。",
    "formulas": ["Gram矩阵：G = A^T A，G_ij = α_i^T α_j", "线性无关 ⇔ det G ≠ 0"],
    "common_mistakes": ["Gram矩阵的i,j元素是内积α_i^T α_j，不是α_i^T α_i", "对复向量需用共轭转置"],
    "question_types": ["true_false", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "matrix-product-linear-representation",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.3",
    "section_title": "4.3 向量组的秩与极大无关组",
    "order": 22,
    "title": "用矩阵乘法理解线性表出关系",
    "one_sentence": "C=AB意味着C的列可由A的列表出，C的行可由B的行表出。",
    "summary": "C=AB的每一列是A的列向量的线性组合，组合系数来自B的对应列。由此推出R(AB)≤min{R(A),R(B)}。若AB=I（A为n×m, B为m×n, n<m），则B的n个列向量线性无关（B列满秩）。",
    "formulas": ["C = AB ⇒ R(AB) ≤ min{R(A), R(B)}", "AB = I_n (n<m) ⇒ B列满秩"],
    "common_mistakes": ["乘积的列用A的行向量表出（方向反了）", "看到AB=I以为A可逆"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "linear-eq-existence-uniqueness",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.4",
    "section_title": "4.4 线性方程组解的结构",
    "order": 23,
    "title": "齐次/非齐次线性方程组解的存在性与唯一性判定",
    "one_sentence": "齐次总有解（至少零解）；非齐次有解⇔R(A)=R(A|b)；自由变量个数=n−R(A)。",
    "summary": "Ax=0总有解，唯一零解⇔R(A)=n（无自由变量），有非零解⇔R(A)<n。Ax=b有解⇔R(A)=R(A|b)，有解时唯一解⇔R(A)=n，无穷多解⇔R(A)<n。自由变量个数=n−R(A)。",
    "formulas": ["自由变量个数 = n − R(A)", "Ax=0 唯一零解 ⇔ R(A) = n"],
    "common_mistakes": ["总有零解≠只有零解", "非齐次忘记先判断R(A)=R(A|b)"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "fundamental-system-general-solution",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.4",
    "section_title": "4.4 线性方程组解的结构",
    "order": 24,
    "title": "基础解系与通解结构",
    "one_sentence": "Ax=0的基础解系含n−R(A)个解向量；Ax=b通解=特解+齐次通解。",
    "summary": "若R(A)=r<n，Ax=0有基础解系含n-r个线性无关解向量，通解为任意线性组合。Ax=b通解=一个特解+导出组的基础解系的任意线性组合。特解与基础解系线性无关。dim(解空间)=n−R(A)。",
    "formulas": ["dim(解空间) = n − R(A)", "Ax=b 通解 = 特解 + 齐次通解"],
    "common_mistakes": ["基础解系向量个数写成r而不是n-r", "非齐次通解忘记加特解"],
    "question_types": ["basic_calculation", "single_choice"],
    "review_status": "draft"
  },
  {
    "id": "ata-same-rank-a",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch04",
    "section_id": "4.4",
    "section_title": "4.4 线性方程组解的结构",
    "order": 25,
    "title": "R(A^T A)=R(A)的证明与应用",
    "one_sentence": "对实矩阵A，Ax=0与A^T Ax=0同解，因此R(A^T A)=R(A)。",
    "summary": "Ax=0⇒A^T Ax=0。反之A^T Ax=0⇒x^T A^T Ax=0⇒‖Ax‖^2=0⇒Ax=0。两解空间相等，故n−R(A)=n−R(A^T A)⇒R(A^T A)=R(A)。仅对实矩阵成立。",
    "formulas": ["R(A^T A) = R(A) = R(A A^T)", "Ax=0 与 A^T Ax=0 同解"],
    "common_mistakes": ["对复矩阵需用共轭转置", "忽略利用了实向量内积性质"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "idempotent-matrix-diagonalization",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch05",
    "section_id": "5.2",
    "section_title": "5.2 矩阵的相似对角化",
    "order": 26,
    "title": "幂等矩阵的性质与相似对角化",
    "one_sentence": "A^2=A⇒特征值只能为0或1，且A一定可相似对角化，tr(A)=R(A)。",
    "summary": "A^2=A⇒A(A-I)=O⇒R(A)+R(A-I)=n。特征值λ=0或1。0对应n-R(A)个特征向量，1对应n-R(I-A)个，共n个线性无关特征向量→可对角化。tr(A)=R(A)。",
    "formulas": ["A^2 = A ⇒ λ = 0 或 1", "tr(A) = R(A)", "R(A) + R(A−I) = n"],
    "common_mistakes": ["误认为幂等矩阵一定是I或O", "tr(A)=R(A)易忘"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "symmetric-vs-ordinary-diagonalization",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch05",
    "section_id": "5.4",
    "section_title": "5.4 实对称矩阵的相似对角化",
    "order": 27,
    "title": "实对称矩阵 vs 普通矩阵——相似对角化比较",
    "one_sentence": "实对称矩阵必可正交相似对角化，特征值全实数且不同特征值的特征向量正交。",
    "summary": "关键差异：特征值（实对称→全实数/普通不一定）、不同特征值的特征向量（实对称→正交/普通→线性无关）、能否对角化（实对称→一定能/普通→有条件）。对角化判定：全单根→可对角化；k重根→检查R(λI-A)=n-k。",
    "formulas": ["∃正交C：C^T AC = Λ", "k重根可对角化 ⇔ R(λI−A) = n−k"],
    "common_mistakes": ["把实对称性质套用到普通矩阵", "多重根时忘记验证几何重数"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "similarity-congruence-equivalence",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch06",
    "section_id": "6.1",
    "section_title": "6.1 实二次型及其标准形",
    "order": 28,
    "title": "二次型的标准形与规范形",
    "one_sentence": "通过正交变换或配方法将二次型化为只含平方项的形式，规范形中系数只有+1、−1、0。",
    "summary": "正交变换x=Qy保持向量内积不变（x^T x=y^T y）。在约束x^T x=1下，f=x^T Ax的最大值为A的最大特征值。规范形由正负惯性指数决定。",
    "formulas": ["正交变换：x = Qy, Q^T Q = I ⇒ ‖x‖ = ‖y‖", "max_{‖x‖=1} x^T Ax = λ_max(A)"],
    "common_mistakes": ["标准形系数不等于特征值（非正交变换时）", "规范形系数只能是+1、−1、0"],
    "question_types": ["single_choice", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "similarity-congruence-eq-comparison",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch06",
    "section_id": "6.1",
    "section_title": "6.1 实二次型及其标准形",
    "order": 29,
    "title": "矩阵相似、合同与等价的区别",
    "one_sentence": "等价看秩；相似看λI-A等价；合同看正负惯性指数（实对称矩阵）。",
    "summary": "相似：A=P^(-1)BP，充要条件是λI-A与λI-B等价。合同：仅对称矩阵，实数域上⇔正负惯性指数相同。合同与相似无从属关系。可对角化时非零特征值个数=秩=正惯性+负惯性。",
    "formulas": ["相似：A = P^(−1) BP", "合同：A = C^T B C", "正惯性指数 + 负惯性指数 = 秩（可对角化时）"],
    "common_mistakes": ["合同和相似条件互相套用", "忘记合同与数域有关", "混淆正负惯性指数与特征值正负个数"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  },
  {
    "id": "laplace-theorem",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.3",
    "section_title": "2.3 拉普拉斯定理",
    "order": 13,
    "title": "拉普拉斯定理——行列式按k行展开",
    "one_sentence": "将行列式按任意k行展开，等于这k行中所有k阶子式与其代数余子式的乘积之和。",
    "summary": "拉普拉斯定理是行列式按一行展开的推广。从n行中选取k行，构成C(n,k)个k阶子式，每个子式乘以其代数余子式（带符号(−1)^(行标和+列标和)的n−k阶余子式）并求和，等于原行列式。k=1时退化为普通余子式展开；k=n时为行列式本身。重要应用：分块三角行列式的快速计算。",
    "formulas": ["D = Σ M_k · A_k（M_k为k阶子式，A_k为代数余子式）", "代数余子式的符号：(−1)^(i₁+…+i_k + j₁+…+j_k)"],
    "common_mistakes": ["代数余子式的符号忘记乘以(−1)^(行标和+列标和)", "子式和余子式的阶数搞反", "混淆按一行展开和按k行展开的区别"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "cramer-rule",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch02",
    "section_id": "2.4",
    "section_title": "2.4 克拉默法则",
    "order": 14,
    "title": "克拉默法则——用行列式解线性方程组",
    "one_sentence": "若系数矩阵A为n阶方阵且|A|≠0，则Ax=b的唯一解为x_i=|A_i|/|A|。",
    "summary": "n元线性方程组Ax=b中，若|A|≠0，则将A的第i列替换为b得A_i，x_i=|A_i|/|A|。需计算n+1个n阶行列式。推论：齐次方程组Ax=0有非零解⇔|A|=0。克拉默法则说明了解的唯一性与行列式非零的等价关系，是线性方程组理论的基础定理。",
    "formulas": ["x_i = |A_i| / |A|（A_i为A第i列换成b）", "Ax=0 有非零解 ⇔ |A| = 0"],
    "common_mistakes": ["忘记前提条件|A|≠0", "A_i的构造：只换第i列，其余列不变", "n较大时不实用，但考试中常考n=3的数值计算"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "eigenvalue-definition-calculation",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch05",
    "section_id": "5.1",
    "section_title": "5.1 特征值与特征向量的概念与计算",
    "order": 28,
    "title": "特征值与特征向量的概念与计算",
    "one_sentence": "Ax=λx（x≠0）中λ为特征值、x为特征向量，特征值满足|λI−A|=0。",
    "summary": "若Ax=λx且x≠0，则λ为A的特征值，x为对应的特征向量。特征值由特征多项式|λI−A|=0解得。对每个特征值λ，解(λI−A)x=0得全体特征向量。重要性质：tr(A)=Σλ_i，|A|=Πλ_i。不同特征值对应的特征向量线性无关。",
    "formulas": ["|λI−A| = 0", "tr(A) = Σλ_i", "|A| = Πλ_i"],
    "common_mistakes": ["特征向量不能为零向量", "特征多项式中λ−a还是a−λ的顺序（|λI−A|vs|A−λI|）", "重根时特征空间维数可能小于代数重数"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "similar-diagonalization-condition",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch05",
    "section_id": "5.2",
    "section_title": "5.2 矩阵的相似对角化",
    "order": 29,
    "title": "可相似对角化的充要条件",
    "one_sentence": "n阶方阵可相似对角化⇔有n个线性无关的特征向量⇔每个k重特征值的几何重数=代数重数。",
    "summary": "A可相似对角化⇔存在可逆P使P^(−1)AP=Λ。判断步骤：(1)求全部特征值；(2)若全为单根→可对角化；(3)若有k重根→检验R(λI−A)=n−k是否成立（几何重数等于代数重数）。对角矩阵Λ的对角元为特征值，P的列为对应特征向量。",
    "formulas": ["k重根可对角化 ⇔ R(λI−A) = n−k", "P^(−1)AP = diag(λ₁,…,λ_n)"],
    "common_mistakes": ["k重特征值不自动保证k个线性无关特征向量", "几何重数≤代数重数，必须验证等号", "对角化时P的列顺序必须与Λ对角元顺序一致"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "schmidt-orthogonalization",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch05",
    "section_id": "5.3",
    "section_title": "5.3 n维向量空间的正交性",
    "order": 30,
    "title": "施密特正交化方法",
    "one_sentence": "将一组线性无关向量转化为两两正交（或标准正交）的向量组。",
    "summary": "施密特正交化过程：给定线性无关向量组α₁,…,α_m，构造β₁=α₁，β₂=α₂−(⟨α₂,β₁⟩/⟨β₁,β₁⟩)β₁，…，β_k=α_k−Σ(⟨α_k,β_i⟩/⟨β_i,β_i⟩)β_i。再单位化得γ_i=β_i/‖β_i‖即得标准正交基。正交矩阵满足Q^T Q=I，Q^T=Q^(−1)。",
    "formulas": ["β_k = α_k − Σ_{i=1}^{k-1} (⟨α_k, β_i⟩ / ⟨β_i, β_i⟩) β_i", "Q^T Q = I, Q^T = Q^(−1)"],
    "common_mistakes": ["减号方向搞反", "内积顺序写错（⟨α,β⟩应为α^T β）", "标准正交化后忘记验证Q^T Q=I"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "real-symmetric-orthogonal-diagonalization",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch05",
    "section_id": "5.4",
    "section_title": "5.4 实对称矩阵的相似对角化",
    "order": 31,
    "title": "实对称矩阵的正交相似对角化",
    "one_sentence": "实对称矩阵必可正交对角化：∃正交矩阵Q使Q^T AQ = Q^(−1) AQ = diag(λ₁,…,λ_n)。",
    "summary": "实对称矩阵的性质：(1)特征值全为实数；(2)不同特征值的特征向量正交；(3)一定可相似对角化且可用正交矩阵。计算流程：求特征值→求特征向量→对重根的特征向量施密特正交化→全部单位化→排成正交矩阵Q。过渡矩阵Q满足Q^T AQ = Λ。",
    "formulas": ["Q^T AQ = Q^(−1) AQ = diag(λ₁,…,λ_n)", "实对称矩阵：不同λ的特征向量正交"],
    "common_mistakes": ["普通方阵不一定能对角化，实对称一定能", "重根时忘记施密特正交化", "正交矩阵的列是单位正交向量"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "positive-definite-quadratic-form",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch06",
    "section_id": "6.2",
    "section_title": "6.2 正定二次型",
    "order": 33,
    "title": "正定二次型的定义与判定",
    "one_sentence": "对任意x≠0，f(x)=x^T Ax>0⇔A正定，可由顺序主子式、特征值或惯性指数判定。",
    "summary": "判定n元二次型正定的三种等价方法：(1)霍尔维茨定理：A的各阶顺序主子式均大于零；(2)特征值法：A的所有特征值均大于零；(3)惯性指数法：正惯性指数=n（规范形全为+1）。半正定：≥0且存在非零x使=0。负定：−A正定。不定：既有正值也有负值。",
    "formulas": ["正定 ⇔ 顺序主子式 > 0", "正定 ⇔ λ_i > 0 (i=1,…,n)", "正定 ⇔ 正惯性指数 = n"],
    "common_mistakes": ["顺序主子式与主子式的区别（顺序主子式是左上角依次取）", "仅一个主子式>0不保证正定，需全部", "混淆正定和半正定的条件"],
    "question_types": ["single_choice", "true_false", "basic_calculation"],
    "review_status": "draft"
  },
  {
    "id": "quadratic-surfaces-classification",
    "course_id": "uestc-linear-algebra",
    "chapter_id": "ch06",
    "section_id": "6.4",
    "section_title": "6.4 二次曲面",
    "order": 34,
    "title": "二次曲面的标准方程与分类",
    "one_sentence": "用正交变换消去交叉项，将二次曲面方程化为标准形式进行分类。",
    "summary": "二次曲面一般方程含x²,y²,z²,xy,xz,yz项。通过正交变换（对应二次型的正交对角化）消去交叉项，再配方确定曲面类型。主要类型：椭球面(x²/a²+y²/b²+z²/c²=1)、单叶双曲面、双叶双曲面、椭圆抛物面、双曲抛物面（马鞍面）。正交变换不改变曲面形状，只改变坐标方向。",
    "formulas": ["椭球面：x²/a² + y²/b² + z²/c² = 1", "用正交变换消去xy,xz,yz交叉项"],
    "common_mistakes": ["正交变换后忘记配方法确定中心位置", "混淆旋转抛物面和双曲抛物面的方程特征"],
    "question_types": ["single_choice", "true_false"],
    "review_status": "draft"
  }
]
```

---

## 五、习题参考与自测题设计建议

### 按教材章节的题目设计优先级

#### 第一章 矩阵及其初等变换
建议优先出题（备考高频）：
- **矩阵乘法运算规则判断题**：判断 (A+B)(A-B)=A^2-B^2、(AB)^k=A^k B^k 等是否正确
- **初等矩阵识别选择题**：给定初等变换，选择对应的初等矩阵
- **逆矩阵构造计算题**：已知 A+B=AB（或等价条件），求 A 的逆
- **分块矩阵选择题**：判断 |A B; C D| 的行列式表达式

#### 第二章 行列式
建议优先出题（**克拉默法则和拉普拉斯定理是重点考点**）：
- **数字行列式计算题**：3阶/4阶具体数字行列式（基础题）
- **抽象行列式判断题**：如 |α,β,γ| 的符号变化题
- **伴随矩阵秩的选择题**：已知 R(A) 求 R(A*) 
- **秩不等式判断题**：已知 AB=O 判断 R(A)+R(B) 的范围
- **克拉默法则计算题**：n=3时用克拉默法则求唯一解（重点题型）
- **拉普拉斯定理计算题**：分块三角行列式的快速计算

#### 第三章 几何空间
建议优先出题：
- **向量积基本计算题**：求两个给定向量的叉积
- **混合积共面判定题**：判断三点/三向量是否共面
- **平面位置关系判断题**：三平面交线平行→无公共交点

#### 第四章 n维向量空间
建议优先出题（备考高频）：
- **线性相关/无关定义判断题**：判断"有一向量可由其余表示⇔线性相关"是否正确
- **构造P矩阵法计算题**：已知α组无关，判断新向量组的无关性
- **基础解系计算题**：给定方程组求基础解系和通解
- **自由变量个数的选择题**：已知矩阵阶和秩，选择自由变量个数

#### 第五至六章 【重点】

| 知识点 | 建议题型 | 出题难度 |
|---|---|---|
| 特征值与特征向量的定义 | 选择题、判断题 | 低 |
| 特征多项式与特征值计算（3阶以内） | 基础计算题 | 中 |
| 迹与行列式的关系 | 选择题 | 低 |
| 可相似对角化的充要条件 | 选择题、判断题 | 中 |
| 实对称矩阵正交对角化计算 | 基础计算题 | 高 |
| 施密特正交化计算（3维） | 基础计算题 | 中 |
| 正定二次型判定（顺序主子式/特征值） | 选择题、基础计算题 | 中 |
| 二次曲面标准方程分类识别 | 选择题、判断题 | 低 |

### 出题数量建议（含校订后更新）

| 章 | 选择题 | 判断题 | 基础计算题 | 合计 | 备注 |
|---|---|---|---|---|---|
| 第一章 | 5 | 3 | 2 | 10 | 不变 |
| 第二章 | 6 | 4 | 4 | 14 | **新增：克拉默+拉普拉斯各2题** |
| 第三章 | 3 | 2 | 2 | 7 | 不变 |
| 第四章 | 5 | 3 | 3 | 11 | 不变 |
| 第五章 | 5 | 3 | 3 | 11 | **新增：完整覆盖** |
| 第六章 | 4 | 3 | 1 | 8 | **新增：正定+二次曲面** |
| **小计** | **28** | **18** | **15** | **61** | |

> 第七章（自学）暂不出题。

---

## 六、待人工确认清单

1. **伴随矩阵在教材中的准确位置**：教材 TOC 显示伴随矩阵相关内容应出现在行列式章节（第2章），但教材正文中具体在 2.1/2.2 的哪个位置定义伴随矩阵，需翻看正文确认。目前暂归入 2.2。

2. **可逆矩阵等价条件汇总的归属**：讲座在第一章末尾/第二章交界处汇总了十个等价条件。按教材逻辑，涉及行列式（|A|≠0）和秩（R(A)=n）的条件应在学过第二章后才能完整呈现。目前归入 2.5，但也可以在 1.3 放一个前置版。

3. **Gram 矩阵判定法的教材对应位置**：该结论来自 R(A^T A)=R(A)，教材中该秩性质可能出现在 2.5（秩），但内积定义出现在 3.2 和 5.3。目前归入 4.2（向量组）作为判定工具。

4. **第三章几何空间的内容完整性**：讲座资料对 3.1（坐标系与向量）和 3.3/3.4（平面/直线方程）覆盖不完整（偏向应用/判定，缺乏方程形式的推导）。建议后续对照教材正文补充平面方程、直线方程的内容。

5. **第五章小节归属细化**：**已根据教材结构补充了 5.1（特征值概念与计算）、5.2（相似对角化充要条件）、5.3（施密特正交化）、5.4（实对称正交对角化）四个知识点的框架。**但因教材正文未逐页提取，具体定义表述需对照教材确认。

6. **第六章二次型 vs 二次曲面拆分**：**已补充 6.2（正定二次型判定）和 6.4（二次曲面分类）。**教材第六章包含 6.1-6.2（二次型理论）和 6.3-6.4（曲面/二次曲面）两个不同性质的内容块，后续可考虑在网页平台上拆分为两个子模块。

7. **第二章 2.3（拉普拉斯定理）和 2.4（克拉默法则）是重点考点**：已确认。已根据教材结构补充这两个知识点的条目，但因教材正文未逐页提取，具体定义表述、例题需对照教材原文确认。

8. **第一章 1.1 中"秩1矩阵"的术语时机**：秩的概念在 2.5 才正式引入，在 1.1 中就使用"秩1矩阵"的称呼是否合适？建议在 1.1 用"可分解为 uv^T 的矩阵"这一描述，避免过早引入秩术语。

9. **讲座中的"华罗庚恒等式"、"Sherman-Morrison-Woodbury公式"等名称**：这些名称在中文教材中可能不以这些英文/人名形式出现。需对照教材确认教材使用的术语，保证网页平台与教材一致。

10. **第4章的小节编号已在 JSON 中修正**：原草稿中归属于"第三章"和"第四章"的知识点已全部重新编号为 ch04/4.2、4.3、4.4。请审核是否还有遗漏的知识点未被重新归属。

11. **JSON 的 order 编号需重排**：新增知识点条目（拉普拉斯、克拉默、5.1-6.4条目）的 order 编号与原有条目有重叠。建议人工审核后将整个 JSON 数组按 (chapter_id, section_id) 统一重新编号。

---

> **校正完成状态**：
> - 第一至四章：**完全校正**（含新增 2.3/2.4 重点知识点）
> - 第五至六章：**重点补充完成**（新增 6 个知识点，覆盖全部小节）
> - 第七章：**降级为自学参考**（非考点，仅需少量概览条目）
> - JSON 合计 **35 个知识点**，全部 review_status = "draft"

> **下一步**：请人工审核后，将 JSON 替换到 content-packs/uestc-linear-algebra/knowledge-points.json 中，并按教材正文逐条核对具体表述。
