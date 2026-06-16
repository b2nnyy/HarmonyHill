import Image from "next/image";

export function SpinningLogo() {
  return (
    <div className="logo-stage" aria-label="Spinning Harmony Hill logo" role="img">
      <div className="logo-orbit" />
      <div className="logo-aura" />
      <div className="logo-spin" aria-hidden="true">
        {Array.from({ length: 11 }, (_, index) => {
          const center = 5;
          const depth = (index - center) * 2.2;
          const isFace = index === center;

          return (
            <Image
              key={index}
              src="/assets/harmony-hill-logo-clean.png"
              alt=""
              className="logo-layer"
              width={512}
              height={512}
              priority={index === center}
              style={{
                transform: `translateZ(${depth}px)`,
                opacity: isFace ? 1 : 0.18,
                filter: isFace
                  ? "drop-shadow(0 18px 28px rgba(0, 0, 0, 0.46)) drop-shadow(0 0 22px rgba(143, 232, 201, 0.15))"
                  : "brightness(0.45) drop-shadow(0 8px 18px rgba(0, 0, 0, 0.35))",
              }}
            />
          );
        })}
        <div className="logo-rim logo-rim-left" />
        <div className="logo-rim logo-rim-right" />
      </div>
    </div>
  );
}
