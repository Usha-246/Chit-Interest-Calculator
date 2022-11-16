import React, { useState } from "react";
import AmountInterest from "./AmountInterest";
import BonusInterest from "./BonusInterest";
import './App.css'
import  piggy from "./images/piggyBank.png"
import Pdf from 'react-to-pdf'

const Header = ()=>{
    const [isLogging,setIsLogging] = useState()
    const[dropdown,setDropDown] =useState(false)

       const handleClick = (e)=>{
        const {name} = e.target;
        setIsLogging(name)
    }
    
    return(
        <div>
            
            <div className="header">
                <div className="num"><span>72</span></div>
                <div className="text"><span >BUSINESS <br/> TOOLS</span></div>
                <img src={piggy} alt="piggy"/>
                <div className="text"><span>CHIT INTEREST <br/>CALCULATOR</span></div>
            </div>

            
            <div className="menu-button">
            <div className="buttons">
            
              <button className="button1" name="amount" onClick={handleClick}>Auctioned Amount & Interest</button> 
              <button className="button2" name="bonus" onClick={handleClick}>Bonus & Interest</button>          
                
            </div>
            <div className="download">
                <button className="button3" onClick={()=>setDropDown((prev)=>!prev)}>Download</button>
                {
                    dropdown && (
                        <div className="dropdown">
                        <ul>
                            
                            <li><button>PDF</button></li>
                            <li><button>CSV(Excel)</button></li>
                        </ul>
                    </div>
                    )
                }
                    
            </div>
            
            </div>
                
                {
                
                    (isLogging==='amount') ? <AmountInterest/> : <BonusInterest/>
                
                }
                
         </div>
    )
}
export default Header;