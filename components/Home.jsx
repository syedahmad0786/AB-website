'use client';

// Home page, ported from the Claude Design prototype `project/Home v8.dc.html`.
// Markup mirrors the design template; all state, motion and data live in
// lib/homeLogic.js (the design's logic class, unchanged).
import React from 'react';
import ImageSlot from './ImageSlot';
import PhoneFrame from './PhoneFrame';
import ScaledFrame from './ScaledFrame';
import { HomeLogic } from '../lib/homeLogic';

// Defaults from the design's Tweaks panel (data-props).
// Interpolated text next to literal text renders in its own <span>, as in the
// design runtime (it matters inside flex rows, where the span gets the gap).
const T = x => (x == null || typeof x === 'boolean' ? null : typeof x === 'object' ? x : <span>{x}</span>);

const DEFAULT_PROPS = { headline: 'Work breaks', autoplay: true, stepMs: 850, cursorBuddy: true };

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { v: 0 };
    this.logic = new HomeLogic({ ...DEFAULT_PROPS, ...props });
    this.logic.__host = this;
  }

  __setLogicState(update, cb) {
    const prev = this.logic.state;
    const patch = typeof update === 'function' ? update(prev) : update;
    this.logic.state = { ...prev, ...patch };
    this.setState(s => ({ v: s.v + 1 }), cb);
  }

  componentDidMount() {
    this.logic.componentDidMount();
  }

  componentDidUpdate(prevProps) {
    this.logic.props = { ...DEFAULT_PROPS, ...this.props };
    this.logic.componentDidUpdate(prevProps);
  }

  componentWillUnmount() {
    this.logic.componentWillUnmount();
  }

  render() {
    const v = this.logic.renderVals();
    return (
      <div ref={v.rootRef} style={{ position: "relative", zIndex: "0", isolation: "isolate", minHeight: "100vh", backgroundColor: "#ECE8DF", backgroundImage: "url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%27.85%27%20numOctaves=%272%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20values=%270%200%200%200%20.07%200%200%200%200%20.07%200%200%200%200%20.06%200%200%200%20.11%200%27/%3E%3C/filter%3E%3Crect%20width=%27180%27%20height=%27180%27%20filter=%27url%28%23n%29%27/%3E%3C/svg%3E)", backgroundSize: "180px 180px", overflowX: "hidden" }}>
        {T(v.bgCanvas)}{T(v.invertCursor)}{T(v.buddy)}
        <header style={{ position: "sticky", top: "0", zIndex: "30", background: "rgba(236,232,223,.88)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #CFC9BC" }}>
          <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "12px clamp(16px,3vw,40px)", display: "flex", alignItems: "center", gap: "clamp(14px,2vw,28px)", flexWrap: "nowrap" }}>
            <a href="#top" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#121210" }}>
              <img src="/assets/ahmad-avatar.gif" alt="Ahmad Bukhari" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #121210", objectFit: "cover", background: "#121210" }} />
              <span style={{ fontWeight: "800", fontSize: "17px", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>
                Ahmad Bukhari
              </span>
            </a>
            <nav style={{ display: "flex", gap: "clamp(14px,1.6vw,22px)", flexWrap: "nowrap", whiteSpace: "nowrap", flex: "1 1 auto", minWidth: "0", overflowX: "auto", scrollbarWidth: "none", WebkitMaskImage: "linear-gradient(90deg,#000 86%,transparent)", maskImage: "linear-gradient(90deg,#000 86%,transparent)", paddingRight: "28px", fontSize: "15px", fontWeight: "500" }}>
              <a href="#clients" style={{ textDecoration: "none" }}>
                Work
              </a>
              <a href="#systems" style={{ textDecoration: "none" }}>
                Agents
              </a>
              <a href="#repos" style={{ textDecoration: "none" }}>
                Open source
              </a>
              <a href="#journey" style={{ textDecoration: "none" }}>
                Story
              </a>
              <a href="#aixcel" style={{ textDecoration: "none" }}>
                AiXCEL
              </a>
            </nav>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "18px", flexWrap: "nowrap", flex: "none" }}>
              {v.wideHdr ? (<>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54" }}>
                  {v.liveDot}
                  <span style={{ whiteSpace: "nowrap" }}>
                    {"Available worldwide · "}{T(v.clock)}{" PKT"}
                  </span>
                </div>
              </>) : null}
              <button onClick={v.toggleTheme} aria-label="Toggle dark mode" style={{ all: "unset", cursor: "pointer", width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #121210", display: "grid", placeItems: "center", fontSize: "16px", lineHeight: "1", flex: "none" }} className="ab-hover-0">
                {v.themeIcon}
              </button>
              <a href="https://cal.com/ahmad-bukhari/revenue-handoff-map" style={{ textDecoration: "none", background: "#121210", color: "#ECE8DF", padding: "10px 16px", borderRadius: "999px", fontSize: "14px", fontWeight: "600", whiteSpace: "nowrap" }} className="ab-hover-1">
                Book a 25 min call ↗
              </a>
            </div>
          </div>
          {v.hasGh ? (<>
            <div data-keep="" style={{ borderTop: "1px solid #CFC9BC", background: "#121210", color: "#ECE8DF" }}>
              <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "7px clamp(16px,3vw,40px)", display: "flex", gap: "14px", alignItems: "center", fontFamily: "'Space Mono',monospace", fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden" }}>
                <span style={{ color: "#6EDB9A", flex: "none" }}>
                  ● Live from GitHub
                </span>
                <a href={v.gh?.href} style={{ color: "#ECE8DF", textDecoration: "none", overflow: "hidden", textOverflow: "ellipsis", flex: "1 1 auto", minWidth: "200px" }}>
                  {v.gh?.text}
                </a>
                <span style={{ color: "#8C877C", flex: "none", marginLeft: "auto" }}>
                  {v.gh?.ago}
                </span>
                <span style={{ display: "flex", gap: "12px", alignItems: "center", flex: "0 1 auto", minWidth: "0", overflow: "hidden", paddingLeft: "14px", borderLeft: "1px solid #3D3B36", color: "#A39E92" }}>
                  {"built with "}
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#ECE8DF" }}>
                    <img data-logo="1" src="https://cdn.simpleicons.org/claude" alt="" style={{ width: "13px", height: "13px" }} />
                    {v.wideHdr ? (<>
                      Claude Code
                    </>) : null}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#ECE8DF" }}>
                    <img data-logo="1" src="https://cdn.simpleicons.org/cursor/ECE8DF" alt="" style={{ width: "13px", height: "13px" }} />
                    {v.wideHdr ? (<>
                      Cursor
                    </>) : null}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#ECE8DF" }}>
                    <img data-logo="1" src="https://www.google.com/s2/favicons?domain=devin.ai&sz=64" alt="" style={{ width: "13px", height: "13px", borderRadius: "3px" }} />
                    {v.wideHdr ? (<>
                      Devin
                    </>) : null}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#ECE8DF" }}>
                    <img data-logo="1" src="https://www.google.com/s2/favicons?domain=factory.ai&sz=64" alt="" style={{ width: "13px", height: "13px", borderRadius: "3px" }} />
                    {v.wideHdr ? (<>
                      Factory Droids
                    </>) : null}
                  </span>
                </span>
              </div>
            </div>
          </>) : null}
        </header>
        <section id="top" data-screen-label="01 Hero" style={{ maxWidth: "1480px", margin: "0 auto", padding: "clamp(32px,5vw,72px) clamp(16px,3vw,40px) 36px", display: "flex", flexWrap: "wrap", gap: "clamp(32px,4vw,64px)", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 360px", maxWidth: "520px", display: "flex", flexDirection: "column", gap: "28px", paddingTop: "8px" }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54", display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span>
                Agentic AI & LLM Systems
              </span>
              <span style={{ color: "#FF4F12" }}>
                /
              </span>
              <span>
                Resilient automation
              </span>
              <span style={{ color: "#FF4F12" }}>
                /
              </span>
              <span>
                CRM operations
              </span>
            </div>
            {v.hA ? (<>
              <h1 style={{ margin: "0", fontSize: "clamp(48px,5.6vw,92px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".9", textWrap: "balance" }}>
                {"Work "}
                <span style={{ color: "#D62E1F", textDecoration: "line-through", textDecorationThickness: ".07em" }}>
                  breaks.
                </span>
                {" I design what happens "}
                <span style={{ background: "linear-gradient(transparent 64%,#FF4F12 64%,#FF4F12 90%,transparent 90%)" }}>
                  next.
                </span>
              </h1>
            </>) : null}
            {v.hB ? (<>
              <h1 style={{ margin: "0", fontSize: "clamp(44px,5vw,80px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".92", textWrap: "balance" }}>
                {"I turn messy operations into systems that think, act, "}
                <span style={{ background: "linear-gradient(transparent 64%,#FF4F12 64%,#FF4F12 90%,transparent 90%)" }}>
                  improve.
                </span>
              </h1>
            </>) : null}
            {v.hC ? (<>
              <h1 style={{ margin: "0", fontSize: "clamp(48px,5.6vw,92px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".9", textWrap: "balance" }}>
                {"Your AI can answer. "}
                <span style={{ background: "linear-gradient(transparent 64%,#FF4F12 64%,#FF4F12 90%,transparent 90%)" }}>
                  Can it operate?
                </span>
              </h1>
            </>) : null}
            <p style={{ margin: "0", fontSize: "clamp(17px,1.35vw,20px)", lineHeight: "1.5", color: "#3A3833", maxWidth: "460px", textWrap: "pretty" }}>
              Agentic AI, LLM systems and resilient automation, designed around how work actually breaks. This workflow is running now. Go ahead and break it.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="https://cal.com/ahmad-bukhari/revenue-handoff-map" style={{ textDecoration: "none", background: "#121210", color: "#ECE8DF", padding: "15px 22px", borderRadius: "12px", fontWeight: "600", fontSize: "16px", boxShadow: "4px 4px 0 #FF4F12" }} className="ab-hover-2">
                Book a 25 min systems call ↗
              </a>
              <a href="#systems" style={{ textDecoration: "none", border: "1.5px solid #121210", padding: "14px 20px", borderRadius: "12px", fontWeight: "600", fontSize: "16px" }} className="ab-hover-0">
                See the systems ↓
              </a>
            </div>
            <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54", paddingTop: "4px" }}>
              <a href="https://n8n.io/creators/ahmadbukhari/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#3A3833" }}>
                <img data-logo="1" src="https://cdn.simpleicons.org/n8n" alt="n8n" style={{ width: "16px", height: "16px" }} />
                Verified n8n creator ↗
              </a>
              <a href="https://github.com/syedahmad0786" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#3A3833" }}>
                <img data-logo="1" src="https://cdn.simpleicons.org/github" alt="GitHub" style={{ width: "16px", height: "16px" }} />
                syedahmad0786 ↗
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "18px", borderTop: "1px solid #CFC9BC" }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54" }}>
                Systems running at
              </span>
              <div style={{ display: "flex", gap: "22px", flexWrap: "wrap", alignItems: "center" }}>
                <img data-logo="1" src="https://aixcelsolutions.com/assets/clients/conversions-ai.png" alt="Conversions.ai" style={{ height: "22px", maxWidth: "130px", objectFit: "contain" }} />
                <img data-logo="1" src="https://aixcelsolutions.com/assets/clients/we-scale-creators.png" alt="We Scale Creators" style={{ height: "22px", maxWidth: "130px", objectFit: "contain" }} />
                <img data-logo="1" src="https://aixcelsolutions.com/assets/clients/modern-amenities.svg" alt="Modern Amenities" style={{ height: "24px", maxWidth: "130px", objectFit: "contain" }} />
                <img data-logo="1" src="https://aixcelsolutions.com/assets/clients/chirocandy.png" alt="ChiroCandy" style={{ height: "22px", maxWidth: "130px", objectFit: "contain" }} />
                <a href="#clients" style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: "700" }}>
                  +6 more ↓
                </a>
              </div>
            </div>
          </div>
          <div data-buddy="Watching this run for exceptions" style={{ flex: "999 1 640px", minWidth: "0", border: "1.5px solid #121210", borderRadius: "18px", overflow: "hidden", background: "#F7F4EE", boxShadow: "10px 10px 0 #121210" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", padding: "12px 14px", borderBottom: "1.5px solid #121210", background: "#FFFDF8" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#D62E1F" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E0A21B" }} />
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#13804A" }} />
              </div>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: "700" }}>
                resilient-intake.workflow
              </span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#5E5B54", background: "#ECE8DF", borderRadius: "6px", padding: "3px 8px", whiteSpace: "nowrap" }}>
                {"run #"}{T(v.run)}{" · "}{T(v.stackLabel)}
              </span>
              <div style={{ marginLeft: "auto", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(v.scenarios || []).map((sc, $i8) => (<React.Fragment key={$i8}>
                  <button onClick={sc?.go} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", padding: "7px 10px", borderRadius: "8px", border: "1.5px solid #121210", cursor: "pointer", background: sc?.bg, color: sc?.fg }}>
                    {sc?.label}
                  </button>
                </React.Fragment>))}
                <button onClick={v.breakIt} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: "700", padding: "7px 12px", borderRadius: "8px", border: "1.5px solid #D62E1F", cursor: "pointer", background: "#D62E1F", color: "#FFFDF8" }} className="ab-hover-3">
                  Break it ✕
                </button>
                <button onClick={v.addNode} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: "700", padding: "7px 10px", borderRadius: "8px", border: "1.5px solid #121210", cursor: "pointer", background: "#FFFDF8", color: "#121210", whiteSpace: "nowrap" }} className="ab-hover-0">
                  + Node
                </button>
                <button onClick={v.shuffleLayout} style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: "700", padding: "7px 10px", borderRadius: "8px", border: "1.5px solid #121210", cursor: "pointer", background: "#FFFDF8", color: "#121210", whiteSpace: "nowrap" }} className="ab-hover-0">
                  Re-layout ⟲
                </button>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <div data-stage="" onPointerDown={v.panDown} style={{ position: "relative", minWidth: "740px", aspectRatio: "1000/600", containerType: "inline-size", margin: "10px 14px", overflow: "hidden", touchAction: "none", cursor: v.panCursor, backgroundImage: "radial-gradient(#C4BDAE 1px,transparent 1.3px)", backgroundSize: "22px 22px", backgroundPosition: v.gridPos }}>
                <div style={{ position: "absolute", inset: "0", transform: v.camTf, transformOrigin: "50% 50%", transition: v.camTr }}>
                  {v.wiresSvg}
                  {(v.nodes || []).map((n, $i9) => (<React.Fragment key={$i9}>
                    <div onPointerDown={n?.drag} style={{ cursor: "grab", touchAction: "none", position: "absolute", left: n?.left, top: n?.top, width: "20.5%", height: "16.67%", background: "#FFFDF8", border: `1.5px solid ${n?.border ?? ''}`, borderRadius: "10px", boxShadow: n?.shadow, opacity: n?.op, padding: "1.1cqw 1.2cqw", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "border-color .25s,box-shadow .25s,opacity .3s,transform .25s", transform: n?.tf }}>
                      <div style={{ display: "flex", alignItems: "center", gap: ".9cqw", minWidth: "0" }}>
                        <div style={{ width: "3.6cqw", height: "3.6cqw", borderRadius: "7px", background: "#FFFFFF", border: "1px solid #DDD7CA", display: "grid", placeItems: "center", flex: "none" }}>
                          {v.ready ? (<>
                            <img src={n?.src} data-fb={n?.fb} alt={n?.tool} style={{ width: "62%", height: "62%", objectFit: "contain" }} />
                          </>) : null}
                        </div>
                        <div style={{ minWidth: "0" }}>
                          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "max(8px,.95cqw)", letterSpacing: ".04em", textTransform: "uppercase", color: "#5E5B54", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {T(n?.label)}{" · "}{T(n?.tool)}
                          </div>
                          <div style={{ fontSize: "max(10px,1.5cqw)", fontWeight: "700", lineHeight: "1.12", letterSpacing: "-.01em" }}>
                            {n?.title}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: ".6cqw", fontFamily: "'Space Mono',monospace", fontSize: "max(8px,1cqw)", color: n?.color }}>
                        <span style={{ width: ".8cqw", height: ".8cqw", borderRadius: "50%", background: n?.color }} />
                        {n?.statusText}
                      </div>
                    </div>
                  </React.Fragment>))}
                  {" "}
                  <div data-keep="" onPointerDown={v.humanDrag} style={{ cursor: "grab", touchAction: "none", position: "absolute", left: v.human?.left, top: v.human?.top, width: "24%", height: "34%", background: "#121210", color: "#ECE8DF", border: `1.5px solid ${v.human?.border ?? ''}`, borderRadius: "12px", boxShadow: v.human?.shadow, opacity: v.human?.op, padding: "1.1cqw", display: "flex", gap: "1.1cqw", alignItems: "stretch", transition: "all .3s", transform: v.human?.tf }}>
                    {v.humanBots}
                    <div style={{ width: "36%", flex: "none", borderRadius: "8px", overflow: "hidden", position: "relative" }}>
                      <ImageSlot src="/assets/ahmad-avatar.gif" alt="Ahmad Bukhari" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: "0" }}>
                      <div>
                        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "max(8px,.95cqw)", letterSpacing: ".04em", textTransform: "uppercase", color: "#FF7A45" }}>
                          Human in the loop
                        </div>
                        <div style={{ fontSize: "max(11px,1.45cqw)", fontWeight: "800", lineHeight: "1.08", letterSpacing: "-.02em", marginTop: ".4cqw" }}>
                          Ahmad reviews with context
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: ".6cqw", fontFamily: "'Space Mono',monospace", fontSize: "max(8px,1cqw)", color: v.human?.color }}>
                        <span style={{ width: ".8cqw", height: ".8cqw", borderRadius: "50%", background: v.human?.color }} />
                        {v.human?.statusText}
                      </div>
                    </div>
                  </div>
                </div>
                <div data-nopan="" style={{ position: "absolute", right: "10px", top: "10px", display: "flex", gap: "4px", zIndex: "3" }}>
                  <button onClick={v.zoomOut} style={{ all: "unset", cursor: "pointer", width: "28px", height: "28px", display: "grid", placeItems: "center", border: "1.5px solid #121210", borderRadius: "7px", background: "#FFFDF8", fontFamily: "'Space Mono',monospace", fontSize: "14px" }}>
                    −
                  </button>
                  <button onClick={v.zoomReset} style={{ all: "unset", cursor: "pointer", height: "28px", padding: "0 9px", display: "grid", placeItems: "center", border: "1.5px solid #121210", borderRadius: "7px", background: "#FFFDF8", fontFamily: "'Space Mono',monospace", fontSize: "11px" }}>
                    {v.zoomPct}
                  </button>
                  <button onClick={v.zoomIn} style={{ all: "unset", cursor: "pointer", width: "28px", height: "28px", display: "grid", placeItems: "center", border: "1.5px solid #121210", borderRadius: "7px", background: "#FFFDF8", fontFamily: "'Space Mono',monospace", fontSize: "14px" }}>
                    +
                  </button>
                </div>
                <div style={{ position: "absolute", left: "12px", top: "12px", fontFamily: "'Space Mono',monospace", fontSize: "10.5px", color: "#8C877C", zIndex: "3", pointerEvents: "none" }}>
                  drag nodes · drag canvas to pan · click to inspect
                </div>
                {" "}
                {v.hasInspect ? (<>
                  <div data-nopan="" style={{ position: "absolute", right: "10px", bottom: "10px", width: "min(310px,46%)", background: "#121210", color: "#ECE8DF", borderRadius: "12px", padding: "14px", zIndex: "4", boxShadow: "6px 6px 0 #FF4F12", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "10.5px", color: "#FF7A45", textTransform: "uppercase", letterSpacing: ".04em" }}>
                        {T(v.insp?.label)}{" · "}{T(v.insp?.status)}
                      </span>
                      <button onClick={v.closeInspect} style={{ all: "unset", cursor: "pointer", fontFamily: "'Space Mono',monospace", fontSize: "15px", color: "#A39E92", padding: "0 4px" }}>
                        ×
                      </button>
                    </div>
                    <span style={{ fontSize: "16px", fontWeight: "800", lineHeight: "1.2" }}>
                      {v.insp?.title}
                    </span>
                    <span style={{ fontSize: "13px", lineHeight: "1.45", color: "#C9C4B8" }}>
                      {v.insp?.desc}
                    </span>
                    <pre style={{ margin: "0", background: "#0A0A09", border: "1px solid #2C2B27", borderRadius: "8px", padding: "8px 10px", fontFamily: "'Space Mono',monospace", fontSize: "11px", lineHeight: "1.5", color: "#6EDB9A", whiteSpace: "pre-wrap" }}>
                      {v.insp?.json}
                    </pre>
                    {v.insp?.canSwap ? (<>
                      <button onClick={v.swapTool} style={{ all: "unset", cursor: "pointer", alignSelf: "flex-start", fontFamily: "'Space Mono',monospace", fontSize: "11.5px", fontWeight: "700", background: "#FF4F12", color: "#121210", padding: "7px 11px", borderRadius: "8px" }}>
                        {"Swap tool ↻ "}{T(v.insp?.next)}
                      </button>
                    </>) : null}
                  </div>
                </>) : null}
              </div>
            </div>
            <div data-keep="" style={{ background: "#121210", color: "#ECE8DF", padding: "14px 18px 16px", fontFamily: "'Space Mono',monospace", fontSize: "12.5px", lineHeight: "1.7", minHeight: "150px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#8C877C", fontSize: "11px", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "6px" }}>
                <span>
                  Execution log
                </span>
                <span>
                  {"live · run "}{T(v.run)}
                </span>
              </div>
              {" "}
              {(v.log || []).map((l, $i7) => (<React.Fragment key={$i7}>
                <div style={{ display: "flex", gap: "14px" }}>
                  <span style={{ color: "#8C877C", flex: "none" }}>
                    {l?.t}
                  </span>
                  <span style={{ color: l?.color }}>
                    {l?.msg}
                  </span>
                </div>
              </React.Fragment>))}
            </div>
          </div>
        </section>
        <section data-screen-label="02 Principles" style={{ maxWidth: "1480px", margin: "0 auto", padding: "8px clamp(16px,3vw,40px) 56px" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54", marginBottom: "16px" }}>
            What you just watched · hover to find it in the run
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", borderTop: "1.5px solid #121210" }}>
            {(v.principles || []).map((p, $i6) => (<React.Fragment key={$i6}>
              <div onMouseEnter={p?.on} onMouseLeave={v.clearHl} style={{ padding: "22px 22px 8px 0", display: "flex", flexDirection: "column", gap: "8px", cursor: "default" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#C2410C" }}>
                    {p?.num}
                  </span>
                  <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-.02em" }}>
                    {p?.title}
                  </span>
                </div>
                <p style={{ margin: "0", color: "#3A3833", fontSize: "15.5px", lineHeight: "1.5", maxWidth: "300px", textWrap: "pretty" }}>
                  {p?.body}
                </p>
              </div>
            </React.Fragment>))}
          </div>
        </section>
        <section data-screen-label="03 Stack" style={{ padding: "28px 0 36px", borderTop: "1px solid #CFC9BC", borderBottom: "1px solid #CFC9BC", backgroundColor: "#E4DFD4", backgroundImage: "url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%27.85%27%20numOctaves=%272%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20values=%270%200%200%200%200.07%200%200%200%200%200.07%200%200%200%200%200.06%200%200%200%200.11%200%27/%3E%3C/filter%3E%3Crect%20width=%27180%27%20height=%27180%27%20filter=%27url%28%23n%29%27/%3E%3C/svg%3E),radial-gradient(rgba(18,18,16,.09) 1px,transparent 1.4px)", backgroundSize: "180px 180px,22px 22px" }} onMouseEnter={v.pauseMarq} onMouseLeave={v.playMarq}>
          <div style={{ maxWidth: "1480px", margin: "0 auto 18px", padding: "0 clamp(16px,3vw,40px)", display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", alignItems: "baseline" }}>
            <span style={{ fontSize: "clamp(20px,2vw,26px)", fontWeight: "800", letterSpacing: "-.02em" }}>
              The tools I wire together. Stack-agnostic, failure-aware.
            </span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54" }}>
              The hero swaps its stack every run
            </span>
          </div>
          {v.marquee}
        </section>
        <section id="clients" data-buddy="Reconciling 450 locations" data-screen-label="04 Clients" style={{ maxWidth: "1480px", margin: "0 auto", padding: "clamp(64px,8vw,120px) clamp(16px,3vw,40px) 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px 64px", alignItems: "flex-end", marginBottom: "44px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "880px" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54" }}>
                Client work · delivered through AiXCEL Solutions
              </div>
              <h2 style={{ margin: "0", fontSize: "clamp(40px,5vw,80px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".92", textWrap: "balance" }}>
                {"Built in their accounts. "}
                <span style={{ color: "#C2410C" }}>
                  Still running today.
                </span>
              </h2>
            </div>
            <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.55", color: "#3A3833", textWrap: "pretty" }}>
              Agencies, clinics, communities and investors handed over their lead flow, onboarding and reporting, and kept the systems we built. Counts describe the size of the work, not business results.
            </p>
          </div>
          <div ref={v.casesRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "20px" }}>
            {(v.cases || []).map((c, $i6) => (<React.Fragment key={$i6}>
              <article style={{ background: "#FFFDF8", border: "1.5px solid #121210", borderRadius: "16px", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform .25s,box-shadow .25s" }} className="ab-hover-4">
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #CFC9BC", fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: ".05em", textTransform: "uppercase", color: "#5E5B54" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#13804A" }} />
                    {c?.status}
                  </span>
                  <span>
                    {c?.sector}
                  </span>
                </div>
                <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", gap: "16px", flex: "1" }}>
                  <a href={c?.href} style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                    <span style={{ height: "48px", minWidth: "48px", maxWidth: "150px", padding: "0 10px", borderRadius: "12px", border: "1px solid #DDD7CA", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flex: "none" }}>
                      {v.ready ? (<>
                        <img src={c?.logo} data-logo="1" alt={c?.name} style={{ height: c?.logoH, width: "auto", maxWidth: "130px", objectFit: "contain" }} />
                      </>) : null}
                    </span>
                    <span style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-.03em" }}>
                      {T(c?.name)}{" ↗"}
                    </span>
                  </a>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: ".06em", textTransform: "uppercase", color: "#D62E1F" }}>
                      Problem
                    </span>
                    <p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.5", color: "#3A3833" }}>
                      {c?.problem}
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: ".06em", textTransform: "uppercase", color: "#13804A" }}>
                      What we built
                    </span>
                    <p style={{ margin: "0", fontSize: "15.5px", lineHeight: "1.5", color: "#121210", fontWeight: "500" }}>
                      {c?.built}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {(c?.tools || []).map((lg, $i10) => (<React.Fragment key={$i10}>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #CFC9BC", background: "#FFFFFF", borderRadius: "7px", padding: "4px 9px", fontSize: "12.5px", fontWeight: "600" }}>
                        {v.ready ? (<>
                          <img src={lg?.src} data-fb={lg?.fb} alt={lg?.name} style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                        </>) : null}
                        {lg?.name}
                      </span>
                    </React.Fragment>))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "12px", marginTop: "auto", paddingTop: "16px", borderTop: "1px solid #CFC9BC" }}>
                    {(c?.stats || []).map((s, $i10) => (<React.Fragment key={$i10}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontSize: "clamp(28px,2.8vw,40px)", fontWeight: "900", letterSpacing: "-.05em", lineHeight: "1", fontVariantNumeric: "tabular-nums" }}>
                          {s?.v}
                        </span>
                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#5E5B54", lineHeight: "1.4" }}>
                          {s?.label}
                        </span>
                      </div>
                    </React.Fragment>))}
                  </div>
                  {c?.hasNet ? (<>
                    <button onClick={c?.toggle} style={{ all: "unset", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", padding: "11px 14px", border: "1.5px solid #121210", borderRadius: "10px", fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: "700", background: c?.btnBg, color: c?.btnFg }}>
                      <span>
                        {c?.netLabel}
                      </span>
                      <span>
                        {c?.arrow}
                      </span>
                    </button>
                    {c?.open ? (<>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {(c?.net || []).map((nc, $i12) => (<React.Fragment key={$i12}>
                          <a href={nc?.href} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "7px", textDecoration: "none", border: "1px solid #CFC9BC", background: "#FFFFFF", borderRadius: "8px", padding: "5px 10px", fontSize: "13px", fontWeight: "600", color: "#121210" }}>
                            {v.ready ? (<>
                              <img src={nc?.src} data-logo="1" alt="" style={{ width: "16px", height: "16px", objectFit: "contain", borderRadius: "3px" }} />
                            </>) : null}
                            {nc?.name}
                          </a>
                        </React.Fragment>))}
                      </div>
                    </>) : null}
                  </>) : null}
                </div>
              </article>
            </React.Fragment>))}
          </div>
          <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,230px),1fr))", borderTop: "1.5px solid #121210", borderLeft: "1px solid #CFC9BC" }}>
            {(v.clients || []).map((cl, $i6) => (<React.Fragment key={$i6}>
              <a href={cl?.href} onMouseEnter={cl?.on} onMouseLeave={v.clearHc} onFocus={cl?.on} style={{ textDecoration: "none", color: "#121210", minHeight: "168px", padding: "18px", borderRight: "1px solid #CFC9BC", borderBottom: "1px solid #CFC9BC", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px", background: cl?.bg, boxShadow: cl?.bar, transition: "background .25s,box-shadow .25s" }}>
                <span style={{ height: "44px", display: "flex", alignItems: "center" }}>
                  {v.ready ? (<>
                    <img src={cl?.logo} data-logo="1" alt={cl?.name} style={{ maxHeight: "38px", maxWidth: "150px", objectFit: "contain" }} />
                  </>) : null}
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontWeight: "800", fontSize: "16px", letterSpacing: "-.01em" }}>
                    {cl?.name}
                  </span>
                  <span style={{ fontSize: "13.5px", lineHeight: "1.45", color: cl?.lineColor }}>
                    {cl?.line}
                  </span>
                </span>
              </a>
            </React.Fragment>))}
          </div>
          <div style={{ marginTop: "64px", display: "flex", flexDirection: "column", gap: "22px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "16px", alignItems: "flex-end" }}>
              <h3 style={{ margin: "0", fontSize: "clamp(28px,3.2vw,48px)", fontWeight: "800", letterSpacing: "-.04em", lineHeight: "1" }}>
                {"Systems that reached "}
                <span style={{ color: "#C2410C" }}>
                  their clients, too.
                </span>
              </h3>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54" }}>
                Delivered under partner agencies · hover an orbit to pause
              </span>
            </div>
            {v.orbits}
          </div>
        </section>
        <section id="journey" data-buddy="Reading the commit history" data-screen-label="05 Journey" style={{ maxWidth: "1480px", margin: "0 auto", padding: "clamp(64px,8vw,120px) clamp(16px,3vw,40px)" }}>
          <div data-reveal="" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(28px,5vw,80px)", alignItems: "flex-end", marginBottom: "56px" }}>
            <div style={{ flex: "0 1 380px", aspectRatio: "4/5", border: "1.5px solid #121210", borderRadius: "16px", overflow: "hidden", boxShadow: "10px 10px 0 #FF4F12", position: "relative" }}>
              <ImageSlot src="https://ahmadbukhari.com/images/ahmad-cafe.jpg" alt="Portrait of Ahmad Bukhari" />
            </div>
            <div style={{ flex: "1 1 420px", display: "flex", flexDirection: "column", gap: "24px", maxWidth: "760px" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54" }}>
                git log --graph · 7+ years operating
              </div>
              <h2 style={{ margin: "0", fontSize: "clamp(40px,5vw,80px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".92", textWrap: "balance" }}>
                {"Operator first. "}
                <span style={{ color: "#C2410C" }}>
                  Systems specialist by evolution.
                </span>
              </h2>
              <p style={{ margin: "0", fontSize: "clamp(17px,1.4vw,21px)", lineHeight: "1.5", color: "#3A3833", textWrap: "pretty" }}>
                I spent years inside sales rooms, client conversations, training programs, and operational handoffs before designing the systems beneath them.
              </p>
              <blockquote style={{ margin: "0", padding: "20px 0 0", borderTop: "1.5px solid #121210", fontSize: "clamp(20px,1.8vw,26px)", lineHeight: "1.35", fontWeight: "600", letterSpacing: "-.01em", textWrap: "pretty" }}>
                “That history shapes the work: I care whether the exception reaches the right person, whether the interface is clear at 2 a.m., and whether the team can operate the system after the builder leaves.”
              </blockquote>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div data-reveal="" style={{ display: "grid", gridTemplateColumns: "72px minmax(0,1fr)", gap: "0 16px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "19px", top: "46px", bottom: "0", width: "2px", background: "#121210" }} />
                <div style={{ position: "absolute", left: "51px", top: "46px", bottom: "0", width: "2px", background: "#FF4F12" }} />
                <div style={{ position: "absolute", left: "12px", top: "38px", width: "16px", height: "16px", borderRadius: "50%", background: "#FF4F12", border: "2px solid #121210" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 48px", padding: "32px 0", borderTop: "1px solid #CFC9BC" }}>
                <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", fontFamily: "'Space Mono',monospace", fontSize: "12px", alignItems: "center" }}>
                    <span style={{ color: "#C2410C" }}>
                      e7c41a0
                    </span>
                    <span style={{ background: "#121210", color: "#ECE8DF", padding: "2px 8px", borderRadius: "5px" }}>
                      HEAD → main
                    </span>
                    <span style={{ border: "1px solid #121210", padding: "1px 8px", borderRadius: "5px" }}>
                      Founder · AiXCEL Solutions
                    </span>
                    <span style={{ color: "#5E5B54" }}>
                      Now
                    </span>
                  </div>
                  <h3 style={{ margin: "0", fontSize: "clamp(26px,2.6vw,40px)", fontWeight: "800", letterSpacing: "-.03em" }}>
                    AI systems & automation
                  </h3>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "#3A3833", maxWidth: "620px" }}>
                    Architecting resilient CRM, voice, agentic, migration, and delivery systems for service businesses and internal teams.
                  </p>
                </div>
                <div data-keep="" style={{ flex: "0 1 280px", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", position: "relative", border: "1px solid #CFC9BC" }}>
                  {v.nowViz}
                </div>
              </div>
            </div>
            <div data-reveal="" style={{ display: "grid", gridTemplateColumns: "72px minmax(0,1fr)", gap: "0 16px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "19px", top: "0", bottom: "0", width: "2px", background: "#121210" }} />
                <div style={{ position: "absolute", left: "51px", top: "0", bottom: "0", width: "2px", background: "#FF4F12" }} />
                <div style={{ position: "absolute", left: "12px", top: "38px", width: "16px", height: "16px", borderRadius: "50%", background: "#ECE8DF", border: "2px solid #121210" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 48px", padding: "32px 0", borderTop: "1px solid #CFC9BC" }}>
                <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", fontFamily: "'Space Mono',monospace", fontSize: "12px", alignItems: "center" }}>
                    <span style={{ color: "#C2410C" }}>
                      9b2d5f3
                    </span>
                    <span style={{ color: "#5E5B54" }}>
                      2021 to 2024
                    </span>
                  </div>
                  <h3 style={{ margin: "0", fontSize: "clamp(26px,2.6vw,40px)", fontWeight: "800", letterSpacing: "-.03em" }}>
                    Sales leadership & training
                  </h3>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "#3A3833", maxWidth: "620px" }}>
                    Led teams, designed operating rhythms, and trained more than one hundred candidates across real estate organizations.
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginTop: "6px" }}>
                    <span style={{ fontSize: "48px", fontWeight: "900", letterSpacing: "-.05em", lineHeight: "1" }}>
                      107
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54", maxWidth: "300px" }}>
                      people trained across a 16-month leadership role · self-reported
                    </span>
                  </div>
                </div>
                <div data-keep="" style={{ flex: "0 1 280px", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", position: "relative", border: "1px solid #CFC9BC" }}>
                  {v.salesViz}
                </div>
              </div>
            </div>
            <div data-reveal="" style={{ display: "grid", gridTemplateColumns: "72px minmax(0,1fr)", gap: "0 16px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "19px", top: "0", bottom: "0", width: "2px", background: "#121210" }} />
                <div style={{ position: "absolute", left: "51px", top: "0", height: "46px", width: "2px", background: "#FF4F12" }} />
                {" "}
                <svg width="34" height="60" viewBox="0 0 34 60" style={{ position: "absolute", left: "19px", top: "46px", overflow: "visible" }}>
                  <path d="M1 60 C1 28 33 34 33 0" fill="none" stroke="#FF4F12" strokeWidth="2" />
                </svg>
                {" "}
                <div style={{ position: "absolute", left: "44px", top: "38px", width: "16px", height: "16px", borderRadius: "50%", background: "#FF4F12", border: "2px solid #121210" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 48px", padding: "32px 0", borderTop: "1px solid #CFC9BC" }}>
                <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", fontFamily: "'Space Mono',monospace", fontSize: "12px", alignItems: "center" }}>
                    <span style={{ color: "#C2410C" }}>
                      4f8a91c
                    </span>
                    <span style={{ background: "#FF4F12", color: "#121210", padding: "2px 8px", borderRadius: "5px" }}>
                      branch: yardim
                    </span>
                    <span style={{ color: "#5E5B54" }}>
                      2020 to now
                    </span>
                  </div>
                  <h3 style={{ margin: "0", fontSize: "clamp(26px,2.6vw,40px)", fontWeight: "800", letterSpacing: "-.03em" }}>
                    Yardim Foundation
                  </h3>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "#3A3833", maxWidth: "620px" }}>
                    Directing food and ration support: a human system where reliability is measured in families reached, not dashboards shipped.
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginTop: "6px" }}>
                    <span style={{ fontSize: "48px", fontWeight: "900", letterSpacing: "-.05em", lineHeight: "1" }}>
                      748
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54", maxWidth: "300px" }}>
                      ration packs mobilized in the COVID-response food program · self-reported
                    </span>
                  </div>
                </div>
                <div data-keep="" style={{ flex: "0 1 280px", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", position: "relative", border: "1px solid #CFC9BC" }}>
                  {v.yardimViz}
                </div>
              </div>
            </div>
            <div data-reveal="" style={{ display: "grid", gridTemplateColumns: "72px minmax(0,1fr)", gap: "0 16px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "19px", top: "0", height: "46px", width: "2px", background: "#121210" }} />
                <div style={{ position: "absolute", left: "12px", top: "38px", width: "16px", height: "16px", borderRadius: "3px", background: "#121210" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px 48px", padding: "32px 0", borderTop: "1px solid #CFC9BC", borderBottom: "1px solid #CFC9BC" }}>
                <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", fontFamily: "'Space Mono',monospace", fontSize: "12px", alignItems: "center" }}>
                    <span style={{ color: "#C2410C" }}>
                      1a0c3e2
                    </span>
                    <span style={{ border: "1px solid #121210", padding: "1px 8px", borderRadius: "5px" }}>
                      init
                    </span>
                    <span style={{ color: "#5E5B54" }}>
                      2019 to 2021
                    </span>
                  </div>
                  <h3 style={{ margin: "0", fontSize: "clamp(26px,2.6vw,40px)", fontWeight: "800", letterSpacing: "-.03em" }}>
                    Investment advisory
                  </h3>
                  <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "#3A3833", maxWidth: "620px" }}>
                    Translated complex property decisions into clear client choices across residential and commercial transactions.
                  </p>
                </div>
                <div data-keep="" style={{ flex: "0 1 280px", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden", position: "relative", border: "1px solid #CFC9BC" }}>
                  {v.advisoryViz}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="aixcel" data-buddy="Approving a client-facing step" data-screen-label="06 AiXCEL" style={{ backgroundColor: "#E4DFD4", backgroundImage: "url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%27.85%27%20numOctaves=%272%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20values=%270%200%200%200%200.07%200%200%200%200%200.07%200%200%200%200%200.06%200%200%200%200.11%200%27/%3E%3C/filter%3E%3Crect%20width=%27180%27%20height=%27180%27%20filter=%27url%28%23n%29%27/%3E%3C/svg%3E),radial-gradient(rgba(18,18,16,.09) 1px,transparent 1.4px)", backgroundSize: "180px 180px,22px 22px", borderTop: "1.5px solid #121210" }}>
          <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "clamp(64px,8vw,120px) clamp(16px,3vw,40px)", display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px 64px", alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
                <a href="https://aixcelsolutions.com" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
                  <img src="https://aixcelsolutions.com/assets/aixcel-mark.svg" alt="AiXCEL Solutions" style={{ height: "34px", width: "auto" }} />
                  <span style={{ fontWeight: "800", fontSize: "20px", letterSpacing: "-.02em" }}>
                    AiXCEL Solutions ↗
                  </span>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", background: "#121210", color: "#ECE8DF", padding: "3px 8px", borderRadius: "5px" }}>
                    Founder
                  </span>
                </a>
                <h2 style={{ margin: "0", fontSize: "clamp(40px,5vw,80px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".92", textWrap: "balance" }}>
                  {"The company I built "}
                  <span style={{ color: "#C2410C" }}>
                    to hand systems over.
                  </span>
                </h2>
              </div>
              <p style={{ margin: "0", maxWidth: "460px", fontSize: "17px", lineHeight: "1.55", color: "#3A3833", textWrap: "pretty" }}>
                AiXCEL builds lead follow-up, client onboarding, reporting and monitoring inside each client’s own accounts, with a person approving every client-facing step. Founder-led, and built to be handed over with a runbook.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54" }}>
                Four services · one approval layer · one set of numbers
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "stretch" }}>
                <div style={{ flex: "1 1 230px", display: "flex", flexDirection: "column", gap: "10px", padding: "20px", background: "#FFFDF8", border: "1.5px solid #121210", borderRadius: "14px", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#5E5B54" }}>
                    <span style={{ color: "#C2410C" }}>
                      01
                    </span>
                    <span>
                      Subscription
                    </span>
                  </div>
                  <span style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#121210", display: "grid", placeItems: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF4F12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 4h20l-7.5 9v7l-5 2v-9z" />
                      <circle cx="20" cy="20" r="2.5" fill="#FF4F12" />
                    </svg>
                  </span>
                  <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em" }}>
                    Lead Operations
                  </div>
                  <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.5", color: "#3A3833" }}>
                    Every enquiry captured, scored, routed to an owner and followed up on a clock until a call is booked.
                  </p>
                </div>
                <div style={{ flex: "0 0 auto", alignSelf: "center", fontFamily: "'Space Mono',monospace", fontSize: "18px", color: "#FF4F12" }}>
                  →
                </div>
                <div style={{ flex: "1 1 230px", display: "flex", flexDirection: "column", gap: "10px", padding: "20px", background: "#FFFDF8", border: "1.5px solid #121210", borderRadius: "14px", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#5E5B54" }}>
                    <span style={{ color: "#C2410C" }}>
                      02
                    </span>
                    <span>
                      Sprint
                    </span>
                  </div>
                  <span style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#121210", display: "grid", placeItems: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF4F12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 6l2 2 4-4M4 14l2 2 4-4M4 22l2 2 4-4" />
                      <path d="M14 6h9M14 14h9M14 22h6" stroke="#ECE8DF" />
                    </svg>
                  </span>
                  <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em" }}>
                    Client Onboarding
                  </div>
                  <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.5", color: "#3A3833" }}>
                    From signed contract to live client without the chase. Anything that touches the client waits for approval.
                  </p>
                </div>
                <div style={{ flex: "0 0 auto", alignSelf: "center", fontFamily: "'Space Mono',monospace", fontSize: "18px", color: "#FF4F12" }}>
                  →
                </div>
                <div style={{ flex: "1 1 230px", display: "flex", flexDirection: "column", gap: "10px", padding: "20px", background: "#FFFDF8", border: "1.5px solid #121210", borderRadius: "14px", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#5E5B54" }}>
                    <span style={{ color: "#C2410C" }}>
                      03
                    </span>
                    <span>
                      Subscription or Sprint
                    </span>
                  </div>
                  <span style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#121210", display: "grid", placeItems: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF4F12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 22V14M10 22V8M16 22v-6M22 22V4" stroke="#ECE8DF" />
                      <path d="M3 12l6-5 6 6 8-8" />
                    </svg>
                  </span>
                  <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em" }}>
                    Dashboards & Daily Pulse
                  </div>
                  <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.5", color: "#3A3833" }}>
                    One agreed view of spend, leads and revenue, and a pulse in Slack each morning.
                  </p>
                </div>
                <div style={{ flex: "0 0 auto", alignSelf: "center", fontFamily: "'Space Mono',monospace", fontSize: "18px", color: "#FF4F12" }}>
                  →
                </div>
                <div style={{ flex: "1 1 230px", display: "flex", flexDirection: "column", gap: "10px", padding: "20px", background: "#FFFDF8", border: "1.5px solid #121210", borderRadius: "14px", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#5E5B54" }}>
                    <span style={{ color: "#C2410C" }}>
                      04
                    </span>
                    <span>
                      Subscription
                    </span>
                  </div>
                  <span style={{ width: "44px", height: "44px", borderRadius: "11px", background: "#121210", display: "grid", placeItems: "center" }}>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#FF4F12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="13" cy="13" r="10" stroke="#ECE8DF" />
                      <circle cx="13" cy="13" r="5" stroke="#ECE8DF" />
                      <path d="M13 13l7-7" />
                      <circle cx="18" cy="9" r="2" fill="#FF4F12" />
                    </svg>
                  </span>
                  <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-.02em" }}>
                    Monitoring & Alerts
                  </div>
                  <p style={{ margin: "0", fontSize: "14.5px", lineHeight: "1.5", color: "#3A3833" }}>
                    Every automation watched by deterministic checks. Failures arrive with the cause and a fix to approve.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,460px),1fr))", gap: "20px" }}>
              <article data-keep="" style={{ background: "#121210", color: "#ECE8DF", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column", border: "1.5px solid #121210" }}>
                <div style={{ position: "relative", aspectRatio: "16/10", background: "#0E0E0D", overflow: "hidden" }}>
                  <video src="/assets/openxcel-intro.mp4" poster="https://aixcelsolutions.com/assets/og/og-openxcel.jpg" autoPlay={true} muted={true} loop={true} playsInline={true} preload="auto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#FFFDF8", display: "grid", placeItems: "center", overflow: "hidden" }}>
                      <img src="https://aixcelsolutions.com/assets/mark.png" alt="OpenXCEL" style={{ width: "74%", height: "74%", objectFit: "contain" }} />
                    </span>
                    <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-.03em" }}>
                      OpenXCEL AI
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#A39E92" }}>
                      Product
                    </span>
                  </div>
                  <p style={{ margin: "0", fontSize: "16.5px", lineHeight: "1.5", color: "#C9C4B8" }}>
                    Business-owned AI with company memory, connected tools and role-based assistants. First deployed in my own agency, instead of renting a system I couldn’t inspect.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "14px", paddingTop: "16px", borderTop: "1px solid #2C2B27" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "clamp(30px,3vw,44px)", fontWeight: "900", letterSpacing: "-.05em", lineHeight: "1", color: "#FF5A1F" }}>
                        86%
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#A39E92", lineHeight: "1.4" }}>
                        lower monthly model bill
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "clamp(30px,3vw,44px)", fontWeight: "900", letterSpacing: "-.05em", lineHeight: "1" }}>
                        25K
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#A39E92", lineHeight: "1.4" }}>
                        requests run in September
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "clamp(30px,3vw,44px)", fontWeight: "900", letterSpacing: "-.05em", lineHeight: "1" }}>
                        13
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#A39E92", lineHeight: "1.4" }}>
                        client jobs a week in Slack, each approved by a person
                      </span>
                    </div>
                  </div>
                  <a href="https://aixcelsolutions.com/products/openxcel-ai" style={{ alignSelf: "flex-start", color: "#FF5A1F", fontWeight: "700", textDecoration: "none", borderBottom: "1.5px solid #FF5A1F" }} className="ab-hover-5">
                    Read the case study ↗
                  </a>
                </div>
              </article>
              <article style={{ background: "#FFFDF8", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column", border: "1.5px solid #121210" }}>
                <div style={{ position: "relative", aspectRatio: "16/10", background: "#121210", overflow: "hidden" }}>
                  <video src="https://aixcelsolutions.com/assets/motion/signal-motion.mp4" autoPlay={true} muted={true} loop={true} playsInline={true} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#121210", display: "grid", placeItems: "center", overflow: "hidden" }}>
                      <img src="https://aixcelsolutions.com/assets/signal-mark.svg" alt="SIGNAL" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
                    </span>
                    <span style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-.03em" }}>
                      SIGNAL
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#5E5B54" }}>
                      Product
                    </span>
                  </div>
                  <p style={{ margin: "0", fontSize: "16.5px", lineHeight: "1.5", color: "#3A3833" }}>
                    AI search visibility audits. SIGNAL records what AI answer engines say about a business, which sources they cite, and whether the visits they send become qualified enquiries.
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "16px", borderTop: "1px solid #CFC9BC" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FFFFFF", border: "1px solid #CFC9BC", borderRadius: "7px", padding: "4px 9px", fontSize: "12.5px", fontWeight: "600" }}>
                      <img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128" data-fb="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128" alt="ChatGPT" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                      ChatGPT
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FFFFFF", border: "1px solid #CFC9BC", borderRadius: "7px", padding: "4px 9px", fontSize: "12.5px", fontWeight: "600" }}>
                      <img data-logo="1" src="https://cdn.simpleicons.org/perplexity" data-fb="https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128" alt="Perplexity" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                      Perplexity
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FFFFFF", border: "1px solid #CFC9BC", borderRadius: "7px", padding: "4px 9px", fontSize: "12.5px", fontWeight: "600" }}>
                      <img data-logo="1" src="https://cdn.simpleicons.org/googlegemini" data-fb="https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128" alt="Gemini" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                      Gemini
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FFFFFF", border: "1px solid #CFC9BC", borderRadius: "7px", padding: "4px 9px", fontSize: "12.5px", fontWeight: "600" }}>
                      <img data-logo="1" src="https://cdn.simpleicons.org/google" data-fb="https://www.google.com/s2/favicons?domain=google.com&sz=128" alt="AI Overviews" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                      AI Overviews
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FFFFFF", border: "1px solid #CFC9BC", borderRadius: "7px", padding: "4px 9px", fontSize: "12.5px", fontWeight: "600" }}>
                      <img data-logo="1" src="https://cdn.simpleicons.org/claude" data-fb="https://www.google.com/s2/favicons?domain=claude.ai&sz=128" alt="Claude" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                      Claude
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", background: "#FFFFFF", border: "1px solid #CFC9BC", borderRadius: "7px", padding: "4px 9px", fontSize: "12.5px", fontWeight: "600" }}>
                      <img src="https://www.google.com/s2/favicons?domain=copilot.microsoft.com&sz=128" data-fb="https://www.google.com/s2/favicons?domain=copilot.microsoft.com&sz=128" alt="Copilot" style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                      Copilot
                    </span>
                  </div>
                  <a href="https://aixcelsolutions.com/products/signal" style={{ alignSelf: "flex-start", color: "#C2410C", fontWeight: "700", textDecoration: "none", borderBottom: "1.5px solid #C2410C" }}>
                    See the method ↗
                  </a>
                </div>
              </article>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 24px", alignItems: "center", fontFamily: "'Space Mono',monospace", fontSize: "12.5px", color: "#3A3833" }}>
              <span style={{ color: "#5E5B54", textTransform: "uppercase", letterSpacing: ".08em", fontSize: "11px" }}>
                Modules inside the services
              </span>
              <a href="https://aixcelsolutions.com/services/client-onboarding">
                Onboard ↗
              </a>
              <a href="https://aixcelsolutions.com/services/monitoring">
                ErrorLens ↗
              </a>
              <a href="https://aixcelsolutions.com/services/dashboards">
                Pulse ↗
              </a>
              <a href="https://router.aixcelsolutions.com">
                AI Model Router ↗
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "24px", borderTop: "1.5px solid #121210" }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase" }}>
                Ask an AI what it knows about AiXCEL
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(v.askAixcel || []).map((q, $i8) => (<React.Fragment key={$i8}>
                  <a href={q?.href} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", background: "#FFFDF8", border: "1.5px solid #121210", borderRadius: "10px", padding: "9px 13px", fontWeight: "700", fontSize: "14px", color: "#121210", transition: "transform .2s,box-shadow .2s" }} className="ab-hover-6">
                    {v.ready ? (<>
                      <img src={q?.src} data-fb={q?.fb} data-ask={q?.key} alt="" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                    </>) : null}
                    {T(q?.name)}{" ↗"}
                  </a>
                </React.Fragment>))}
              </div>
            </div>
          </div>
        </section>
        <section id="systems" data-keep="" data-screen-label="07 Agentic systems" style={{ backgroundColor: "#121210", backgroundImage: "url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%27.85%27%20numOctaves=%272%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20values=%270%200%200%200%200.93%200%200%200%200%200.91%200%200%200%200%200.87%200%200%200%200.07%200%27/%3E%3C/filter%3E%3Crect%20width=%27180%27%20height=%27180%27%20filter=%27url%28%23n%29%27/%3E%3C/svg%3E),radial-gradient(rgba(236,232,223,.07) 1px,transparent 1.4px)", backgroundSize: "180px 180px,24px 24px", color: "#ECE8DF", padding: "0 0 clamp(64px,8vw,120px)" }}>
          <div data-invert-big="" style={{ padding: "26px 0", borderBottom: "1px solid #2C2B27", overflow: "hidden" }}>
            {v.wordBand}
          </div>
          <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "clamp(56px,7vw,100px) clamp(16px,3vw,40px) 0" }}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px 64px", alignItems: "flex-end", marginBottom: "48px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "880px" }}>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#A39E92" }}>
                  Ten flagship agentic systems · verified public demos
                </div>
                <h2 style={{ margin: "0", fontSize: "clamp(40px,5vw,80px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".92", textWrap: "balance" }}>
                  {"Agents that stop "}
                  <span style={{ color: "#FF5A1F" }}>
                    where a person should decide.
                  </span>
                </h2>
              </div>
              <p style={{ margin: "0", maxWidth: "460px", fontSize: "17px", lineHeight: "1.55", color: "#C9C4B8", textWrap: "pretty" }}>
                A production-minded revenue and creator operations portfolio proving controlled multi-agent orchestration, evidence, typed APIs, human approval, evaluation, observability, replay, and cloud deployment.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "32px clamp(28px,3.5vw,56px)", alignItems: "flex-start" }}>
              <div onMouseEnter={v.pauseA} style={{ flex: "1 1 340px", maxWidth: "500px", display: "flex", flexDirection: "column", borderBottom: "1px solid #2C2B27" }}>
                {(v.agentic || []).map((a, $i8) => (<React.Fragment key={$i8}>
                  <button onClick={a?.select} onMouseEnter={a?.select} onFocus={a?.select} style={{ all: "unset", cursor: "pointer", display: "grid", gridTemplateColumns: "26px 34px minmax(0,1fr) auto", gap: "12px", alignItems: "center", padding: `12px 4px 12px ${a?.pad ?? ''}`, borderTop: "1px solid #2C2B27", color: a?.color, boxShadow: a?.bar, transition: "padding .25s,color .2s" }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: a?.numColor }}>
                      {a?.num}
                    </span>
                    <span style={{ width: "34px", height: "34px", display: "block", opacity: a?.markOp, transition: "opacity .2s" }}>
                      {a?.mark}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: "0" }}>
                      <span style={{ fontSize: "clamp(17px,1.5vw,21px)", fontWeight: "800", letterSpacing: "-.02em", lineHeight: "1.15" }}>
                        {a?.name}
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#A39E92" }}>
                        {a?.kind}
                      </span>
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "10.5px", border: "1px solid #3D3B36", borderRadius: "999px", padding: "3px 9px", color: a?.srcColor, whiteSpace: "nowrap" }}>
                      {a?.src}
                    </span>
                  </button>
                </React.Fragment>))}
              </div>
              <div data-buddy="Running the golden scenarios" style={{ flex: "1.4 1 520px", minWidth: "0", position: "sticky", top: "96px", display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ border: "1.5px solid #3D3B36", borderRadius: "14px", overflow: "hidden", background: "#1C1B18" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 12px", borderBottom: "1px solid #2C2B27", background: "#181715", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", gap: "6px" }}>
                      <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#D62E1F" }} />
                      <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#E0A21B" }} />
                      <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#13804A" }} />
                    </span>
                    <span style={{ flex: "1", minWidth: "160px", fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#C9C4B8", background: "#121210", borderRadius: "6px", padding: "5px 10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {v.curA?.host}
                    </span>
                    <span style={{ display: "flex", gap: "6px" }}>
                      <button onClick={v.showSnap} style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", padding: "6px 11px", borderRadius: "7px", border: "1px solid #3D3B36", cursor: "pointer", whiteSpace: "nowrap", background: v.snapBg, color: v.snapFg }}>
                        Snapshot
                      </button>
                      <button onClick={v.showLive} style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", padding: "6px 11px", borderRadius: "7px", border: "1px solid #3D3B36", cursor: "pointer", whiteSpace: "nowrap", background: v.liveBg, color: v.liveFg }}>
                        ● Run live
                      </button>
                    </span>
                  </div>
                  <div style={{ position: "relative", aspectRatio: "16/10", background: "#121210", overflow: "hidden" }}>
                    {v.liveOff ? (<>
                      {v.ready ? (<>
                        <img src={v.curA?.img} alt="" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover", filter: "blur(28px) saturate(1.2)", opacity: ".45", transform: "scale(1.15)" }} />
                      </>) : null}
                      {v.ready ? (<>
                        <img src={v.curA?.img} alt={v.curA?.name} style={{ position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "contain", padding: "14px 0" }} />
                      </>) : null}
                    </>) : null}
                    {" "}
                    {v.liveOn ? (<>
                      <iframe src={v.curA?.live} title={v.curA?.name} loading="lazy" style={{ position: "absolute", inset: "0", width: "100%", height: "100%", border: "0", background: "#FFFFFF" }} />
                    </>) : null}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{ width: "52px", height: "52px", display: "block", flex: "none" }}>
                    {v.curA?.mark}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontSize: "clamp(24px,2.4vw,34px)", fontWeight: "800", letterSpacing: "-.03em", lineHeight: "1.05" }}>
                      {v.curA?.name}
                    </span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#A39E92" }}>
                      {v.curA?.kind}
                    </span>
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "14px" }}>
                  {(v.curA?.big || []).map((b, $i9) => (<React.Fragment key={$i9}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", borderTop: "1.5px solid #FF5A1F", paddingTop: "12px" }}>
                      <span style={{ fontSize: "clamp(28px,2.8vw,40px)", fontWeight: "900", letterSpacing: "-.05em", lineHeight: "1" }}>
                        {b?.v}
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#A39E92", lineHeight: "1.4" }}>
                        {b?.l}
                      </span>
                    </div>
                  </React.Fragment>))}
                </div>
                <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.5", color: "#ECE8DF", textWrap: "pretty" }}>
                  {v.curA?.desc}
                </p>
                <div style={{ background: "#0A0A09", border: "1px solid #2C2B27", borderRadius: "12px", padding: "14px 16px", fontFamily: "'Space Mono',monospace", fontSize: "12.5px", lineHeight: "1.75" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", color: "#8C877C", fontSize: "11px", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: "6px" }}>
                    <span>
                      {"Proof · "}{T(v.ckState)}
                    </span>
                    <span>
                      {v.curA?.verified}
                    </span>
                  </div>
                  {" "}
                  {(v.checks || []).map((ck, $i9) => (<React.Fragment key={$i9}>
                    <div style={{ display: "flex", gap: "10px", opacity: ck?.op, transition: "opacity .25s" }}>
                      <span style={{ color: "#6EDB9A", flex: "none" }}>
                        {ck?.mark}
                      </span>
                      <span style={{ color: "#ECE8DF" }}>
                        {ck?.t}
                      </span>
                    </div>
                  </React.Fragment>))}
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                  <a href={v.curA?.live} style={{ textDecoration: "none", background: "#FF5A1F", color: "#121210", padding: "12px 18px", borderRadius: "10px", fontWeight: "700" }} className="ab-hover-7">
                    Open live system ↗
                  </a>
                  {v.curA?.hasGh ? (<>
                    <a href={v.curA?.gh} style={{ color: "#ECE8DF", fontWeight: "600", textDecoration: "none", borderBottom: "1.5px solid #ECE8DF" }}>
                      Inspect GitHub ↗
                    </a>
                  </>) : null}
                  {v.curA?.hasBrief ? (<>
                    <a href={v.curA?.brief} style={{ color: "#ECE8DF", fontWeight: "600", textDecoration: "none", borderBottom: "1.5px solid #ECE8DF" }}>
                      Read technical brief ↗
                    </a>
                  </>) : null}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "64px", paddingTop: "28px", borderTop: "1px solid #2C2B27", display: "flex", flexDirection: "column", gap: "16px" }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#A39E92" }}>
                Stack demonstrated in the deployed systems
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(v.agStack || []).map((lg, $i8) => (<React.Fragment key={$i8}>
                  <span style={{ display: "flex", alignItems: "center", gap: "7px", background: "#FFFDF8", color: "#121210", borderRadius: "8px", padding: "6px 10px", fontSize: "13px", fontWeight: "600" }}>
                    {v.ready ? (<>
                      <img src={lg?.src} data-fb={lg?.fb} alt="" style={{ width: "15px", height: "15px", objectFit: "contain" }} />
                    </>) : null}
                    {lg?.name}
                  </span>
                </React.Fragment>))}
              </div>
              <p style={{ margin: "6px 0 0", maxWidth: "900px", fontSize: "14.5px", lineHeight: "1.55", color: "#A39E92" }}>
                <span style={{ color: "#ECE8DF", fontWeight: "700" }}>
                  What the public proof does not claim.
                </span>
                {" These verified portfolio deployments use synthetic or licensed public records. They do not use client credentials, private records, patient health information, live publishing, ad spend, messaging, or CRM write tools."}
              </p>
            </div>
          </div>
        </section>
        <section id="repos" data-buddy="Reading the source" data-screen-label="08 Open source" style={{ maxWidth: "1480px", margin: "0 auto", padding: "clamp(64px,8vw,120px) clamp(16px,3vw,40px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "24px 64px", alignItems: "flex-end", marginBottom: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "860px" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54" }}>
                Open source · 6 public repos
              </div>
              <h2 style={{ margin: "0", fontSize: "clamp(36px,4.2vw,64px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".95", textWrap: "balance" }}>
                {"Repos you can inspect. "}
                <span style={{ color: "#C2410C" }}>
                  Not claims you have to trust.
                </span>
              </h2>
            </div>
            <p style={{ margin: "0", maxWidth: "440px", fontSize: "17px", lineHeight: "1.55", color: "#3A3833", textWrap: "pretty" }}>
              Small, focused systems that expose the architecture, the safety rails, and the real run path.
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px", alignItems: "center" }}>
            <a href="https://github.com/syedahmad0786" style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", fontFamily: "'Space Mono',monospace", fontSize: "13px", fontWeight: "700" }}>
              <img data-logo="1" src="https://cdn.simpleicons.org/github" alt="" style={{ width: "16px", height: "16px" }} />
              github.com/syedahmad0786 ↗
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,330px),1fr))", gap: "14px" }}>
            {(v.labItems || []).map((r, $i6) => (<React.Fragment key={$i6}>
              <a href={r?.href} style={{ textDecoration: "none", color: "#121210", background: "#F7F4EE", border: "1.5px solid #121210", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "12px", transition: "transform .2s,box-shadow .2s,background .2s" }} className="ab-hover-8">
                <span data-keep="" style={{ display: "block", position: "relative", margin: "-6px -6px 4px", borderRadius: "10px", overflow: "hidden", background: "#121210", aspectRatio: "300/120" }}>
                  {r?.viz}
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", gap: "10px", fontFamily: "'Space Mono',monospace", fontSize: "11px", letterSpacing: ".05em" }}>
                  <span style={{ color: "#C2410C" }}>
                    {r?.kind}
                  </span>
                  <span style={{ color: r?.badgeColor }}>
                    {r?.badge}
                  </span>
                </span>
                <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-.02em", lineHeight: "1.1" }}>
                  {r?.name}
                </span>
                <span style={{ fontSize: "15px", lineHeight: "1.5", color: "#3A3833", flex: "1" }}>
                  {r?.desc}
                </span>
                <span style={{ display: "flex", gap: "6px", flexWrap: "wrap", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #CFC9BC" }}>
                  {(r?.logos || []).map((lg, $i9) => (<React.Fragment key={$i9}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #CFC9BC", background: "#FFFFFF", borderRadius: "7px", padding: "4px 8px", fontSize: "12px", fontWeight: "600" }}>
                      {v.ready ? (<>
                        <img src={lg?.src} data-fb={lg?.fb} alt={lg?.name} style={{ width: "14px", height: "14px", objectFit: "contain" }} />
                      </>) : null}
                      {lg?.name}
                    </span>
                  </React.Fragment>))}
                  <span style={{ marginLeft: "auto", fontFamily: "'Space Mono',monospace", fontSize: "12px", fontWeight: "700", whiteSpace: "nowrap" }}>
                    {T(r?.cta)}{" ↗"}
                  </span>
                </span>
              </a>
            </React.Fragment>))}
          </div>
        </section>
        <section id="notes" data-screen-label="09 Field notes" style={{ maxWidth: "1480px", margin: "0 auto", padding: "0 clamp(16px,3vw,40px) clamp(64px,8vw,110px)" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54", marginBottom: "16px" }}>
            Field notes · what I’m finding now
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: "20px" }}>
            <a href="https://aixcelsolutions.com/insights/openai-presence-enterprise-ai-agent-rollout" data-reveal="" style={{ textDecoration: "none", color: "#121210", border: "1.5px solid #121210", borderRadius: "14px", padding: "26px", display: "flex", flexDirection: "column", gap: "12px", background: "#F7F4EE" }} className="ab-hover-9">
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54" }}>
                Field Note 002 · July 23, 2026 · 9 min
              </span>
              <span style={{ fontSize: "clamp(22px,2vw,28px)", fontWeight: "800", letterSpacing: "-.02em", lineHeight: "1.15" }}>
                OpenAI Presence: The New Standard for Enterprise AI Agent Operations
              </span>
              <span style={{ fontSize: "16px", lineHeight: "1.5", color: "#3A3833" }}>
                Why customer-facing AI agents are becoming controlled operating systems, and what leaders should deploy, delay, and measure.
              </span>
            </a>
            <a href="https://ahmadbukhari.com/blog/how-to-choose-an-ai-automation-agency" data-reveal="" style={{ textDecoration: "none", color: "#121210", border: "1.5px solid #121210", borderRadius: "14px", padding: "26px", display: "flex", flexDirection: "column", gap: "12px", background: "#F7F4EE" }} className="ab-hover-9">
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", color: "#5E5B54" }}>
                Buyer guide · July 22, 2026 · 7 min
              </span>
              <span style={{ fontSize: "clamp(22px,2vw,28px)", fontWeight: "800", letterSpacing: "-.02em", lineHeight: "1.15" }}>
                How to choose an AI automation agency
              </span>
              <span style={{ fontSize: "16px", lineHeight: "1.5", color: "#3A3833" }}>
                Evaluate diagnosis, controls, evidence, ownership, recovery, and handover, not demo count.
              </span>
            </a>
          </div>
        </section>
        <section id="socials" data-screen-label="10 Build in public" data-buddy="Queuing the next reel" style={{ borderTop: "1.5px solid #121210", backgroundColor: "#E4DFD4", backgroundImage: "url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%27.85%27%20numOctaves=%272%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20values=%270%200%200%200%200.07%200%200%200%200%200.07%200%200%200%200%200.06%200%200%200%200.11%200%27/%3E%3C/filter%3E%3Crect%20width=%27180%27%20height=%27180%27%20filter=%27url%28%23n%29%27/%3E%3C/svg%3E),radial-gradient(rgba(18,18,16,.09) 1px,transparent 1.4px)", backgroundSize: "180px 180px,22px 22px" }}>
          <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "clamp(64px,8vw,110px) clamp(16px,3vw,40px)", display: "flex", flexWrap: "wrap", gap: "48px clamp(32px,5vw,96px)", alignItems: "center" }}>
            <div style={{ flex: "1 1 480px", display: "flex", flexDirection: "column", gap: "26px" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase", color: "#5E5B54" }}>
                Build in public · 8 channels
              </div>
              <h2 style={{ margin: "0", fontSize: "clamp(40px,5vw,80px)", fontWeight: "800", letterSpacing: "-.05em", lineHeight: ".92", textWrap: "balance" }}>
                {"Watch the builds "}
                <span style={{ color: "#C2410C" }}>
                  between the case studies.
                </span>
              </h2>
              <p style={{ margin: "0", maxWidth: "520px", fontSize: "17px", lineHeight: "1.55", color: "#3A3833" }}>
                Reels, walkthroughs, source and notes from systems in progress. Pick a channel.
              </p>
              <div onMouseEnter={v.pauseCh} onMouseLeave={v.playCh} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,210px),1fr))", gap: "10px" }}>
                {(v.channels || []).map((ch, $i8) => (<React.Fragment key={$i8}>
                  <a href={ch?.href} target="_blank" rel="noopener" onClick={ch?.click} onMouseEnter={ch?.on} onFocus={ch?.on} style={{ textDecoration: "none", color: "#121210", display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", border: `1.5px solid ${ch?.border ?? ''}`, borderRadius: "12px", background: ch?.bg, boxShadow: ch?.shadow, transform: ch?.tf, transition: "all .2s" }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#8C877C", flex: "none" }}>
                      {ch?.num}
                    </span>
                    <span style={{ width: "36px", height: "36px", borderRadius: "9px", background: "#FFFFFF", border: "1px solid #DDD7CA", display: "grid", placeItems: "center", flex: "none" }}>
                      {v.ready ? (<>
                        <img src={ch?.src} data-fb={ch?.fb} alt={ch?.name} style={{ width: "58%", height: "58%", objectFit: "contain" }} />
                      </>) : null}
                    </span>
                    <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                      <span style={{ fontSize: "15.5px", fontWeight: "800" }}>
                        {ch?.name}
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11.5px", color: "#5E5B54", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {ch?.handle}
                      </span>
                    </span>
                  </a>
                </React.Fragment>))}
              </div>
            </div>
            <div style={{ flex: "0 1 320px", margin: "0 auto", width: "100%", maxWidth: "320px" }}>
              <PhoneFrame>
                  {(v.channels || []).map((ch, $i9) => (<React.Fragment key={$i9}>
                    <div style={{ position: "absolute", inset: "0", opacity: ch?.vis, pointerEvents: ch?.pe, transition: "opacity .45s" }}>
                      {ch?.embed ? (
                        <ScaledFrame src={ch.embed} mode={ch.embedMode} title={`${ch.name} · ${ch.handle}`} />
                      ) : (
                      <ImageSlot alt={ch?.name}>
                        <div className="ab-channel-card">
                          <span className="ab-channel-logo">
                            <img src={ch?.src} data-fb={ch?.fb} alt="" />
                          </span>
                          <span className="ab-channel-name">{ch?.name}</span>
                          <span className="ab-channel-handle">{ch?.handle}</span>
                        </div>
                      </ImageSlot>
                      )}
                    </div>
                  </React.Fragment>))}
                  {" "}
                  <div style={{ position: "absolute", left: "0", right: "0", top: "0", zIndex: 5, padding: "4.4% 9% 7%", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'Space Mono',monospace", fontSize: "11px", fontWeight: "700", color: "#ECE8DF", background: "linear-gradient(#121210cc,transparent)", pointerEvents: "none" }}>
                    <span>{(v.clock || "").slice(0, 5)}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#D62E1F" }} />
                      {"CH "}{T(v.curCh?.num)}
                    </span>
                  </div>
                  <div style={{ position: "absolute", zIndex: 5, left: "12px", right: "12px", bottom: "4.2%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", background: "#121210", color: "#ECE8DF", borderRadius: "14px", padding: "10px 12px" }}>
                    <span style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "0" }}>
                      <span style={{ fontWeight: "800", fontSize: "14px" }}>
                        {v.curCh?.name}
                      </span>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#A39E92", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {v.curCh?.handle}
                      </span>
                    </span>
                    <a href={v.curCh?.href} style={{ flex: "none", textDecoration: "none", background: "#FF4F12", color: "#121210", fontWeight: "700", fontSize: "13px", padding: "8px 12px", borderRadius: "9px" }} className="ab-hover-7">
                      Follow ↗
                    </a>
                  </div>
                </PhoneFrame>
            </div>
          </div>
        </section>
        <section data-keep="" data-screen-label="11 Contact" data-buddy="Waiting for your messy part" style={{ position: "relative", overflow: "hidden", background: "#0B0B0A", color: "#ECE8DF", borderTop: "1.5px solid #121210" }}>
          {v.horizon}
          <div style={{ position: "relative", zIndex: "1", maxWidth: "1480px", margin: "0 auto", padding: "clamp(64px,9vw,140px) clamp(16px,3vw,40px)", display: "flex", flexWrap: "wrap", gap: "40px 64px", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "22px", maxWidth: "860px" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase" }}>
                Next system · open to selected roles and builds
              </div>
              <h2 style={{ margin: "0", fontSize: "clamp(52px,8vw,140px)", fontWeight: "900", letterSpacing: "-.06em", lineHeight: ".86" }}>
                {"Bring me the "}
                <span style={{ color: "#FF5A1F" }}>
                  messy part.
                </span>
              </h2>
              <p style={{ margin: "0", fontSize: "clamp(18px,1.5vw,22px)", lineHeight: "1.45", maxWidth: "620px", fontWeight: "500" }}>
                If the work crosses AI, automation, CRM, operations, or product delivery, and the edge cases matter, we should talk.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingTop: "24px", borderTop: "1.5px solid #3D3B36" }}>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "12px", letterSpacing: ".08em", textTransform: "uppercase" }}>
                  Or ask an AI about me first
                </span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {(v.askAhmad || []).map((q, $i9) => (<React.Fragment key={$i9}>
                    <a href={q?.href} target="_blank" rel="noopener" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", background: "#FFFDF8", border: "1.5px solid #121210", borderRadius: "10px", padding: "9px 13px", fontWeight: "700", fontSize: "14px", color: "#121210", transition: "transform .2s,box-shadow .2s" }} className="ab-hover-6">
                      {v.ready ? (<>
                        <img src={q?.src} data-fb={q?.fb} data-ask={q?.key} alt="" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                      </>) : null}
                      {T(q?.name)}{" ↗"}
                    </a>
                  </React.Fragment>))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: "0 1 380px" }}>
              <a href="https://cal.com/ahmad-bukhari/revenue-handoff-map" style={{ textDecoration: "none", background: "#FF4F12", color: "#121210", borderRadius: "14px", padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "6px 6px 0 #FFFDF8" }} className="ab-hover-a">
                <span style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#121210", color: "#FF4F12", display: "grid", placeItems: "center", fontSize: "16px", flex: "none" }}>
                  ▶
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px", color: "#3A2010" }}>
                    Execute · 25 min focused discovery
                  </span>
                  <span style={{ fontSize: "19px", fontWeight: "700" }}>
                    Book a systems call ↗
                  </span>
                </span>
              </a>
              <a href="mailto:ahmadbukhari4245@gmail.com?subject=Systems%20project%20inquiry" style={{ textDecoration: "none", color: "#ECE8DF", border: "1.5px solid #ECE8DF", borderRadius: "14px", padding: "16px 20px", display: "flex", flexDirection: "column", gap: "2px" }} className="ab-hover-7">
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "11px" }}>
                  Already have the brief?
                </span>
                <span style={{ fontSize: "19px", fontWeight: "700" }}>
                  Send the messy part ↗
                </span>
              </a>
            </div>
          </div>
        </section>
        <footer data-keep="" style={{ background: "#121210", color: "#C9C4B8" }}>
          <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "28px clamp(16px,3vw,40px)", display: "flex", flexWrap: "wrap", gap: "16px 32px", alignItems: "center", fontFamily: "'Space Mono',monospace", fontSize: "12.5px" }}>
            <span style={{ color: "#ECE8DF", fontWeight: "700" }}>
              Ahmad Bukhari · Agentic AI & LLM Systems Specialist
            </span>
            <span style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <a href="mailto:ahmadbukhari4245@gmail.com" style={{ color: "#C9C4B8" }}>
                Email
              </a>
              <a href="https://www.linkedin.com/in/bukhariahmad" style={{ color: "#C9C4B8" }}>
                LinkedIn
              </a>
              <a href="https://github.com/syedahmad0786" style={{ color: "#C9C4B8" }}>
                GitHub
              </a>
              <a href="https://n8n.io/creators/ahmadbukhari/" style={{ color: "#C9C4B8" }}>
                n8n
              </a>
            </span>
            <span style={{ marginLeft: "auto" }}>
              {"Islamabad · "}{T(v.clock)}{" PKT"}
            </span>
          </div>
        </footer>
      </div>
    );
  }
}
