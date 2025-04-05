// src/components/Contact.js
import React from "react";

const Contact = () => {
    return (
        <section id="contact" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
            <form className="max-w-xl mx-auto space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-3 rounded bg-[#1a1a1a] text-white outline-none"
                />
                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-3 rounded bg-[#1a1a1a] text-white outline-none"
                />
                <textarea
                    rows="5"
                    placeholder="Your Message"
                    className="w-full p-3 rounded bg-[#1a1a1a] text-white outline-none"
                ></textarea>
                <button
                    type="submit"
                    className="bg-cyan-500 px-6 py-3 rounded text-white hover:bg-cyan-600 w-full"
                >
                    Send Message
                </button>
            </form>
        </section>
    );
};

export default Contact;