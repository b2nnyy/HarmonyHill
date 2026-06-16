import Image from "next/image";

export function SpinningLogo() {
  return (
    <div className="logo-stage" aria-hidden="true">
      <div className="logo-spin">
        {Array.from({ length: 7 }, (_, index) => {
          const depth = (index - 3) * 1.4;
          return (
            <Image
              key={index}
              src="/assets/harmony-hill-logo-clean.png"
              alt=""
              className="logo-layer"
              width={512}
              height={512}
              style={{
                transform: `translateZ(${depth}px)`,
                opacity: index === 3 ? 1 : 0.2,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
