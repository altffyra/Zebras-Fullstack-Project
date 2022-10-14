import React from 'react'

type Props = {}

const HandleOrder = (props: Props) => {
  return (
    <div>
        <div className='handleOrderHeader'><h1>Administration</h1></div>
        <div className='handleOrderTop'> <button className='admin-buttonSmall'>Tillbaks</button> <button className='admin-buttonSmall'>Logga ut </button>   </div>
        <div className='informationTitles'> <p>Order</p> <p>Info</p> </div>
        <article >
            <div className='classification'> 
                <h1>Ohanterade</h1> 
                <div className='dot-green'></div>  
            </div>
            Här mappas ohanterade ut
        </article>

        <article >
            <div className='classification'> 
                <h1>Hanterade</h1> 
                <div className='dot-orange'></div>  
            </div>
            Här mappas hanterade ut
        </article>

        <article >
            <div className='classification'> 
                <h1>Avslutade</h1> 
                <div className='dot-red'></div>  
            </div>
            Här mappas avslutade ut
            
        </article>




    </div>
  )
}

export default HandleOrder