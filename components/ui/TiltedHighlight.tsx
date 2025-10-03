interface Props {
  children: string;
  skewDegree?: number;
}

export default function TiltedHighlight({
  children,
  skewDegree = -20,
}: Props) {
  const skewSize = "12px";
  const height = "60px";

  return (
    <span
      class="inline text-background font-medium px-3 py-2 mx-[-12px] relative"
      style={{
        backgroundImage: `
          linear-gradient(to bottom right, transparent 50%, var(--color-accent) 50%),
          linear-gradient(var(--color-accent), var(--color-accent)),
          linear-gradient(to top left, transparent 50%, var(--color-accent) 50%)
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${skewSize} ${height}, calc(100% - ${
          parseInt(skewSize) * 2
        }px) ${height}, ${skewSize} ${height}`,
        backgroundPosition: "left center, center, right center",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}
