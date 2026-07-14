import logoUrl from "@/assets/logo.png";

export function Splash() {
  return (
    <div
      className="fixed inset-0 grid place-items-center overflow-hidden"
      style={{ backgroundColor: "#0F2E14" }}
    >
      <img
        src={logoUrl}
        alt="TrevoOne"
        className="h-40 w-40 md:h-56 md:w-56 object-contain select-none"
        draggable={false}
      />
    </div>
  );
}
