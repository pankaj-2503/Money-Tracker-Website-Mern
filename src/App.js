
import { useEffect, useState } from 'react';
import './App.css';



function App() {
   const [name,setName]=useState('');
   const [datetime,setDateTime]=useState('');
   const [description,setDescription]=useState('');
   const [trans,setTrans]=useState([]);//transactions

   useEffect(()=>{
       getTransactions().then(tran=>{
          setTrans(tran);
       })
   },[]);

   async function getTransactions(){
      const url=process.env.REACT_APP_URL+'/transactions';
      const response=await fetch(url);
      return await response.json();
   }
   function handleSubmit(ev){
      ev.preventDefault();
      const url=process.env.REACT_APP_URL+'/transaction';
      // console.log(url);
      const price=name.split(' ')[0];
       fetch(url,{
         method:'POST',
         headers:{'Content-type':'application/json'},
         body:JSON.stringify({price,
            name:name.substring(price.length+1),
            description,
            datetime})
       }).then(response=>{
         response.json().then(json=>{
            setName('');
            setDescription('');
            setDateTime('');
            // console.log(json)
         })
       });
   }
  let balance=0;
  for(const t of trans){
   balance=balance+ t.price;
  }
  balance=balance.toFixed(2);
  const fraction=balance.split('.')[1];
  balance=balance.split('.')[0];


  return (
    <main>
       <h1>${balance}<span>{fraction}</span></h1>
       <form onSubmit={handleSubmit}>
          <div className='basic'>
              <input type='text' value={name} onChange={ev=>setName(ev.target.value)}  placeholder={'+200 new Laptop Purchased'}/>
              <input type='datetime-local' value={datetime} onChange={ev=>setDateTime(ev.target.value)}/>
          </div>

          <div className='description'>
              <input type='text' value={description} onChange={ev=>setDescription(ev.target.value)} placeholder={'description'}/>
          </div>
          <button type='submit'>Add new transaction</button>
       </form>
       <div className='transactions'>
         {trans.length>0 && trans.map(transaction=>(
           
               <div className='transaction'>
             <div className='left'>
                <div className='name'>{transaction.name}</div>
                <div className='description'>{transaction.description}</div>
             </div>
             <div className='right'>
                <div className={'price-'+((transaction.price<0)?'red':'green')}>{transaction.price}$</div>
                <div className='datetime'>{transaction.datetime}</div>
             </div>
          </div>

            
         ))}
          

       </div>
    </main>
  );
}

export default App;
