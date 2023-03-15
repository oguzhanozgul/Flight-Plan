import { faStar as faStarFull, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import "./Rating.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  rating: number;
}

export function Rating({ rating }: Props) {
  const fullStarCount = Math.floor(rating);
  const halfStarCount = rating - fullStarCount >= 0.5 ? 1 : 0;
  const emptyStarCount = 5 - fullStarCount - halfStarCount;

  return (
    <div className="rating">
      {Array.from({ length: fullStarCount }, (_, i) => <FontAwesomeIcon icon={faStarFull} key={i} color="yellow" />)}
      {Array.from({ length: halfStarCount }, (_, i) => <FontAwesomeIcon icon={faStarHalfStroke} key={i} color="yellow" />)}
      {Array.from({ length: emptyStarCount }, (_, i) => <FontAwesomeIcon icon={faStarEmpty} key={i} color="yellow" />)}
    </div>
  );
}

export default Rating;
