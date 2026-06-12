import { useTheme } from "@/context/ThemeContext";

// Centralized Recharts color tokens that respect light/dark mode.
export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return {
    axisTick: dark ? "#94A3B8" : "#64748B",
    axisTickStrong: dark ? "#E2E8F0" : "#0F172A",
    axisLine: dark ? "#334155" : "#E2E8F0",
    grid: dark ? "#334155" : "#E2E8F0",
    cursor: dark ? "#1E293B" : "#F1F5F9",
    tooltip: {
      background: dark ? "#0F172A" : "#FFFFFF",
      border: `1px solid ${dark ? "#334155" : "#E2E8F0"}`,
      borderRadius: 2,
      fontSize: 12,
      color: dark ? "#E2E8F0" : "#0F172A",
    },
  };
}
