const RoundedCorners = () => {
  return (
    <svg
      className="invisible absolute size-0" // Invisible SVG, used for visual effects like blurring or filters
      xmlns="http://www.w3.org/2000/svg" // XML namespace for SVG
    >
      <defs>
        {/* Define custom filter for the rounded corners effect */}
        <filter id="flt_tag">
          {/* Apply Gaussian blur to the source graphic */}
          <feGaussianBlur
            in="SourceGraphic" // Apply blur to the source graphic (the element it's applied to)
            stdDeviation="8" // Set the blur strength
            result="blur" // Store the result of the blur effect
          />
          {/* Color matrix for adjusting color intensity and applying effects */}
          <feColorMatrix
            in="blur" // Apply to the previously blurred graphic
            mode="matrix" // Use matrix mode for complex color transformations
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" // Matrix values to manipulate the colors
            result="flt_tag" // Name of the filtered result
          />
          {/* Combine the original graphic with the blurred and color-adjusted graphic */}
          <feComposite
            in="SourceGraphic" // Use the original graphic as the base
            in2="flt_tag" // Overlay the filtered graphic
            operator="atop" // Use 'atop' operator to place the second graphic above the first
          />
        </filter>
      </defs>
    </svg>
  )
}
export default RoundedCorners