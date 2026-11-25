import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('Sending...');

    try {
      // Replace this with your actual API endpoint.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('Message sent successfully!');

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-xl rounded-3xl bg-transparent p-6 shadow-2xl backdrop-blur-md md:p-8">
      <h2 className="mb-2 text-3xl font-semibold text-[#002685]">
        Get in Touch
      </h2>

      <p className="mb-8 text-gray-600">Have a question? Send us a message.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition outline-none focus:border-[#002685]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition outline-none focus:border-[#002685]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition outline-none focus:border-[#002685]"
            placeholder="Write your message..."
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-[#002685] px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Send Message
        </button>

        {status && (
          <p className="text-center text-sm text-gray-600">{status}</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
