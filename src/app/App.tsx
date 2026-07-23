import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Wifi, WifiOff, Check, ChevronRight, ArrowLeft, Volume2, QrCode,
  Clock, Camera, Star, Zap, Compass, Printer, PenTool,
  User, BookOpen, Signal, Heart, Menu, Search, MessageCircle, X, SlidersHorizontal, Eye,
  Bell, Settings, WalletCards, ClipboardList, Trophy, CircleDollarSign, Flame,
  Upload, Download, Mic,
} from "lucide-react";
import aiBuddyGif from "../imports/ai-buddy.gif";
import exploreRoseBox from "../imports/explore-rose-box.png";
import exploreSpringLauncher from "../imports/explore-spring-launcher.png";
import exploreMiniBasketball from "../imports/explore-mini-basketball.png";
import exploreThunderHammer from "../imports/explore-thunder-hammer.png";
import dinosaurModel from "../imports/model-dinosaur.png";
import starModel from "../imports/model-star.png";
import rocketModel from "../imports/model-rocket.png";
import meReference from "../imports/me-reference.png";
import meEmptyPlaceholder from "../imports/me-empty-placeholder.png";
import createReference from "../imports/create-reference.png";
import deviceReference from "../imports/device-reference.png";
import printerReference from "../imports/printer-reference.png";
import createDinosaurs from "../imports/create-dinosaurs.png";
import createSuperhero from "../imports/create-superhero.png";

const FD = "'Baloo 2', 'Noto Sans SC', sans-serif";
const FN = "'Nunito', 'Noto Sans SC', sans-serif";
const FM = "'DM Mono', monospace";
const PRIMARY_GRADIENT = "linear-gradient(135deg, #FF9A66 0%, #FF591D 52%, #E64A14 100%)";

function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// ─── Shared primitives ───────────────────────────────────────────────────────

function GeoBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
      <div className="absolute top-20 -left-3 w-14 h-14 rounded-full bg-yellow-300 opacity-25" />
      <div className="absolute top-36 right-3 w-9 h-9 bg-red-400 rotate-45 opacity-20" />
      <div className="absolute top-56 left-6 w-11 h-11 border-4 border-[#FF9A66] rounded-full opacity-18" />
      <div className="absolute bottom-56 right-1 w-16 h-16 rounded-full bg-green-300 opacity-20" />
      <div className="absolute bottom-40 left-2 w-8 h-8 bg-purple-400 rotate-12 opacity-20" />
      <div className="absolute top-80 right-5 w-7 h-7 bg-[#FF8A66] rounded-sm rotate-45 opacity-25" />
      <div className="absolute top-44 right-1 w-6 h-6 border-4 border-yellow-400 rotate-12 opacity-30" />
      <div className="absolute bottom-72 left-8 w-5 h-5 rounded-full bg-amber-300 opacity-30" />
    </div>
  );
}

function AiBuddy({ size = 120, mood = "happy" }: { size?: number; mood?: "happy" | "thinking" | "excited" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
      animate={reduceMotion ? undefined : { y: [0, -3, 0], scale: mood === "excited" ? [1, 1.035, 1] : [1, 1.018, 1] }}
      transition={{ duration: mood === "excited" ? 2.4 : 3.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={aiBuddyGif}
        alt="小X机器人"
        className="h-full w-full object-contain drop-shadow-[0_12px_16px_rgba(255,122,0,0.18)]"
      />
    </motion.div>
  );

  /* Legacy vector mascot kept temporarily for easy visual rollback. */
  const eyeVariants =
    mood === "thinking"
      ? { scaleY: [1, 0.15, 1, 0.15, 1] }
      : mood === "excited"
      ? { scaleY: [1, 0.05, 1] }
      : { scaleY: [1, 0.08, 1] };

  return (
    <motion.div
      style={{ width: size, height: size, flexShrink: 0 }}
      className="relative flex items-center justify-center"
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,212,122,0.76) 0%, transparent 72%)" }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 3.8, repeat: Infinity }}
      />
      {/* Body */}
      <div
        className="relative rounded-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          width: size, height: size,
          background: "linear-gradient(150deg, #FF9A66 0%, #F24D17 60%, #C83E10 100%)",
          boxShadow: "0 8px 0 rgba(222,84,0,0.34), 0 18px 30px rgba(255,122,0,0.27)",
        }}
      >
        {/* Eyes */}
        <div className="flex items-center" style={{ gap: size * 0.13, marginTop: size * 0.07 }}>
          {[0, 0.08].map((delay, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-full flex items-center justify-center"
              style={{ width: size * 0.18, height: size * 0.18 }}
              animate={eyeVariants}
              transition={{ duration: 4.5, repeat: Infinity, delay, times: [0, 0.47, 0.53, 0.57, 1] }}
            >
              <div className="bg-gray-900 rounded-full" style={{ width: size * 0.09, height: size * 0.09 }} />
            </motion.div>
          ))}
        </div>
        {/* Mouth */}
        <div
          style={{
            width: size * 0.3, height: size * 0.13,
            borderBottomWidth: Math.max(2, size * 0.026),
            borderStyle: "solid", borderColor: "white",
            borderLeftColor: "transparent", borderRightColor: "transparent", borderTopColor: "transparent",
            borderRadius: "0 0 999px 999px",
            marginTop: size * 0.03,
          }}
        />
        {/* Cheeks */}
        <div
          className="absolute flex items-center"
          style={{ bottom: size * 0.17, left: size * 0.09, right: size * 0.09, justifyContent: "space-between" }}
        >
          <div className="rounded-full bg-pink-300 opacity-50" style={{ width: size * 0.14, height: size * 0.07 }} />
          <div className="rounded-full bg-pink-300 opacity-50" style={{ width: size * 0.14, height: size * 0.07 }} />
        </div>
      </div>
      {/* Antenna */}
      <div
        className="absolute flex flex-col items-center"
        style={{ top: -(size * 0.15), left: "50%", transform: "translateX(-50%)" }}
      >
        <div style={{ width: Math.max(3, size * 0.032), height: size * 0.14, background: "#FFD77B", borderRadius: 999 }} />
        <motion.div
          className="rounded-full bg-yellow-400"
          style={{ width: size * 0.12, height: size * 0.12, marginTop: -(size * 0.045) }}
          animate={{ scale: [1, 1.45, 1], boxShadow: ["0 0 0px #FFD14A", "0 0 10px #FFD14A", "0 0 0px #FFD14A"] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}

function SpeechBubble({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`relative rounded-[20px] border border-[#E9EBF0] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(48,56,70,0.06)] ${className}`}>
      <p className="text-sm font-medium leading-relaxed text-[#4B5563]" style={{ fontFamily: FN }}>{text}</p>
      <div
        className="absolute"
        style={{
          bottom: -7, left: 18, width: 14, height: 14,
          background: "white", transform: "rotate(45deg)",
          boxShadow: "2px 2px 4px rgba(0,0,0,0.06)",
        }}
      />
    </div>
  );
}

function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-1.5 mt-1">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          animate={{
            width: i === current ? 18 : 6,
            height: 6,
            backgroundColor: i <= current ? "#FF591D" : "#E4E7EC",
          }}
          transition={{ duration: 0.35 }}
        />
      ))}
    </div>
  );
}

function PrimaryBtn({
  label, onClick, disabled = false, icon,
}: { label: string; onClick: () => void; disabled?: boolean; icon?: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 text-[16px] font-extrabold"
      style={{
        fontFamily: FN, height: 56, borderRadius: 999,
        background: disabled ? "#E8EAF0" : PRIMARY_GRADIENT,
        color: disabled ? "#9AA0AA" : "white",
        boxShadow: disabled ? "none" : "0 9px 20px rgba(255,89,29,0.22)",
      }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {icon}{label}
    </motion.button>
  );
}

// ─── Page 0: AI Welcome ───────────────────────────────────────────────────────

const PRINTER_READINESS = [
  { id: 0, group: "连接准备", label: "打印机已接通电源并开机" },
  { id: 1, group: "连接准备", label: "手机蓝牙或 Wi-Fi 已开启" },
  { id: 2, group: "连接准备", label: "打印机处于配对状态并靠近手机" },
] as const;

function WelcomePage({ hasPrinter, onModelSelected, onPrinterAdded }: { hasPrinter: boolean; onModelSelected: (modelId: number) => void; onPrinterAdded: () => void }) {
  const [status, setStatus] = useState<ConnStatus | null>(hasPrinter ? "connected" : null);
  const [checklistOpen, setChecklistOpen] = useState(hasPrinter);
  const [readiness, setReadiness] = useState<Set<number>>(new Set());
  const [wifiName, setWifiName] = useState("家庭 Wi‑Fi");
  const allReady = readiness.size === PRINTER_READINESS.length;

  const toggleReadiness = (id: number) => {
    setReadiness(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const nextStatus: Partial<Record<ConnStatus, { value: ConnStatus; delay: number }>> = {
      scanning: { value: "found", delay: 1500 },
      found: { value: "wifi", delay: 1100 },
      connecting: { value: "connected", delay: 1700 },
    };
    if (!status || !nextStatus[status]) return;
    const nextStep = nextStatus[status];
    const timer = setTimeout(() => setStatus(nextStep.value), nextStep.delay);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (status === "connected") onPrinterAdded();
  }, [status]);

  const connectionCopy = {
    scanning: { title: "正在寻找附近的打印机…", detail: "请保持打印机处于开机状态", color: "#FF591D" },
    found: { title: "发现 X-MAKER Pro", detail: "匹配成功 · 信号良好", color: "#16803C" },
    wifi: { title: "配置打印机 Wi‑Fi", detail: "让打印机和手机连接到同一网络", color: "#FF591D" },
    connecting: { title: "正在连接设备…", detail: "请家长确认打印机指示灯", color: "#FF591D" },
    connected: { title: "设备连接成功！", detail: "X-MAKER Pro 已准备就绪", color: "#16803C" },
  };

  return (
    <div className="xm-page relative flex h-full flex-col overflow-hidden px-4 pb-[104px] pt-[68px]" style={{ fontFamily: FN }}>
      <motion.div className="mt-4 flex justify-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <AiBuddy size={132} mood="happy" />
      </motion.div>
      <motion.section className="mt-5 px-4 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-[22px] font-extrabold leading-tight text-[#182230]">你好，我是小 X</h1>
        <p className="mx-auto mt-2 max-w-[290px] text-[13px] font-medium leading-relaxed text-[#747B86]">我是你的3D打印机伙伴，我会陪你连接设备、挑选模型，并完成第一次打印。</p>
      </motion.section>

      {!checklistOpen && !status && <div className="mt-5"><PrimaryBtn label="开始连接设备" onClick={() => setChecklistOpen(true)} icon={<Wifi size={19} />} /></div>}

      <AnimatePresence mode="wait">
        {checklistOpen && !status && (
          <motion.section key="checklist" className="xm-material mt-5 rounded-[24px] p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="flex items-start justify-between gap-3">
              <div><h2 className="text-[18px] font-extrabold text-[#182230]">先检查打印机准备情况</h2><p className="mt-1 text-xs font-medium text-[#747B86]">完成检查后，我再帮你搜索设备。</p></div>
              <span className="rounded-full bg-[#FFF0E7] px-2.5 py-1 text-xs font-extrabold text-[#B83D12]">{readiness.size}/{PRINTER_READINESS.length}</span>
            </div>
            <div className="mt-3 space-y-1">
              {PRINTER_READINESS.map(item => {
                const checked = readiness.has(item.id);
                return <button key={item.id} onClick={() => toggleReadiness(item.id)} aria-pressed={checked} className="flex min-h-11 w-full items-center gap-3 rounded-[14px] px-2 py-1.5 text-left active:bg-[#FFF8EE]"><motion.span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2" animate={{ backgroundColor: checked ? "#FF591D" : "#FFFFFF", borderColor: checked ? "#FF591D" : "#D6DAE1" }}>{checked && <Check size={13} className="text-white" strokeWidth={3} />}</motion.span><span className="text-[13px] font-bold text-[#3E4651]">{item.label}</span></button>;
              })}
            </div>
              <div className="mt-3"><PrimaryBtn label={allReady ? "开始搜索打印机" : `还需确认 ${PRINTER_READINESS.length - readiness.size} 项`} onClick={() => setStatus("scanning")} disabled={!allReady} icon={<Wifi size={18} />} /></div>
          </motion.section>
        )}
      </AnimatePresence>

      {status === "scanning" && (
        <motion.div className="relative mt-5 flex h-[142px] items-center justify-center overflow-hidden rounded-[24px] border border-[#FFD8C8] bg-[#FFF8EE]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {[0,1,2].map(index => <motion.span key={index} className="absolute rounded-full border-2 border-[#FF9A66]" style={{ width: 48, height: 48 }} animate={{ width: [48,148], height: [48,148], opacity: [0.58,0] }} transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.72, ease: "easeOut" }} />)}
          <motion.span className="absolute h-[112px] w-px origin-bottom bg-gradient-to-t from-[#FF591D] to-transparent" animate={{ rotate: 360 }} transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }} />
          <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(255,89,29,0.2)]"><Wifi size={25} className="text-[#FF591D]" /></div>
          <span className="absolute bottom-3 text-[10px] font-bold text-[#B83D12]">正在扫描附近设备</span>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {status && status !== "wifi" && (
          <motion.div key={status} className="mt-4 flex items-center gap-3 rounded-[20px] border border-[#E9EBF0] bg-white px-4 py-3 shadow-[0_8px_22px_rgba(48,56,70,0.06)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ background: status === "found" || status === "connected" ? "#E7F8EC" : "#FFF0E7" }}>
              {status === "found" ? <img src={printerReference} alt="X-MAKER Pro 打印机" className="h-full w-full object-contain" /> : status === "connected" ? <Check size={22} className="text-green-600" /> : <Printer size={22} className="text-[#FF591D]" />}
            </div>
            <div className="min-w-0 flex-1"><p className="text-sm font-extrabold" style={{ color: connectionCopy[status].color }}>{connectionCopy[status].title}</p><p className="mt-0.5 text-xs text-[#8A9099]">{connectionCopy[status].detail}</p></div>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "wifi" && (
        <motion.section className="mt-4 rounded-[22px] border border-[#FFD8C8] bg-white p-4 shadow-[0_8px_22px_rgba(48,56,70,0.06)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0E7] text-[#FF591D]"><Wifi size={20} /></div><div><p className="text-sm font-extrabold text-[#182230]">配置打印机 Wi‑Fi</p><p className="mt-0.5 text-[11px] font-medium text-[#8A9099]">让打印机和手机连接到同一网络</p></div></div>
          <label htmlFor="welcome-wifi" className="mt-4 block text-[11px] font-extrabold text-[#747B86]">Wi‑Fi 名称</label>
          <input id="welcome-wifi" value={wifiName} onChange={event => setWifiName(event.target.value)} className="mt-1.5 h-11 w-full rounded-[14px] border border-[#E9EBF0] bg-[#FAFBFC] px-3 text-[13px] font-bold text-[#3E4651] outline-none focus:border-[#FF591D] focus:ring-2 focus:ring-[#FFD8C8]" />
          <div className="mt-3"><PrimaryBtn label="连接 Wi‑Fi" onClick={() => setStatus("connecting")} disabled={!wifiName.trim()} icon={<Wifi size={17} />} /></div>
        </motion.section>
      )}

      {!status && !checklistOpen && <p className="mt-3 text-center text-xs font-medium text-[#747B86]">需要家长协助完成设备连接</p>}
      {status && status !== "wifi" && status !== "connected" && <p className="mt-3 text-center text-xs font-medium text-[#747B86]">请稍候，正在完成连接</p>}

      {status === "connected" && (
        <motion.section className="mt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-3 flex items-center justify-between px-1"><h2 className="text-[17px] font-extrabold text-[#182230]">选一个模型开始打印</h2><span className="rounded-full bg-[#FFF0E7] px-2.5 py-1 text-[10px] font-extrabold text-[#B83D12]">简单易打印</span></div>
          <div className="grid grid-cols-3 gap-2">{MODELS.map(model => <motion.button key={model.id} onClick={() => onModelSelected(model.id)} className="overflow-hidden rounded-[18px] border border-[#E9EBF0] bg-white p-2 text-left shadow-[0_6px_16px_rgba(48,56,70,0.05)] active:scale-[0.97]"><div className="flex h-[68px] items-center justify-center rounded-[13px] p-1" style={{ background: model.cardBg }}><img src={model.image} alt={model.name} className="h-full w-full object-contain mix-blend-multiply" /></div><p className="mt-2 truncate text-[12px] font-extrabold text-[#182230]">{model.name}</p><p className="mt-0.5 flex items-center gap-1 text-[9px] font-semibold text-[#8A9099]"><Clock size={9} />{model.time}</p></motion.button>)}</div>
        </motion.section>
      )}
    </div>
  );
}

// ─── Page 1: Device Connect ───────────────────────────────────────────────────

type ConnStatus = "scanning" | "found" | "wifi" | "connecting" | "connected";

function ConnectPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [status, setStatus] = useState<ConnStatus>("scanning");

  useEffect(() => {
    const timers = [
      setTimeout(() => setStatus("found"), 2200),
      setTimeout(() => setStatus("connecting"), 3900),
      setTimeout(() => setStatus("connected"), 5900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const statusText: Record<ConnStatus, React.ReactNode> = {
    scanning: <p className="text-gray-500" style={{ fontFamily: FN }}>正在搜索附近的打印机...</p>,
    found: <p className="font-bold text-[#E84A12]" style={{ fontFamily: FN }}>📡 发现设备！X-MAKER Pro</p>,
    wifi: <p className="font-semibold text-[#E84A12]" style={{ fontFamily: FN }}>配置打印机 Wi‑Fi</p>,
    connecting: (
      <div className="text-center">
        <p className="font-semibold text-[#E84A12]" style={{ fontFamily: FN }}>正在连接中...</p>
        <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: FN }}>请家长确认设备指示灯</p>
      </div>
    ),
    connected: (
      <div className="text-center">
        <p className="font-bold text-green-600 text-xl" style={{ fontFamily: FD }}>连接成功！🎉</p>
        <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: FM }}>X-MAKER Pro · 信号强 · 已就绪</p>
      </div>
    ),
  };

  return (
    <div className="flex flex-col h-full px-6 pt-14 pb-24 relative">
      <GeoBg />

      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-[0_5px_14px_rgba(165,92,20,0.10)] border border-[#FFE7C2]">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: FD }}>连接打印机</h2>
          <StepDots total={6} current={1} />
        </div>
      </div>

      {/* Radar */}
      <div className="flex items-center justify-center relative my-6" style={{ height: 190 }}>
        {status === "scanning" &&
          [1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-[#FF9A66]"
              style={{ width: 72, height: 72 }}
              animate={{ width: 72 + i * 52, height: 72 + i * 52, opacity: [0.65, 0] }}
              transition={{ duration: 2.3, repeat: Infinity, delay: i * 0.56, ease: "easeOut" }}
            />
          ))}
        <motion.div
          className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center z-10"
          animate={status === "connected" ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 0.45 }}
        >
          <Printer size={38} className={status === "connected" ? "text-green-500" : "text-[#FF591D]"} />
        </motion.div>
        {status === "connected" && (
          <motion.div
            className="absolute z-20 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            style={{ top: "calc(50% - 44px)", left: "calc(50% + 22px)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Check size={16} className="text-white" />
          </motion.div>
        )}
      </div>

      {/* Status */}
      <div className="h-16 flex flex-col items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            {statusText[status]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Device card */}
      <AnimatePresence>
        {status !== "scanning" && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-[#FFF0E7] rounded-xl flex items-center justify-center">
              <Printer size={24} className="text-[#FF591D]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-800" style={{ fontFamily: FN }}>X-MAKER Pro</p>
              <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: FM }}>XM-PRO-2024 · A 型</p>
            </div>
            <motion.div
              className={`w-3 h-3 rounded-full ${status === "connected" ? "bg-green-400" : "bg-yellow-400"}`}
              animate={status !== "connected" ? { opacity: [1, 0.3, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className="flex items-center justify-center gap-2 text-sm text-[#FF591D] mb-6"
        style={{ fontFamily: FN }}
      >
        <QrCode size={16} /> 扫描二维码手动连接
      </button>

      <div className="mt-auto">
        <PrimaryBtn
          label={status === "connected" ? "选择打印模型" : "等待连接中..."}
          onClick={onNext}
          disabled={status !== "connected"}
          icon={status === "connected" ? <ChevronRight size={20} /> : undefined}
        />
      </div>
    </div>
  );
}

// ─── Page 2: Model Recommend ──────────────────────────────────────────────────
const MODELS = [
  { id: 0, image: dinosaurModel, name: "小恐龙", time: "12 分钟", diff: "入门", diffBg: "#16A34A", cardBg: "#F0FDF4", border: "#86EFAC" },
  { id: 1, image: rocketModel, name: "迷你火箭", time: "15 分钟", diff: "入门", diffBg: "#F24D17", cardBg: "#FFF1D7", border: "#FFD77B" },
  { id: 2, image: starModel, name: "幸运星", time: "10 分钟", diff: "超简单", diffBg: "#B45309", cardBg: "#FEFCE8", border: "#FDE68A", recommended: true },
];

function ModelPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="xm-page flex h-full flex-col px-4 pb-24 pt-[62px]">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} aria-label="返回选择模型" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E9EBF0] bg-white shadow-[0_5px_14px_rgba(48,56,70,0.06)] active:scale-95">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-[22px] font-extrabold text-[#182230]" style={{ fontFamily: FN }}>选择第一件作品</h2>
          <StepDots total={6} current={2} />
        </div>
      </div>

      <div className="flex items-end gap-3 my-5">
        <AiBuddy size={60} />
        <SpeechBubble
          text="我为你精选了 3 个超适合新手的模型！选一个你最喜欢的吧 🎨"
          className="flex-1"
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {MODELS.map((m, idx) => {
          const sel = selected === m.id;
          return (
            <motion.button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className="relative border-2 bg-white p-4 text-left shadow-[0_8px_20px_rgba(48,56,70,0.05)]"
              style={{ borderColor: sel ? "#FF591D" : "#E9EBF0", borderRadius: 20 }}
              whileTap={{ scale: 0.975 }}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_5px_14px_rgba(91,59,24,0.08)]"
                  animate={sel ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <img src={m.image} alt={m.name} className="h-full w-full object-contain mix-blend-multiply" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800 text-lg" style={{ fontFamily: FD }}>{m.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-gray-500 text-xs" style={{ fontFamily: FN }}>
                      <Clock size={11} /> {m.time}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-bold text-white"
                      style={{ background: "#FFF2DE", color: "#B83D12", fontFamily: FN }}
                    >
                      {m.diff}
                    </span>
                  </div>
                </div>
                <motion.div
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  animate={{
                    backgroundColor: sel ? "#FF591D" : "rgba(0,0,0,0)",
                    borderColor: sel ? "#FF591D" : "#D1D5DB",
                    scale: sel ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.28 }}
                >
                  {sel && <Check size={13} className="text-white" />}
                </motion.div>
              </div>
              {m.recommended && (
                <div
                  className="absolute -top-2.5 right-4 text-xs font-bold px-3 py-1 rounded-full text-gray-900"
                  style={{ background: "#FFD14A", fontFamily: FN }}
                >
                  推荐
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4">
        <PrimaryBtn
          label={selected !== null ? "下一步：安全检查" : "请选择一个模型"}
          onClick={onNext}
          disabled={selected === null}
          icon={selected !== null ? <ChevronRight size={20} /> : undefined}
        />
      </div>
    </div>
  );
}

// ─── Page 3: Safety Check ─────────────────────────────────────────────────────

const SAFETY = [
  { id: 0, emoji: "🎨", label: "耗材已正确安装", desc: "确认耗材安装到位且无断裂" },
  { id: 1, emoji: "✋", label: "打印时不触碰喷头", desc: "喷头高温，请与家长一起确认" },
];

function SafetyPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const allDone = checked.size === SAFETY.length;

  const toggle = (id: number) => {
    const next = new Set(checked);
    next.has(id) ? next.delete(id) : next.add(id);
    setChecked(next);
  };

  return (
    <div className="xm-page flex h-full flex-col px-4 pb-24 pt-[62px]">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E9EBF0] bg-white shadow-[0_5px_14px_rgba(48,56,70,0.06)] active:scale-95">
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <div>
          <h2 className="text-[22px] font-extrabold text-[#182230]" style={{ fontFamily: FN }}>安全检查</h2>
          <StepDots total={6} current={3} />
        </div>
      </div>

      <div className="flex items-end gap-3 mb-5">
        <AiBuddy size={58} mood="thinking" />
        <SpeechBubble
          text="打印前一起做个安全检查！全部打勾才能开始打印哦 🔒"
          className="flex-1"
        />
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {SAFETY.map((item, idx) => {
          const on = checked.has(item.id);
          return (
            <motion.button
              key={item.id}
              onClick={() => toggle(item.id)}
              aria-pressed={on}
              className="flex items-center gap-4 border-2 text-left"
              style={{
                background: "white",
                borderColor: on ? "#FF591D" : "#E9EBF0",
                borderRadius: 20, padding: 14,
              }}
              whileTap={{ scale: 0.975 }}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm" style={{ fontFamily: FN }}>{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: FN }}>{item.desc}</p>
              </div>
              <motion.div
                className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                animate={{
                  backgroundColor: on ? "#FF591D" : "rgba(0,0,0,0)",
                  borderColor: on ? "#FF591D" : "#E2E8F0",
                  scale: on ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.28 }}
              >
                {on && <Check size={13} className="text-white" />}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4 mb-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-400" style={{ fontFamily: FN }}>
            已完成 {checked.size}/{SAFETY.length}
          </span>
          {allDone && (
            <motion.span className="text-green-500 font-bold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: FN }}>
              全部完成！✓
            </motion.span>
          )}
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#E8EAF0]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "#FF591D" }}
            animate={{ width: `${(checked.size / SAFETY.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <PrimaryBtn label={allDone ? "开始打印" : "请完成所有检查项"} onClick={onNext} disabled={!allDone} />
    </div>
  );
}

// ─── Page 4: Printing Progress ────────────────────────────────────────────────

const FACTS = [
  "你知道吗？3D打印机一层一层地堆叠材料来打印！",
  "世界上第一台3D打印机诞生于 1983 年的美国 🇺🇸",
  "你的作品由超过 200 层细细的材料组成！",
  "3D打印耗材 PLA 是由植物淀粉制成的环保材料 🌿",
  "加油！你的作品快完成了！再坚持一下 ✨",
];

function PrintingPage({ onNext, model }: { onNext: () => void; model: (typeof MODELS)[number] }) {
  const [progress, setProgress] = useState(0);
  const [factIdx, setFactIdx] = useState(0);
  const [taps, setTaps] = useState(0);
  const done = progress >= 100;

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setProgress(p => Math.min(100, p + 1)), 95);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    const t = setInterval(() => setFactIdx(i => (i + 1) % FACTS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const R = 68, CIRC = 2 * Math.PI * R;

  return (
    <div className="xm-page flex h-full flex-col px-4 pb-24 pt-[62px]">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: FD }}>
          {done ? "打印完成" : "正在打印"}
        </h2>
        <StepDots total={6} current={4} />
      </div>

      {/* Progress ring */}
      <div className="flex items-center justify-center mb-5 relative" style={{ height: 178 }}>
        <svg width="178" height="178" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="89" cy="89" r={R} fill="none" stroke="#FFF1D7" strokeWidth="14" />
          <motion.circle
            cx="89" cy="89" r={R}
            fill="none"
            stroke={done ? "#22C55E" : "#FF591D"}
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            animate={{ strokeDashoffset: CIRC - (progress / 100) * CIRC }}
            transition={{ duration: 0.12 }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold" style={{ fontFamily: FD, color: done ? "#16A34A" : "#FF591D" }}>
            {progress}%
          </span>
          <span className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: FN }}>
            {done ? "已完成" : `约 ${Math.ceil((100 - progress) * 0.09)} 分钟`}
          </span>
          <motion.span
            className="text-2xl mt-1"
            animate={done ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {done ? <Check size={27} /> : <Printer size={26} />}
          </motion.span>
        </div>
      </div>

      {/* AI rotating facts */}
      <div className="flex items-end gap-3 mb-4">
        <AiBuddy size={52} mood={progress > 80 ? "excited" : "happy"} />
        <AnimatePresence mode="wait">
          <motion.div
            key={factIdx}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.28 }}
            className="flex-1"
          >
            <SpeechBubble text={FACTS[factIdx]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mini game */}
      <div className="mb-4 rounded-[20px] border border-[#E9EBF0] bg-white p-4 text-center shadow-[0_8px_20px_rgba(48,56,70,0.05)]">
        <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: FN }}>等待时，帮{model.name}充能吧！</p>
        <motion.button
          onClick={() => setTaps(c => c + 1)}
          className="mx-auto flex h-16 w-16 cursor-pointer select-none items-center justify-center overflow-hidden rounded-2xl bg-[#FFF2DE] p-1"
          whileTap={{ scale: 1.45 }}
          transition={{ type: "spring", stiffness: 520, damping: 10 }}
        >
          <img src={model.image} alt={`为${model.name}充能`} className="h-full w-full object-contain mix-blend-multiply" />
        </motion.button>
        <p className="text-xs text-[#FF591D] mt-2" style={{ fontFamily: FN }}>
          已充能 {taps} 次{taps >= 10 ? "，超级能量" : ""}
        </p>
      </div>

      {/* Knowledge card */}
      <div className="flex items-center gap-3 rounded-[20px] border border-[#FFE4C3] bg-[#FFF2DE] p-4">
        <div className="w-10 h-10 bg-[#FFE4D6] rounded-xl flex items-center justify-center flex-shrink-0">
          <BookOpen size={18} className="text-[#FF591D]" />
        </div>
        <div>
          <p className="text-xs font-bold text-[#E84A12] mb-0.5" style={{ fontFamily: FN }}>今日知识卡</p>
          <p className="text-xs text-gray-500 leading-relaxed" style={{ fontFamily: FN }}>
            FDM 打印使用加热喷嘴将耗材熔化，精确堆叠在平台上，每层约 0.2mm 厚。
          </p>
        </div>
      </div>

      {done && (
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" }}
        >
          <PrimaryBtn label="🎉 查看我的作品" onClick={onNext} />
        </motion.div>
      )}
    </div>
  );
}

// ─── Page 5: Complete & Reward ────────────────────────────────────────────────

function RewardPage({ onFinish, model }: { onFinish: () => void; model: (typeof MODELS)[number] }) {
  const reduceMotion = useReducedMotion();
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const completedOn = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const confetti = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      left: Math.random() * 96,
      color: ["#FF591D", "#FFD166", "#22C55E"][i % 3],
      delay: Math.random() * 1.3,
      duration: 2.2 + Math.random() * 1.6,
      drift: (Math.random() - 0.5) * 130,
      rotate: Math.random() * 720,
      size: 6 + Math.random() * 7,
    }))
  ).current;

  return (
    <div className="xm-page relative flex h-full flex-col overflow-hidden px-4 pb-24 pt-[62px]">
      {!reduceMotion && confetti.map((c, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none rounded-sm"
          style={{ left: `${c.left}%`, top: -18, width: c.size, height: c.size, background: c.color }}
          animate={{ y: 860, x: c.drift, rotate: c.rotate, opacity: [1, 1, 0] }}
          transition={{ duration: c.duration, delay: c.delay, ease: "easeIn" }}
        />
      ))}

      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF2DE] text-[#FF591D]"
          animate={{ rotate: [0, -12, 12, -12, 12, 0], scale: [1, 1.18, 1] }}
          transition={{ delay: 0.5, duration: 0.85 }}
        >
          <Trophy size={27} />
        </motion.div>
        <h1 className="text-[28px] font-extrabold text-[#182230]" style={{ fontFamily: FN }}>打印完成啦！</h1>
        <p className="text-gray-500 mt-2 text-sm" style={{ fontFamily: FN }}>你成功完成了第一个 3D 打印作品！</p>
      </motion.div>

      {/* Artwork showcase */}
      <motion.div
        className="xm-material mb-4 flex flex-col items-center rounded-[24px] p-5 text-center"
        style={{
          borderRadius: 24,
        }}
        initial={{ scale: 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 140 }}
      >
        <motion.div
          className="mb-3 flex h-[132px] w-[170px] items-center justify-center overflow-hidden rounded-[20px] bg-[#EEF8EE] p-2"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={model.image} alt={`完成打印的${model.name}`} className="h-full w-full object-contain mix-blend-multiply" />
        </motion.div>
        <p className="text-gray-400 text-xs" style={{ fontFamily: FN }}>我的{model.name} · 第一件作品</p>
        <p className="text-gray-300 text-xs mt-0.5" style={{ fontFamily: FM }}>{completedOn} · PLA · {model.time}</p>
      </motion.div>

      {/* Badge */}
      <motion.div
        className="mb-4 flex items-center gap-4 rounded-[20px] border border-[#FFE4C3] bg-[#FFF2DE] p-4"
        initial={{ x: -22, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.75 }}
      >
        <motion.span
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#FF591D]"
          animate={{ rotate: [0, 16, -16, 0] }}
          transition={{ delay: 1.1, duration: 0.65 }}
        >
          <Trophy size={24} />
        </motion.span>
        <div className="flex-1">
          <p className="font-bold text-gray-800" style={{ fontFamily: FD }}>首次创作者</p>
          <p className="text-xs text-yellow-700 mt-0.5" style={{ fontFamily: FN }}>完成了第一次 3D 打印！</p>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-[#B83D12]" style={{ fontFamily: FN }}>
          +50 XP
        </span>
      </motion.div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-3">
        {[
          { icon: <Camera size={16} />, label: "保存作品卡", feedback: "作品卡已保存" },
          { icon: <Star size={16} />, label: "分享朋友", feedback: "分享卡片已准备好" },
        ].map(btn => (
          <button
            key={btn.label}
            onClick={() => setActionFeedback(btn.feedback)}
            className="flex flex-1 items-center justify-center gap-2 rounded-[16px] border border-[#E9EBF0] bg-white py-3 text-sm font-bold text-gray-600 active:scale-[0.98]"
            style={{ fontFamily: FN }}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {actionFeedback && (
          <motion.p
            key={actionFeedback}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mb-3 text-center text-xs font-extrabold text-[#16803C]"
          >
            <Check size={13} className="mr-1 inline" />{actionFeedback}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <PrimaryBtn label="继续创作" onClick={onFinish} icon={<ChevronRight size={20} />} />
      </motion.div>
    </div>
  );
}

// ─── Page 6: Main App ─────────────────────────────────────────────────────────

const NAV = [
  { id: "explore", icon: Compass, label: "探索" },
  { id: "device", icon: Printer, label: "设备" },
  { id: "ai", icon: Zap, label: "AI" },
  { id: "create", icon: PenTool, label: "创作" },
  { id: "me", icon: User, label: "我的" },
];

const NEXT_PROJECTS = [
  { id: 0, image: dinosaurModel, name: "小恐龙", time: "12分钟", bg: "#EEF8EE" },
  { id: 2, image: starModel, name: "幸运星", time: "10分钟", bg: "#FFF8DE" },
  { id: 1, image: rocketModel, name: "迷你火箭", time: "15分钟", bg: "#FFF0E7" },
];

const TAB_PLACEHOLDERS: Record<string, { icon: string; label: string; sub: string }> = {
  explore: { icon: "🗺️", label: "探索精选模型", sub: "精选活动 · 课程 · 套件" },
  device:  { icon: "🖨️", label: "打印机管理",   sub: "设备 · 耗材 · 打印记录" },
  create:  { icon: "✏️",  label: "创作专区",     sub: "AI 创作 · 模型编辑 · 历史作品" },
  me:      { icon: "👤", label: "成长档案",      sub: "徽章 · 收藏 · 设置" },
};

const EXPLORE_PROJECTS = [
  { name: "玫瑰盒", duration: "1:14", views: "305.8K", image: exploreRoseBox },
  { name: "弹簧枪发射器", duration: "0:56", views: "144.8K", image: exploreSpringLauncher },
  { name: "迷你篮球场", duration: "1:08", views: "98.2K", image: exploreMiniBasketball },
  { name: "雷神之锤", duration: "0:49", views: "87.6K", image: exploreThunderHammer },
] as const;

function ExplorePage() {
  const [favorites, setFavorites] = useState<string[]>(["玫瑰盒", "弹簧枪发射器", "迷你篮球场"]);
  const [activeCategory, setActiveCategory] = useState("趣味玩法");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleFavorite = (name: string) => {
    setFavorites(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  const visibleProjects = EXPLORE_PROJECTS.filter(project =>
    project.name.includes(query.trim()) && (!favoritesOnly || favorites.includes(project.name))
  );

  return (
    <div className="xm-page relative min-h-full px-4 pb-8 pt-[70px]" style={{ fontFamily: FN }}>
      <header className="mb-5">
        <div className="flex items-center gap-2">
          <button onClick={() => setSidebarOpen(true)} aria-label="打开探索菜单" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#182230] active:bg-[#FFF2DE]">
            <Menu size={22} strokeWidth={2.3} />
          </button>
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#E2E5EA] bg-white px-3.5 text-[#8A9099] shadow-[0_4px_12px_rgba(48,56,70,0.04)]">
            <Search size={18} strokeWidth={2.3} />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索玩法或模型" aria-label="搜索玩法或模型" className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#182230] outline-none placeholder:text-[#A3A6AE]" />
          </label>
          <button aria-label="消息" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#182230] active:bg-[#FFF2DE]">
            <MessageCircle size={21} strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-5 border-b border-[#EEF0F3]">
          <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto">
            {["趣味玩法", "玩具", "教程指南", "精品课程"].map(item => (
              <button key={item} onClick={() => setActiveCategory(item)} aria-pressed={activeCategory === item} className="relative shrink-0 pb-3 text-[15px] font-extrabold" style={{ color: activeCategory === item ? "#1F2937" : "#9CA3AF" }}>
                {item}
                {activeCategory === item && <span className="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#FF591D]" />}
              </button>
            ))}
          </div>
          <button
            onClick={() => setFavoritesOnly(value => !value)}
            aria-label={favoritesOnly ? "显示全部作品" : "只看收藏"}
            aria-pressed={favoritesOnly}
            className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#68707C] active:bg-[#FFF2DE]"
            style={{ color: favoritesOnly ? "#FF591D" : undefined }}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} aria-label="关闭侧边栏" className="absolute inset-0 z-50 bg-black/20" />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: "spring", stiffness: 360, damping: 32 }} className="absolute left-0 top-0 z-[60] h-full w-[250px] bg-white px-5 pb-8 pt-[78px] shadow-[12px_0_28px_rgba(31,36,46,0.14)]">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-extrabold text-[#182230]">探索菜单</h2>
                <button onClick={() => setSidebarOpen(false)} aria-label="关闭侧边栏" className="flex h-9 w-9 items-center justify-center rounded-full text-[#68707C] active:bg-[#FFF2DE]"><X size={20} /></button>
              </div>
              <div className="mt-7 space-y-2">
                {["活动", "套件"].map(item => (
                  <button key={item} onClick={() => { setActiveCategory(item); setSidebarOpen(false); }} className="flex h-12 w-full items-center rounded-[14px] px-3 text-left text-[15px] font-extrabold text-[#3E4651] active:bg-[#FFF2DE]">{item}<ChevronRight className="ml-auto" size={17} /></button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {activeCategory === "趣味玩法" ? (
      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {visibleProjects.map((project, index) => {
          const liked = favorites.includes(project.name);
          return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.28 }}
              className="min-w-0 rounded-[20px] bg-white pb-3 shadow-[0_8px_22px_rgba(48,56,70,0.05)]"
            >
              <div className="relative h-[198px] overflow-hidden rounded-t-[20px] bg-gray-100">
                <img
                  src={project.image}
                  alt={project.name}
                  className="pointer-events-none h-full w-full select-none object-cover"
                />
                <button
                  onClick={() => toggleFavorite(project.name)}
                  aria-label={liked ? `取消收藏${project.name}` : `收藏${project.name}`}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm active:scale-95"
                >
                  <Heart size={18} fill={liked ? "currentColor" : "none"} strokeWidth={2.4} />
                </button>
              </div>
              <h2 className="mt-2.5 truncate px-1 text-[15px] font-extrabold text-gray-900">{project.name}</h2>
              <div className="mt-1 flex items-center gap-3 px-1 text-[12px] font-semibold text-gray-400">
                <span className="flex items-center gap-1"><Clock size={14} /> {project.duration}</span>
                <span className="flex items-center gap-1"><Eye size={14} /> {project.views}</span>
              </div>
            </motion.article>
          );
        })}
      </div>
      ) : (
        <motion.div key={activeCategory} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[380px] flex-col items-center justify-center rounded-[24px] border border-[#E9EBF0] bg-white px-8 text-center">
          <BookOpen size={38} className="text-[#FF591D]" />
          <h2 className="mt-4 text-lg font-extrabold text-[#182230]">{activeCategory}正在准备中</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#8A9099]">内容上线后会在这里展示，先去看看趣味玩法吧。</p>
          <button onClick={() => setActiveCategory("趣味玩法")} className="mt-5 h-11 rounded-full bg-gradient-to-br from-[#FF9A66] via-[#FF591D] to-[#E64A14] px-6 text-sm font-extrabold text-white shadow-[0_7px_16px_rgba(255,89,29,0.18)] active:scale-95">返回趣味玩法</button>
        </motion.div>
      )}

      {activeCategory === "趣味玩法" && visibleProjects.length === 0 && (
        <div className="mt-4 rounded-[20px] border border-[#E9EBF0] bg-white px-5 py-8 text-center">
          <p className="text-sm font-extrabold text-[#182230]">没有找到匹配的作品</p>
          <button onClick={() => { setQuery(""); setFavoritesOnly(false); }} className="mt-3 text-sm font-extrabold text-[#FF591D]">清除筛选</button>
        </div>
      )}

      <div className="mt-6 rounded-[20px] border border-[#FFE4C3] bg-[#FFF2DE] px-4 py-3 text-sm font-extrabold text-[#B83D12]">
        AOSEED Wiki <span className="ml-1 font-semibold">官方技术支持</span>
      </div>
    </div>
  );
}

function MePage() {
  const [section, setSection] = useState("我的收藏");
  const [category, setCategory] = useState("玩具");
  const sections = ["我的收藏", "历史记录", "我的模型", "我的切片"];
  const categories = ["玩具", "趣味玩法", "教程指南", "精品课程"];

  return (
    <div className="xm-page relative min-h-full overflow-hidden px-4 pb-10 pt-[66px]" style={{ fontFamily: FN }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[290px] bg-[radial-gradient(circle_at_18%_12%,rgba(255,242,222,0.95),transparent_43%),radial-gradient(circle_at_88%_14%,rgba(255,224,184,0.66),transparent_42%),linear-gradient(180deg,#FFFFFF_0%,#F5F6FB_100%)]" />

      <header className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-r-full bg-white/75 py-2 pl-1 pr-4 text-sm font-extrabold text-gray-700 shadow-sm">
          <Trophy size={20} className="text-[#FF591D]" /> 我的成就
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <button disabled aria-label="通知，即将开放" title="即将开放" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 opacity-45"><Bell size={21} /></button>
          <button disabled aria-label="设置，即将开放" title="即将开放" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 opacity-45"><Settings size={22} /></button>
        </div>
      </header>

      <motion.section className="relative z-10 mt-5 flex flex-col items-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative h-[108px] w-[108px] overflow-hidden rounded-full border-4 border-white bg-[#D9B795] shadow-[0_8px_22px_rgba(76,61,48,0.12)]">
          <img src={meReference} alt="用户头像" className="absolute max-w-none" style={{ width: 396, left: -144, top: -127 }} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <h1 className="text-[23px] font-black text-gray-900">into</h1>
          <span className="rounded-full border border-[#FFE0B8] bg-[#FFF2DE] px-3 py-1 text-[10px] font-extrabold text-[#B83D12]">Lv0 小鬼萌新</span>
        </div>
      </motion.section>

      <motion.section className="relative z-10 mt-5 rounded-[20px] border border-[#F4DCC4] bg-white px-3.5 py-3 shadow-[0_8px_20px_rgba(255,138,76,0.12)]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[14px] font-extrabold text-[#30343B]"><WalletCards size={17} strokeWidth={2.1} className="text-[#FF6B3D]" /> 我的钱包</h2>
          <ClipboardList size={16} strokeWidth={2} className="text-[#9AA0AA]" />
        </div>
        <div className="mt-2.5 grid grid-cols-2 divide-x divide-[#EEE4DB]">
          <div className="pr-2.5">
            <p className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#8A8F98]"><CircleDollarSign size={15} strokeWidth={2.2} className="text-[#FFB33F]" /> Coins: <strong className="text-[16px] font-extrabold text-[#343A43]">0</strong></p>
            <button disabled title="即将开放" className="mt-2 h-7 w-full rounded-full bg-gradient-to-r from-[#FFB478] via-[#FF925B] to-[#FF7541] text-[11px] font-extrabold text-white shadow-[0_4px_10px_rgba(255,113,58,0.18)]">充值</button>
          </div>
          <div className="pl-2.5">
            <p className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#8A8F98]"><Flame size={15} strokeWidth={2.2} className="text-[#FF8A66]" /> 能量: <strong className="text-[16px] font-extrabold text-[#343A43]">0</strong></p>
            <button disabled title="即将开放" className="mt-2 h-7 w-full rounded-full bg-[#F5F0EA] text-[11px] font-extrabold text-[#B8A899]">找能量</button>
          </div>
        </div>
      </motion.section>

      <section className="relative z-10 mt-6">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {sections.map(item => (
            <button key={item} onClick={() => setSection(item)} className="shrink-0 text-[15px] font-extrabold" style={{ color: section === item ? "#111827" : "#A3A6AE" }}>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {categories.map(item => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className="shrink-0 rounded-full border px-3.5 py-2 text-xs font-extrabold"
              style={{ background: category === item ? "#FF591D" : "#FFFFFF", borderColor: category === item ? "#FF591D" : "#E5E7EB", color: category === item ? "#FFFFFF" : "#6B7280" }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <motion.div className="relative z-10 mt-5 flex flex-col items-center" key={`${section}-${category}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative h-[156px] w-[230px] overflow-hidden">
          <img src={meEmptyPlaceholder} alt="暂无收藏内容" className="h-full w-full object-contain" />
        </div>
        <p className="-mt-1 text-sm font-bold text-gray-400">这里还空空的，去探索喜欢的作品吧</p>
      </motion.div>
    </div>
  );
}

const CREATE_TEMPLATES = [
  { name: "AI Superhero", sub: "创意有 AI，点亮英雄梦", cropTop: -239 },
  { name: "AI Dinosaurs", sub: "穿越侏罗纪，创造恐龙伙伴", cropTop: -475 },
];

function CreatePage() {
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [importedFile, setImportedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleDownload = (name: string) => {
    setDownloaded(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  return (
    <div className="xm-page min-h-full px-4 pb-8 pt-[72px]" style={{ fontFamily: FN }}>
      <motion.h1 className="text-center text-[22px] font-black text-gray-900" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
        设计空间
      </motion.h1>

      <motion.button
        onClick={() => fileInputRef.current?.click()}
        className="xm-material mt-7 flex h-[106px] w-full items-center justify-between rounded-[24px] px-6 text-left active:scale-[0.99]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.985 }}
      >
        <div>
          <p className="text-xl font-extrabold text-[#182230]">导入 3D 文件</p>
          <p className="mt-1 max-w-[220px] truncate text-sm font-semibold text-[#747B86]">{importedFile ?? "支持 STL、OBJ、3MF 文件"}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FFF2DE] text-[#FF591D] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <Upload size={34} strokeWidth={3} />
        </div>
      </motion.button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".stl,.obj,.3mf"
        className="hidden"
        aria-label="选择 3D 模型文件"
        onChange={event => setImportedFile(event.target.files?.[0]?.name ?? null)}
      />
      {importedFile && <p role="status" className="mt-2 text-center text-xs font-extrabold text-[#16803C]"><Check size={13} className="mr-1 inline" />文件已导入，可以进入切片准备</p>}

      <div className="mt-5 flex flex-col gap-4">
        {CREATE_TEMPLATES.map((template, index) => {
          const done = downloaded.includes(template.name);
          return (
            <motion.article
              key={template.name}
              className="overflow-hidden rounded-[24px] border border-[#E9EBF0] bg-white shadow-[0_10px_24px_rgba(51,65,85,0.06)]"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + index * 0.08 }}
            >
              <div className="relative h-[166px] overflow-hidden bg-[#45C7F2]">
                <img
                  src={index === 0 ? createSuperhero : createDinosaurs}
                  alt={template.name}
                  loading="lazy"
                  decoding="async"
                  className="pointer-events-none absolute max-w-none select-none"
                  style={{ width: 343, height: "auto", left: -14, top: template.cropTop }}
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-[18px] font-black text-gray-900">{template.name}</h2>
                  <p className="mt-0.5 truncate text-sm font-semibold text-gray-500">{template.sub}</p>
                </div>
                <button
                  onClick={() => toggleDownload(template.name)}
                  className="flex h-11 min-w-[76px] items-center justify-center gap-1.5 rounded-full px-4 text-sm font-extrabold text-white active:scale-95"
                  style={{ background: done ? "#22C55E" : "#FF591D" }}
                >
                  {done ? <Check size={17} /> : <Download size={17} />}
                  {done ? "已下载" : "下载"}
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function DevicePage({ hasPrinter, hasCompletedFirstPrint, lastModel, onConnect, onStartPrint, onRemovePrinter }: { hasPrinter: boolean; hasCompletedFirstPrint: boolean; lastModel: (typeof MODELS)[number]; onConnect: () => void; onStartPrint: () => void; onRemovePrinter: () => void }) {
  const [showSettings, setShowSettings] = useState(false);

  if (hasPrinter) {
    return (
      <div className="xm-page relative min-h-full px-4 pb-8 pt-[70px]" style={{ fontFamily: FN }}>
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-[25px] font-extrabold tracking-tight text-[#17191D]">我的设备</h1>
          </div>
          <div className="flex items-center gap-2">
            <button disabled title="帮助中心即将开放" className="flex h-10 items-center rounded-full border border-white/70 bg-white/75 px-4 text-[14px] font-extrabold text-[#9AA0AA] opacity-60 shadow-[0_4px_16px_rgba(31,36,46,0.06)] backdrop-blur-xl">
              帮助
            </button>
            <button onClick={() => setShowSettings(open => !open)} aria-label="设置" aria-pressed={showSettings} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9EBF0] bg-white text-[#747B86] shadow-[0_4px_16px_rgba(31,36,46,0.06)] active:scale-95">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <motion.section
          className="relative mt-6 overflow-hidden rounded-[24px] border border-[#E9EBF0] bg-white p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative flex flex-col items-center">
            <div className="flex w-full items-center justify-between gap-3">
              <h2 className="text-[20px] font-extrabold text-[#182230]">X-MAKER PRO</h2>
              <div className="flex items-center gap-1.5 text-[#16803C]">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                <span className="text-xs font-extrabold">在线 · 空闲</span>
              </div>
            </div>
            <div className="mt-2 flex h-[168px] w-full items-center justify-center">
              <img src={printerReference} alt="X-MAKER Pro 打印机" className="h-full w-full object-contain" />
            </div>
          </div>

          <div className="relative mt-4 flex justify-center border-t border-[#EEF0F3] pt-4">
            {[
              { label: "耗材余量", value: "72%" },
            ].map(item => (
              <div key={item.label} className="min-w-[120px] rounded-[16px] bg-[#F7F8FA] px-4 py-3 text-center">
                <p className="text-[14px] font-extrabold text-[#182230]">{item.value}</p>
                <p className="mt-1 text-[10px] font-semibold text-[#8A9099]">{item.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onStartPrint}
            className="relative mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FF9A66] via-[#FF591D] to-[#E64A14] text-[15px] font-extrabold text-white shadow-[0_8px_18px_rgba(255,89,29,0.20)] active:scale-[0.98]"
          >
            <PenTool size={18} /> 挑选模型打印
          </button>
        </motion.section>

        <AnimatePresence>
          {showSettings && (
            <motion.section initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-3 rounded-[20px] border border-[#E9EBF0] bg-white p-4 shadow-[0_8px_20px_rgba(48,56,70,0.05)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-[#182230]">设备管理</p>
                  <p className="mt-1 text-xs font-medium text-[#8A9099]">解除绑定后需要重新连接打印机</p>
                </div>
                <button onClick={onRemovePrinter} className="shrink-0 rounded-full border border-[#F1C9C9] px-3 py-2 text-xs font-extrabold text-[#C24141] active:scale-95">解除绑定</button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold text-[#182230]">最近任务</h2>
            {hasCompletedFirstPrint && <span className="text-xs font-extrabold text-[#8A9099]">共 1 条</span>}
          </div>
          {hasCompletedFirstPrint ? (
          <div className="flex items-center gap-3 rounded-[20px] border border-[#E9EBF0] bg-white p-3 shadow-[0_6px_18px_rgba(48,56,70,0.05)]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] bg-[#EEF8EE] p-1">
              <img src={lastModel.image} alt={`${lastModel.name}打印记录`} className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-extrabold text-[#182230]">{lastModel.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#8A9099]"><Clock size={12} />{lastModel.time} · PLA</p>
            </div>
            <span className="rounded-full bg-[#E7F8EC] px-2.5 py-1 text-[11px] font-extrabold text-[#16803C]">已完成</span>
          </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#D9DDE4] bg-white px-5 py-7 text-center">
              <Printer size={28} className="mx-auto text-[#FF591D]" />
              <p className="mt-3 text-sm font-extrabold text-[#182230]">还没有打印记录</p>
              <p className="mt-1 text-xs font-medium text-[#8A9099]">完成第一次打印后，作品会保存在这里</p>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="xm-page relative min-h-full px-6 pb-8 pt-[72px]" style={{ fontFamily: FN }}>
      <button disabled title="帮助中心即将开放" className="absolute right-5 top-[68px] flex h-10 items-center rounded-full border border-white/70 bg-white/75 px-4 text-[14px] font-extrabold text-[#9AA0AA] opacity-60 shadow-[0_4px_16px_rgba(31,36,46,0.06)] backdrop-blur-xl">
        帮助
      </button>

      <motion.div
        className="flex flex-col items-center pt-[122px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
      >
        <div className="relative h-[210px] w-[210px] overflow-hidden rounded-full border-[6px] border-white bg-[#D7DCE3] shadow-[0_18px_42px_rgba(31,36,46,0.13)]">
          <img
            src={deviceReference}
            alt="3D 打印机器人模型"
            className="pointer-events-none absolute max-w-none select-none"
            style={{ width: 386, height: "auto", left: -86, top: -194 }}
          />
        </div>

        <h1 className="mt-8 text-[30px] font-black leading-none tracking-tight text-[#17191D]">趣打印</h1>
        <p className="mt-3 text-[15px] font-semibold text-[#71757D]">连接后才能体验完整流程</p>

        <motion.button
          onClick={onConnect}
          className="mt-9 flex h-[56px] w-[228px] items-center justify-center rounded-full bg-gradient-to-br from-[#FF9A66] via-[#FF591D] to-[#E64A14] text-[18px] font-black text-white shadow-[0_10px_22px_rgba(255,89,29,0.20)]"
          whileTap={{ scale: 0.975 }}
        >
          添加打印机
        </motion.button>

        <button disabled title="商城即将开放" className="mt-5 text-[16px] font-extrabold text-[#9AA0AA] underline decoration-[1.5px] underline-offset-2">
          购买打印机（即将开放）
        </button>
      </motion.div>
    </div>
  );
}

function MainApp({ hasPrinter, hasCompletedFirstPrint, completedModel, onConnect, onContinue, onStartPrint, onModelSelect, onExplore, onRemovePrinter, tab }: { hasPrinter: boolean; hasCompletedFirstPrint: boolean; completedModel: (typeof MODELS)[number]; onConnect: () => void; onContinue: () => void; onStartPrint: () => void; onModelSelect: (modelId: number) => void; onExplore: () => void; onRemovePrinter: () => void; tab: string }) {
  const ph = TAB_PLACEHOLDERS[tab];
  const [idea, setIdea] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recommendedProjects = NEXT_PROJECTS.filter(item => item.id !== completedModel.id);
  return (
    <div className="xm-page relative flex h-full flex-col" style={{ fontFamily: FN }}>
      <div className="flex-1 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
        {tab === "ai" ? (
          <div className="px-4 pt-[62px] text-[#182230]">
            {hasPrinter ? (
              <div className="mb-5 flex flex-col items-center text-center">
                <AiBuddy size={92} mood="happy" />
                <h1 className="mt-2 max-w-[300px] text-[21px] font-extrabold leading-tight tracking-tight">早上好，小创作家，想要打印哪个模型？</h1>
              </div>
            ) : (
              <div className="mb-4"><p className="text-[13px] font-semibold text-[#747B86]">早上好，小创作家</p><h1 className="mt-0.5 text-[24px] font-extrabold leading-tight tracking-tight">今天继续创造什么？</h1></div>
            )}
            {!hasPrinter ? (
              <motion.section className="xm-material relative overflow-hidden rounded-[24px] p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-4"><AiBuddy size={108} mood="happy" /><div className="min-w-0 flex-1"><p className="text-[13px] font-extrabold text-[#182230]">你好，我是小 X</p><p className="mt-2 text-[12px] font-medium leading-relaxed text-[#747B86]">我是你的3D打印机伙伴，我会陪你连接设备、挑选模型，并完成第一次打印。</p></div></div>
                <div className="mt-4"><PrimaryBtn label="开始连接设备" onClick={onConnect} icon={<Wifi size={18} />} /></div>
              </motion.section>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between"><div><h2 className="text-[18px] font-extrabold">推荐模型</h2><p className="mt-0.5 text-[11px] font-semibold text-[#8A9099]">小 X 为你挑选了简单易打印的模型</p></div><button onClick={onExplore} className="min-h-11 px-1 text-xs font-bold text-[#FF591D] active:opacity-60">查看全部</button></div>
                <div className="grid grid-cols-2 gap-2.5">{recommendedProjects.map(item => <button onClick={() => onModelSelect(item.id)} key={item.name} aria-label={item.name} className="overflow-hidden rounded-[20px] border border-[#E9EBF0] bg-white text-left active:scale-[0.98]"><div className="h-[100px] overflow-hidden p-1" style={{ background: item.bg }}><img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-contain mix-blend-multiply" /></div><div className="px-2.5 py-2.5"><p className="truncate text-[13px] font-extrabold text-[#182230]">{item.name}</p><p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-[#8A9099]"><Clock size={11} />{item.time}</p></div></button>)}</div>
              </>
            )}
          </div>
        ) : tab === "explore" ? <ExplorePage /> : tab === "device" ? <DevicePage hasPrinter={hasPrinter} hasCompletedFirstPrint={hasCompletedFirstPrint} lastModel={completedModel} onConnect={onConnect} onStartPrint={onStartPrint} onRemovePrinter={onRemovePrinter} /> : tab === "me" ? <MePage /> : tab === "create" ? <CreatePage /> : <div className="flex flex-col items-center justify-center" style={{ minHeight: 680, paddingTop: 80 }}><div className="text-6xl mb-4">{ph.icon}</div><p className="font-bold text-gray-600 text-lg" style={{ fontFamily: FD }}>{ph.label}</p><p className="text-gray-400 text-sm mt-1" style={{ fontFamily: FN }}>{ph.sub}</p></div>}
      </div>
      {tab === "ai" && hasPrinter && <div className="absolute bottom-[94px] left-4 right-4 z-30 flex items-center gap-2 rounded-[18px] border border-[#FFD8C8] bg-white/95 px-3 py-2.5 shadow-[0_10px_24px_rgba(255,89,29,0.14)] backdrop-blur-xl"><input value={idea} onChange={event => setIdea(event.target.value)} aria-label="描述想法" placeholder="描述你想打印的模型..." className="min-w-0 flex-1 bg-transparent text-[13px] font-semibold text-[#182230] outline-none placeholder:text-[#A3A6AE]" /><button type="button" aria-pressed={isRecording} onClick={() => setIsRecording(value => !value)} aria-label={isRecording ? "停止录音" : "语音输入"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-[0_5px_12px_rgba(255,89,29,0.2)]" style={{ background: isRecording ? "#E64A14" : PRIMARY_GRADIENT }}><Mic size={15} strokeWidth={2.5} /></button></div>}
    </div>
  );
}

function PersistentNav({ active, locked = false, onSelect }: { active: string; locked?: boolean; onSelect: (id: string) => void }) {
  return (
    <nav
      aria-label="主菜单"
      className="absolute bottom-0 left-0 right-0 z-40 flex h-[83px] items-start border-t border-[#E9EBF0] px-3 pb-0 pt-1 shadow-[0_-8px_24px_rgba(31,36,46,0.08)]"
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(22px) saturate(145%)",
        WebkitBackdropFilter: "blur(22px) saturate(145%)",
        paddingBottom: "max(34px, env(safe-area-inset-bottom))",
      }}
    >
      {NAV.map(item => {
        const Icon = item.icon;
        const isActive = active === item.id;
        return (
          <motion.button
            key={item.id}
            onClick={() => onSelect(item.id)}
            disabled={locked}
            className="mx-0.5 flex h-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-[16px]"
            aria-current={isActive ? "page" : undefined}
            aria-label={locked ? `${item.label}，完成当前打印步骤后可切换` : item.label}
            style={{ background: isActive ? PRIMARY_GRADIENT : "transparent" }}
            animate={{
              y: 0,
              boxShadow: isActive ? "0 6px 16px rgba(255,89,29,0.22), inset 0 1px 0 rgba(255,255,255,0.24)" : "0 0 0 rgba(0,0,0,0)",
              opacity: locked ? 0.52 : 1,
            }}
            whileTap={locked ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={20} color={isActive ? "#FFFFFF" : "#8A9099"} strokeWidth={isActive ? 2.6 : 2.1} />
            <span className="text-[10px] font-extrabold" style={{ fontFamily: FN, color: isActive ? "#FFFFFF" : "#8A9099" }}>
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [hasPrinter, setHasPrinter] = usePersistentState("xmaker.hasPrinter", false);
  const [hasCompletedFirstPrint, setHasCompletedFirstPrint] = usePersistentState("xmaker.hasCompletedFirstPrint", false);
  const [selectedModelId, setSelectedModelId] = usePersistentState("xmaker.selectedModelId", 0);
  const [page, setPage] = useState(() => {
    try {
      const savedPrinter = JSON.parse(window.localStorage.getItem("xmaker.hasPrinter") ?? "false");
      const savedCompletion = JSON.parse(window.localStorage.getItem("xmaker.hasCompletedFirstPrint") ?? "false");
      return savedPrinter && savedCompletion ? 6 : 0;
    } catch {
      return 0;
    }
  });
  const [tab, setTab] = useState("ai");
  const reduceMotion = useReducedMotion();
  const next = () => setPage(p => p + 1);
  const back = () => setPage(p => Math.max(0, p - 1));
  const selectedModel = MODELS.find(model => model.id === selectedModelId) ?? MODELS[0];

  const pages: React.ReactNode[] = [
    <WelcomePage
      hasPrinter={hasPrinter}
      onModelSelected={(modelId) => {
        setSelectedModelId(modelId);
        setPage(3);
      }}
      onPrinterAdded={() => setHasPrinter(true)}
    />,
    <ConnectPage onNext={next} onBack={back} />,
    <ModelPage onNext={next} onBack={back} />,
    <SafetyPage onNext={next} onBack={() => setPage(0)} />,
    <PrintingPage onNext={next} model={selectedModel} />,
    <RewardPage model={selectedModel} onFinish={() => {
      setHasPrinter(true);
      setHasCompletedFirstPrint(true);
      setTab("ai");
      setPage(6);
    }} />,
    <MainApp
      hasPrinter={hasPrinter}
      hasCompletedFirstPrint={hasCompletedFirstPrint}
      completedModel={selectedModel}
      onConnect={() => {
        setTab("ai");
        setPage(0);
      }}
      onContinue={() => setTab("create")}
      onStartPrint={() => {
        if (hasCompletedFirstPrint) {
          setTab("create");
          setPage(6);
          return;
        }
        setTab("ai");
        setPage(0);
      }}
      onModelSelect={(modelId) => {
        setSelectedModelId(modelId);
        if (!hasPrinter) {
          setTab("ai");
          setPage(0);
          return;
        }
        setPage(3);
      }}
      onExplore={() => {
        setTab("explore");
        setPage(6);
      }}
      onRemovePrinter={() => {
        setHasPrinter(false);
        setTab("ai");
        setPage(0);
      }}
      tab={tab}
    />,
  ];

  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center"
      style={{ background: "linear-gradient(145deg, #FFE2A2 0%, #FFF8ED 50%, #FFEABE 100%)" }}
    >
      {/* Phone frame */}
      <div
        className="relative overflow-hidden"
        style={{
          width: 375, height: 812,
          borderRadius: 52,
          background: "#FFF9EE",
          boxShadow:
            "0 50px 100px rgba(255,122,0,0.22), 0 20px 48px rgba(0,0,0,0.14), inset 0 0 0 1.5px rgba(255,255,255,0.55)",
        }}
      >
        {/* Dynamic island */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 z-50 -translate-x-1/2 bg-black"
          style={{ top: 10, width: 126, height: 37, borderRadius: 999 }}
        />

        {/* Status bar */}
        <div className="absolute left-0 right-0 top-0 z-40 flex h-[59px] items-center justify-between px-[22px] text-[#111317]">
          <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Noto Sans SC', sans-serif" }}>9:41</span>
          <div className="flex items-center gap-[5px]" aria-label="蜂窝网络、Wi-Fi 和电池状态">
            <Signal size={17} strokeWidth={2.4} fill="currentColor" aria-hidden="true" />
            <Wifi size={16} strokeWidth={2.5} aria-hidden="true" />
            <div className="ml-0.5 flex items-center" aria-hidden="true">
              <div className="relative h-[12px] w-[23px] rounded-[3.5px] border-[1.6px] border-current p-[1.5px]">
                <div className="h-full w-[74%] rounded-[1.5px] bg-current" />
              </div>
              <div className="ml-[1.5px] h-[5px] w-[1.8px] rounded-r-full bg-current opacity-45" />
            </div>
          </div>
        </div>

        {/* Page slides */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={reduceMotion ? false : { x: page === 0 ? 0 : 55, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: -55, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0"
              style={{ background: "#FFF9EE", overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </div>

        <PersistentNav
          active={page === 6 ? tab : page === 0 ? "ai" : "device"}
          locked={page >= 3 && page <= 5}
          onSelect={(id) => {
            setTab(id);
            // The AI achievement dashboard only exists after the first print.
            if (id === "ai" && !hasCompletedFirstPrint) {
              setPage(0);
              return;
            }
            setPage(6);
          }}
        />

        {/* Home indicator */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50"
          style={{ width: 134, height: 5, background: "rgba(0,0,0,0.18)", borderRadius: 999 }}
        />
      </div>
    </div>
  );
}
