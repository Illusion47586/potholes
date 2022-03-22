import { IconProps, IconWeight } from "phosphor-react";
import { MouseEventHandler } from "react";

import styles from "./button.module.scss";

// enum ButtonHeirarchy {
//   primary,
//   secondary,
// }

// enum ButtonSize {
//   normal, // 0
//     small, // 1
//   large, // 2
// }

// interface Props {
//   text?: string;
//   icon?: React.ForwardRefExoticComponent<
//     IconProps & React.RefAttributes<SVGSVGElement>
//   >;
//   heirarchy?: ButtonHeirarchy;
//   color?: ButtonColor;
//   size?: ButtonSize;
//   iconWt?: IconWeight;
//   onClick: MouseEventHandler<HTMLButtonElement>;
// }

const Button = (props) => {
  const value = `${props.heirarchy?.toString() ?? "0"}`;

  return (
    <button
      data-value={value}
      data-size={props.size?.toString() ?? "0"}
      className={styles.button}
      onClick={props.onClick}
    >
      {props.text && <p>{props.text}</p>}
      {props.icon && (
        <props.icon className={styles.icon} weight={props.iconWt ?? "fill"} />
      )}
    </button>
  );
};

export default Button;
