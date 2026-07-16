/** Shared geometry traced from logo_light.png — viewBox 0 0 100 100 */
export const LOGO_PATHS = {
  bracketTl: "M0 0H81V5.1H5.1V81H0V0Z",
  bracketBr: "M100 100H18.9V94.9H94.9V18.9H100V100Z",
  core: "M29.9 12H73.7L84.6 30.8H40.8L51.7 50L40.8 69.1H84.6L73.7 87.9H29.9L19 69.1L29.9 50L19 30.8L29.9 12Z",
} as const;

/**
 * Square centerline for snake bracket strokes (inset by half of ~5.1 stroke).
 * Path starts at top-right and runs clockwise: right → bottom → left → top.
 *
 * pathLength is normalized to 4 (one unit per side).
 * Dash length is shorter than 2 sides so opposite corners stay open
 * (matching the filled L brackets that only extend ~81 units).
 */
const FRAME_INSET = 2.55;
const FRAME_OUTER = 100 - FRAME_INSET;

/** Original L arm ≈ 81; along inset centerline ~78.5 → ~0.827 of a side */
const ARM = 0.827;
const DASH = ARM * 2; // L covers two partial sides
const PATH_LEN = 4;
const GAP = PATH_LEN - DASH;
/** Half-lap = two sides → snakes swap corners */
const HALF_LAP = 2;

export const LOGO_FRAME = {
  /** Clockwise from TR */
  path: `M ${FRAME_OUTER} ${FRAME_INSET} V ${FRAME_OUTER} H ${FRAME_INSET} V ${FRAME_INSET} H ${FRAME_OUTER}`,
  pathLength: PATH_LEN,
  dash: DASH,
  gap: GAP,
  halfLap: HALF_LAP,
  stroke: 5.1,
  /**
   * Dash start so L is centered on the corner:
   * BR at path dist 1 (TR→right→BR), TL at path dist 3.
   */
  offsetBr: -(1 - ARM),
  offsetTl: -(3 - ARM),
} as const;
