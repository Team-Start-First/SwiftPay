import React, { useState, useEffect } from "react";
import {FiStar, FiCheck} from 'react-icons/fi';


const Testimonials = () => {

const [activeTestimonial, setActiveTestimonial] = useState(0);

     const testimonials = [
    { name: 'Sarah Johnson', role: 'Freelancer', rating: 5, text: 'PayFlow has made receiving international payments so easy. No more waiting days for bank transfers!', avatar: '👩‍💼', verified: true, amount: '$45,000 sent' },
    { name: 'Michael Chen', role: 'Business Owner', rating: 5, text: 'The best payment solution for my e-commerce business. Low fees and instant settlements.', avatar: '👨‍💻', verified: true, amount: '$120,000 sent' },
    { name: 'Amara Okafor', role: 'Student', rating: 5, text: 'My family sends money from abroad and it arrives instantly. The fees are so much lower than Western Union!', avatar: '👩‍🎓', verified: true, amount: '$8,500 sent' },
    { name: 'David Martinez', role: 'Consultant', rating: 5, text: 'Crystal clear pricing, no hidden fees, and excellent customer support. Highly recommended!', avatar: '👨‍💼', verified: true, amount: '$67,000 sent' },
    { name: 'Lisa Wang', role: 'Entrepreneur', rating: 5, text: 'PayFlow transformed how I do business internationally. The multi-currency wallet is a game changer!', avatar: '👩‍💼', verified: true, amount: '$200,000 sent' },
    { name: 'James Brown', role: 'Developer', rating: 5, text: 'The API integration was seamless. Now my clients can pay me from anywhere in the world instantly.', avatar: '👨‍💻', verified: true, amount: '$92,000 sent' }
];
  
 useEffect(() => {
  const interval = setInterval(() => {
    setActiveTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, 6000); // 6 seconds

  return () => clearInterval(interval);
}, [testimonials.length]);


    return (
      <div>
          {/* Testimonials */}
                <section id="testimonials" className="py-20 px-6 bg-slate-50">
                  <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-pink-700">Loved by Millions</h2>
                      <p className="text-xl text-slate-400">See what our users are saying</p>
                    </div>
          
                    {/* Featured Testimonial Carousel */}
                    <div className="max-w-4xl mx-auto mb-12">
                      <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-500/20 p-12 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
                        <div className="absolute top-6 left-6 text-6xl text-purple-500">"</div>
                        <div className="relative z-10">
                         <p
  key={activeTestimonial}
  className="
    text-2xl text-slate-700 mb-8 italic
    transition-all duration-700 ease-out
    animate-fadeIn
  "
>
  {testimonials[activeTestimonial].text}
</p>

                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                                <p className="text-slate-800">{testimonials[activeTestimonial].role}</p>
                                <p className="text-sm text-purple-700">{testimonials[activeTestimonial].amount}</p>
                              </div>
                            </div>
                            <div className="flex gap-1 sm:justify-end">
                              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                <FiStar key={i} size={20} className="fill-yellow-500 text-yellow-400" />
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
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {testimonials.slice(0, 6).map((testimonial, idx) => (
                        <div 
                          key={idx} 
                              className="group p-6 rounded-2xl hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer 
                          bg-white/70 backdrop-blur-lg border border-slate-300 overflow-hidden shadow-sm hover:shadow-md"
                          onClick={() => setActiveTestimonial(idx)}
                        >
                          <div className="flex gap-1 mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FiStar key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-slate-800 mb-4 line-clamp-3">{testimonial.text}</p>
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
                        <div className="text-2xl font-bold">5,000+</div>
                        <div className="text-slate-400">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏆</div>
                        <div className="text-2xl font-bold">95%</div>
                        <div className="text-slate-400">Would Recommend</div>
                      </div>
                    </div>
                    </div>
                    </section>
                  </div>
                    
  )
}

export default Testimonials