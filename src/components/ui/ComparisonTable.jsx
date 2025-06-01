export default function ComparisonTable({ data, labelLeft, labelRight, className = "" }) {
    return (
      <div className={`text-white w-full max-w-4xl mx-auto ${className}`}>
        {/* Header Row */}
        <div className="flex justify-between items-center pb-6">
        <span className="text-sm font-medium  text-left text-gray-400 tracking-widest">
        Specifications
          </span>
          <span className="text-sm font-medium text-center text-gray-400 tracking-widest">
            
            
          </span>
          <span className=" flex justify-end space-x-5 text-base font-black">
                <span className="text-gray-400">{labelLeft}</span>
                <span className="text-gray-600">/</span>
                <span className="text-white">{labelRight}</span>
              </span>
        </div>
  
        {/* Data Rows */}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center pb-2 ${
                index !== data.length - 1 ? "border-b border-white/30" : ""
              }`}
            >
              {/* Specs on the left */}
              <span className="text-sm text-gray-400 tracking-widest uppercase  text-left">
                {item.label}
              </span>
  
              {/* Empty center */}
              <span className="" />
  
              {/* Spot / Vastro on right with 5x spacing */}
              <span className=" flex justify-end space-x-5 text-base font-black">
                <span className="text-gray-400">{item.left}</span>
                <span className="text-gray-600">/</span>
                <span className="text-white">{item.right}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  