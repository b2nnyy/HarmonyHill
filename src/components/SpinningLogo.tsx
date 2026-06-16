import Image from "next/image";

export function SpinningLogo() {
  return (
    <div className="logo-stage" aria-label="Spinning Harmony Hill logo" role="img">
      <div className="logo-aura" />
      <div className="logo-spin" aria-hidden="true">
        <div className="logo-edge" />
        <Image
          src="/assets/harmony-hill-logo-clean.png"
          alt=""
          className="logo-face logo-front"
          width={512}
          height={512}
          priority
        />
        <Image
          src="/assets/harmony-hill-logo-clean.png"
          alt=""
          className="logo-face logo-back"
          width={512}
          height={512}
          priority
        />
      </div>
    </div>
  );
}
