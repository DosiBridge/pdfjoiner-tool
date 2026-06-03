import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl bg-white overflow-hidden transition-shadow hover:shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 pr-3">{question}</h3>
        <ChevronDown
          aria-hidden="true"
          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0">
            <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQSection({ items, title = 'Frequently Asked Questions' }) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">{title}</h2>
      <p className="text-sm sm:text-base text-gray-500 text-center mb-8 sm:mb-10">
        Everything you need to know about merging PDFs.
      </p>
      <div className="space-y-2.5 sm:space-y-3">
        {items.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
