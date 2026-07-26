import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Wifi, WifiOff, Check, ChevronRight, ArrowLeft, Volume2, QrCode, ShieldCheck, Layers,
  Clock, Zap, Compass, Printer, PenTool,
  User, BookOpen, Signal, Heart, Menu, Search, Eye, EyeOff,
  Bell, Settings, WalletCards, ClipboardList, Trophy, CircleDollarSign, Flame,
  Upload, Download, Mic, Thermometer, Keyboard, Send,
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

const FD = "'Noto Sans SC', sans-serif";
const FN = "'Noto Sans SC', sans-serif";
const FM = "'Noto Sans SC', sans-serif";
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

// ??? Shared primitives ???????????????????????????????????????????????????????

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
    <div className={`relative rounded-[20px] border border-[#E9EBF0] bg-white px-4 py-3 shadow-[0_4px_16px_rgba(31,36,46,0.055)] ${className}`}>
      <p className="text-sm font-medium leading-relaxed text-[#666666]" style={{ fontFamily: FN }}>{text}</p>
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

function VoiceInputButton({ onSubmit, ariaLabel = "按住说话" }: { onSubmit: (value?: string) => void; ariaLabel?: string }) {
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState<"voice" | "text">("voice");
  const [textValue, setTextValue] = useState("");

  const finishRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    onSubmit();
  };

  const submitText = () => {
    const value = textValue.trim();
    if (!value) return;
    onSubmit(value);
    setTextValue("");
  };

  return (
    <div className={`relative flex h-[52px] w-full items-center rounded-full border px-1.5 shadow-[0_8px_18px_rgba(255,89,29,0.20)] transition-colors ${isRecording ? "border-[#FF9A66] bg-[#FFF0E7]" : "border-[#FFD8C8] bg-white/95"}`}>
      <button
        type="button"
        onClick={() => {
          setIsRecording(false);
          setInputMode(mode => mode === "voice" ? "text" : "voice");
        }}
        aria-label={inputMode === "voice" ? "切换到文字输入" : "切换到语音输入"}
        className="absolute left-1.5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-[#666666] transition-colors active:bg-[#FFF0E7] active:text-[#FF591D]"
      >
        {inputMode === "voice" ? <Keyboard size={18} strokeWidth={2.3} /> : <Mic size={18} strokeWidth={2.3} />}
      </button>

      {inputMode === "voice" ? (
        <button
          type="button"
          aria-pressed={isRecording}
          aria-label={isRecording ? "正在录音，松开即可发送" : ariaLabel}
          onPointerDown={event => {
            event.currentTarget.setPointerCapture(event.pointerId);
            setIsRecording(true);
          }}
          onPointerUp={finishRecording}
          onPointerCancel={finishRecording}
          onContextMenu={event => event.preventDefault()}
          onClick={event => {
            if (event.detail === 0) onSubmit();
          }}
          className={`flex h-full w-full items-center justify-center gap-2 rounded-full px-12 text-[13px] ${isRecording ? "font-bold text-[#E64A14]" : "xm-text-body"}`}
        >
          {isRecording ? <><span className="flex h-5 items-end gap-1" aria-hidden="true">{[0, 1, 2, 3, 4].map(index => <motion.span key={index} className="w-1 rounded-full bg-[#FF591D]" animate={{ height: [5, 15 - (index % 2) * 4, 7] }} transition={{ duration: 0.5, repeat: Infinity, delay: index * 0.07, ease: "easeInOut" }} />)}</span><span>松开即可发送</span></> : <span>按住说话</span>}
        </button>
      ) : (
        <form onSubmit={event => { event.preventDefault(); submitText(); }} className="ml-10 flex min-w-0 flex-1 items-center gap-1">
          <input
            autoFocus
            value={textValue}
            onChange={event => setTextValue(event.target.value)}
            placeholder="和我说说你想玩什么呀"
            aria-label="输入想打印的内容"
            className="h-10 min-w-0 flex-1 bg-transparent px-2 text-[13px] font-medium text-[#666666] outline-none placeholder:text-[#999999]"
          />
          <button type="submit" disabled={!textValue.trim()} aria-label="发送" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF591D] text-white disabled:bg-[#E8EAF0] disabled:text-[#999999] active:scale-95">
            <Send size={16} strokeWidth={2.5} />
          </button>
        </form>
      )}
    </div>
  );
}

function useAssistantReply(active: boolean, reply: string) {
  const [isThinking, setIsThinking] = useState(false);
  const [typedReply, setTypedReply] = useState("");

  useEffect(() => {
    if (!active) {
      setIsThinking(false);
      setTypedReply("");
      return;
    }
    setIsThinking(true);
    setTypedReply("");
    const timer = setTimeout(() => setIsThinking(false), 900);
    return () => clearTimeout(timer);
  }, [active, reply]);

  useEffect(() => {
    if (!active || isThinking) return;
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setTypedReply(reply.slice(0, index));
      if (index >= reply.length) clearInterval(timer);
    }, 48);
    return () => clearInterval(timer);
  }, [active, isThinking, reply]);

  return { isThinking, typedReply, isComplete: active && !isThinking && typedReply.length >= reply.length };
}

// ??? Page 0: AI Welcome ???????????????????????????????????????????????????????

const PRINTER_READINESS = [
  { id: 0, group: "连接准备", label: "打印机已接通电源并开机" },
  { id: 1, group: "连接准备", label: "手机蓝牙或 Wi-Fi 已开启" },
  { id: 2, group: "连接准备", label: "打印机处于配对状态并靠近手机" },
] as const;

function WelcomePage({ hasPrinter, onModelSelected, onPrinterAdded, onFlowLockChange }: { hasPrinter: boolean; onModelSelected: (modelId: number) => void; onPrinterAdded: () => void; onFlowLockChange: (locked: boolean) => void }) {
  const [status, setStatus] = useState<ConnStatus | null>(hasPrinter ? "connected" : null);
  const [checklistOpen, setChecklistOpen] = useState(hasPrinter);
  const [readiness, setReadiness] = useState<Set<number>>(new Set());
  const [wifiName, setWifiName] = useState("家庭 Wi-Fi");
  const [wifiPassword, setWifiPassword] = useState("");
  const [showWifiPassword, setShowWifiPassword] = useState(false);
  const [networkProgress, setNetworkProgress] = useState(0);
  const [hasRequestedRecommendation, setHasRequestedRecommendation] = useState(false);
  const allReady = readiness.size === PRINTER_READINESS.length;
  const recommendationReply = "当然可以！我为你准备了几个简单又好玩的模型，一起来看看吧。";
  const { isThinking: recommendationThinking, typedReply: typedRecommendation, isComplete: recommendationComplete } = useAssistantReply(hasRequestedRecommendation, recommendationReply);

  useEffect(() => {
    if (hasPrinter) return;
    setStatus(null);
    setChecklistOpen(false);
    setReadiness(new Set());
    setWifiPassword("");
    setShowWifiPassword(false);
    setNetworkProgress(0);
    setHasRequestedRecommendation(false);
  }, [hasPrinter]);

  useEffect(() => {
    onFlowLockChange(checklistOpen || status !== null);
    return () => onFlowLockChange(false);
  }, [checklistOpen, status, onFlowLockChange]);

  const toggleReadiness = (id: number) => {
    setReadiness(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const nextStatus: Partial<Record<ConnStatus, { value: ConnStatus; delay: number }>> = {
      scanning: { value: "found", delay: 3000 },
    };
    if (!status || !nextStatus[status]) return;
    const nextStep = nextStatus[status];
    const timer = setTimeout(() => setStatus(nextStep.value), nextStep.delay);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (status !== "connecting") return;
    setNetworkProgress(0);
    const timer = setInterval(() => {
      setNetworkProgress(progress => Math.min(100, progress + 4));
    }, 80);
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (status !== "connecting" || networkProgress < 100) return;
    const timer = setTimeout(() => setStatus("connected"), 350);
    return () => clearTimeout(timer);
  }, [status, networkProgress]);

  useEffect(() => {
    if (status === "connected") onPrinterAdded();
  }, [status]);

  const connectionCopy = {
    scanning: { title: "正在寻找附近的打印机…", detail: "请保持打印机处于开机状态", color: "#FF591D" },
    found: { title: "发现 X-MAKER Pro", detail: "正在建立安全连接", color: "#16803C" },
    wifi: { title: "发现 X-MAKER Pro", detail: "正在建立安全连接", color: "#FF591D" },
    connecting: { title: "正在配置网络…", detail: `${networkProgress}%`, color: "#FF591D" },
    connected: { title: "设备连接成功！", detail: "X-MAKER Pro 已准备就绪", color: "#16803C" },
  };

  return (
    <div className="xm-page relative flex h-full flex-col overflow-hidden px-4 pb-[104px] pt-[64px]" style={{ fontFamily: FN }}>
      <AnimatePresence initial={false}>
        {!(status === "connected" && hasRequestedRecommendation) && (
          <motion.div key="connection-hero" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -72, scale: 0.96, marginBottom: -24 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
            <div className="mt-4 flex justify-center"><AiBuddy size={132} mood="happy" /></div>
            <section className="mt-5 px-4 text-center">
              <h1 className={status ? "mx-auto max-w-[320px] text-[22px] font-extrabold leading-tight text-[#333333]" : "mx-auto max-w-[320px] text-[20px] font-black leading-tight text-[#333333]"} style={{ fontFamily: FN }}>{status === "connected" ? "设备连接成功啦" : status === "connecting" ? "正在配置网络" : status === "scanning" ? "正在帮你搜索附近的3D打印机" : status === "found" ? "已帮你找到附近的设备" : status === "wifi" ? "请输入 Wi-Fi 账号和密码，让打印机连上网络" : checklistOpen ? "连接前请做以下确认事项" : "你好呀，我是小印，让我来帮你完成设备连接吧。"}</h1>
              <p className={status === "wifi" || !status ? "hidden" : "mx-auto mt-2 max-w-[300px] text-[13px] font-medium leading-relaxed text-[#999999]"} style={{ fontFamily: FN }}>{status === "connected" ? "和我对话可以帮你推荐模型哦" : status === "scanning" ? "请耐心等候" : status === "found" ? "点击开始连接吧" : ""}</p>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      {status === "connected" && hasRequestedRecommendation && <motion.div className="mb-4 flex h-12 items-center justify-center gap-2 px-1" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><AiBuddy size={42} mood="happy" /><span className="text-[16px] font-extrabold leading-none text-[#333333]">小印</span></motion.div>}

      {!checklistOpen && !status && <div className="mt-5"><PrimaryBtn label="开始连接设备" onClick={() => setChecklistOpen(true)} icon={<Wifi size={18} />} /></div>}

      <AnimatePresence mode="wait">
        {checklistOpen && !status && (
          <motion.section key="checklist" className="xm-material mt-5 rounded-[24px] p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="flex items-start justify-between gap-3">
              <div><h2 className="text-[18px] font-extrabold text-[#333333]">设备检查</h2></div>
              <span className="rounded-full bg-[#FFF0E7] px-2.5 py-1 text-xs font-extrabold text-[#B83D12]">{readiness.size}/{PRINTER_READINESS.length}</span>
            </div>
            <div className="mt-3 space-y-1">
              {PRINTER_READINESS.map(item => {
                const checked = readiness.has(item.id);
                return <button key={item.id} onClick={() => toggleReadiness(item.id)} aria-pressed={checked} className="flex min-h-11 w-full items-center gap-3 rounded-[14px] px-2 py-1.5 text-left active:bg-[#FFF8EE]"><motion.span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2" animate={{ backgroundColor: checked ? "#FFF0E7" : "#FFFFFF", borderColor: checked ? "#FFD8C8" : "#D6DAE1" }}>{checked && <Check size={14} className="text-[#FF591D]" strokeWidth={3} />}</motion.span><span className="text-[13px] font-bold text-[#666666]">{item.label}</span></button>;
              })}
            </div>
              <div className="mt-3"><PrimaryBtn label={allReady ? "开始搜索打印机" : `还需确认 ${PRINTER_READINESS.length - readiness.size} 项`} onClick={() => setStatus("scanning")} disabled={!allReady} icon={<Wifi size={18} />} /></div>
          </motion.section>
        )}
      </AnimatePresence>

      {(status === "scanning" || status === "found") && (
        <motion.button
          type="button"
          onClick={() => status === "found" && setStatus("wifi")}
          disabled={status !== "found"}
          aria-label={status === "found" ? "选择 X-MAKER Pro 打印机" : "正在搜索打印机"}
          className={`relative mt-5 flex h-[224px] w-full items-center justify-center overflow-hidden ${status === "found" ? "cursor-pointer active:scale-[0.98]" : "cursor-default"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={status === "found" ? { scale: 0.98 } : undefined}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            {[92, 136, 180].map((size, index) => <motion.span key={size} className="absolute rounded-full border border-[#FF9A66]" style={{ width: size, height: size }} animate={status === "scanning" ? { opacity: [0.34, 0.68, 0.34], scale: [0.98, 1.02, 0.98] } : { opacity: 0.6, scale: 1 }} transition={status === "scanning" ? { duration: 2.2, repeat: Infinity, delay: index * 0.12, ease: "easeInOut" } : { duration: 0.35 }} />)}
            {status === "scanning" && <div className="absolute left-1/2 top-1/2 z-20 h-[156px] w-[156px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <motion.span className="absolute bottom-1/2 left-1/2 h-1/2 w-px origin-bottom bg-gradient-to-t from-[#FF591D] via-[#FF591D] to-transparent" animate={{ rotate: 360 }} transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }} />
            </div>}
          </div>
          {status === "scanning" ? <>
            <div className="absolute left-1/2 top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(255,89,29,0.2)]"><Wifi size={24} className="text-[#FF591D]" /></div>
          </> : <>
            <motion.div
              className="relative z-10 flex h-[78px] w-[78px] items-center justify-center rounded-full bg-white shadow-[0_8px_20px_rgba(48,56,70,0.1)]"
              initial={{ opacity: 0, scale: 0.55 }}
              animate={{ opacity: [0.9, 1, 0.9], scale: [0.96, 1.04, 0.96] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.img
                src={printerReference}
                alt="X-MAKER Pro 打印机"
                className="h-[64px] w-[64px] object-contain"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            </motion.div>
          </>}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
      {status && status !== "wifi" && status !== "scanning" && status !== "found" && status !== "connected" && (
          <motion.div key={status} className="mt-4 flex items-center gap-3 rounded-[20px] border border-[#E9EBF0] bg-white px-4 py-3 shadow-[0_4px_16px_rgba(31,36,46,0.055)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl" style={{ background: status === "found" || status === "connected" ? "#E7F8EC" : "#FFF0E7" }}>
              {status === "found" ? <img src={printerReference} alt="X-MAKER Pro 打印机" className="h-full w-full object-contain" /> : status === "connected" ? <Check size={24} className="text-[#16803C]" /> : <Printer size={24} className="text-[#FF591D]" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3"><p className="text-sm font-extrabold" style={{ color: connectionCopy[status].color }}>{connectionCopy[status].title}</p><p className="text-xs font-extrabold text-[#FF591D]">{connectionCopy[status].detail}</p></div>
              {status === "connecting" && <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#FFF1D7]" role="progressbar" aria-label="网络配置进度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={networkProgress}><motion.div className="h-full rounded-full bg-gradient-to-r from-[#FF9A66] via-[#FF591D] to-[#E64A14]" animate={{ width: `${networkProgress}%` }} transition={{ duration: 0.08, ease: "linear" }} /></div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {status === "wifi" && (
        <motion.section className="mt-4 rounded-[24px] bg-white p-4 shadow-[0_4px_16px_rgba(31,36,46,0.055)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <label htmlFor="welcome-wifi" className="block text-[14px] font-extrabold text-[#333333]">WiFi 名称</label>
          <input id="welcome-wifi" value={wifiName} onChange={event => setWifiName(event.target.value)} className="mt-1.5 h-11 w-full rounded-[14px] border border-[#E9EBF0] bg-[#FAFBFC] px-3 text-[13px] font-bold text-[#666666] outline-none focus:border-[#FF591D] focus:ring-2 focus:ring-[#FFD8C8]" />
          <label htmlFor="welcome-wifi-password" className="mt-4 block text-[14px] font-extrabold text-[#333333]">WiFi 密码</label>
          <div className="relative mt-1.5">
            <input id="welcome-wifi-password" type={showWifiPassword ? "text" : "password"} autoComplete="current-password" value={wifiPassword} onChange={event => setWifiPassword(event.target.value)} placeholder="请输入 WiFi 密码" className="h-11 w-full rounded-[14px] border border-[#E9EBF0] bg-[#FAFBFC] px-3 pr-12 text-[13px] font-bold text-[#666666] outline-none placeholder:text-[#999999] focus:border-[#FF591D] focus:ring-2 focus:ring-[#FFD8C8]" />
            <button type="button" onClick={() => setShowWifiPassword(visible => !visible)} aria-label={showWifiPassword ? "隐藏 WiFi 密码" : "显示 WiFi 密码"} aria-pressed={showWifiPassword} className="absolute right-1 top-1 flex h-9 w-10 items-center justify-center rounded-[14px] text-[#666666] transition-colors hover:bg-[#FFF0E7] hover:text-[#FF591D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD8C8]">
              {showWifiPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="mt-3"><PrimaryBtn label="连接 Wi-Fi" onClick={() => setStatus("connecting")} disabled={!wifiName.trim() || !wifiPassword.trim()} icon={<Wifi size={18} />} /></div>
        </motion.section>
      )}

      {!status && !checklistOpen && <p className="mt-3 text-center text-xs font-medium text-[#999999]">请让家长协助你来一起哦</p>}
      {status === "scanning" && <p className="mt-3 text-center text-xs font-medium text-[#999999]">正在寻找附近的打印机，请保持设备开机</p>}
      {status === "found" && <p className="mt-3 text-center text-xs font-extrabold text-[#16803C]">发现 X-MAKER Pro · 点击继续</p>}
      {status && status !== "wifi" && status !== "connected" && status !== "scanning" && status !== "found" && <p className="mt-3 text-center text-xs font-medium text-[#999999]">连接过程中请保持页面开启</p>}

      {status === "connected" && (
        <motion.div
          className="absolute bottom-[104px] left-4 right-4 z-30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <VoiceInputButton onSubmit={() => setHasRequestedRecommendation(true)} ariaLabel="按住说话，帮我推荐模型" />
        </motion.div>
      )}

      {status === "connected" && hasRequestedRecommendation && (
        <motion.div className="mt-4 space-y-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex justify-end"><div className="rounded-[18px] rounded-tr-[6px] border border-[#FFD0BA] bg-[#FFE4D6] px-4 py-2.5 text-[13px] font-bold text-[#B83D12]">帮我推荐模型</div></div>
          <div className="px-1 text-left">
            {recommendationThinking ? (
              <motion.p className="text-[12px] font-medium text-[#999999]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>正在思考<span className="inline-flex w-5 overflow-hidden align-bottom">{[0, 1, 2].map(index => <motion.span key={index} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.16 }}>.</motion.span>)}</span></motion.p>
            ) : (
              <motion.p className="text-[12px] font-medium leading-relaxed text-[#666666]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{typedRecommendation}</motion.p>
            )}
          </div>
        </motion.div>
      )}

      {status === "connected" && recommendationComplete && (
        <motion.section className="mt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-3 gap-2">{MODELS.map(model => <motion.button key={model.id} onClick={() => onModelSelected(model.id)} className="overflow-hidden rounded-[18px] border border-[#E9EBF0] bg-white p-2 text-left shadow-[0_4px_16px_rgba(31,36,46,0.055)] active:scale-[0.97]"><div className="flex h-[68px] items-center justify-center rounded-[14px] p-1" style={{ background: model.cardBg }}><img src={model.image} alt={model.name} className="h-full w-full object-contain mix-blend-multiply" /></div><p className="mt-2 truncate text-[12px] font-extrabold text-[#333333]">{model.name}</p><p className="mt-0.5 flex items-center gap-1 text-[9px] font-semibold text-[#999999]"><Clock size={14} />{model.time}</p></motion.button>)}</div>
        </motion.section>
      )}
    </div>
  );
}

// ??? Page 1: Device Connect ???????????????????????????????????????????????????

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
    scanning: <p className="text-[#999999]" style={{ fontFamily: FN }}>正在搜索附近的打印机...</p>,
    found: <p className="font-bold text-[#FF591D]" style={{ fontFamily: FN }}>📡 发现设备！X-MAKER Pro</p>,
    wifi: <p className="font-semibold text-[#FF591D]" style={{ fontFamily: FN }}>请家长确认设备指示灯</p>,
    connecting: (
      <div className="text-center">
        <p className="font-semibold text-[#FF591D]" style={{ fontFamily: FN }}>正在连接中...</p>
        <p className="text-xs text-[#999999] mt-1" style={{ fontFamily: FN }}>请家长确认设备指示灯</p>
      </div>
    ),
    connected: (
      <div className="text-center">
        <p className="font-bold text-[#16803C] text-xl" style={{ fontFamily: FD }}>连接成功！🎉</p>
        <p className="text-xs text-[#999999] mt-1" style={{ fontFamily: FM }}>X-MAKER Pro · 信号强 · 已就绪</p>
      </div>
    ),
  };

  return (
    <div className="flex flex-col h-full px-6 pt-14 pb-24 relative">
      <GeoBg />

      <div className="flex items-center gap-3 mb-8">
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-[0_5px_14px_rgba(165,92,20,0.10)] border border-[#FFE7C2]">
          <ArrowLeft size={18} className="text-[#666666]" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-[#333333]" style={{ fontFamily: FD }}>连接打印机</h2>
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
          <Printer size={24} className={status === "connected" ? "text-green-500" : "text-[#FF591D]"} />
        </motion.div>
        {status === "connected" && (
          <motion.div
            className="absolute z-20 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            style={{ top: "calc(50% - 44px)", left: "calc(50% + 22px)" }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Check size={14} className="text-white" />
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
              <p className="font-bold text-[#333333]" style={{ fontFamily: FN }}>X-MAKER Pro</p>
              <p className="text-xs text-[#999999] mt-0.5" style={{ fontFamily: FM }}>XM-PRO-2024 · A 型</p>
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
        <QrCode size={14} /> 扫描二维码手动连接
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

// ??? Page 2: Model Recommend ??????????????????????????????????????????????????
const MODELS = [
  { id: 0, image: dinosaurModel, name: "小恐龙", time: "12 分钟", diff: "入门", diffBg: "#16A34A", cardBg: "#F5F6F8", border: "#86EFAC" },
  { id: 1, image: rocketModel, name: "迷你火箭", time: "15 分钟", diff: "入门", diffBg: "#F24D17", cardBg: "#F5F6F8", border: "#FFD77B" },
  { id: 2, image: starModel, name: "幸运星", time: "10 分钟", diff: "超简单", diffBg: "#B45309", cardBg: "#F5F6F8", border: "#FDE68A", recommended: true },
];

function ModelPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="xm-page flex h-full flex-col px-4 pb-24 pt-[64px]">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={onBack} aria-label="返回选择模型" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E9EBF0] bg-white shadow-[0_4px_16px_rgba(31,36,46,0.055)] active:scale-95">
          <ArrowLeft size={18} className="text-[#666666]" />
        </button>
        <div>
          <h2 className="text-[22px] font-extrabold text-[#333333]" style={{ fontFamily: FN }}>选择第一件作品</h2>
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
              className="relative border-2 bg-white p-4 text-left shadow-[0_4px_16px_rgba(31,36,46,0.055)]"
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
                  <p className="font-bold text-[#333333] text-lg" style={{ fontFamily: FD }}>{m.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[#999999] text-xs" style={{ fontFamily: FN }}>
                      <Clock size={14} /> {m.time}
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
                  {sel && <Check size={14} className="text-white" />}
                </motion.div>
              </div>
              {m.recommended && (
                <div
                  className="absolute -top-2.5 right-4 text-xs font-bold px-3 py-1 rounded-full text-[#333333]"
                  style={{ background: "#FFD14A", fontFamily: FN }}
                >
                  选择
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4">
        <PrimaryBtn
          label={selected !== null ? "下一步：打印准备" : "请选择一个模型"}
          onClick={onNext}
          disabled={selected === null}
          icon={selected !== null ? <ChevronRight size={20} /> : undefined}
        />
      </div>
    </div>
  );
}

// ??? Page 3: Safety Check ?????????????????????????????????????????????????????

function SafetyPage({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [coverStatus, setCoverStatus] = useState<"checking" | "closed">("checking");
  const [temperatureStatus, setTemperatureStatus] = useState<"checking" | "normal">("checking");
  const [baseStatus, setBaseStatus] = useState<"checking" | "ready">("checking");

  useEffect(() => {
    // 模拟设备状态回传；接入真实设备后替换为设备状态订阅。
    const coverTimer = setTimeout(() => setCoverStatus("closed"), 850);
    const temperatureTimer = setTimeout(() => setTemperatureStatus("normal"), 1350);
    const baseTimer = setTimeout(() => setBaseStatus("ready"), 1850);
    return () => {
      clearTimeout(coverTimer);
      clearTimeout(temperatureTimer);
      clearTimeout(baseTimer);
    };
  }, []);

  const allDone = coverStatus === "closed" && temperatureStatus === "normal" && baseStatus === "ready";
  const checkProgress = allDone ? 100 : temperatureStatus === "normal" ? 76 : coverStatus === "closed" ? 52 : 28;

  return (
    <div className="xm-page flex h-full flex-col px-4 pb-24 pt-[64px]">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={onBack} aria-label="返回" className="flex h-9 w-6 items-center justify-center text-[#333333] active:scale-95">
          <ArrowLeft size={18} className="text-[#666666]" />
        </button>
        <div>
          <h2 className="text-[22px] font-extrabold text-[#333333]" style={{ fontFamily: FN }}>打印准备</h2>
        </div>
      </div>

      <motion.section
        aria-label="正在扫描打印机"
        className="relative mb-4 flex h-[200px] items-center justify-center overflow-hidden rounded-[24px] border border-[#FFD8C8] bg-gradient-to-br from-[#FFF8EE] via-white to-[#FFF1E6]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.span
          className="absolute h-px w-[190px] bg-gradient-to-r from-transparent via-[#FF591D] to-transparent shadow-[0_0_10px_rgba(255,89,29,0.7)]"
          animate={{ y: [-48, 48] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <img src={printerReference} alt="X-MAKER Pro 打印机" className="relative z-10 h-[126px] w-[180px] object-contain mix-blend-multiply" />
      </motion.section>

      <div className="flex flex-col gap-3 flex-1">
        <div className="mb-0">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-[#999999]" style={{ fontFamily: FN }}>
              {coverStatus === "checking" ? "正在检查设备状态" : "设备检查已完成"}
            </span>
            {allDone && (
              <motion.span className="font-bold text-[#16803C]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontFamily: FN }}>
                已通过
              </motion.span>
            )}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#E8EAF0]" role="progressbar" aria-label="设备检查进度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={checkProgress}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: "0%", backgroundColor: "#FF591D" }}
              animate={{ width: `${checkProgress}%`, backgroundColor: allDone ? "#16803C" : "#FF591D" }}
              transition={{ width: { duration: 0.4 }, backgroundColor: { duration: 0.2 } }}
            />
          </div>
        </div>

        <motion.section
          className="xm-card flex items-center gap-3 p-3.5 text-left"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF8EE] text-[#FF591D]"><ShieldCheck size={18} strokeWidth={2.2} /></span>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[#333333] text-sm" style={{ fontFamily: FN }}>防护罩状态</p>
            <p className="mt-0.5 text-xs text-[#999999]" style={{ fontFamily: FN }}>
              {coverStatus === "checking" ? "正在读取打印机传感器…" : "已确认防护罩关闭，可以安全打印"}
            </p>
          </div>
          {coverStatus === "checking" ? (
            <span aria-label="正在检测" className="h-6 w-6 animate-spin rounded-full border-2 border-[#FFD8C8] border-t-[#FF591D]" />
          ) : (
            <span aria-label="检测通过" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E7F8EC] text-[#16803C]"><Check size={14} strokeWidth={3} /></span>
          )}
        </motion.section>

        <motion.section
          className="xm-card flex items-center gap-3 p-3.5 text-left"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06 }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF8EE] text-[#FF591D]"><Thermometer size={18} strokeWidth={2.2} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#333333]" style={{ fontFamily: FN }}>温度状态</p>
            <p className="mt-0.5 text-xs text-[#999999]" style={{ fontFamily: FN }}>
              {temperatureStatus === "checking" ? "正在检测设备温度…" : "当前温度 26°C，状态正常"}
            </p>
          </div>
          {temperatureStatus === "checking" ? (
            <span aria-label="正在检测温度" className="h-6 w-6 animate-spin rounded-full border-2 border-[#FFD8C8] border-t-[#FF591D]" />
          ) : (
            <span aria-label="温度检测通过" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E7F8EC] text-[#16803C]"><Check size={14} strokeWidth={3} /></span>
          )}
        </motion.section>

        <motion.section
          className="xm-card flex items-center gap-3 p-3.5 text-left"
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF8EE] text-[#FF591D]"><Layers size={18} strokeWidth={2.2} /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-[#333333]" style={{ fontFamily: FN }}>放置打印底座</p>
            <p className="mt-0.5 text-xs text-[#999999]" style={{ fontFamily: FN }}>
              {baseStatus === "checking" ? "正在检测打印底座…" : "打印底座已正确放置并固定"}
            </p>
          </div>
          {baseStatus === "checking" ? (
            <span aria-label="正在检测打印底座" className="h-6 w-6 animate-spin rounded-full border-2 border-[#FFD8C8] border-t-[#FF591D]" />
          ) : (
            <span aria-label="打印底座检测通过" className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E7F8EC] text-[#16803C]"><Check size={14} strokeWidth={3} /></span>
          )}
        </motion.section>
      </div>

      <PrimaryBtn label={allDone ? "开始打印" : "正在检查设备…"} onClick={onNext} disabled={!allDone} />
    </div>
  );
}

// ??? Page 4: Printing Progress ????????????????????????????????????????????????

function PrintingPage({ active, onNext, onBack, onCancel, model }: { active: boolean; onNext: () => void; onBack: () => void; onCancel: () => void; model: (typeof MODELS)[number] }) {
  const [progress, setProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const done = progress >= 100;

  useEffect(() => {
    if (!active || done) return;
    const t = setInterval(() => setProgress(p => Math.min(100, p + 1)), 95);
    return () => clearInterval(t);
  }, [active, done]);

  useEffect(() => {
    if (!active || !done) return;
    const timer = setTimeout(onNext, 850);
    return () => clearTimeout(timer);
  }, [active, done, onNext]);

  return (
    <div className="xm-page relative flex h-full flex-col px-4 pb-24 pt-[64px]">
      <div className="mb-5 flex items-center gap-3">
        <button onClick={onBack} aria-label="返回设备主页" className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E9EBF0] bg-white shadow-[0_4px_16px_rgba(31,36,46,0.055)] active:scale-95">
          <ArrowLeft size={18} className="text-[#666666]" />
        </button>
        <h2 className="text-xl font-bold text-[#333333]" style={{ fontFamily: FD }}>
          {done ? "打印完成" : "正在打印"}
        </h2>
      </div>

      {/* Model loading + print progress */}
      <section className="mb-5 rounded-[24px] border border-[#E9EBF0] bg-white p-3 shadow-[0_4px_16px_rgba(31,36,46,0.055)]">
        <div className="relative mx-auto flex h-[148px] w-full max-w-[210px] items-center justify-center overflow-hidden bg-transparent">
          <img src={model.image} alt={`正在打印的${model.name}`} className="h-full w-full object-contain p-3 grayscale opacity-35" />
          <motion.img
            src={model.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain p-3"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
            transition={{ duration: 0.08, ease: "linear" }}
          />
        </div>
        <div className="mt-3 border-t border-[#F0F1F3] pt-3">

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[13px] font-extrabold text-[#333333]" style={{ fontFamily: FN }}>{model.name} 正在成型</p>
            <p className="mt-0.5 text-[11px] font-medium text-[#999999]" style={{ fontFamily: FN }}>{done ? "打印完成" : "正在逐层打印，请耐心等待"}</p>
          </div>
          <span className="text-[22px] font-extrabold text-[#FF591D]" style={{ fontFamily: FN }}>{progress}%</span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#FFF1D7]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label={`${model.name}打印进度`}>
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#FF9A66] via-[#FF591D] to-[#E64A14]" initial={{ width: "0%" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.08, ease: "linear" }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-[#999999]" style={{ fontFamily: FN }}>
          <span>{done ? "已完成全部打印" : "当前打印进度"}</span>
          <span>{done ? "可以取出作品啦" : `预计还需 ${Math.max(1, Math.ceil((100 - progress) * 0.09))} 分钟`}</span>
        </div>
        </div>
        {!done && (
          <div className="mt-3 border-t border-[#F0F1F3] pt-3">
            <button
              type="button"
              onClick={() => setShowCancelConfirm(true)}
              className="flex h-11 w-full items-center justify-center rounded-full bg-[#F5F6F8] text-[14px] font-extrabold text-[#E64A14] transition-colors hover:bg-[#FFF7F2] active:scale-[0.98]"
              style={{ fontFamily: FN }}
            >
              取消打印
            </button>
          </div>
        )}
      </section>

      {/* Knowledge card */}
      <section className="rounded-[24px] border border-[#FFE1C6] bg-white p-3.5 shadow-[0_8px_20px_rgba(255,138,76,0.10)]">
        <div className="flex items-center gap-3">
          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-transparent">
            <AiBuddy size={58} mood={progress > 80 ? "excited" : "happy"} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold text-[#FF591D]" style={{ fontFamily: FN }}>今日知识卡</p>
              <button
                type="button"
                aria-label={isSpeaking ? "停止播放知识卡" : "播放知识卡"}
                aria-pressed={isSpeaking}
                onClick={() => setIsSpeaking(value => !value)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFF2DE] text-[#FF591D] active:scale-95"
              >
                <Volume2 size={14} strokeWidth={2.4} />
              </button>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#999999]" style={{ fontFamily: FN }}>
              FDM 打印机通过加热喷嘴将材料逐层堆叠，层高约为 0.2mm。
            </p>
          </div>
        </div>
        <div className="mt-3 flex h-3 items-end gap-1 rounded-full bg-[#FFF8EE] px-2 py-1" aria-live="polite">
          {[0, 1, 2, 3, 4, 5, 6].map(index => (
            <motion.span
              key={index}
              className="w-1 rounded-full bg-[#FF9A66]"
              animate={{ height: isSpeaking ? [3, 9 + (index % 3) * 2, 4] : 3, opacity: isSpeaking ? 1 : 0.45 }}
              transition={{ duration: 0.55, repeat: isSpeaking ? Infinity : 0, delay: index * 0.06, ease: "easeInOut" }}
            />
          ))}
        </div>
      </section>

      {done && <p className="mt-4 text-center text-xs font-extrabold text-[#16803C]">正在打开作品完成页…</p>}

      <AnimatePresence>
        {showCancelConfirm && !done && (
          <motion.div
            className="absolute inset-0 z-[60] flex items-center justify-center bg-black/30 px-5 pb-[76px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCancelConfirm(false)}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby="cancel-print-title"
              className="w-full rounded-[24px] bg-white p-5 shadow-[0_18px_48px_rgba(31,36,46,0.22)]"
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ type: "spring", stiffness: 360, damping: 32 }}
              onClick={event => event.stopPropagation()}
            >
              <h2 id="cancel-print-title" className="text-center text-[18px] font-extrabold text-[#333333]">确定取消打印吗？</h2>
              <p className="mt-2 text-center text-[13px] font-medium leading-relaxed text-[#666666]">取消后本次打印进度将不会保留。</p>
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-br from-[#FF9A66] via-[#FF591D] to-[#E64A14] text-[15px] font-extrabold text-white active:scale-[0.98]"
              >
                继续打印
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-3 flex h-11 w-full items-center justify-center rounded-full bg-[#F5F6F8] text-[14px] font-extrabold text-[#666666] active:scale-[0.98]"
              >
                确认取消
              </button>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ??? Page 5: Complete & Reward ????????????????????????????????????????????????

function RewardPage({ onBack, onViewWork, onCreateAnother, model }: { onBack: () => void; onViewWork: () => void; onCreateAnother: () => void; model: (typeof MODELS)[number] }) {
  const reduceMotion = useReducedMotion();
  const completedOn = new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const confetti = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      left: Math.random() * 96,
      color: ["#FF591D", "#FFD166", "#16803C"][i % 3],
      delay: Math.random() * 1.3,
      duration: 2.2 + Math.random() * 1.6,
      drift: (Math.random() - 0.5) * 130,
      rotate: Math.random() * 720,
      size: 6 + Math.random() * 7,
    }))
  ).current;

  return (
    <div className="xm-page relative flex h-full flex-col overflow-hidden px-4 pb-24 pt-[64px]">
      <button onClick={onBack} aria-label="返回设备主页" className="absolute left-4 top-[64px] z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-[#E9EBF0] bg-white shadow-[0_4px_16px_rgba(31,36,46,0.055)] active:scale-95">
        <ArrowLeft size={18} className="text-[#666666]" />
      </button>
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
          <Trophy size={24} />
        </motion.div>
        <h1 className="text-[28px] font-extrabold text-[#333333]" style={{ fontFamily: FN }}>打印完成</h1>
        <p className="mt-2 text-sm font-medium text-[#666666]" style={{ fontFamily: FN }}>底座可能还有点热，请让家长帮你取出作品。</p>
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
          className="mb-3 flex h-[132px] w-[170px] items-center justify-center overflow-hidden rounded-[20px] p-2"
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={model.image} alt={`完成打印的${model.name}`} className="h-full w-full object-contain mix-blend-multiply" />
        </motion.div>
        <p className="text-[#999999] text-xs" style={{ fontFamily: FN }}>我的{model.name} · 第一件作品</p>
        <p className="text-[#999999] text-xs mt-0.5" style={{ fontFamily: FM }}>{completedOn} · PLA · {model.time}</p>
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
          <p className="font-bold text-[#333333]" style={{ fontFamily: FD }}>首次创作者</p>
          <p className="text-xs text-yellow-700 mt-0.5" style={{ fontFamily: FN }}>获得首枚创作徽章</p>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-extrabold text-[#B83D12]" style={{ fontFamily: FN }}>
          +50 XP
        </span>
      </motion.div>

      <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <PrimaryBtn label="查看作品" onClick={onViewWork} />
        <button
          type="button"
          onClick={onCreateAnother}
          className="flex h-14 w-full items-center justify-center rounded-full bg-[#F5F6F8] text-[16px] font-extrabold text-[#666666] active:scale-[0.98]"
        >
          再做一个
        </button>
      </motion.div>
    </div>
  );
}

// ??? Page 6: Main App ?????????????????????????????????????????????????????????

const NAV = [
  { id: "explore", icon: Compass, label: "探索" },
  { id: "device", icon: Printer, label: "设备" },
  { id: "ai", icon: Zap, label: "AI" },
  { id: "create", icon: PenTool, label: "创作" },
  { id: "me", icon: User, label: "我的" },
];

const NEXT_PROJECTS = [
  { id: 0, image: dinosaurModel, name: "小恐龙", time: "12分钟", bg: "#F5F6F8" },
  { id: 2, image: starModel, name: "幸运星", time: "10分钟", bg: "#F5F6F8" },
  { id: 1, image: rocketModel, name: "迷你火箭", time: "15分钟", bg: "#F5F6F8" },
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleFavorite = (name: string) => {
    setFavorites(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  const visibleProjects = EXPLORE_PROJECTS.filter(project => project.name.includes(query.trim()));

  return (
    <div className="xm-page relative min-h-full px-4 pb-[104px]" style={{ fontFamily: FN }}>
      <header className="sticky top-0 z-40 -mx-4 mb-5 bg-[#F6F7F9]/95 px-4 pb-1 pt-[64px] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <button onClick={() => setSidebarOpen(true)} aria-label="趣味玩法" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#333333] active:bg-[#FFF2DE]">
            <Menu size={20} strokeWidth={2.3} />
          </button>
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full border border-[#E2E5EA] bg-white px-3.5 text-[#999999] shadow-[0_4px_12px_rgba(48,56,70,0.04)]">
            <Search size={18} strokeWidth={2.3} />
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索玩法名称" aria-label="搜索玩法名称" className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#333333] outline-none placeholder:text-[#999999]" />
          </label>
          <button aria-label="通知，即将开放" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#333333] active:bg-[#FFF2DE]">
            <Bell size={20} strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-5 flex items-center gap-5 border-b border-[#EEF0F3]">
          <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto">
            {["趣味玩法", "玩具", "学习工具", "生活用品"].map(item => (
              <button key={item} onClick={() => setActiveCategory(item)} aria-pressed={activeCategory === item} className="relative shrink-0 pb-3 text-[15px] font-extrabold" style={{ color: activeCategory === item ? "#333333" : "#999999" }}>
                {item}
                {activeCategory === item && <span className="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-[#FF591D]" />}
              </button>
            ))}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} aria-label="关闭侧边栏" className="absolute inset-0 z-50 bg-black/20" />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: "spring", stiffness: 360, damping: 32 }} className="absolute left-0 top-0 z-[60] h-full w-[250px] bg-white px-5 pb-8 pt-[78px] shadow-[12px_0_28px_rgba(31,36,46,0.14)]">
              <div className="space-y-2">
                {["活动", "赛事"].map(item => (
                  <button key={item} onClick={() => { setActiveCategory(item); setSidebarOpen(false); }} className="flex h-12 w-full items-center rounded-[14px] px-3 text-left text-[15px] font-extrabold text-[#666666] active:bg-[#FFF2DE]">{item}<ChevronRight className="ml-auto" size={14} /></button>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {activeCategory === "趣味玩法" ? (
      <div className="grid grid-cols-2 items-stretch gap-x-3 gap-y-4">
        {visibleProjects.map((project, index) => {
          const liked = favorites.includes(project.name);
          return (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.28 }}
              className="xm-card min-w-0 pb-4"
            >
              <div className="relative h-[176px] overflow-hidden rounded-t-[20px] bg-gray-100">
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
              <h2 className="mt-3 min-h-[21px] truncate px-3.5 text-[15px] font-extrabold text-[#333333]">{project.name}</h2>
              <div className="mt-1.5 flex min-h-[18px] items-center gap-3 px-3.5 text-[12px] font-semibold text-[#999999]">
                <span className="flex items-center gap-1"><Clock size={14} /> {project.duration}</span>
                <span className="flex items-center gap-1"><Eye size={14} /> {project.views}</span>
              </div>
            </motion.article>
          );
        })}
      </div>
      ) : (
        <motion.div key={activeCategory} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[380px] flex-col items-center justify-center rounded-[24px] border border-[#E9EBF0] bg-white px-8 text-center">
          <BookOpen size={24} className="text-[#FF591D]" />
          <h2 className="mt-4 text-lg font-extrabold text-[#333333]">{activeCategory}正在准备中</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#999999]">没有找到匹配的作品</p>
          <button onClick={() => setActiveCategory("趣味玩法")} className="mt-5 h-11 rounded-full bg-gradient-to-br from-[#FF9A66] via-[#FF591D] to-[#E64A14] px-6 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(255,89,29,0.20)] active:scale-95">返回趣味玩法</button>
        </motion.div>
      )}

      {activeCategory === "趣味玩法" && visibleProjects.length === 0 && (
        <div className="mt-4 rounded-[20px] border border-[#E9EBF0] bg-white px-5 py-8 text-center">
          <p className="text-sm font-extrabold text-[#333333]">没有找到匹配的作品</p>
          <button onClick={() => setQuery("")} className="mt-3 text-sm font-extrabold text-[#FF591D]">清除搜索</button>
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
    <div className="xm-page relative min-h-full overflow-hidden px-4 pb-[104px] pt-[64px]" style={{ fontFamily: FN }}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[290px] bg-[radial-gradient(circle_at_18%_12%,rgba(255,242,222,0.95),transparent_43%),radial-gradient(circle_at_88%_14%,rgba(255,224,184,0.66),transparent_42%),linear-gradient(180deg,#FFFFFF_0%,#F5F6FB_100%)]" />

      <header className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-r-full bg-white/75 py-2 pl-1 pr-4 text-sm font-extrabold text-[#666666] shadow-sm">
          <Trophy size={20} className="text-[#FF591D]" /> 我的成就
        </div>
        <div className="flex items-center gap-3 text-[#666666]">
          <button disabled aria-label="通知，即将开放" title="即将开放" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 opacity-45"><Bell size={20} /></button>
          <button disabled aria-label="设置，即将开放" title="即将开放" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 opacity-45"><Settings size={20} /></button>
        </div>
      </header>

      <motion.section className="relative z-10 mt-5 flex flex-col items-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative h-[108px] w-[108px] overflow-hidden rounded-full border-4 border-white bg-[#D9B795] shadow-[0_8px_22px_rgba(76,61,48,0.12)]">
          <img src={meReference} alt="用户头像" className="absolute max-w-none" style={{ width: 396, left: -144, top: -127 }} />
        </div>
        <div className="mt-2 flex items-center gap-2">
          <h1 className="text-[23px] font-black text-[#333333]">into</h1>
          <span className="rounded-full border border-[#FFE0B8] bg-[#FFF2DE] px-3 py-1 text-[10px] font-extrabold text-[#B83D12]">Lv0 小鬼萌新</span>
        </div>
      </motion.section>

      <motion.section className="relative z-10 mt-5 overflow-hidden rounded-[20px] bg-white px-3.5 py-3 shadow-[0_14px_30px_rgba(225,101,40,0.20),inset_0_1px_0_rgba(255,255,255,0.9)]" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[14px] font-extrabold text-[#333333]"><WalletCards size={18} strokeWidth={2.1} className="text-[#666666]" /> 我的钱包</h2>
          <ClipboardList size={14} strokeWidth={2} className="text-[#999999]" />
        </div>
        <div className="mt-2.5 grid grid-cols-2 divide-x divide-[#EEE4DB]">
          <div className="pr-2.5">
            <p className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#999999]"><CircleDollarSign size={14} strokeWidth={2.2} className="text-[#FFB33F]" /> Coins: <strong className="text-[16px] font-extrabold text-[#333333]">0</strong></p>
            <button disabled title="即将开放" className="mt-2 h-7 w-full rounded-full bg-gradient-to-r from-[#FFB478] via-[#FF925B] to-[#FF7541] text-[11px] font-extrabold text-white shadow-[0_4px_10px_rgba(255,113,58,0.18)]">充值</button>
          </div>
          <div className="pl-2.5">
            <p className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-[#999999]"><Flame size={14} strokeWidth={2.2} className="text-[#FF8A66]" /> 能量: <strong className="text-[16px] font-extrabold text-[#333333]">0</strong></p>
            <button disabled title="即将开放" className="mt-2 h-7 w-full rounded-full bg-white text-[11px] font-extrabold text-[#333333]">找能量</button>
          </div>
        </div>
      </motion.section>

      <section className="relative z-10 mt-6">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {sections.map(item => (
            <button key={item} onClick={() => setSection(item)} className="shrink-0 text-[15px] font-extrabold" style={{ color: section === item ? "#333333" : "#999999" }}>
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
        <div className="relative h-[128px] w-[188px] overflow-hidden">
          <img src={meEmptyPlaceholder} alt="暂无收藏内容" className="h-full w-full object-contain" />
        </div>
        <p className="mt-2 text-sm font-bold text-[#999999]">没有找到匹配的作品</p>
      </motion.div>
    </div>
  );
}

const CREATE_TEMPLATES = [
  { name: "AI Superhero", sub: "创意有 AI，点亮英雄梦" },
  { name: "AI Dinosaurs", sub: "穿越侏罗纪，创造恐龙伙伴" },
];

function CreatePage() {
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [importedFile, setImportedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleDownload = (name: string) => {
    setDownloaded(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  return (
    <div className="xm-page min-h-full px-4 pb-[104px] pt-[64px]" style={{ fontFamily: FN }}>
      <motion.h1 className="text-center text-[22px] font-black text-[#333333]" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
        创作
      </motion.h1>

      <motion.button
        onClick={() => fileInputRef.current?.click()}
        className="xm-material mt-7 flex h-[106px] w-full items-center justify-between rounded-[24px] px-6 text-left active:scale-[0.99]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.985 }}
      >
        <div>
          <p className="text-xl font-extrabold text-[#333333]">导入 3D 文件</p>
          <p className="mt-1 max-w-[220px] truncate text-sm font-semibold text-[#999999]">{importedFile ?? "支持 STL、OBJ、3MF 文件"}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#FFF2DE] text-[#FF591D] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <Upload size={24} strokeWidth={3} />
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
      {importedFile && <p role="status" className="mt-2 text-center text-xs font-extrabold text-[#16803C]"><Check size={14} className="mr-1 inline" />文件已导入，可以进入切片准备</p>}

      <div className="mt-5 flex flex-col gap-4">
        {CREATE_TEMPLATES.map((template, index) => {
          const done = downloaded.includes(template.name);
          return (
            <motion.article
              key={template.name}
              className="xm-card xm-card--large overflow-hidden"
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
                  className="pointer-events-none h-full w-full select-none object-cover"
                />
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-[18px] font-black text-[#333333]">{template.name}</h2>
                  <p className="mt-0.5 truncate text-sm font-semibold text-[#999999]">{template.sub}</p>
                </div>
                <button
                  onClick={() => toggleDownload(template.name)}
                  className="flex h-11 min-w-[76px] items-center justify-center gap-1.5 rounded-full px-4 text-sm font-extrabold text-white active:scale-95"
                  style={{ background: done ? "#16803C" : "#FF591D" }}
                >
                  {done ? <Check size={18} /> : <Download size={18} />}
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

function DevicePage({ active, hasPrinter, isPrinting, hasCompletedFirstPrint, lastModel, onConnect, onExplore, onOpenPrintStatus, onRemovePrinter }: { active: boolean; hasPrinter: boolean; isPrinting: boolean; hasCompletedFirstPrint: boolean; lastModel: (typeof MODELS)[number]; onConnect: () => void; onExplore: () => void; onOpenPrintStatus: () => void; onRemovePrinter: () => void }) {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!active || !hasPrinter) setShowSettings(false);
  }, [active, hasPrinter]);

  if (hasPrinter) {
    return (
      <div className="xm-page relative min-h-full px-4 pb-[104px] pt-[64px]" style={{ fontFamily: FN }}>
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-[25px] font-extrabold tracking-tight text-[#333333]">我的设备</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSettings(open => !open)} aria-label="设备设置" aria-pressed={showSettings} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9EBF0] bg-white text-[#999999] shadow-[0_4px_16px_rgba(31,36,46,0.06)] active:scale-95">
              <Settings size={18} />
            </button>
          </div>
        </header>

        <motion.section
          className="xm-card xm-card--large relative mt-6 overflow-hidden p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative flex flex-col items-center">
            <div className="flex w-full items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#16803C] shadow-[0_0_0_4px_rgba(22,128,60,0.12)]" aria-label="设备在线" />
              <h2 className="text-[20px] font-extrabold text-[#333333]">X-MAKER PRO</h2>
            </div>
            <button
              type="button"
              onClick={isPrinting || hasCompletedFirstPrint ? onOpenPrintStatus : undefined}
              disabled={!isPrinting && !hasCompletedFirstPrint}
              aria-label={isPrinting ? "查看正在打印的任务" : hasCompletedFirstPrint ? "查看已完成的打印任务" : "X-MAKER PRO 打印机"}
              className={`mt-2 flex h-[168px] w-full items-center justify-center rounded-[20px] transition-transform ${isPrinting || hasCompletedFirstPrint ? "cursor-pointer active:scale-[0.98]" : "cursor-default"}`}
            >
              <img src={printerReference} alt="X-MAKER PRO 3D 打印机" className="h-full w-full object-contain" />
            </button>
          </div>

              <div className="relative mt-4 flex items-center justify-center gap-3 border-t border-[#EEF0F3] pt-4">
             <div className="flex min-h-[58px] min-w-0 flex-1 flex-col items-center justify-center rounded-[16px] bg-[#F7F8FA] px-3 text-center">
              <p className="text-[10px] font-semibold text-[#999999]">状态</p>
              <p className={`mt-1 text-[14px] font-extrabold ${isPrinting ? "text-[#FF591D]" : hasCompletedFirstPrint ? "text-[#16803C]" : "text-[#333333]"}`}>{isPrinting ? "打印中" : hasCompletedFirstPrint ? "已完成" : "空闲中"}</p>
            </div>
             <div className="flex min-h-[58px] min-w-0 flex-1 flex-col items-center justify-center rounded-[16px] bg-[#F7F8FA] px-3 text-center">
              <p className="text-[10px] font-semibold text-[#999999]">耗材余量</p>
              <p className="mt-1 text-[14px] font-black text-[#333333]">72%</p>
            </div>
             <div className="flex min-h-[58px] min-w-0 flex-1 flex-col items-center justify-center rounded-[16px] bg-[#F7F8FA] px-3 text-center">
              <p className="text-[10px] font-semibold text-[#999999]">温度</p>
              <p className="mt-1 text-[14px] font-extrabold text-[#333333]">26°C</p>
            </div>
          </div>

          <button
            onClick={onExplore}
            className="relative mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FF9A66] via-[#FF591D] to-[#E64A14] text-[15px] font-extrabold text-white shadow-[0_8px_18px_rgba(255,89,29,0.20)] active:scale-[0.98]"
          >
            <PenTool size={18} /> 选择模型
          </button>
        </motion.section>

        <AnimatePresence>
          {showSettings && (
            <motion.div className="absolute inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <button onClick={() => setShowSettings(false)} aria-label="关闭设备管理" className="absolute inset-0 bg-black/25" />
              <motion.section
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 380, damping: 34 }}
                className="absolute bottom-0 left-0 right-0 rounded-t-[28px] bg-white px-5 pb-8 pt-3 shadow-[0_-16px_40px_rgba(31,36,46,0.16)]"
              >
                <div className="mx-auto h-1.5 w-10 rounded-full bg-[#D9DDE4]" />
                <div className="mt-5">
                  <p className="text-[18px] font-extrabold text-[#333333]">设备管理</p>
                  <p className="mt-1.5 text-xs font-medium text-[#999999]">解除绑定后需要重新连接打印机</p>
                </div>
                <button onClick={onRemovePrinter} className="mt-5 flex h-12 w-full items-center justify-center rounded-full border border-[#F1C9C9] bg-[#FFF7F7] text-sm font-extrabold text-[#C24141] active:scale-[0.98]">解除绑定</button>
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold text-[#333333]">打印记录</h2>
            {hasCompletedFirstPrint && <span className="text-xs font-extrabold text-[#999999]">共 1 条</span>}
          </div>
          {hasCompletedFirstPrint ? (
          <div className="flex items-center gap-3 rounded-[20px] border border-[#E9EBF0] bg-white p-3 shadow-[0_4px_16px_rgba(31,36,46,0.055)]">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] p-1" style={{ background: lastModel.cardBg }}>
              <img src={lastModel.image} alt={`${lastModel.name}打印记录`} className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-extrabold text-[#333333]">{lastModel.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#999999]"><Clock size={14} />{lastModel.time} · PLA</p>
            </div>
            <span className="rounded-full bg-[#E7F8EC] px-2.5 py-1 text-[11px] font-extrabold text-[#16803C]">已完成</span>
          </div>
          ) : (
            <div className="rounded-[20px] border border-dashed border-[#D9DDE4] bg-white px-5 py-7 text-center">
              <Printer size={24} className="mx-auto text-[#FF591D]" />
              <p className="mt-3 text-sm font-extrabold text-[#333333]">还没有打印记录</p>
              <p className="mt-1 text-xs font-medium text-[#999999]">设备中心</p>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="xm-page relative min-h-full px-6 pb-[104px] pt-[64px]" style={{ fontFamily: FN }}>
      <button disabled title="帮助中心即将开放" className="absolute right-5 top-[68px] flex h-10 items-center rounded-full border border-white/70 bg-white/75 px-4 text-[14px] font-extrabold text-[#999999] opacity-60 shadow-[0_4px_16px_rgba(31,36,46,0.06)] backdrop-blur-xl">
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

        <h1 className="mt-8 text-[30px] font-black leading-none tracking-tight text-[#333333]">趣打印</h1>
        <p className="mt-3 text-[15px] font-semibold text-[#999999]">连接后才能体验完整流程</p>

        <motion.button
          onClick={onConnect}
          className="mt-9 flex h-[56px] w-[228px] items-center justify-center rounded-full bg-gradient-to-br from-[#FF9A66] via-[#FF591D] to-[#E64A14] text-[18px] font-black text-white shadow-[0_8px_18px_rgba(255,89,29,0.20)]"
          whileTap={{ scale: 0.975 }}
        >
          连接打印机
        </motion.button>

        <button disabled title="商城即将开放" className="mt-5 text-[16px] font-extrabold text-[#999999] underline decoration-[1.5px] underline-offset-2">
          暂不连接，先看看
        </button>
      </motion.div>
    </div>
  );
}

function MainApp({ hasPrinter, isPrinting, hasCompletedFirstPrint, completedModel, onConnect, onContinue, onStartPrint, onModelSelect, onExplore, onOpenPrintStatus, onRemovePrinter, tab }: { hasPrinter: boolean; isPrinting: boolean; hasCompletedFirstPrint: boolean; completedModel: (typeof MODELS)[number]; onConnect: () => void; onContinue: () => void; onStartPrint: () => void; onModelSelect: (modelId: number) => void; onExplore: () => void; onOpenPrintStatus: () => void; onRemovePrinter: () => void; tab: string }) {
  const ph = TAB_PLACEHOLDERS[tab];
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const tabScrollPositions = useRef<Record<string, number>>({});
  const reduceTabMotion = useReducedMotion();
  const [idea, setIdea] = useState("");
  const [hasSentIdea, setHasSentIdea] = useState(false);
  const rocketProject = NEXT_PROJECTS.find(item => item.id === 1) ?? NEXT_PROJECTS[NEXT_PROJECTS.length - 1];
  const assistantReply = "当然可以！我推荐你试试迷你火箭，简单又好玩，一起把它打印出来吧。";
  const { isThinking, typedReply } = useAssistantReply(hasSentIdea, assistantReply);

  const submitVoiceIdea = (value?: string) => {
    setIdea(value || "我想打印火箭");
    setHasSentIdea(true);
  };

  useEffect(() => {
    mainScrollRef.current?.scrollTo({ top: tabScrollPositions.current[tab] ?? 0, behavior: "auto" });
  }, [tab]);

  return (
    <div className="xm-page relative flex h-full flex-col" style={{ fontFamily: FN }}>
      <div ref={mainScrollRef} onScroll={event => { tabScrollPositions.current[tab] = event.currentTarget.scrollTop; }} className="flex-1 overflow-y-auto pb-24" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            className="min-h-full"
            initial={reduceTabMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceTabMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduceTabMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
        <div className={tab === "ai" ? "block" : "hidden"}>
          <div className="px-4 pt-[64px] text-[#333333]">
            {hasPrinter ? (
              <>
                <AnimatePresence initial={false}>
                {!hasSentIdea && <motion.div key="ai-greeting" className="mb-5 flex flex-col items-center pt-5 text-center" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -72, scale: 0.96, marginBottom: -24 }} transition={{ duration: 0.35, ease: "easeInOut" }}>
                  <AiBuddy size={132} mood="happy" />
                  <h1 className="mt-2 max-w-[320px] text-[21px] font-extrabold leading-tight tracking-tight">早上好呀~<br />小创作家，想打印什么玩具呢？</h1>
                </motion.div>}
                </AnimatePresence>
                {hasSentIdea && <motion.div className="mb-4 flex h-12 items-center justify-center gap-2 px-1" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><AiBuddy size={42} mood="happy" /><span className="text-[16px] font-extrabold leading-none text-[#333333]">小印</span></motion.div>}
              </>
            ) : (
              <div className="mb-4"><p className="text-[13px] font-semibold text-[#999999]">下午好，小创客</p><h1 className="mt-0.5 text-[24px] font-extrabold leading-tight tracking-tight">今天想创造什么？</h1></div>
            )}
            {!hasPrinter ? (
              <motion.section className="xm-material relative overflow-hidden rounded-[24px] p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-4"><AiBuddy size={108} mood="happy" /><div className="min-w-0 flex-1"><p className="text-[13px] font-extrabold text-[#333333]">你好，我是小 X</p><p className="mt-2 text-[12px] font-medium leading-relaxed text-[#999999]">我会陪你连接设备、挑选模型，并完成第一次打印。</p></div></div>
                <div className="mt-4"><PrimaryBtn label="开始连接设备" onClick={onConnect} icon={<Wifi size={18} />} /></div>
              </motion.section>
            ) : (
              hasSentIdea ? (
                <motion.section className="space-y-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="flex justify-end"><div className="max-w-[78%] rounded-[18px] rounded-tr-[6px] border border-[#FFD0BA] bg-[#FFE4D6] px-3.5 py-2.5 text-[13px] font-bold text-[#B83D12]">{idea || "我想打印火箭"}</div></div>
                  <div className="w-full">
                    <div className="w-full px-1 py-1">
                      <AnimatePresence mode="wait" initial={false}>
                        {isThinking ? <motion.p key="thinking" className="mt-1 text-[12px] font-medium leading-relaxed text-[#999999]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>正在思考<span className="inline-flex w-5 overflow-hidden align-bottom">{[0, 1, 2].map(index => <motion.span key={index} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.16 }}>.</motion.span>)}</span></motion.p> : <motion.div key="response" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
                          <p className="mt-1 text-[12px] font-medium leading-relaxed text-[#666666]">{typedReply}</p>
                          {typedReply.length >= assistantReply.length && <motion.button onClick={() => onModelSelect(rocketProject.id)} aria-label="选择迷你火箭" className="mt-3 flex w-full items-center gap-2.5 overflow-hidden rounded-[16px] bg-white p-2 text-left shadow-[0_4px_16px_rgba(31,36,46,0.055)] active:scale-[0.98]" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex h-[58px] w-[68px] shrink-0 items-center justify-center overflow-hidden rounded-[14px]" style={{ background: rocketProject.bg }}><img src={rocketProject.image} alt="迷你火箭" className="h-full w-full object-contain mix-blend-multiply" /></div>
                            <div className="min-w-0 flex-1"><p className="text-[13px] font-extrabold text-[#333333]">迷你火箭</p><p className="mt-0.5 text-[10px] font-medium text-[#999999]">约 {rocketProject.time} · 点击开始打印</p></div><ChevronRight size={14} className="shrink-0 text-[#FF591D]" />
                          </motion.button>}
                        </motion.div>}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.section>
              ) : null
            )}
          </div>
        </div>
        <div className={tab === "explore" ? "block" : "hidden"}><ExplorePage /></div>
        <div className={tab === "device" ? "block" : "hidden"}><DevicePage active={tab === "device"} hasPrinter={hasPrinter} isPrinting={isPrinting} hasCompletedFirstPrint={hasCompletedFirstPrint} lastModel={completedModel} onConnect={onConnect} onExplore={onExplore} onOpenPrintStatus={onOpenPrintStatus} onRemovePrinter={onRemovePrinter} /></div>
        <div className={tab === "me" ? "block" : "hidden"}><MePage /></div>
        <div className={tab === "create" ? "block" : "hidden"}><CreatePage /></div>
        {!NAV.some(item => item.id === tab) && <div className="flex flex-col items-center justify-center" style={{ minHeight: 680, paddingTop: 80 }}><div className="text-6xl mb-4">{ph.icon}</div><p className="font-bold text-[#666666] text-lg" style={{ fontFamily: FD }}>{ph.label}</p><p className="text-[#999999] text-sm mt-1" style={{ fontFamily: FN }}>{ph.sub}</p></div>}
          </motion.div>
        </AnimatePresence>
      </div>
      {tab === "ai" && hasPrinter && <div className="absolute bottom-[104px] left-4 right-4 z-30"><VoiceInputButton onSubmit={submitVoiceIdea} /></div>}
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
            className="relative mx-0.5 flex h-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-[16px] text-[#999999]"
            aria-current={isActive ? "page" : undefined}
            aria-label={locked ? `${item.label}，完成当前步骤后可切换` : item.label}
            style={{
              color: isActive ? "#FF591D" : "#999999",
              background: isActive ? "rgba(255,89,29,0.10)" : "transparent",
            }}
            animate={{
              y: isActive ? -1 : 0,
              opacity: locked ? 0.52 : 1,
            }}
            whileTap={locked ? undefined : { scale: 0.96 }}
            transition={{ type: "spring", stiffness: 460, damping: 30, mass: 0.7 }}
          >
            <motion.span
              className="flex items-center justify-center"
              animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -1 : 0 }}
              transition={{ type: "spring", stiffness: 520, damping: 25, mass: 0.55 }}
            >
              <Icon size={20} color="currentColor" fill="none" strokeWidth={isActive ? 2.5 : 2.1} />
            </motion.span>
            <span className="text-[10px] font-extrabold" style={{ fontFamily: FN, color: "currentColor" }}>
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}

// ??? Root ?????????????????????????????????????????????????????????????????????

export default function App() {
  const isGitHubPreview = window.location.hostname.endsWith("github.io");
  const [hasPrinter, setHasPrinter] = usePersistentState("xmaker.hasPrinter", false);
  const [hasCompletedFirstPrint, setHasCompletedFirstPrint] = usePersistentState("xmaker.hasCompletedFirstPrint", false);
  const [selectedModelId, setSelectedModelId] = usePersistentState("xmaker.selectedModelId", 0);
  const [completedModelId, setCompletedModelId] = usePersistentState("xmaker.completedModelId", 0);
  const [page, setPage] = useState(() => {
    if (isGitHubPreview) return 0;
    try {
      const savedPrinter = JSON.parse(window.localStorage.getItem("xmaker.hasPrinter") ?? "false");
      const savedCompletion = JSON.parse(window.localStorage.getItem("xmaker.hasCompletedFirstPrint") ?? "false");
      return savedPrinter && savedCompletion ? 6 : 0;
    } catch {
      return 0;
    }
  });
  const aiPageRef = useRef(page);
  const flowOwnerRef = useRef<"ai" | "device">("ai");
  const [pageTransitionMode, setPageTransitionMode] = useState<"flow" | "tab">("flow");
  const [tab, setTab] = useState("ai");
  const [printSessionId, setPrintSessionId] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [visitedPages, setVisitedPages] = useState<Set<number>>(() => new Set([page, 6]));
  const reduceMotion = useReducedMotion();
  const setFlowPage = (value: React.SetStateAction<number>) => {
    setPageTransitionMode("flow");
    setPage(previousPage => {
      const nextPage = typeof value === "function" ? value(previousPage) : value;
      aiPageRef.current = nextPage;
      return nextPage;
    });
  };
  const next = () => setFlowPage(p => p + 1);
  const back = () => setFlowPage(p => Math.max(0, p - 1));
  const selectedModel = MODELS.find(model => model.id === selectedModelId) ?? MODELS[0];
  const completedModel = MODELS.find(model => model.id === completedModelId) ?? MODELS[0];

  useLayoutEffect(() => {
    if (!isGitHubPreview) return;
    setHasPrinter(false);
    setHasCompletedFirstPrint(false);
    setIsPrinting(false);
    flowOwnerRef.current = "ai";
    aiPageRef.current = 0;
    setTab("ai");
    setPage(0);
  }, [isGitHubPreview]);

  useEffect(() => {
    if (!hasPrinter && tab === "ai" && page === 6) setFlowPage(0);
  }, [hasPrinter, tab, page]);

  useEffect(() => {
    setVisitedPages(current => {
      if (current.has(page)) return current;
      const nextVisited = new Set(current);
      nextVisited.add(page);
      return nextVisited;
    });
  }, [page]);

  const pages: React.ReactNode[] = [
    <WelcomePage
      hasPrinter={hasPrinter}
      onModelSelected={(modelId) => {
        setSelectedModelId(modelId);
        setPrintSessionId(sessionId => sessionId + 1);
        flowOwnerRef.current = "device";
        setTab("device");
        setFlowPage(3);
      }}
      onPrinterAdded={() => setHasPrinter(true)}
      onFlowLockChange={() => {}}
    />,
    <ConnectPage onNext={next} onBack={back} />,
    <ModelPage onNext={() => {
      setPrintSessionId(sessionId => sessionId + 1);
      next();
    }} onBack={back} />,
    <SafetyPage key={`safety-${printSessionId}`} onNext={() => {
      setIsPrinting(true);
      next();
    }} onBack={() => {
      flowOwnerRef.current = "device";
      setTab("device");
      setFlowPage(6);
    }} />,
    <PrintingPage
      key={`printing-${printSessionId}`}
      active={isPrinting}
      model={selectedModel}
      onNext={() => {
        setIsPrinting(false);
        setHasPrinter(true);
        setHasCompletedFirstPrint(true);
        setCompletedModelId(selectedModelId);
        if (page === 4) setFlowPage(5);
      }}
      onBack={() => {
        flowOwnerRef.current = "device";
        setTab("device");
        setFlowPage(6);
      }}
      onCancel={() => {
        setIsPrinting(false);
        setPrintSessionId(sessionId => sessionId + 1);
        flowOwnerRef.current = "device";
        setTab("device");
        setFlowPage(6);
      }}
    />,
    <RewardPage
      model={selectedModel}
      onBack={() => {
        flowOwnerRef.current = "device";
        setTab("device");
        setFlowPage(6);
      }}
      onViewWork={() => {
        setTab("device");
        setFlowPage(6);
      }}
      onCreateAnother={() => {
        setTab("ai");
        setFlowPage(6);
      }}
    />,
    <MainApp
      hasPrinter={hasPrinter}
      isPrinting={isPrinting}
      hasCompletedFirstPrint={hasCompletedFirstPrint}
      completedModel={completedModel}
      onConnect={() => {
        flowOwnerRef.current = "ai";
        setTab("ai");
        setFlowPage(0);
      }}
      onContinue={() => setTab("create")}
      onStartPrint={() => {
        if (hasCompletedFirstPrint) {
          setTab("create");
          setFlowPage(6);
          return;
        }
        setTab("ai");
        setFlowPage(0);
      }}
      onModelSelect={(modelId) => {
        setSelectedModelId(modelId);
        if (!hasPrinter) {
          flowOwnerRef.current = "ai";
          setTab("ai");
          setFlowPage(0);
          return;
        }
        setPrintSessionId(sessionId => sessionId + 1);
        flowOwnerRef.current = "device";
        setTab("device");
        setFlowPage(3);
      }}
      onExplore={() => {
        setTab("explore");
        setFlowPage(6);
      }}
      onOpenPrintStatus={() => {
        flowOwnerRef.current = "device";
        setTab("device");
        setFlowPage(isPrinting ? 4 : 5);
      }}
      onRemovePrinter={() => {
        setIsPrinting(false);
        setHasPrinter(false);
        setTab("ai");
        setFlowPage(0);
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
        <div className="absolute left-0 right-0 top-0 z-40 flex h-[59px] items-center justify-between px-[22px] text-[#333333]">
          <span className="text-[15px] font-semibold tracking-[-0.02em]" style={{ fontFamily: FN }}>9:41</span>
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

        {/* Keep every flow screen mounted so switching tabs never resets its state. */}
        <div className="absolute inset-0">
          {pages.map((pageContent, pageIndex) => {
            const isCurrentPage = pageIndex === page;
            if (!isCurrentPage && !visitedPages.has(pageIndex)) return null;
            return (
              <motion.div
                key={pageIndex}
                aria-hidden={!isCurrentPage}
                initial={false}
                animate={isCurrentPage ? { x: 0, y: 0, opacity: 1 } : { x: 0, y: pageTransitionMode === "tab" ? -6 : 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : pageTransitionMode === "tab" ? 0.2 : 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
                style={{
                  background: "#FFF9EE",
                  overflowY: "auto",
                  overflowX: "hidden",
                  scrollbarWidth: "none",
                  pointerEvents: isCurrentPage ? "auto" : "none",
                  visibility: isCurrentPage ? "visible" : "hidden",
                }}
              >
                {pageContent}
              </motion.div>
            );
          })}
        </div>

        <PersistentNav
          active={page === 6 ? tab : flowOwnerRef.current}
          locked={false}
          onSelect={(id) => {
            setPageTransitionMode("tab");
            setTab(id);
            setPage(id === flowOwnerRef.current ? aiPageRef.current : 6);
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
