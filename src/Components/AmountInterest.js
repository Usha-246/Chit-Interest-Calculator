import React, {  useState } from "react";

const AmountInterest =()=>{
    const [values, setValues] =useState({
        ChitValue:'',
        commPercent : '',
        tMonth:'',
        pMonth:''
    })
    const [display, setDisplay] = useState([])
    const [val,setVal] = useState([])
    const ref = React.createRef()

    const handleChange=(e)=>{
        const {name,value} =e.target;
        setValues({
            ...values,
            [name]:value
        })
    }
    const handleSubmit = (e)=>{
            e.preventDefault()
        let data1 = firstIntallment()
        let data2 = secondInstallment()
        let data3 = thirdInstallment()
        // console.log(data1.Installment)
        // console.log(data2)
        // console.log(data3)
        setDisplay([...display,{...data1},{...data2}])
        setVal(data3)
        console.log([data1,data2,data3])
    }
   
    
     function firstIntallment(){
        let Installment =values.ChitValue /values.tMonth;
        let Commission =values.ChitValue * (parseInt(values.commPercent)/100)
        let Interst = 0
        let AmountVal = values.ChitValue
        return{Interst,AmountVal,Installment,Commission}
    }
    function secondInstallment (){
        let Amounts = values.ChitValue * (30/100);
        let AmountValue = values.ChitValue - Amounts;
       let Installment = AmountValue / values.tMonth;
       let Commission = AmountValue * (parseInt(values.commPercent)/100);
       let Interst = (100 - ((AmountValue/values.ChitValue) *100) ) / 100
        let AmountVal = AmountValue
        return{Interst,AmountVal,Installment,Commission}
        //return {Installment, Commission ,Interst}
    }

    function thirdInstallment(){
        let length = values.tMonth - 3
        let Amounts = values.ChitValue * (30/100);
        let Value = Amounts / (length);
        let oldValue = values.ChitValue - Amounts;
        const arr = []
        for(let i=1;i<=length;i++){
            oldValue = oldValue + Value;
            let AmountVal  = (Math.round(oldValue)*100)/100;
            let Installment = ((Math.round(AmountVal / values.tMonth))*100)/100;
            let Commission =((Math.round(AmountVal *(parseInt(values.commPercent)/100)))*100)/100
            let Interst  =(100 - ((AmountVal/values.ChitValue)*100)) / 100

             let obj = {Interst,AmountVal,Installment,Commission}
             console.log(obj)
            arr.push(obj)
            //console.log(arr)
            
          // console.log({Interst,AmountVal,Installment,Commission})
           // return{Interst,AmountVal,Installment,Commission}
        }
        console.log(arr)
        return arr
    }
   
    return(
        <div className="amount">
            <div className="amountForm">
            <form className="formValue" onSubmit={handleSubmit}>
                <div className="form-label">Chit Value</div>
                <div className="form-input"><input type='text' name="ChitValue" value={values.ChitValue} onChange={handleChange}/></div>

                <div className="form-label">Commission Percentage %</div>
                <div className="form-input"><select  name="commPercent" value={values.commPercent} onChange={handleChange}>
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
                    </select></div>

                <div className="form-label">Total Months</div>
                <div className="form-input "><input type='text' name="tMonth" value={values.tMonth} onChange={handleChange}/></div>

                <div className="form-label">Present Month</div>
                <div className="form-input"><input type='text' name="pMonth" value={values.pMonth} onChange={handleChange}/></div>


               <button className="form-clear" name="Clear">Clear</button>
                <input type='submit' value="Calculate" className="form-calculate"/>
            </form>
            </div>
            <div className="amountTable" ref={ref}>
                <table className="table">
                    <thead>
                    <tr>
                        <th>S No</th>
                        <th>Interest</th>
                        <th>Auctionated Amount</th>
                        <th>Installment</th>
                        <th>Commission</th>
                    </tr>
                </thead>
                <tbody>
                    
                   {
                    display.map((data1,index)=>(
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{data1.Interst}</td>
                            <td>{data1.AmountVal}</td> 
                            <td>{data1.Installment}</td> 
                            <td>{data1.Commission}</td>
                        </tr>
                    ))
                    
                   }
                    {
                    val.map((data,index)=>(
                        <tr key={index+2}>
                            <td>{index+2}</td>
                            <td>{data.Interst}</td>
                            <td>{data.AmountVal}</td> 
                            <td>{data.Installment}</td> 
                            <td>{data.Commission}</td>
                        </tr>
                    ))
                    
                   }
                      
                </tbody>
                </table>
            </div>
        </div>
    )
}
export default AmountInterest