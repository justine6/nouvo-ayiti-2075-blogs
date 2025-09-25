import React from "react";

function NewsletterSection() {
  return (
    <section>
      <h2>Stay Connected</h2>
      <p>Subscribe to receive updates and stories of hope.</p>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
}

export default NewsletterSection;
