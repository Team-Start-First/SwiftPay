import React, { useState, useEffect } from 'react';
import { FiSend, FiShield, FiZap, FiGlobe, FiSmartphone, FiDollarSign, FiUsers, FiTrendingUp, FiLock, FiCheck, FiArrowRight, FiStar, FiMenu, FiX, FiChevronDown, FiMail, FiPhone, FiMapPin, FiCalendar, FiClock, FiBookOpen } from 'react-icons/fi';

export default function PayFlowLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [scrolled, setScrolled] = useState(false);
  const [stats, setStats] = useState({ users: 0, transfers: 0, countries: 0, saved: 0 });
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState(1000);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;
      
      const targets = { users: 5000000, transfers: 250000000, countries: 180, saved: 2000000000 };
      let current = { users: 0, transfers: 0, countries: 0, saved: 0 };
      
      const interval = setInterval(() => {
        current.users = Math.min(current.users + targets.users / steps, targets.users);
        current.transfers = Math.min(current.transfers + targets.transfers / steps, targets.transfers);
        current.countries = Math.min(current.countries + targets.countries / steps, targets.countries);
        current.saved = Math.min(current.saved + targets.saved / steps, targets.saved);
        
        setStats({
          users: Math.floor(current.users),
          transfers: Math.floor(current.transfers),
          countries: Math.floor(current.countries),
          saved: Math.floor(current.saved)
        });
        
        if (current.users >= targets.users) clearInterval(interval);
      }, increment);
    };
    
    animateStats();
  }, []);

  const currencies = [
    { code: 'USD', rate: 1, symbol: '$' },
    { code: 'EUR', rate: 0.92, symbol: '€' },
    { code: 'GBP', rate: 0.79, symbol: '£' },
    { code: 'NGN', rate: 1520, symbol: '₦' },
    { code: 'JPY', rate: 149.5, symbol: '¥' }
  ];

  const features = [
    { icon: FiZap, title: 'Instant Transfers', desc: 'Send money in seconds with our real-time processing infrastructure', color: 'from-yellow-400 to-orange-500' },
    { icon: FiShield, title: 'Bank-Grade Security', desc: 'Military-grade encryption and 2FA protect every transaction', color: 'from-blue-400 to-blue-600' },
    { icon: FiDollarSign, title: 'Low Fees', desc: 'Save up to 8x compared to banks with transparent pricing', color: 'from-green-400 to-emerald-600' },
    { icon: FiGlobe, title: 'Global Coverage', desc: 'Send to 180+ countries with 50+ currency support', color: 'from-purple-400 to-pink-600' },
    { icon: FiSmartphone, title: 'Mobile-First', desc: 'Beautiful apps for iOS and Android with offline mode', color: 'from-cyan-400 to-blue-500' },
    { icon: FiUsers, title: 'Multi-User Accounts', desc: 'Manage family or business accounts with role-based access', color: 'from-indigo-400 to-purple-600' },
    { icon: FiTrendingUp, title: 'Real-Time Rates', desc: 'Get the best exchange rates updated every second', color: 'from-pink-400 to-red-500' },
    { icon: FiLock, title: 'Fraud Protection', desc: '24/7 monitoring with instant alerts and refund guarantee', color: 'from-red-400 to-pink-600' }
  ];

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Freelancer', rating: 5, text: 'PayFlow has made receiving international payments so easy. No more waiting days for bank transfers!', avatar: '👩‍💼', verified: true, amount: '$45,000 sent' },
    { name: 'Michael Chen', role: 'Business Owner', rating: 5, text: 'The best payment solution for my e-commerce business. Low fees and instant settlements.', avatar: '👨‍💻', verified: true, amount: '$120,000 sent' },
    { name: 'Amara Okafor', role: 'Student', rating: 5, text: 'My family sends money from abroad and it arrives instantly. The fees are so much lower than Western Union!', avatar: '👩‍🎓', verified: true, amount: '$8,500 sent' },
    { name: 'David Martinez', role: 'Consultant', rating: 5, text: 'Crystal clear pricing, no hidden fees, and excellent customer support. Highly recommended!', avatar: '👨‍💼', verified: true, amount: '$67,000 sent' },
    { name: 'Lisa Wang', role: 'Entrepreneur', rating: 5, text: 'PayFlow transformed how I do business internationally. The multi-currency wallet is a game changer!', avatar: '👩‍💼', verified: true, amount: '$200,000 sent' },
    { name: 'James Brown', role: 'Developer', rating: 5, text: 'The API integration was seamless. Now my clients can pay me from anywhere in the world instantly.', avatar: '👨‍💻', verified: true, amount: '$92,000 sent' }
  ];

  const pricingPlans = [
    { 
      name: 'Personal', 
      price: 'Free', 
      features: ['Send up to $10,000/month', 'Instant transfers', 'Multi-currency wallet', 'Mobile app access', 'Basic support'],
      cta: 'Get Started',
      popular: false
    },
    { 
      name: 'Premium', 
      price: '$9.99/mo', 
      features: ['Send up to $100,000/month', 'Priority transfers', 'Advanced analytics', 'Premium exchange rates', '24/7 priority support', 'API access'],
      cta: 'Start Free Trial',
      popular: true
    },
    { 
      name: 'Business', 
      price: 'Custom', 
      features: ['Unlimited transfers', 'Dedicated account manager', 'Custom integrations', 'White-label options', 'Enterprise SLA', 'Advanced fraud protection'],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const faqs = [
    { 
      question: 'How fast are transfers with PayFlow?', 
      answer: 'Most transfers are completed instantly, within seconds. International transfers typically take under 5 minutes, depending on the destination country and payment method.' 
    },
    { 
      question: 'What are the fees for sending money?', 
      answer: 'Personal accounts have zero fees for the first $10,000 per month. After that, we charge a flat 0.5% fee with no hidden charges. Business accounts have custom pricing based on volume.' 
    },
    { 
      question: 'Is PayFlow secure?', 
      answer: 'Absolutely. We use bank-level 256-bit encryption, two-factor authentication, and comply with international security standards including PCI DSS. Your money and data are always protected.' 
    },
    { 
      question: 'Which countries can I send money to?', 
      answer: 'You can send money to over 180 countries worldwide. We support 50+ currencies and local payment methods in most major markets including the US, UK, EU, Asia, and Africa.' 
    },
    { 
      question: 'How do I get started?', 
      answer: 'Simply sign up with your email, verify your identity (takes 2-3 minutes), add funds via bank transfer or card, and you\'re ready to send money globally!' 
    },
    { 
      question: 'Can I cancel or refund a transfer?', 
      answer: 'You can cancel a transfer within 30 seconds of initiating it. After that, transfers are processed immediately. If there\'s an issue, our support team can help with refunds on a case-by-case basis.' 
    }
  ];

  const blogPosts = [
    {
      title: '5 Ways to Save Money on International Transfers',
      excerpt: 'Discover expert tips to reduce fees and get better exchange rates when sending money abroad.',
      category: 'Tips & Tricks',
      date: 'Jan 8, 2026',
      readTime: '5 min read',
      image: '💡'
    },
    {
      title: 'Understanding Exchange Rates: A Complete Guide',
      excerpt: 'Learn how exchange rates work and how to get the best rates for your transfers.',
      category: 'Education',
      date: 'Jan 5, 2026',
      readTime: '8 min read',
      image: '📊'
    },
    {
      title: 'PayFlow for Small Businesses: Case Study',
      excerpt: 'How a local startup saved $50,000 annually by switching to PayFlow for international payments.',
      category: 'Case Studies',
      date: 'Jan 3, 2026',
      readTime: '6 min read',
      image: '🚀'
    }
  ];

  const formatNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    return num.toLocaleString();
  };

  const convertedAmount = (amount * currencies.find(c => c.code === selectedCurrency).rate).toFixed(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              PayFlow
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#testimonials" className="hover:text-purple-400 transition-colors">Reviews</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Get Started
              </button>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              <a href="#features" className="block hover:text-purple-400">Features</a>
              <a href="#pricing" className="block hover:text-purple-400">Pricing</a>
              <a href="#testimonials" className="block hover:text-purple-400">Reviews</a>
              <a href="#contact" className="block hover:text-purple-400">Contact</a>
              <button className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/50 text-sm">
                🎉 Trusted by over 5M users worldwide
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Send Money
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"> Anywhere</span>,
                <br />Instantly
              </h1>
              <p className="text-xl text-slate-300">
                Transfer money locally and globally with zero hassle. Lightning-fast, secure, and designed for the modern world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Create Free Account
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300">
                  Watch Demo
                </button>
              </div>
              <div className="flex gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <FiShield className="text-green-400" size={20} />
                  <span className="text-sm text-slate-300">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiZap className="text-yellow-400" size={20} />
                  <span className="text-sm text-slate-300">Instant Transfer</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiGlobe className="text-blue-400" size={20} />
                  <span className="text-sm text-slate-300">180+ Countries</span>
                </div>
              </div>
            </div>

            {/* Interactive Currency Converter */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Try Our Calculator</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">You Send</label>
                  <div className="flex gap-4">
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <select className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>USD</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <FiArrowRight className="rotate-90" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Recipient Gets</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={convertedAmount}
                      readOnly
                      className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-2xl font-bold"
                    />
                    <select 
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-slate-400 pt-4 border-t border-white/10">
                  <span>Transfer Fee</span>
                  <span className="text-green-400">$0.00</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Exchange Rate</span>
                  <span>{currencies.find(c => c.code === selectedCurrency)?.rate}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Delivery Time</span>
                  <span className="text-yellow-400">⚡ Instant</span>
                </div>

                <button className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-semibold">
                  Send Money Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                {formatNumber(stats.users)}+
              </div>
              <div className="text-slate-400 mt-2">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
                {formatNumber(stats.transfers)}+
              </div>
              <div className="text-slate-400 mt-2">Transfers Made</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                {stats.countries}+
              </div>
              <div className="text-slate-400 mt-2">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
                {formatNumber(stats.saved)}
              </div>
              <div className="text-slate-400 mt-2">Saved in Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"> Manage Money</span>
            </h2>
            <p className="text-xl text-slate-400">Powerful features designed for modern financial needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-slate-400">Get started in minutes, not days</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20"></div>
            
            {[
              { step: 1, title: 'Create Account', desc: 'Sign up with your email in under 2 minutes. Verify your identity securely.' },
              { step: 2, title: 'Add Funds', desc: 'Link your bank account, card, or use crypto. Multiple payment options available.' },
              { step: 3, title: 'Send Money', desc: 'Enter recipient details and send. Track in real-time with instant notifications.' }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-3xl font-bold shadow-lg shadow-purple-500/50 relative z-10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Millions</h2>
            <p className="text-xl text-slate-400">See what our users are saying</p>
          </div>

          {/* Featured Testimonial Carousel */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-12 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
              <div className="absolute top-6 left-6 text-6xl text-purple-500/20">"</div>
              <div className="relative z-10">
                <p className="text-2xl text-slate-200 mb-8 italic">
                  {testimonials[activeTestimonial].text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{testimonials[activeTestimonial].avatar}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xl">{testimonials[activeTestimonial].name}</h4>
                        {testimonials[activeTestimonial].verified && (
                          <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                            <FiCheck size={12} />
                          </div>
                        )}
                      </div>
                      <p className="text-slate-400">{testimonials[activeTestimonial].role}</p>
                      <p className="text-sm text-purple-400">{testimonials[activeTestimonial].amount}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <FiStar key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeTestimonial ? 'w-8 bg-purple-500' : 'w-2 bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, idx) => (
              <div 
                key={idx} 
                className="group p-6 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => setActiveTestimonial(idx)}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 line-clamp-3">{testimonial.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        {testimonial.verified && (
                          <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                            <FiCheck size={8} />
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {testimonial.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-slate-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <div className="text-2xl font-bold">50,000+</div>
              <div className="text-slate-400">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-2xl font-bold">98%</div>
              <div className="text-slate-400">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-400">Choose the plan that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx}
                className={`relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500 shadow-xl shadow-purple-500/20' 
                    : 'bg-slate-900/50 border-white/10 hover:border-purple-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FiCheck size={20} className="text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50'
                    : 'border border-white/20 hover:bg-white/10'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-400">Everything you need to know about PayFlow</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4"
                >
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <FiChevronDown 
                    className={`flex-shrink-0 transition-transform duration-300 ${
                      activeFaq === idx ? 'rotate-180 text-purple-400' : ''
                    }`}
                    size={24}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
            <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
            <p className="text-slate-400 mb-4">Our support team is here to help 24/7</p>
            <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
              Contact Support
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest from Our Blog</h2>
              <p className="text-xl text-slate-400">Tips, guides, and insights to help you save money</p>
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300">
              View All Posts
              <FiArrowRight />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <div 
                key={idx}
                className="group rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center text-6xl">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-semibold">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FiCalendar size={12} />
                      {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <FiClock size={14} />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-2 text-purple-400 group-hover:gap-3 transition-all">
                      Read More
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-slate-400">We'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input 
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <input 
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="john@example.com"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea 
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Tell us how we can help..."
                  rows="6"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                />
              </div>
              <button className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group">
                Send Message
                <FiSend className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <FiMail className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Email Us</div>
                      <div className="text-slate-400">support@payflow.com</div>
                      <div className="text-slate-400">sales@payflow.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Call Us</div>
                      <div className="text-slate-400">+1 (555) 123-4567</div>
                      <div className="text-sm text-slate-500">Mon-Fri, 9am-6pm EST</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Visit Us</div>
                      <div className="text-slate-400">123 Finance Street</div>
                      <div className="text-slate-400">New York, NY 10001</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                <h4 className="font-semibold mb-4">Business Hours</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-semibold">We're Online!</span>
                </div>
                <p className="text-sm text-slate-300">Our support team typically responds within 2 hours during business hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/50">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8">Join millions of users who trust PayFlow for their money transfers</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-white text-purple-600 hover:bg-slate-100 transition-all duration-300 font-semibold">
                Create Free Account
              </button>
              <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 font-semibold">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
                PayFlow
              </div>
              <p className="text-slate-400">The modern way to send and receive money globally.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-slate-400">
            <p>&copy; 2026 PayFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}