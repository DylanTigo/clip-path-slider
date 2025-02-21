
const TextWrapper = ( {children} : {children: React.ReactNode}) => {
  return (
    <div className="overflow-hidden w-fit h-fit">{children}</div>
  )
}

export default TextWrapper