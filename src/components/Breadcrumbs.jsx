export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs reveal" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.name}-${index}`}>
              {isLast ? <span aria-current="page">{item.name}</span> : <a href={item.url}>{item.name}</a>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

