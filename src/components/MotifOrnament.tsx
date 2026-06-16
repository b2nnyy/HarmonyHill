import Image from "next/image";

type MotifOrnamentProps = {
  className?: string;
  size?: number;
};

export function MotifOrnament({ className = "", size = 520 }: MotifOrnamentProps) {
  return (
    <div
      className={`motif-ornament ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <Image
        src="/assets/harmony-hill-logo-clean.png"
        alt=""
        width={size}
        height={size}
      />
    </div>
  );
}
