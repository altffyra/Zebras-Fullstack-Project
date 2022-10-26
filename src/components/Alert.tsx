import React from 'react'

type Props = {
    errorHeader:string
    errorMessage:string
}

const Alert = (props: Props) => {
  return (
    <div className='alert'>
        <div className='alert-header'>
        <p>{props.errorHeader}</p>    
        </div>
        <p className='errorMessage'>{props.errorMessage}</p>    
        
     </div>
  )
}

export default Alert