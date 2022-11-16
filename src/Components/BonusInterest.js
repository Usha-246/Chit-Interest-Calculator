import React, { useState } from "react";

const BonusInterest =()=>{

    const [inputs, setInputs] = useState({
        bchitValue: '',
        bcommPercent:'',
        btMonth:'',
        bpMonth:'',
        auction:''
    })
    const [bdisplay,setBdisplay] = useState([])
    const handleChangeBonus = (e)=>{
        let {name,value} = e.target
        setInputs({
            ...inputs,
            [name]:value
        })
    }

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
       setBdisplay([...bdisplay,{value1},{value2},value3])
       // console.log(value1,value2,value3)
    }

return(
        <div className="bonus">

            <form className="bonus-form" onSubmit={handleSubmitBonus}>
            <table className='bonus-formtable'>
                <tbody>
                <tr>
                    <td>
                    <div className="bonusLabel">
                        <label>Chit Value</label>
                        <input type='text' name="bchitValue" value={inputs.bchitValue} onChange={handleChangeBonus}/>
                    </div>
                    </td>
                    <td>
                    <div className="bonusLabel">
                        <label>Total Months</label>
                        <input type='text' name="btMonth" value={inputs.btMonth} onChange={handleChangeBonus}/>
                    </div>
                    </td>
                </tr>
                
                
                <tr>
                    <td>
                    <div className="bonusLabel">
                        <label>Commission Percentage %</label>
                        <select name="bcommPercent" value={inputs.bcommPercent} onChange={handleChangeBonus}>
                    <option value='1%'>1%</option>
                    <option value='2%'>2%</option>
                    <option value='3%'>3%</option>
                    <option value='4%'>4%</option>
                    <option value='5%'>5%</option>
                    <option value='6%'>6%</option>
                    <option value='7%'>7%</option>
                    <option value='8%'>8%</option>
                    <option value='9%'>9%</option>
                    <option value='10%'>10%</option>
                    </select>
                    </div>
                    </td>
                    <td>
                    <div className="bonusLabel">
                        <label>Present Month</label>
                        <input type='text' name="bpMonth" value={inputs.bpMonth} onChange={handleChangeBonus}/>
                    </div>
                    </td>
                </tr>

                <tr>
                    <td>
                    <div className="bonusLabel">
                        <label>Auction Amount (optional)</label>
                        <input type='text' name="auction" value={inputs.auction} onChange={handleChangeBonus}/>
                    </div>
                    </td>
                </tr>
                </tbody>
            </table>
                    <button className="form-clear">Clear</button>
                    <input type='submit' value='Calculate' className="form-calculate"/>
            </form>
            
            <div className="bonus-table">
                <table border={1} className="bonusTable">
                    <tbody>
                    <tr>
                        <th>Amount payable for current month</th>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <th>Interest value</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Amount for auctioned person</th>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Bonus amount</th>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default BonusInterest;