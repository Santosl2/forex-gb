import { ReactElement } from "react";

import { IconProps } from "phosphor-react";

export type ListItemProps = {
  id: number;
  name: string;
  icon:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | ReactElement
    | any;
  href: string;
};
