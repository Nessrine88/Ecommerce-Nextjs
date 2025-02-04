import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gray-50 ">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
      Pure Quality, Every Drop 
        <strong className="font-extrabold text-[#727D73] sm:block"> Discover the Finest Vegetable Oils  </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
      Crafted for Quality, Loved for Flavor – Explore Our Vegetable Oils"
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          className="block w-full rounded bg-buttons px-12 py-3 text-sm font-medium text-gray-700 shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="#"
        >
          Get Started
        </a>

        <a
          className="block w-full rounded px-12 py-3 text-sm font-medium text-black shadow hover:text-gary-600 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
          href="#"
        >
          Learn More
        </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero