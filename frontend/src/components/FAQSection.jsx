import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-base sm:text-lg font-medium text-gray-900 pr-4">{question}</h3>
        {isOpen ? (
          <ChevronUp aria-hidden="true" className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown aria-hidden="true" className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-4">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQSection({ items, title = 'Frequently Asked Questions' }) {
  return (
    <div className="mt-10 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}

export default FAQSection;
