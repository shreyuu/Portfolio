import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await emailjs.sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                form.current,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );
            setStatus({ type: "success", message: "Message sent successfully!" });
            form.current.reset();
        } catch (error) {
            setStatus({ type: "error", message: "Failed to send message. Please try again." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="section-padding bg-background-light dark:bg-background-dark">
            <motion.div
                className="container-width"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Let's collaborate and build something amazing together!
                    </p>
                </div>

                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    className="max-w-md mx-auto space-y-4"
                >
                    <div className="space-y-2">
                        <motion.input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            required
                            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            whileFocus={{ scale: 1.01 }}
                        />
                        <motion.input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            required
                            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            whileFocus={{ scale: 1.01 }}
                        />
                        <motion.textarea
                            name="message"
                            placeholder="Your Message"
                            required
                            className="w-full p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[150px] resize-y"
                            whileFocus={{ scale: 1.01 }}
                        />
                    </div>

                    {status.message && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`text-center ${status.type === "success" ? "text-green-500" : "text-red-500"
                                }`}
                        >
                            {status.message}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </motion.button>
                </motion.form>

                <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <a
                        href="mailto:shreyashmeshram0031@gmail.com"
                        className="text-primary hover:text-primary-dark transition-colors"
                    >
                        shreyashmeshram0031@gmail.com
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;