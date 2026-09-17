import { NextResponse } from "next/server";

export const runtime = "nodejs";

function isAuthorized(request: Request) {
  const expectedToken = process.env.ADMIN_API_TOKEN;
  const suppliedToken = request.headers.get("x-admin-token");
  return Boolean(expectedToken && suppliedToken && suppliedToken === expectedToken);
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "configuration_missing" }, { status: 503 });
  }

  const threshold = Number(process.env.DEEPSEEK_LOW_BALANCE_CNY ?? "10");

  try {
    const providerResponse = await fetch("https://api.deepseek.com/user/balance", {
      headers: { Authorization: `Bearer ${apiKey}` }
    });

    if (!providerResponse.ok) {
      return NextResponse.json({ error: "provider_error" }, { status: 502 });
    }

    const result = (await providerResponse.json()) as {
      is_available?: boolean;
      balance_infos?: Array<{ currency?: string; total_balance?: string }>;
    };
    const cnyBalance = result.balance_infos?.find(
      (item) => item.currency === "CNY"
    );
    const totalBalance = Number(cnyBalance?.total_balance ?? "NaN");

    return NextResponse.json({
      isAvailable: result.is_available ?? false,
      currency: cnyBalance?.currency ?? null,
      totalBalance: Number.isFinite(totalBalance) ? totalBalance : null,
      threshold,
      isLowBalance: Number.isFinite(totalBalance) && totalBalance < threshold
    });
  } catch {
    return NextResponse.json({ error: "provider_unavailable" }, { status: 502 });
  }
}

