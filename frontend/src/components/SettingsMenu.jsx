import { Sun, Moon, Monitor, Settings, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { useData } from "@/context/DataContext";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export default function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const { resetData } = useData();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-9 h-9 inline-flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-sm bg-white dark:bg-slate-900 hover:border-brand-600 dark:hover:border-brand-500 transition-colors"
          aria-label="Settings"
          data-testid="settings-button"
        >
          <Settings className="w-4 h-4 text-slate-700 dark:text-slate-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
        data-testid="settings-menu"
      >
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-slate-400">
          Appearance
        </DropdownMenuLabel>
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = theme === opt.value;
          return (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => setTheme(opt.value)}
              className={`rounded-sm text-sm cursor-pointer flex items-center gap-2 ${
                active
                  ? "bg-brand-50 text-brand-700 dark:bg-brand-600/15 dark:text-brand-400"
                  : "text-slate-700 dark:text-slate-300"
              }`}
              data-testid={`theme-${opt.value}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="flex-1">{opt.label}</span>
              {active && <span className="text-brand-600 dark:text-brand-400 text-[10px]">●</span>}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
        <DropdownMenuLabel className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-slate-400">
          Data
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            resetData();
            toast.success("Demo data reset");
          }}
          className="rounded-sm text-sm cursor-pointer text-slate-700 dark:text-slate-300 flex items-center gap-2"
          data-testid="settings-reset-data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset demo data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
