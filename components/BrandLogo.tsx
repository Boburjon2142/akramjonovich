import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  className = "w-[210px] sm:w-[230px]",
  priority = false,
}: BrandLogoProps) {
  return (
    <div
      className={`relative isolate shrink-0 overflow-hidden rounded-xl ${className}`}
      style={{
        aspectRatio: "1600 / 430",
        background:
          "linear-gradient(135deg, rgba(0,229,255,0.035), rgba(5,5,8,0.18) 48%, rgba(124,58,237,0.035))",
        border: "1px solid rgba(0,229,255,0.1)",
        boxShadow:
          "0 8px 28px rgba(0,0,0,0.28), 0 0 20px rgba(0,229,255,0.06), inset 0 1px 0 rgba(255,255,255,0.035)",
      }}
    >
      <Image
        src="/images/boburdev-logo.png"
        alt="BOBURDEV - Full-Stack Developer"
        fill
        priority={priority}
        sizes="(max-width: 640px) 210px, 250px"
        className="object-cover transition-transform duration-300"
        style={{
          mixBlendMode: "screen",
          opacity: 0.96,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,5,8,0.2), transparent 12%, transparent 88%, rgba(5,5,8,0.2))",
          boxShadow: "inset 0 0 18px rgba(5,5,8,0.38)",
        }}
      />
    </div>
  );
}
