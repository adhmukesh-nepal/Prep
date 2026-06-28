/* ============================================================
   gate.js — "book access code" unlock for resource pages.
   Include on any page you want gated:  <script src="/gate.js"></script>
   ------------------------------------------------------------
   EDIT THESE:
   - VALID_CODES : the code(s) printed inside your book (case/space-insensitive).
                   Add more entries per edition if you like.
   - BUY_URL     : where readers can buy the book (set when you have a link).
   - FORM_URL    : your sign-up Google Form.
   Note: this is a SOFT gate (the code lives in the page). It keeps casual
   non-buyers out and drives sign-ups, but a determined user could bypass it.
   For the real purchase record, also ask the code in your Google Form.
   ============================================================ */
(function () {
  var VALID_CODES = ["ADHHA182026"];                 // book code = writer+book+edition+year (ADH-HA18-2026). Add a suffix for less guessability if you like.
  var BUY_URL = "#";                                  // ← where to buy the book
  var FORM_URL = "https://forms.gle/f8mLCm8AzpxLduTV6";

  if (localStorage.getItem("bookAccess") === "ok") return;   // already unlocked

  var norm = function (s) { return (s || "").toUpperCase().replace(/[\s-]/g, ""); };
  var codes = VALID_CODES.map(norm);

  var css = ''
    + '#__gate{position:fixed;inset:0;z-index:99999;background:#16323d;color:#fff;'
    + 'display:flex;align-items:center;justify-content:center;padding:20px;'
    + 'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}'
    + '#__gate .box{background:#fff;color:#23303a;max-width:440px;width:100%;border-radius:16px;'
    + 'padding:28px 26px;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.3)}'
    + '#__gate .threeR{display:inline-flex;border-radius:999px;overflow:hidden;font-weight:700;font-size:12px;margin-bottom:14px}'
    + '#__gate .threeR span{padding:5px 12px;color:#fff}'
    + '#__gate h2{margin:0 0 6px;font-size:20px}'
    + '#__gate p{margin:0 0 16px;color:#6b7a85;font-size:14px}'
    + '#__gate input{width:100%;padding:13px 14px;border:1px solid #d7dee2;border-radius:10px;font-size:16px;text-align:center;letter-spacing:1px}'
    + '#__gate button{width:100%;margin-top:12px;background:#548235;color:#fff;border:0;border-radius:10px;'
    + 'padding:13px;font-size:15px;font-weight:700;cursor:pointer}'
    + '#__gate button:hover{filter:brightness(1.05)}'
    + '#__gerr{display:none;color:#a3271f;font-size:13px;margin-top:10px}'
    + '#__gate .alt{margin-top:18px;padding-top:16px;border-top:1px solid #eef2f4;font-size:13px;color:#6b7a85}'
    + '#__gate .alt a{color:#1F6F8B;font-weight:600;text-decoration:none}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var ov = document.createElement("div");
  ov.id = "__gate";
  ov.innerHTML =
    '<div class="box">'
    + '<div class="threeR"><span style="background:#1F6F8B">Read</span><span style="background:#548235">Recall</span><span style="background:#BF8F00">Rank</span></div>'
    + '<h2>Unlock your free resources</h2>'
    + '<p>Enter the access code printed inside your book to open the chapters and flashcards.</p>'
    + '<input id="__gcode" type="text" placeholder="Access code" autocomplete="off" autocapitalize="characters">'
    + '<button id="__gbtn">Unlock</button>'
    + '<div id="__gerr">That code didn’t match. Check the code printed in your book and try again.</div>'
    + '<div class="alt">Don’t have the book yet? <a href="' + BUY_URL + '">Get the book</a><br>'
    + 'Just want updates? <a href="' + FORM_URL + '" target="_blank" rel="noopener">Sign up here</a></div>'
    + '</div>';
  document.body.appendChild(ov);
  document.documentElement.style.overflow = "hidden";

  function unlock() {
    var v = norm(document.getElementById("__gcode").value);
    if (v && codes.indexOf(v) !== -1) {
      localStorage.setItem("bookAccess", "ok");
      ov.parentNode.removeChild(ov);
      document.documentElement.style.overflow = "";
    } else {
      document.getElementById("__gerr").style.display = "block";
    }
  }
  document.getElementById("__gbtn").addEventListener("click", unlock);
  document.getElementById("__gcode").addEventListener("keydown", function (e) {
    if (e.key === "Enter") unlock();
  });
  document.getElementById("__gcode").focus();
})();
