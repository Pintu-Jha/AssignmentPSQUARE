import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

interface CustomIconProps {
    size: number;
    color: string;
  }

const PassWordIcon:React.FC<CustomIconProps> = ({size,color}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
  >
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M6.429 5.625V7.5h7.142V5.625C13.571 3.898 11.973 2.5 10 2.5S6.429 3.898 6.429 5.625ZM3.57 7.5V5.625C3.571 2.52 6.451 0 10 0c3.55 0 6.429 2.52 6.429 5.625V7.5h.714C18.719 7.5 20 8.621 20 10v7.5c0 1.379-1.281 2.5-2.857 2.5H2.857C1.281 20 0 18.879 0 17.5V10c0-1.379 1.281-2.5 2.857-2.5h.714Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default PassWordIcon
