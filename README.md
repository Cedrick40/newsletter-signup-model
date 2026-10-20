# Newsletter Signup Modal

A static, responsive page with a newsletter signup popup that appears after a delay, validates the email address and can be dismissed. Built for Task 20 (Newsletter Signup Modal) of my Web Development internship.

**Live page:** https://cedrick40.github.io/newsletter-modal/

## About the project
The page is a small landing page for a made-up newsletter called The Weekly Byte. After four seconds a popup appears with an email form. The user can subscribe, or close the popup with the X button, the "No thanks" link, the Escape key or a click on the dark overlay. Once the popup has been closed or the form has been submitted, it does not appear again on later visits. A small "Show the popup again" link at the top lets anyone see the popup again for testing.

## Objective
To practice modals, timers and basic form validation.

## Tools used
- HTML5
- CSS3
- JavaScript
- VS Code
- Git and GitHub (free)

## My approach
- **Planning:** I listed what the popup must do: wait, appear, validate, confirm, close in several ways and remember that it was closed.
- **The modal:** I used the native `<dialog>` element and opened it with `showModal()`. This gives a real modal for free: the page behind it cannot be used, focus stays inside, the Escape key closes it and the dark overlay is the dialog's `::backdrop`.
- **Timer:** `setTimeout(openModal, DELAY_MS)` opens the popup after four seconds. The delay is a constant at the top of `script.js` so it is easy to change.
- **Email validation:** The form uses `novalidate` so my own messages are shown instead of the browser's. `validateEmail()` trims the value, then checks two cases: an empty field ("Please enter your email address.") and a value that does not match the pattern `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$` ("Please enter a valid email, like name@example.com."). The error appears under the field in red, the input gets a red border and `aria-invalid`, and the message disappears when the user starts typing again.
- **Success state:** A valid email replaces the form with a green tick and a thank-you message. This is a front-end demo, so the email is not sent or stored anywhere.
- **Dismissing:** The X button, "No thanks" and Done buttons call `closeModal()`. For the overlay, the dialog has no padding, so a click whose `event.target` is the dialog itself must have hit the backdrop. Escape is handled by the browser.
- **Preventing it from reappearing:** Every way of closing fires the dialog's `close` event, and one listener saves `newsletterModalDismissed = "true"` in `localStorage`. On page load, the timer is only started if that flag is not set. Storage calls are wrapped in `try/catch` in case the browser blocks storage.
- **Accessibility:** The dialog has an accessible name and description through `aria-labelledby` and `aria-describedby`. The close button has an `aria-label`, focus moves to the email field when the popup opens and returns to where it was when it closes, the page behind does not scroll, errors use `role="alert"` and the success message uses `role="status"`. Focus outlines are visible and animations are turned off for users who prefer reduced motion.
- **Layout and responsive design:** The box is `min(440px, 100vw - 2rem)` wide, so it fits small phones, and it scrolls inside if the screen is very short. The article cards use CSS Grid with `auto-fit`.
- **Design:** The page uses a warm off-white background with dark grey text and one orange accent for the buttons. Standard colours carry meaning: red for errors and green for success.
- **Testing:** I tested the timing, empty and invalid emails (such as `abc`, `a@b` and `a b@c.com`), a valid email, closing by button and overlay, clicking inside the box, and a second visit after dismissal. I also checked the popup on a narrow screen.

## Project structure
```
newsletter-signup-model/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Outcome
The result is a clean, accessible signup popup that appears after a delay, validates the email, can be dismissed in several ways and stays closed once dismissed. This project taught me how the native dialog element handles most modal behaviour, how a timer and `localStorage` work together, and how clear error messages make a form friendlier.

## Interview questions
- **How would you validate an email format?** Trim the value, reject an empty field, and test it against a pattern that requires text, an `@`, a domain and a dot with a suffix, with no spaces. `type="email"` helps too. A pattern only checks the shape, not whether the mailbox exists, so a real service should also validate on the server and send a confirmation email.
- **How would you prevent a modal from repeatedly appearing?** Save a flag when the user closes it or subscribes, for example in `localStorage` (kept across visits) or `sessionStorage` (kept for the tab), or in a cookie with an expiry date. Check the flag on page load and only start the timer if it is not set.
- **What accessibility considerations apply to modals?** Use `role="dialog"` with `aria-modal` (or the native `<dialog>` element), give it a name and description, move focus into it when it opens, keep focus inside while it is open and return it when it closes, let Escape close it, make the close button reachable and labelled, stop the page behind from scrolling, keep contrast high, respect reduced motion and avoid interrupting users too early.

## Credits
Timer and validation behaviour follow the MDN documentation for `setTimeout`, form validation and the `<dialog>` element. The font is Manrope from Google Fonts.

## Author
Cedrick Niyibikora