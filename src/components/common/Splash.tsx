import { LogoMark } from "@/components/common/Logo";

export function Splash() {
  return (
    <div
      className="fixed inset-0 grid place-items-center overflow-hidden"
      style={{ backgroundColor: "#0D2F23" }}
    >
      <LogoMark className="h-32 w-32 md:h-40 md:w-40 text-white" />
    </div>
  );
}
