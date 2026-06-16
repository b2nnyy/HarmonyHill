import Image from "next/image";

type LogoMarkProps = {
  priority?: boolean;
};

export function LogoMark({ priority = false }: LogoMarkProps) {
  return (
    <div
      className="logo-stage"
      aria-label="Harmony Hill logo"
      role="img"
    >
      <div className="logo-halo" aria-hidden="true" />
      <div className="logo-ring-spin" aria-hidden="true" />
      <div className="logo-ring" aria-hidden="true" />
      <Image
        src="/assets/harmony-hill-logo-clean.png"
        alt="Harmony Hill"
        className="logo-mark"
        width={512}
        height={512}
        priority={priority}
      />
    </div>
  );
}
