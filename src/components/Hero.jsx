import React, { useState, useEffect } from "react";
import { FaArrowRight, FaShieldAlt, FaRegCreditCard } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";
import { LuZap } from "react-icons/lu";
import { FiGlobe, FiCheck, FiChevronDown, FiSend, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import Nav from "./Nav";
import Currency from "./Currency";
import Testimonials from "./Testimonials";



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

 const currencies = [
  { code: "USD", rate: 1, symbol: "$" },
  { code: "EUR", rate: 0.92, symbol: "€" },
  { code: "GBP", rate: 0.79, symbol: "£" },
  { code: "NGN", rate: 1520, symbol: "₦" },
  { code: "JPY", rate: 149.5, symbol: "¥" },
];

   const formatNumber = (num) => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    return num.toLocaleString();
  };



const Hero = () => {
  const [activeFaq, setActiveFaq] = useState(null);
   const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState(1000);

  const selected = currencies.find(c => c.code === selectedCurrency);

  const convertedAmount = (
    Number(amount || 0) * selected.rate
  ).toFixed(2);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  return (
    <>
      <Nav />

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-indigo-500/50 to-pink-400 px-6 sm:px-10 md:px-16 py-28 md:py-36"
      >
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <FaRegCreditCard className="absolute top-1/4 left-[10%] w-8 h-8 text-pink-400/30 animate-[float_6s_ease-in-out_infinite]" />
          <FaShieldAlt className="absolute bottom-[30%] left-[8%] w-6 h-6 text-pink-400/30 animate-[float_7s_ease-in-out_infinite_2s]" />
          <BiSolidZap className="absolute top-[25%] right-[10%] w-7 h-7 text-pink-400/30 animate-[float_5s_ease-in-out_infinite_0.5s]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-400/30 backdrop-blur-lg border border-pink-400/20 shadow-md">
              <BiSolidZap className="text-pink-500" />
              <span className="text-sm font-medium text-gray-700">
                Lightning-fast payments
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-700 leading-tight fold">
              Payments <br className="hidden md:block" /> Made Swift & Simple
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-md">
              Send and receive money instantly. Secure, fast, and trusted by
              millions worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 transition-all hover:scale-105 hover:shadow-lg"
              >
                Get Started Free
                <FaArrowRight />
              </Link>

              <button className="px-8 py-3 rounded-xl font-semibold text-blue-600 border border-blue-400/60 hover:bg-blue-50/60 transition">
                Learn More
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex gap-6 text-sm text-gray-600 mt-6">
              <span>• No setup fees</span>
              <span>• 24/7 support</span>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative md:w-1/2 w-full flex justify-center">
            <div className="relative w-full sm:max-w-lg">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-300 rounded-2xl blur-3xl opacity-40" />

              {/* Image */}
              <img
                src="/hero-payment.png"
                alt="SwiftPay App Preview"
                className="relative w-full rounded-2xl shadow-2xl object-contain hover:scale-[1.03] transition-transform"
              />

              {/* Speed Badge */}
              <div className="absolute top-[8%] right-[-5%] bg-white/30 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-[float_4s_ease-in-out_infinite_1s]">
                <span className="p-2 bg-pink-400/60 rounded-full text-pink-700">
                  <LuZap />
                </span>
                <span className="text-xs text-gray-700">
                  Avg. Speed <br />
                  <span className="text-lg font-bold">2.3s</span>
                </span>
              </div>

              {/* Users Badge */}
              <div className="absolute bottom-[10%] left-[-5%] w-[8.5rem] h-[4.5rem] bg-blue-600/30 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-xl flex flex-col items-center justify-center">
                <p className="text-sm">Trusted by</p>
                <p className="text-xl font-bold">2M+ users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="bg-white py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-pink-700 text-center">
          Why Choose SwiftPay
        </h2>
        <p className="text-slate-700 text-xl text-center mt-4">
          Everything you need to manage payments efficiently and securely
        </p>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16 px-6">
          <FeaturedCard
            icon={<BiSolidZap />}
            title="Fast Transfers"
            description="Send money in seconds, with our real-time processing infrastructure."
          />
          <FeaturedCard
            icon={<FaShieldAlt />}
            title="Secure Payments"
            description="End-to-end encrypted transactions."
          />
          <FeaturedCard
            icon={<FiGlobe />}
            title="Global Reach"
            description="Send payments to 150+ countries, with 50+ currency support."
          />
          <FeaturedCard
            icon={<MdSupportAgent />}
            title="24/7 Support"
            description="Always here when you need help."
          />
        </div>
      </section>

                                   {/* How It Works */}
      <section className="py-20 px-6 bg-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-pink-600">How It Works</h2>
            <p className="text-xl text-slate-700">Get started in minutes, not days</p>
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
                <p className="text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


                                  {/* Pricing */}
           <section id="pricing" className="py-20 px-6 bg-slate-900/50">
             <div className="max-w-7xl mx-auto">
               <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold mb-4 text-pink-600">Simple, Transparent Pricing</h2>
                 <p className="text-xl text-slate-200">Choose the plan that fits your needs</p>
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
                     <h3 className="text-2xl font-bold mb-2 text-slate-100">{plan.name}</h3>
                     <div className="text-4xl font-bold mb-6 text-slate-50">{plan.price}</div>
                     <ul className="space-y-4 mb-8">
                       {plan.features.map((feature, i) => (
                         <li key={i} className="flex items-start gap-3">
                           <FiCheck size={20} className="text-green-400 flex-shrink-0 mt-1" />
                           <span className="text-slate-300">{feature}</span>
                         </li>
                       ))}
                     </ul>
                     <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 text-gray-100 ${
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
      

                     {/* FAQ */}
      <section className="relative py-20 px-6 bg-slate-50 overflow-hidden">
  
  {/* Top fade */}
  <div className="pointer-events-none absolute top-0 left-0 w-full h-24
    bg-gradient-to-b from-slate-900/50 to-slate-50 z-0" />

  {/* Bottom fade */}
  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24
    bg-gradient-to-t from-transparent to-slate-50 z-0" />

  <div className="relative z-10 max-w-4xl mx-auto">

    {/* Header */}
    <div className="text-center mb-16 mt-5">
      <h2 className="text-4xl md:text-5xl font-bold mb-4  text-pink-600">
        Frequently Asked Questions
      </h2>
      <p className="text-lg md:text-xl text-slate-500">
        Everything you need to know about PayFlow
      </p>
    </div>

    {/* FAQ Items */}
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="
            bg-white/70 backdrop-blur-lg
            border border-slate-200
            rounded-2xl overflow-hidden
            shadow-sm
            hover:border-indigo-300
            hover:shadow-md hover:bg-white/90
            transition-all duration-300
          "
        >
          <button
            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
            className="w-full p-6 text-left flex justify-between items-center gap-4"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {faq.question}
            </h3>

            <FiChevronDown
              className={`flex-shrink-0 transition-transform duration-300 ${
                activeFaq === idx
                  ? "rotate-180 text-indigo-500"
                  : "text-slate-400"
              }`}
              size={22}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              activeFaq === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="px-6 pb-6 text-slate-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div
      className="
        mt-16 text-center p-8 rounded-2xl
        bg-gradient-to-br from-indigo-50 to-pink-50
        border border-indigo-200
      "
    >
      <h3 className="text-xl font-semibold mb-2 text-slate-900">
        Still have questions?
      </h3>
      <p className="text-slate-500 mb-6">
        Our support team is here to help 24/7
      </p>
      <a href="#contact"
        className="
          px-8 py-3 rounded-full
          bg-gradient-to-r from-indigo-500 to-pink-500
          text-white font-semibold
          shadow-md
          hover:shadow-lg hover:scale-105
          transition-all duration-300
        "
      >
        Contact Support
      </a>
    </div>

  </div>
</section>

      <section>
  <Currency />
      </section>
      
      <section>
        <Testimonials />
      </section>


      {/* Contact Section */}
            <section id="contact" className="py-20 px-6 bg-slate-900/30">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-pink-700">Get in Touch</h2>
                  <p className="text-xl text-slate-700">We'd love to hear from you</p>
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
                        className="w-full text-white bg-slate-500 border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address</label>
                      <input 
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full text-white bg-slate-500 border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Message</label>
                      <textarea 
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Tell us how we can help..."
                        rows="6"
                        className="w-full text-white bg-slate-500 border border-white/60 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
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
                          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                            <FiMail className="text-purple-600" size={20} />
                          </div>
                          <div>
                            <div className="font-semibold mb-1">Email Us</div>
                            <div className="text-slate-700">support@payflow.com</div>
                            <div className="text-slate-700">sales@payflow.com</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                            <FiPhone className="text-purple-600" size={20} />
                          </div>
                          <div>
                            <div className="font-semibold mb-1">Call Us</div>
                            <div className="text-slate-700">+1 (555) 123-4567</div>
                            <div className="text-sm text-slate-600">Mon-Fri, 9am-6pm EST</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                            <FiMapPin className="text-purple-600" size={20} />
                          </div>
                          <div>
                            <div className="font-semibold mb-1">Visit Us</div>
                            <div className="text-slate-700">123 Finance Street</div>
                            <div className="text-slate-700">New York, NY 10001</div>
                          </div>
                        </div>
                      </div>
                    </div>
      
                    <div className="p-6 rounded-2xl bg-slate-900/50 border border-white/10">
                      <h4 className="font-semibold mb-4">Business Hours</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Monday - Friday</span>
                          <span className="font-semibold">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Saturday</span>
                          <span className="font-semibold">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Sunday</span>
                          <span className="font-semibold">Closed</span>
                        </div>
                      </div>
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
              <Link
              to="/signup"  className="px-8 py-4 rounded-full bg-white text-purple-600 hover:bg-pink-600 hover:text-white transition-all duration-300 font-semibold">
                Create Free Account
              </Link>
              <button className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300 font-semibold">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-500 bg-blue-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex gap-3">
              <div
            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500
    flex items-center justify-center shadow-md"
          >
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="font-semibold text-lg tracking-wide text-gray-900">
            SwiftPay
          </span>
          </div>

              <p className="text-slate-400 mt-4">The modern way to send and receive money globally.</p>
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

    </>
  );
};

export default Hero;
