/**
 * BackgroundLayer.jsx
 *
 * STRUCTURAL LAYER — No visual content yet.
 *
 * This fixed, full-viewport container is the dedicated slot for the
 * day-to-night sky gradient animation that will be wired up in a
 * future phase. It sits at z-index 0 so the scrollable content layer
 * (z-10) always renders on top.
 *
 * FUTURE USAGE
 * ─────────────
 * When the scroll-driven sky transition is implemented, gradient
 * layers (dawn, day, dusk, night) will be added as children of this
 * component and driven by a scrollYProgress MotionValue passed in
 * as a prop.
 *
 * LAYERING CONTRACT
 * ──────────────────
 *   z-0  — BackgroundLayer (this component, fixed to viewport)
 *   z-10 — Content layer   (scrolls normally on top)
 *   z-50 — Navbar          (sticky, within content layer)
 */

export default function BackgroundLayer() {
  return (
    <div
      id="bg-layer"
      data-testid="background-layer"
      aria-hidden="true"
      className="fixed inset-0 z-0 w-screen h-screen pointer-events-none overflow-hidden"
    >
      {/*
        Sky gradient slots — empty until animation phase.

        Example future children:
          <div className="sky-dawn absolute inset-0" />
          <div className="sky-day  absolute inset-0" />
          <div className="sky-dusk absolute inset-0" />
          <div className="sky-night absolute inset-0" />
      */}
    </div>
  )
}
