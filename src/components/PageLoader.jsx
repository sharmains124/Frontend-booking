import React, { useEffect, useState, useRef } from 'react';
import './PageLoader.css';

const MSGS = [
  'Preparing your journey',
  'Loading destinations',
  'Fetching best deals',
  'Almost ready',
];

export default function PageLoader({ isLoading }) {
  const [show,      setShow]      = useState(isLoading);
  const [leaving,   setLeaving]   = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [msgIdx,    setMsgIdx]    = useState(0);
  const [step,      setStep]      = useState(0);
  const refs = useRef([]);

  const kill = () => { refs.current.forEach(clearTimeout); refs.current = []; };
  const later = (fn, ms) => { const t = setTimeout(fn, ms); refs.current.push(t); };

  useEffect(() => {
    kill();

    if (isLoading) {
      // Show immediately
      setShow(true);
      setLeaving(false);
      setProgress(0);
      setMsgIdx(0);
      setStep(0);

      later(() => { setProgress(30); },                         200);
      later(() => { setProgress(58); setMsgIdx(1); setStep(1); }, 500);
      later(() => { setProgress(85); setMsgIdx(2); setStep(2); }, 800);
    } else {
      // Finish → fade out → remove
      setProgress(100);
      setMsgIdx(3);
      setStep(3);
      later(() => setLeaving(true),  300);
      later(() => { setShow(false); setLeaving(false); }, 850);
    }

    return kill;
  }, [isLoading]);

  if (!show) return null;

  return (
    <>
      {/* Thin top bar */}
      <div className="wtl-top-strip">
        <div className="wtl-top-strip-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Overlay */}
      <div className={`wtl-overlay${leaving ? ' wtl-leaving' : ''}`}>

        {/* Center Container */}
        <div className="wtl-center">
          
          {/* Spinner + icon */}
          <div className="wtl-logo-wrap">
            <div className="wtl-ring-outer" />
            <div className="wtl-ring-mid" />
            <div className="wtl-ring-inner" />
            <div className="wtl-logo-circle">
              <span className="wtl-logo-icon">✈</span>
            </div>
          </div>

          {/* Brand */}
          <div className="wtl-brand-block">
            <div className="wtl-brand-name">Wing Trip</div>
            <div className="wtl-brand-sub">YOUR PREMIUM TRAVEL PARTNER</div>
          </div>

          {/* Status */}
          <div className="wtl-status" key={msgIdx}>
            <span className="wtl-status-text">{MSGS[msgIdx]}</span>
            <div className="wtl-dots">
              <span className="wtl-dot" /><span className="wtl-dot" /><span className="wtl-dot" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="wtl-progress-wrap">
            <div className="wtl-progress-meta">
              <span className="wtl-progress-label">LOADING</span>
              <span className="wtl-progress-pct">{progress}%</span>
            </div>
            <div className="wtl-progress-track">
              <div className="wtl-progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Step dots */}
          <div className="wtl-steps">
            {[0,1,2,3].map(i => (
              <div
                key={i}
                className={`wtl-step${i === step ? ' wtl-step-active' : i < step ? ' wtl-step-done' : ''}`}
              />
            ))}
          </div>

        </div>

      </div>
    </>
  );
}
