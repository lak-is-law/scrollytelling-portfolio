# Accessibility Conformance Report (WCAG 2.2 AA)

**Portfolio 2.0** is designed to provide an inclusive, fully accessible experience for all users, including individuals using screen readers, keyboard-only navigation, and motion-sensitive preferences.

---

## ♿ WCAG 2.2 AA Compliance Summary

| Principle | Conformance Level | Implementation Notes |
| :--- | :---: | :--- |
| **1. Perceivable** | **Pass (AA)** | High-contrast text ratios (> 4.5:1), semantic heading structures, and non-color-only state indicators. |
| **2. Operable** | **Pass (AA)** | Complete keyboard focus traps, logical tab index order, visible focus rings, and touch target sizes (> 44x44px). |
| **3. Understandable** | **Pass (AA)** | Predictable navigation patterns, explicit interactive button labels, and meaningful status messages. |
| **4. Robust** | **Pass (AA)** | Clean semantic HTML5 landmarks, WAI-ARIA role assignments, and standard compliant DOM hierarchies. |

---

## ⌨️ Keyboard Navigation Map

| Key / Shortcut | Context | Action |
| :--- | :--- | :--- |
| `Tab` / `Shift+Tab` | Universal | Moves focus forward / backward across interactive elements. |
| `Enter` / `Space` | Buttons & Cartridges | Activates selection, inserts game cartridges, or triggers modal views. |
| `Escape` | Modals & Minigames | Immediately dismisses active project modals, Developer Vault, or game views. |
| `1` - `4` | Tech Factory Minigame | Selects weapon fabrication nodes directly via keyboard hotkeys. |
| `Space` | Pixel Football | Charges kick power meter and executes shot. |

---

## 🎛️ Assistive Technology & Motion Sensitivity

1. **Screen Reader Announcements (`aria-live`)**:
   - Status updates in the Developer Arcade and Terminal Hacker utilize `aria-live="polite"` to announce game events to assistive technologies without interrupting user flow.
2. **Reduced Motion Adaptation (`prefers-reduced-motion`)**:
   - Media queries detect user preferences and gracefully disable continuous particle loops and high-velocity spring oscillations while preserving interface clarity.
3. **Pointer Scoping**:
   - Custom cursor styling is strictly guarded behind `@media (pointer: fine)` so mobile and touch-screen devices retain standard native OS touch indicators.
