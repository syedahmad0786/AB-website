// Pro Max–style phone: titanium rim, thin black bezel, Dynamic Island and
// side buttons. Children render inside the screen.
export default function PhoneFrame({ children }) {
  return (
    <div className="ab-phone">
      <span className="ab-phone-btn ab-phone-action" />
      <span className="ab-phone-btn ab-phone-vol-up" />
      <span className="ab-phone-btn ab-phone-vol-down" />
      <span className="ab-phone-btn ab-phone-power" />
      <span className="ab-phone-btn ab-phone-camera" />
      <div className="ab-phone-rim">
        <div className="ab-phone-bezel">
          <div className="ab-phone-screen">
            {children}
            <span className="ab-phone-island" />
            <span className="ab-phone-home" />
          </div>
        </div>
      </div>
    </div>
  );
}
