import { LOGO_PATHS } from "./logoPaths";

type LogoProps = {
  variant?: "mark" | "full";
  tone?: "onLight" | "onDark";
  layout?: "stacked" | "inline";
  size?: number;
  className?: string;
};

export default function Logo({
  variant = "mark",
  tone = "onLight",
  layout = "stacked",
  size = 40,
  className = "",
}: LogoProps) {
  const fill = tone === "onDark" ? "var(--ekiz-white)" : "var(--ekiz-black)";
  const isStacked = variant === "full" && layout === "stacked";
  const wordSize = isStacked
    ? Math.round(size * 0.42)
    : Math.round(size * 0.5);
  const subSize = Math.max(8, Math.round(wordSize * 0.34));

  return (
    <span
      className={
        isStacked
          ? `logo inline-flex flex-col items-center gap-[0.35em] ${className}`
          : `logo inline-flex items-center gap-2.5 ${className}`
      }
      style={{ color: fill }}
      aria-label="Ekiz Yazılım"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="logo-mark block shrink-0"
      >
        <g className="logo-brackets" fill={fill}>
          <path className="logo-bracket-tl" d={LOGO_PATHS.bracketTl} />
          <path className="logo-bracket-br" d={LOGO_PATHS.bracketBr} />
        </g>
        <g className="logo-core" fill={fill}>
          <path d={LOGO_PATHS.core} />
        </g>
      </svg>

      {variant === "full" && (
        <span
          className={
            isStacked
              ? "logo-wordmark flex flex-col items-center leading-none"
              : "logo-wordmark flex flex-col justify-center leading-none"
          }
          style={isStacked ? undefined : { minHeight: size }}
        >
          <span
            className="logo-wordmark-ekiz font-semibold tracking-tight lowercase"
            style={{ fontSize: wordSize, lineHeight: 1 }}
          >
            ekiz
          </span>
          <span
            className={
              isStacked
                ? "logo-wordmark-yazilim font-light uppercase self-end"
                : "logo-wordmark-yazilim font-light uppercase"
            }
            style={{
              fontSize: subSize,
              letterSpacing: "0.18em",
              // cancel trailing letter-spacing so wordmark doesn't look right-gappy
              marginRight: "-0.18em",
              marginTop: isStacked ? "0.22em" : "0.28em",
              paddingLeft: isStacked ? "0.55em" : 0,
              lineHeight: 1,
            }}
          >
            YAZILIM
          </span>
        </span>
      )}
    </span>
  );
}
