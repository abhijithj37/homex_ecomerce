import { AiFillLinkedin, AiFillPlusCircle, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import style from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

function Footer() {


  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/about-us");
  };
  return (
    <div className={style.footer_container}>
      <div className={style.footer}>
        <div className={style.footer_item}>
          <div className="">
            <p className={style.footer_main_head}>WE LISTEN</p>
            <p className={style.footer_main_head}>YOU PROSPER</p>
            <p className={style.footer_liks_text}>
              Awafi future Building 1/98 Al Ghubra <br /> south Muscat Oman Company
              <br />{" "}
            </p>

            <div className={style.email_container}>
              <p className={style.email_text}>EMAIL ADDRESS</p>
              sales@homexsolution.com
            </div>
          </div>

          <div className="">
            <p className={style.footer_head}>SITE</p>
            <p className={style.footer_liks} onClick={handleClick}>About Us</p>
            <p className={style.footer_liks}>Twitter</p>
            <p className={style.footer_liks}>Instagram</p>
          </div>

          <div className="">
            <p className={style.footer_head}>CONTACT</p>
            <p className={style.footer_liks}>sales@homexsolution.com</p>
            <p className={style.footer_liks}>+91 *0000000</p>
            <AiFillLinkedin size={26} style={{ cursor: "pointer",marginRight:"10px" }} />
            <AiOutlineInstagram  size={26} style={{ cursor: "pointer",marginRight:"10px" }}/>
            <AiOutlineTwitter size={26} style={{ cursor: "pointer" }}/>

          </div>
        </div>
      </div>
      <p className={style.text_copyright}>
        2023 sales@homexsolution.com | Terms & Conditions | Privacy Policy
      </p>
    </div>
  );
}

export default Footer;
