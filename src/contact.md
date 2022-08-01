---
title: Contact
layout: 'layouts/article.njk'
eleventyNavigation:
  key: Contact
  order: 4
---

<div class="centered">
Hello! Please get in touch and I promise to get back to you.
</div>

<form name="ba-contact" method="POST" data-netlify="true">
  <p>
    <label>Your Name: <input type="text" name="name" required/></label>   
  </p>
  <p>
    <label>Your Email: <input type="email" name="email" required/></label>
  </p>
  <p>
    <label>Message: <textarea name="message" required></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
