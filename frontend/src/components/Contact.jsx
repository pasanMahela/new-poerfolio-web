import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Download, Mail, User, MessageSquare, Phone, MapPin } from "lucide-react";
import Section from "./Section";
import { useToast } from "./Toast";

export default function Contact() {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Handle form submission to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message. Please email me directly at pasancp2000@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle CV download
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf';
    link.download = 'Pasan_Vithanage_CV.pdf';

    fetch('/cv.pdf')
      .then(response => {
        if (response.ok) {
          link.click();
          toast.success("CV download started!");
        } else {
          toast.error("CV file not found. Please add cv.pdf to the public folder, or contact me directly for my CV!");
        }
      })
      .catch(() => {
        toast.error("CV file not found. Please email me at pasancp2000@gmail.com for my CV!");
      });
  };

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind? Let's discuss how we can work together."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 pl-10 text-zinc-900 outline-none transition-all dark:bg-zinc-900 dark:text-zinc-100 ${errors.name
                    ? 'border-red-300 ring-2 ring-red-100 dark:border-red-700 dark:ring-red-900/20'
                    : 'border-zinc-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:focus:border-sky-400'
                    }`}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 pl-10 text-zinc-900 outline-none transition-all dark:bg-zinc-900 dark:text-zinc-100 ${errors.email
                    ? 'border-red-300 ring-2 ring-red-100 dark:border-red-700 dark:ring-red-900/20'
                    : 'border-zinc-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:focus:border-sky-400'
                    }`}
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Message *
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full rounded-lg border bg-white px-4 py-2.5 pl-10 text-zinc-900 outline-none transition-all resize-none dark:bg-zinc-900 dark:text-zinc-100 ${errors.message
                    ? 'border-red-300 ring-2 ring-red-100 dark:border-red-700 dark:ring-red-900/20'
                    : 'border-zinc-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-zinc-700 dark:focus:border-sky-400'
                    }`}
                  placeholder="Tell me about your project..."
                  disabled={isSubmitting}
                />
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
              </div>
              {errors.message && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full rounded-lg px-6 py-3 font-medium text-white transition-all flex items-center justify-center gap-2 ${isSubmitting
                ? 'bg-zinc-400 cursor-not-allowed'
                : 'bg-sky-500 hover:bg-sky-600 hover:shadow-lg'
                }`}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </motion.button>

            {/* Info text */}
            <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
              Your message will be sent directly to my email
            </p>
          </form>
        </motion.div>

        {/* Contact Info & CV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* CV Download */}
          <div className="rounded-xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">
              Download My CV
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Get a detailed overview of my experience and skills.
            </p>
            <motion.button
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download CV
            </motion.button>
          </div>

          {/* Contact Info */}
          <div className="rounded-xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.02]">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <div className="rounded-lg bg-sky-500/10 p-2">
                  <Mail className="h-4 w-4 text-sky-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Email</p>
                  <a
                    href="mailto:pasancp2000@gmail.com"
                    className="text-sm hover:text-sky-500 transition-colors"
                  >
                    pasancp2000@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <div className="rounded-lg bg-green-500/10 p-2">
                  <Phone className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Phone</p>
                  <p className="text-sm">+94-712684685</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                <div className="rounded-lg bg-purple-500/10 p-2">
                  <MapPin className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Location</p>
                  <p className="text-sm">Malabe, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
