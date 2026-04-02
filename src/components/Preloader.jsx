export default function Preloader({ visible }) {
  return (
    <div className={`preloader ${!visible ? 'is-hidden' : ''}`}>
      <div className="preloader-monogram">EE</div>
      <div className="preloader-bar-track">
        <div className="preloader-bar-fill" />
      </div>
    </div>
  )
}
