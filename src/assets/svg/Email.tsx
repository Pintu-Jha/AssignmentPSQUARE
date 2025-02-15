import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface CustomIconProps {
    size: number;
    color: string;
  }

const EmailIcon: React.FC<CustomIconProps> = ({size,color}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
  >
    <Path
      fill={color}
      d="M2.5 6.875a.627.627 0 0 0-.625.625v.863l6.738 5.532a2.185 2.185 0 0 0 2.778 0l6.734-5.532V7.5a.627.627 0 0 0-.625-.625h-15Zm-.625 3.914V17.5c0 .344.281.625.625.625h15a.627.627 0 0 0 .625-.625v-6.71l-5.547 4.554a4.063 4.063 0 0 1-5.156 0l-5.547-4.555ZM0 7.5C0 6.121 1.121 5 2.5 5h15C18.879 5 20 6.121 20 7.5v10c0 1.379-1.121 2.5-2.5 2.5h-15A2.502 2.502 0 0 1 0 17.5v-10Z"
    />
  </Svg>
)
export default EmailIcon
