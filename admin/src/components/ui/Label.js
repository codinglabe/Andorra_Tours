import React from 'react'

const Label = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`form-label ${className}`}
      {...props}
    />
  )
})

Label.displayName = "Label"

export { Label }