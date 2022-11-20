const handleSubmit = (e)=>{
    let newDisplay = {Interst:'',AmountValues:'',Installment:'',Commission:''}
   e.preventDefault()
  let data1 =  firstIntallment();
  console.log(typeof(data1))
//    data.Interst,data.Installment,data.Commission
//     secondInstallment()
//     let data2 = secondInstallment()
//      let data3 =thirdInstallment()
//         firstIntallment()
//         secondInstallment()
//         thirdInstallment()
//      setDisplay([...display,newDisplay])
//    // console.log(typeof(data3))
//    console.log(newDisplay.AmountValues)
}


console.log(Installment,Commission)
        console.log(typeof(values.commPercent))
        //return {Installment,Commission, Interst}


            Interst:Interst
            AmountVal:AmountVal
            Installment:Installment
            Commission:Commission

            let obj = {Interst,AmountVal,Installment,Commission}
           console.log(obj)
            let arr = [...obj]
            console.log(arr)
            //console.log(Interst,AmountVal,Installment,Commission)
           // return[{...Interst,...AmountVal,...Installment,...Commission}]
            return arr;



            
    function firstIntallment(){
      let Installment =inputs.bchitValue /inputs.btMonth;
      let Commission =inputs.bchitValue * (parseInt(inputs.bcommPercent)/100)
      let Interst = 0
      let AmountVal = inputs.bchitValue
      console.log(Interst,AmountVal,Installment,Commission)
      return Interst,AmountVal,Installment,Commission
  }

  function secondInstallment (){
      let Amounts = inputs.bchitValue * (30/100);
      let AmountValue = inputs.bchitValue - Amounts;
     let Installment = AmountValue / inputs.btMonth;
     let Commission = AmountValue * (parseInt(inputs.bcommPercent)/100);
     let Interst = (100 - ((AmountValue/inputs.bchitValue) *100) ) / 100
      let AmountVal = AmountValue
      console.log(Interst,AmountVal,Installment,Commission)
      return Interst,AmountVal,Installment,Commission
      //return {Installment, Commission ,Interst}
  }
  function thirdInstallment(){
      let length = inputs.btMonth - 3
      let Amounts = inputs.bchitValue * (30/100);
      let Value = Amounts / (length);
      let oldValue = inputs.bchitValue - Amounts;
      let arr = []
      for(let i=1;i<=length;i++){
          oldValue = oldValue + Value;
          let AmountVal  = (Math.round(oldValue)*100)/100;
          let Installment = ((Math.round(AmountVal / inputs.btMonth))*100)/100;
          let Commission =((Math.round(AmountVal *(parseInt(inputs.bcommPercent)/100)))*100)/100
          let Interst  =(100 - ((AmountVal/inputs.bchitValue)*100)) / 100
          let obj = {Interst,AmountVal,Installment,Commission}
           //console.log(obj)
          arr.push(obj)
         console.log({Interst,AmountVal,Installment,Commission})
         // return{Interst,AmountVal,Installment,Commission}
      }
  // console.log(arr)
    return arr
  }
  const handleSubmitBonus=(e)=>{
      e.preventDefault()
      let length =inputs.btMonth-3
      if(inputs.btMonth === 1){
        return firstIntallment()
          
      }
      else if(inputs.btMonth === 2){
         return secondInstallment()
      }
      else if(inputs.btMonth ===3 && inputs.btMonth <= length){
          return thirdInstallment()   
      }
      
      let value1 = firstIntallment()
      let value2 = secondInstallment()
      let value3 = thirdInstallment()
     setBdisplay([...bdisplay,{...value1},{...value2},...value3])
     // console.log(value1,value2,value3)
  }






 {
    if(inputs.bpMonth===data.id){
        return <td key={index}>{data.commission}</td>
    }
 
}


<tbody>
                        
                        <tr>
                            <th>Amount payable for current month</th>
                            <td className="table-row">
                           {
                            bdisplay.map(function(data){
                                if(parseInt(inputs.bpMonth) === data.id){
                                    return <td key={data.id}>{data.installment}</td>
                                }
                                //return null
                            })
                           }
                            </td>
                        </tr>
                        <tr>
                            <th>Interest value</th>
                            <td className="table-row">
                            {
                            bdisplay.map(function(data){
                                if(parseInt(inputs.bpMonth) === data.id){
                                    return <td key={data.id}>{data.interest}</td>
                                }
                               // return null
                            })
                           }
                           </td>
                        </tr>
                        <tr>
                            <th>Amount for auctioned person</th>
                            <td className="table-row">
                         {
                            display.map((item,index)=>(
                                <td key={index}>{item.auctionAmount}</td>
                            
                            ))
                         }  
                         </td>
                        </tr>
                        <tr>
                            <th>Bonus amount</th>
                            <td className="table-row">
                            {
                            bdisplay.map(function(data){
                                if(parseInt(inputs.bpMonth) === data.id){
                                    return <td key={data.id}>{data.commission}</td>
                                }
                                //return null
                            })
                           }
                           </td>
                        </tr>
                        </tbody>
                    






















