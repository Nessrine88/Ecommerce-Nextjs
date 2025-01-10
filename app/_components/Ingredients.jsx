import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../../app/globals.css'

const Ingredients = ({ product }) => {
  const whatsIncluded = product?.whatsIncluded;

  // Ensure whatsIncluded is a string (or convert it to a string if needed)
  const markdownContent = typeof whatsIncluded === 'string' ? whatsIncluded : JSON.stringify(whatsIncluded);

  return (
    <div className="flex justify-center py-10 bg-sand-100"> {/* Lighter sandy background */}
      <div className="relative bg-earth-beige p-10 rounded-xl shadow-lg w-4/5 md:w-[90%] md:px-5">
        {/* Leaf Frame */}
        <div className="absolute top-[-20px] left-[-20px] bg-moss-green w-10 h-10 rounded-full rotate-45"></div>
        <div className="absolute bottom-[-20px] right-[-20px] bg-moss-green w-10 h-10 rounded-full rotate-45"></div>
        
        <h1 className="text-center text-3xl font-bold text-dark-olive mb-8">Ingredients</h1>

        {/* Render markdown content */}
        <ReactMarkdown className="text-earth-dark leading-relaxed">{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Ingredients;
