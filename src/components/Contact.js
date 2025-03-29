import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm("service_id", "template_id", form.current, "public_key")
            .then(() => alert("Message Sent!"))
            .catch(() => alert("Failed to send message"));
    };

    return (
        <section id="contact" className="p-10 bg-gray-900 text-white text-center">
            <h2 className="text-3xl font-bold">Contact Me</h2>
            <p className="mt-4">Let's build something cool together!</p>

            <form ref={form} onSubmit={sendEmail} className="max-w-md mx-auto mt-8">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="p-2 rounded w-full mb-3 text-gray-800"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    className="p-2 rounded w-full mb-3 text-gray-800"
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="p-2 rounded w-full mb-3 text-gray-800 min-h-[150px]"
                ></textarea>
                <button
                    type="submit"
                    className="bg-blue-500 px-6 py-2 rounded text-white hover:bg-blue-600 transition-colors duration-300"
                >
                    Send Message
                </button>
            </form>

            <a href="mailto:shreyashmeshram0031@gmail.com" className="text-blue-400 mt-6 block">
                shreyashmeshram0031@gmail.com
            </a>
        </section>
    );
};

export default Contact;