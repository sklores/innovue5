interface Props {
  items: string[]
}

export default function Marquee({ items }: Props) {
  return (
    <div className="marquee" role="tablist">
      <div className="marquee__content">
        {items.map((item, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected="false"
            className="marquee__item"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
