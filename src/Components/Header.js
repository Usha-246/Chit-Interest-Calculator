import React, { useState, useRef, useEffect } from "react";
import AmountInterest from "./AmountInterest";
import BonusInterest from "./BonusInterest";
import './App.css'
import piggy from "./images/piggyBank.png";
import { jsPDF } from 'jspdf'
import html2canvas from "html2canvas";
import { CSVLink } from "react-csv";

const Header = () => {

    //State Value
    const [isLogging, setIsLogging] = useState()
    const [dropdown, setDropDown] = useState(false)
    const [excel, setExcel] = useState('')

    //Data from Child
    const getDataFromChild = (arr) => {
        setExcel(arr)

    }
   

    //HandleClick For Page Toggle
    const handleClick = (e) => {
        const { name } = e.target;
        setIsLogging(name)
    }

    //React to Pdf Convension
    const inputRef = useRef(null);
    const printDocument = () => {
        html2canvas(inputRef.current).then(function (canvas) {
            let htmlWidth = canvas.width;
            let htmlHeight = canvas.height;
            let top_left_margin = 15;
            let pdfWidth = htmlWidth + (top_left_margin * 2)
            let pdfHeight = (pdfWidth * 1.5) + (top_left_margin * 2)
            let canvas_image_width = htmlWidth;
            let canvas_image_height = htmlHeight;
            let totalPdfPage = Math.ceil(htmlHeight / pdfHeight) - 1
            canvas.getContext('2d')
            const imageData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'pt', 'a3');
            pdf.addImage(imageData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height)
            for (let i = 1; i <= totalPdfPage; i++) {
                pdf.addPage([pdfWidth, pdfHeight], 'p')
                pdf.addImage(imageData, 'JPG', top_left_margin, -(pdfHeight * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height)
            }
            pdf.save('download.pdf')
        })
    }


    return (
        <div>

            <div className="header">
                <div className="num"><span>72</span></div>
                <div className="text"><span >BUSINESS <br /> TOOLS</span></div>
                <img src={piggy} alt="piggy" />
                <div className="text"><span>CHIT INTEREST <br />CALCULATOR</span></div>
            </div>


            <div className="menu-button">
                <div className="buttons">

                    <button className="button1" name="amount" onClick={handleClick}>Auctioned Amount & Interest</button>
                    <button className="button2" name="bonus" onClick={handleClick}>Bonus & Interest</button>

                </div>
                <div className="download">
                    <button className="button3" onClick={() => setDropDown((prev) => !prev)}>Download</button>
                    {
                        dropdown && (
                            <div className="dropdown">
                                <ul>
                                    <li><button onClick={printDocument}>PDF</button></li>
                                    <CSVLink data={excel}>CSV(Excel)</CSVLink>
                                </ul>
                            </div>
                        )
                    }

                </div>

            </div>

            {

                (isLogging === 'amount') ? <AmountInterest amountRef={inputRef} dataFromChild={getDataFromChild} /> :
                                            <BonusInterest amountRef={inputRef} />

            }

        </div>
    )
}
export default Header;