import pergolaLogo from "../../../assets/pergolo.logo.png";
import { Link } from "react-router-dom";

export const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center shrink-0">
      <img
        src={pergolaLogo}
        alt="Pergola Haus"
        className="h-10 w-auto object-contain"
      />
    </Link>
  );
};
