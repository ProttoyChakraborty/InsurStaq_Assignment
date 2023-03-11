import React from 'react'

const Verified = ({ data }) => {
    console.log(data)
  return (
      <div className='file-desc'>
          
        <div className='center'> <h4>Title : {data.name}</h4>
          <span className={data.status}>{data.status}</span></div>

          <div className='message'>
              <h5>Message : {data.message}</h5>
          </div>
          
    </div>
      
  )
}

export default Verified