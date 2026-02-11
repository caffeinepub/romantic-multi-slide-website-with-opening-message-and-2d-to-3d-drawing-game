# Specification

## Summary
**Goal:** Build a romantic multi-slide website that opens with a dedicated title slide, continues with a carousel of romantic English lines, and ends with a 2D-to-3D drawing mini-game.

**Planned changes:**
- Create a full-page opening slide showing the exact text "My beautiful Wifeyyy" with a clear continue control.
- Implement a multi-slide carousel/story flow with at least 5 additional romantic text slides and forward/back navigation that works on desktop and mobile.
- Add a final slide mini-game: a touch/mouse 2D drawing canvas for closed shapes, plus actions to convert the drawing into a 3D figure, rotate/zoom it, and reset to try again.
- Apply a cohesive romantic theme across all slides (consistent typography, spacing, transitions) using a primary palette that is not blue/purple.
- Add and use provided generated images as static assets under `frontend/public/assets/generated` (at least one visible on the opening slide or as a background/decoration).

**User-visible outcome:** Users land on an opening page reading "My beautiful Wifeyyy", can swipe/click through multiple romantic slides, and on the last slide can draw a 2D shape and convert it into a rotatable/zoomable 3D figure, with the ability to clear and repeat.
