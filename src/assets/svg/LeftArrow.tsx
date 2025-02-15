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


const LeftArrowIcon:React.FC<CustomIconProps> = ({size,color}) => (
  <Svg
    width={size}
    height={size}
    fill="none"
  >
    <Path fill="url(#a)" d="M0 0h50v50H0z" transform="matrix(-1 0 0 1 50 0)" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.02083)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAkElEQVR4nO3XsQrDIBSF4f/1QpcMSof26WPfwkK6OIVmjif8H9xRuEeRqyBJkqQrLUAbtRKoAfuoDjwJDrAnhlhH09Ehyp8QX+BNkGKISRRPIvUkHsDnsGDG6mcT+zhQZq7tlgGWkBA95dFXTy7xiwDV5i9S3fmL1OSdX9M/NC25+Vt86pcRYkuZsJIkSUziB0TBElKM+4d4AAAAAElFTkSuQmCC"
        id="b"
        width={48}
        height={48}
      />
    </Defs>
  </Svg>
)
export default LeftArrowIcon
