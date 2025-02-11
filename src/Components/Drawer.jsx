import { useState } from "react";
import "./Drawer.css";
import { IoClose } from "react-icons/io5";
import img1 from "../assets/image_2408.svg";
import { FiCopy } from "react-icons/fi";
import PhoneIcon from '../assets/Vector.svg'
import { IoIosLink } from "react-icons/io";


export default function Drawer({ isOpen, setIsOpen }) {
    const [copied, setCopied] = useState(false);
    const link = "https://annavimm.subfeed.app/project10/t";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
    };
    return (
        <div className="container">

            {/* Overlay */}
            <div
                className={`overlay ${isOpen ? "visible" : "hidden"}`}
                onClick={() => setIsOpen(false)}
            ></div>

            {/* Bottom Sheet Modal */}
            <div className={`drawer ${isOpen ? "open" : ""}`}>
                <IoClose onClick={() => setIsOpen(false)} size={24} style={{ color: "#fff", backgroundColor: "gray", borderRadius: "100%", }} />
                <div className="text-center">
                    <h2 className="font-[700] text-[24px]">Published!</h2>
                    <p className="text-[#ABABAB] font-[500] text-[14px] ">
                        This asset is available online.
                    </p>
                    <p style={{ marginTop: "10px" }} className="text-[#000] font-[500] text-[14px]">
                        <span>Views: 0</span>  <span>Clicks: 1</span>
                    </p>
                </div>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", padding: "20px 0px" }}>
                    <img src={img1} alt="" height={'320px'} width={"220px"} />
                </div>
                <div>
                    <p style={{ color: "#0085FF", fontSize: "14px" }}>Copy this link to your campaigns, ads or link-in-bio.</p>
                </div>
                <div className="container">
                    {/* Link Box */}
                    <div className="link-box">
                        <IoIosLink size={18} style={{ color: "gray" }} />
                        <span className="link-text">{link}</span>
                        <button onClick={copyToClipboard} className="copy-btn">
                            <FiCopy size={18} />
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="button-group">
                        <button className="preview-btn">Preview <img src={PhoneIcon} alt="" height={'20px'} width={'15px'} /></button>
                        <button className="unpublish-btn">Unpublish</button>
                    </div>

                    {/* Copied Tooltip */}
                    {copied && <div className="copied-text">Link copied!</div>}
                </div>
            </div>
        </div>
    );
}
