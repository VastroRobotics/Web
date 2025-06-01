import React, { forwardRef } from "react";

const steps = [
  {
    id: "01",
    title: "Open free account",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    imageUrl:
      "/assets/images/graphics/steps/signup.svg",
    alt: "Sign up illustration",
  },
  {
    id: "02",
    title: "Submit your design",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    imageUrl:
      "/assets/images/graphics/steps/submit.svg",
    alt: "Submit illustration",
  },
  {
    id: "03",
    title: "Grow in the community",
    description:
      "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
    imageUrl:
      "/assets/images/graphics/steps/votes.svg",
    alt: "42 votes illustration",
  },
];

const StepsSection = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="py-16 bg-gray-50 w-full min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="flex flex-col space-y-20">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col md:flex-row items-center md:space-x-10">
              <div className="flex-shrink-0">
                <img
                  src={step.imageUrl}
                  alt={step.alt}
                  className="w-48 h-48 object-contain"
                />
              </div>
              <div className="relative flex items-center">
                <div className="absolute -left-6 w-6 h-6 rounded-full bg-blue-600"></div>
                <div className="bg-white shadow-lg rounded-lg p-6 ml-8">
                  <div className="text-blue-600 font-bold text-xl">{step.id}</div>
                  <div className="mt-2 text-gray-900 text-2xl font-semibold">
                    {step.title}
                  </div>
                  <p className="mt-4 text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default StepsSection;
