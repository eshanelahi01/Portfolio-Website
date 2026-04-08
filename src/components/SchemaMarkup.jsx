export default function SchemaMarkup({ items = [] }) {
  return items.map((item, index) => (
    <script
      key={`${item['@type'] || 'schema'}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ))
}
