import type { WorkIcon as WorkIconName } from "@/lib/works";

const paths: Record<WorkIconName, React.ReactNode> = {
  // Storefront with awning
  store: (
    <>
      <path d="M8 22h48l-4 12H12L8 22Z" />
      <path d="M12 34v20h40V34" />
      <path d="M26 54V42h12v12" />
      <path d="M20 22v12M32 22v12M44 22v12" />
      <path d="M14 10h36l6 12H8l6-12Z" />
    </>
  ),
  // Graduation cap with a notification bell
  school: (
    <>
      <path d="M4 22 28 12l24 10-24 10L4 22Z" />
      <path d="M14 27v11c0 3 6 7 14 7s14-4 14-7V27" />
      <path d="M52 22v12" />
      <path d="M46 44a8 8 0 0 1 16 0v6l2 3H44l2-3v-6Z" />
      <path d="M51 56a3 3 0 0 0 6 0" />
    </>
  ),
  // Rocket
  rocket: (
    <>
      <path d="M32 6c9 7 12 18 10 30H22C20 24 23 13 32 6Z" />
      <circle cx="32" cy="22" r="4" />
      <path d="M22 36l-8 8 2-12 6-2M42 36l8 8-2-12-6-2" />
      <path d="M26 42c0 6 3 10 6 14 3-4 6-8 6-14" />
    </>
  ),
  // Gamepad
  gamepad: (
    <>
      <path d="M16 18h32c7 0 12 6 12 14l-2 12c-1 6-8 8-12 3l-5-6H23l-5 6c-4 5-11 3-12-3L4 32c0-8 5-14 12-14Z" />
      <path d="M18 26v10M13 31h10" />
      <circle cx="44" cy="28" r="2" />
      <circle cx="50" cy="34" r="2" />
    </>
  ),
};

export default function WorkIcon({
  name,
  className,
}: {
  name: WorkIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
