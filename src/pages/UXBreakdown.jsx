import React, { useState } from 'react';
import { 
  BarChart3, 
  Map, 
  Search, 
  ShieldCheck, 
  Layout, 
  Activity, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  Navigation,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

const UXBreakdown = () => {
  const [activeTab, setActiveTab] = useState('visual');

  const tabs = [
    { id: 'visual', label: 'Visual Design', icon: <Eye size={16} /> },
    { id: 'flows', label: 'Page Flows', icon: <Map size={16} /> },
    { id: 'patterns', label: 'UX Patterns', icon: <Activity size={16} /> },
    { id: 'scorecard', label: 'UX Scorecard', icon: <BarChart3 size={16} /> },
  ];

  const content = {
    visual: {
      title: "Visual Design & Scannability",
      description: "Agoda's brand is anchored in a bold blue hero banner + red CTA combination. The system prioritizes rapid data ingestion.",
      points: [
        { label: "Color System", text: "Red for pricing (urgency), Blue for primary actions, White for breathable content areas." },
        { label: "Typography", text: "High-contrast weights to emphasize value propositions and key filters." },
        { label: "Search State", text: "Immersive search modal that dims the background to focus user attention." }
      ]
    },
    flows: {
      title: "The Booking Funnel",
      description: "A focused path from inspiration to confirmation, utilizing contextual pricing and minimizing distractions.",
      steps: [
        "Homepage (Inspiration/Search)",
        "Search Results (Comparison)",
        "Property Page (Details & Urgency)",
        "Room Selection (Specific Choice)",
        "Checkout (Identity & Settlement)",
        "Confirmation (Fulfillment)"
      ]
    },
    patterns: {
      title: "UX Mechanics",
      description: "Psychological triggers and navigational patterns used to drive conversion and trust.",
      patterns: [
        { title: "Urgency Mechanics", desc: "Flash deals, 'X people viewing', and limited availability alerts.", icon: <ShieldCheck className="text-red-500" size={24} /> },
        { title: "Sticky Navigation", desc: "Keeping actions visible during long property scrolls.", icon: <Navigation className="text-blue-500" size={24} /> },
        { title: "Contextual Pricing", desc: "Displaying estimated prices based on duration early in the flow.", icon: <Layout className="text-green-500" size={24} /> }
      ]
    },
    scorecard: {
      title: "UX Audit Results",
      description: "An evaluation of the current state of Agoda's interface across key usability metrics.",
      scores: [
        { category: "Search Experience", score: 8, color: "bg-green-500" },
        { category: "Trust & Social Proof", score: 8, color: "bg-green-500" },
        { category: "Navigation Usability", score: 5, color: "bg-yellow-500" },
        { category: "Property Page UX", score: 5, color: "bg-yellow-500" },
        { category: "Checkout Flow", score: 5, color: "bg-yellow-500" },
        { category: "Design Consistency", score: 5, color: "bg-red-500" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-32 pb-48 font-serif">
      <div className="container-custom">
        <div className="mb-20 text-center">
          <p className="text-[12px] font-bold tracking-[0.5em] text-accent-gold uppercase mb-6">Interactive Breakdown</p>
          <h1 className="text-6xl md:text-8xl font-bold text-secondary-900 tracking-tight leading-none mb-10">UI/UX <span className="italic text-secondary-300">Analysis.</span></h1>
          <p className="max-w-2xl mx-auto text-[13px] font-bold text-secondary-400 uppercase tracking-widest leading-loose italic">
            A comprehensive evaluation of the Agoda design architecture, identifying gaps and opportunities for world-class conversion optimization.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 px-10 py-6 rounded-3xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-700 ${
                activeTab === tab.id 
                  ? 'bg-secondary-900 text-white shadow-premium scale-105' 
                  : 'bg-white text-secondary-400 hover:text-secondary-900 border border-secondary-50 hover:shadow-classic'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[4rem] shadow-classic overflow-hidden border border-secondary-50 min-h-[600px] flex flex-col md:flex-row">
          {/* Left Panel - Visual Sidebar */}
          <div className="md:w-1/3 bg-secondary-900 p-16 text-white relative overflow-hidden flex flex-col justify-end">
             <div className="absolute top-0 right-0 p-12 opacity-5 scale-[2]">
                {activeTab === 'visual' && <Eye size={200} />}
                {activeTab === 'flows' && <Map size={200} />}
                {activeTab === 'patterns' && <Activity size={200} />}
                {activeTab === 'scorecard' && <BarChart3 size={200} />}
             </div>
             <div className="relative z-10">
                <p className="text-[10px] text-accent-gold font-bold uppercase tracking-[0.4em] mb-6">SECTION PERSPECTIVE</p>
                <h2 className="text-4xl font-bold tracking-tight mb-8">{content[activeTab].title}</h2>
                <p className="text-[12px] text-white/40 font-bold uppercase tracking-widest leading-loose italic">{content[activeTab].description}</p>
             </div>
          </div>

          {/* Right Panel - Interactive Content */}
          <div className="md:w-2/3 p-16 md:p-24 bg-accent-cream/10 animate-fade-in" key={activeTab}>
             {activeTab === 'visual' && (
               <div className="space-y-12">
                  {content.visual.points.map((pt, i) => (
                    <div key={i} className="group p-10 bg-white rounded-[2rem] border border-secondary-50 hover:border-accent-gold/20 transition-all duration-700 shadow-sm hover:shadow-premium">
                       <div className="flex items-center gap-6 mb-4">
                          <div className="w-1 h-1 bg-accent-gold rounded-full transition-all group-hover:scale-[10]"></div>
                          <span className="text-[10px] font-bold text-accent-gold uppercase tracking-widest">{pt.label}</span>
                       </div>
                       <p className="text-2xl font-bold text-secondary-900 tracking-tight leading-relaxed">{pt.text}</p>
                    </div>
                  ))}
               </div>
             )}

             {activeTab === 'flows' && (
               <div className="relative">
                  <div className="absolute left-[39px] top-0 bottom-0 w-px bg-secondary-100 hidden md:block"></div>
                  <div className="space-y-12">
                     {content.flows.steps.map((step, i) => (
                       <div key={i} className="flex items-center gap-12 group relative">
                          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-700 z-10 shadow-premium ${i === 0 ? 'bg-secondary-900 text-white' : 'bg-white text-secondary-400 group-hover:bg-accent-gold group-hover:text-white'}`}>
                             {i + 1}
                          </div>
                          <div>
                             <h4 className="text-3xl font-bold text-secondary-900 tracking-tight group-hover:text-secondary-900 transition-colors">{step}</h4>
                             {i === 2 && <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest mt-2 block">HIGH ABANDONMENT RISK</span>}
                             {i === 4 && <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-2 block">COMPLEXITY PEAK</span>}
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             )}

             {activeTab === 'patterns' && (
                <div className="grid grid-cols-1 gap-10">
                   {content.patterns.patterns.map((pt, i) => (
                     <div key={i} className="p-12 bg-white rounded-[3rem] border border-secondary-50 flex items-start gap-10 hover:shadow-classic transition-all duration-700 group">
                        <div className="p-6 bg-accent-cream/30 rounded-2xl group-hover:scale-110 transition-transform">
                           {pt.icon}
                        </div>
                        <div>
                           <h4 className="text-3xl font-bold text-secondary-900 tracking-tight mb-4">{pt.title}</h4>
                           <p className="text-[13px] text-secondary-400 font-bold uppercase tracking-widest leading-loose italic">{pt.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             )}

             {activeTab === 'scorecard' && (
                <div className="space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {content.scorecard.scores.map((score, i) => (
                        <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-secondary-50 shadow-sm">
                           <div className="flex justify-between items-center mb-8">
                              <span className="text-[10px] font-bold text-secondary-400 uppercase tracking-widest">{score.category}</span>
                              <span className="text-2xl font-bold text-secondary-900">{score.score}/10</span>
                           </div>
                           <div className="h-2 w-full bg-secondary-50 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${score.color} transition-all duration-1000 ease-out`} 
                                style={{ width: `${score.score * 10}%` }}
                              ></div>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   <div className="mt-16 p-12 bg-red-50 border border-red-100 rounded-[3rem] flex items-start gap-8">
                      <AlertCircle className="text-red-500 shrink-0" size={32} />
                      <div>
                         <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest mb-4">Critical Opportunity Gap</p>
                         <h4 className="text-2xl font-bold text-secondary-900 tracking-tight mb-6">Property & Checkout Page UX</h4>
                         <p className="text-[13px] text-secondary-600 font-bold uppercase tracking-widest leading-loose italic">
                            Limited hierarchical differentiation found as user scrolls. Blocks started blending together, creating friction in information retrieval. Lack of clear path to cart without back-scrolling.
                         </p>
                      </div>
                   </div>
                </div>
             )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
           <p className="text-[11px] font-bold text-secondary-400 uppercase tracking-[0.4em] mb-12">Actionable Conclusion</p>
           <button 
             onClick={() => window.location.href = '#'} 
             className="inline-flex items-center gap-6 px-16 py-8 bg-secondary-900 text-white rounded-full text-xl font-bold shadow-2xl hover:bg-accent-gold transition-colors duration-700 group"
           >
              INITIATE REDESIGN PROTOCOL <ChevronRight className="group-hover:translate-x-3 transition-transform" />
           </button>
        </div>
      </div>
    </div>
  );
};

export default UXBreakdown;
