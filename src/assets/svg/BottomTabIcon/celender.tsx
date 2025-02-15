import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

interface CustomIconProps {
    size: number;
    color: string;
    focused: boolean;
  }

const CalendarIcon: React.FC<CustomIconProps> = ({size=24,color='#3B3B3B',focused}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
  >
    <Path
      fill={color}
      d="M5.571 1.625V3.25H2.786C1.248 3.25 0 4.342 0 5.688v2.437h26V5.687c0-1.345-1.248-2.437-2.786-2.437H20.43V1.625C20.429.726 19.599 0 18.57 0c-1.027 0-1.857.726-1.857 1.625V3.25H9.286V1.625C9.286.726 8.456 0 7.429 0 6.4 0 5.57.726 5.57 1.625ZM26 9.75H0v13.813C0 24.907 1.248 26 2.786 26h20.428C24.752 26 26 24.908 26 23.562V9.75Z"
    />
  </Svg>
)
export default CalendarIcon
