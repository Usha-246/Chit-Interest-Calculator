import React, { useState } from "react";

const BonusInterest = (props) => {

    // State Values
    const [inputs, setInputs] = useState({
        bchitValue: '',
        bcommPercent: 1,
        btMonth: '',
        bpMonth: '',
        auction: ''
    })
    const [val, setVal] = useState({})
    const [overalldata,setoveralldata]=useState([])
    
    //HandleChange 
    const handleChangeBonus = (e) => {
        let { name, value } = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    //HandleClear
    const handleClear = () => {
        setInputs({
            bchitValue: '',
            bcommPercent: '',
            btMonth: '',
            bpMonth: '',
            auction: ''
        })
        setVal('')
    }

    //HandleSubmit
    let bMap = {}
    const handleSubmitBonus = (e) => {
        e.preventDefault()
        let auctionVal = auctionValue()
        let val1 = bonusFirstIntallment()
        let val2 = bonusSecondInstallment()
        let val3 = bonusThirdInstallment()

        let bdisplay = [{ ...auctionVal}, { ...val1 }, { ...val2 }, ...val3];

        for (let i = 0; i < bdisplay.length; i++) {
            Object.assign(bMap, bdisplay[i]);
        
            if (inputs.bpMonth == bMap.id) {
                setVal({...bMap});

                let bonusValue = [{...bMap}]
                console.log(bonusValue)
                
            props.bonusdataFromChild(bonusValue)
            
            }
        }
    }

     //Calculating Auction Amount
    function auctionValue() {
        if (Number(inputs.auction)){
        const auctionAmount = Number(inputs.bchitValue) - Number(inputs.auction)
        return auctionAmount
        }
        return null
        
    }

    //Calculating First Installment 
    function bonusFirstIntallment() {
        let id = 1
        let interest = 0;
        let installment = inputs.bchitValue / inputs.btMonth
        let commission = inputs.bchitValue * (parseInt(inputs.bcommPercent) / 100)
        let amountVal = inputs.bchitValue
        const auctionAmount = parseInt(inputs.bchitValue) - parseInt(inputs.auction)
        return { id, interest, installment,amountVal, commission }
    }

    //Calculating Second Installment
    function bonusSecondInstallment() {
        let id = 2
        let amount = inputs.bchitValue * (30 / 100);
        let amountVal = inputs.bchitValue - amount
        let commission = amountVal * (parseInt(inputs.bcommPercent) / 100)
        let interest = ((100 - ((amountVal / inputs.bchitValue) * 100)) / 100).toFixed(2)
        let installment = amountVal / inputs.btMonth
        const auctionAmount = parseInt(inputs.bchitValue) - parseInt(inputs.auction)
        return { id, interest, installment,amountVal, commission }
    }

    //Calculating Remining Installment
    function bonusThirdInstallment() {
        let amount = inputs.bchitValue * (30 / 100);
        let Value = amount / (inputs.btMonth - 3);
        let oldValue = inputs.bchitValue - amount;
        const arr = []
        for (let i = 1; i <= (inputs.btMonth - 3); i++) {
            let id = i + 2
            oldValue = oldValue + Value;
            let amountVal = (Math.round(oldValue) * 100) / 100;
            let installment = ((Math.round(amountVal / inputs.btMonth)) * 100) / 100;
            let commission = ((Math.round(amountVal * (parseInt(inputs.bcommPercent) / 100))) * 100) / 100
            let interest = ((100 - ((amountVal / inputs.bchitValue) * 100)) / 100).toFixed(2)
            const auctionAmount = parseInt(inputs.bchitValue) - parseInt(inputs.auction)
            let obj = { id, interest, installment,amountVal, commission }

            arr.push(obj)
        }
        return arr
    }


    return (
        <div className="bonus">
            {/* Bonus Interest Form */}
            <form className="bonus-form" onSubmit={handleSubmitBonus}>
                <table className='bonus-formtable'>
                    <tbody>
                        <tr>
                            <td>
                                <div className="bonusLabel">
                                    <label>Chit Value</label>
                                    <input type='text' name="bchitValue" value={inputs.bchitValue} onChange={handleChangeBonus} />
                                </div>
                            </td>
                            <td>
                                <div className="bonusLabel">
                                    <label>Total Months</label>
                                    <input type='text' name="btMonth" value={inputs.btMonth} onChange={handleChangeBonus} />
                                </div>
                            </td>
                        </tr>


                        <tr>
                            <td>
                                <div className="bonusLabel">
                                    <label>Commission Percentage %</label>
                                    <select name="bcommPercent" value={inputs.bcommPercent ? inputs.bcommPercent : 1} onChange={handleChangeBonus}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className="bonusLabel">
                                    <label>Present Month</label>
                                    <input type='text' name="bpMonth" value={inputs.bpMonth} onChange={handleChangeBonus} />
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div className="bonusLabel">
                                    <label>Auction Amount (optional)</label>
                                    <input type='text' name="auction" value={inputs.auction} onChange={handleChangeBonus} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="form-clear" onClick={handleClear} >Clear</button>
                <input type='submit' value='Calculate' className="form-calculate" />
            </form>
            
            {/* Bonus Interest Per Month Calculation Table */}

            <div className="bonus-table" ref={props.amountRef}>
                <table border={1} className="bonusTable">
                    <tbody>
                        <tr>
                            <th>Amount payable for current month</th>
                            <td>{val.installment}</td>
                        </tr>
                        <tr>
                            <th>Interest value</th>
                            <td>{val.interest}</td>
                        </tr>
                        <tr>
                            <th>Amount for auctioned person</th>
                            <td>{val.amountVal}</td>
                        </tr>
                        <tr>
                            <th>Bonus amount</th>
                            <td>{val.commission}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
export default BonusInterest;


