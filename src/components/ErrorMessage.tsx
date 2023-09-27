interface HeaderProps {
  message: string
}

export const ErrorMessage = ({message}: HeaderProps) => {
  return (
      <div className={"error-message"}>
        <div>
          <p>There was a problem</p>
          <p>Error message: <span>{message}</span></p>
          <p>Please contact the creator @ <a href={"mailto:zarins.jekabs@gmail.com"}>zarins.jekabs@gmail.com</a></p>
        </div>
      </div>
  )
}