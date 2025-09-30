import React from "react";

function ContactSection() {
  return (
    <section>
      <h2>Contact Us</h2>
      <p>Email: info@nouvoayiti2075.com</p>
      <p>Phone: +1 (918) 640-8249</p>
      <form>
        <input type="text" placeholder="Your Name" />
        <textarea placeholder="Your Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default ContactSection;
