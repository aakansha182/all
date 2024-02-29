import React from 'react'

const Addgenre = () => {
  return (
    <main className='main-gen'>
    <div className='ingen'>
     <div className='headgen'>
        <img
              src="/assests/logoExplore.png"
              alt="Logo Image"/>
              <span className='gline'><h2>Add new Genre</h2></span>
      </div>
      <form className='gen-form'>
             <div className="genbk">
               <label htmlFor="bkgenre">Book Genre</label>
               <div className="input-flexgen">
                 <input
                     type="text"
                     name="bkgenre"
                     required
                    placeholder="Books Category"
                 ></input>
                  
               </div>
             </div>
             <button type='submit' className='genbtn'>
                    <span>Add</span>
                     </button>
      </form>
     </div>
  </main>
  )
}

export default Addgenre