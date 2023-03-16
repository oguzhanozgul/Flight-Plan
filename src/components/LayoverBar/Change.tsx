import change0 from "../../assets/images/Change0.svg";
import change1 from "../../assets/images/Change1.svg";
import change2 from "../../assets/images/Change2.svg";
import change3 from "../../assets/images/Change3.svg";
import change4 from "../../assets/images/Change4.svg";
import change5 from "../../assets/images/Change5.svg";
import { Image } from "@mantine/core";

interface Props {
  layovers: number;
}

export function Change({ layovers }: Props) {
  switch (layovers) {
    case 0:
      return (
        <Image src={change0} />
      );
    case 1:
      return (
        <Image src={change1} />
      );
    case 2:
      return (
        <Image src={change2} />
      );
    case 3:
      return (
        <Image src={change3} />
      );
    case 4:
      return (
        <Image src={change4} />
      );
    case 5:
      return (
        <Image src={change5} />
      );

    default:
      break;
  }

  return (
    <Image src={change0} />
  );
}

export default Change;
