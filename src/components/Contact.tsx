import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    try {
      const response = await fetch("https://formsubmit.co/ajax/sinsumit157@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _captcha: "false"
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">Neptune // Contact</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Initiate communication sequence.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="glass-panel p-8 rounded-2xl border border-primary/20 bg-card/40 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 text-foreground">Transmission Form</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" 
                placeholder="Enter your designation" 
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" 
                placeholder="Enter frequency channel (email)" 
              />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Message</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4} 
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-primary transition-colors" 
                placeholder="Enter message payload..."
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary/20 hover:bg-primary/40 disabled:bg-primary/10 disabled:text-primary/50 border border-primary text-primary font-bold py-3 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(0,188,212,0.3)] hover:shadow-[0_0_25px_rgba(0,188,212,0.6)] disabled:shadow-none"
            >
              {status === 'sending' ? 'Transmitting...' : 'Send Transmission'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm mt-2 text-center animate-pulse">
                ✓ Transmission successful! Signal received.
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2 text-center animate-pulse">
                ✗ Transmission failed. Please verify signal link and try again.
              </p>
            )}
          </form>
        </div>
        
        <div className="flex flex-col justify-center space-y-8">
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md hover:border-primary/50 transition-colors group cursor-pointer">
            <a href="mailto:sinsumit157@gmail.com" className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground">Email</h4>
                <p className="text-muted-foreground">sinsumit157@gmail.com</p>
              </div>
            </a>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md hover:border-primary/50 transition-colors group cursor-pointer">
            <a href="https://www.linkedin.com/in/sumit-sinha-0b789a279/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground">LinkedIn</h4>
                <p className="text-muted-foreground">Sumit Sinha</p>
              </div>
            </a>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md hover:border-primary/50 transition-colors group cursor-pointer">
            <a href="https://github.com/sumitsinha09-stack" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground">GitHub</h4>
                <p className="text-muted-foreground">@sumitsinha09-stack</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
