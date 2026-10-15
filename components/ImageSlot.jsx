// Production version of the design's <image-slot>: fills its container and
// shows the image with object-fit: cover. Empty slots render `children`
// (or nothing) instead of the editor's "drop an image" prompt.
export default function ImageSlot({ src, alt = '', children, style }) {
  return (
    <div className="ab-slot" style={style}>
      <div className="ab-slot-frame">
        {src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : children}
      </div>
    </div>
  );
}
