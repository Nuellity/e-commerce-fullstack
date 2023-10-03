import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../utils/motion";
import "../pages/Homepage/home.css";

export const TypingText = ({ title, textStyles }) => {
  return (
    <motion.p variants={textContainer} className={`text-center ${textStyles}`}>
      {Array.from(title).map((title, index) => (
        <motion.span
          variants={textVariant2}
          className="main-header"
          key={index}
        >
          {title === " " ? " " : title}
        </motion.span>
      ))}
    </motion.p>
  );
};
