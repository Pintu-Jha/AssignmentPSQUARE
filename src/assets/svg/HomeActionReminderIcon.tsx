import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"

    
interface CustomIconProps {
    size: number;
    color: string;
  }


const HomeActionReminderIcon:React.FC<CustomIconProps> = ({size}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
  >
    <Path fill="url(#a)" d="M0 0h34v34H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={64}
        height={64}
      />
    </Defs>
  </Svg>
)
export default HomeActionReminderIcon
