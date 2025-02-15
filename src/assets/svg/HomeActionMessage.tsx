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

const HomeActionMessage:React.FC<CustomIconProps> = ({size}) => (
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
        <Use xlinkHref="#b" transform="scale(.02083)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAIK0lEQVR4nO2YC1BTZxbH70BAgUAg5sZHrfIWQiFBt+66XWu3u2tdV9t9DKsVFZCHjyoVWruv2WE6sy3tqF11Uau2irwNIISEJBhCAEF5uI5Wu7sWLiIkBBMIoCiCwn/nu7yt3Sm7KWZ2/M+cyZlzvnvzO//7fZkkFPVMz/RM4wqT2tslXgq3e6dObp9Y08ZJuDDAebu6jRNfWeQQX7meSoIdNQ0KKbGsFas6c0NUZn2w0jwQrDS3BxebNCK5KVYkheOTr9pz2c/u3for9u/UwT6xBpyEC3DYXQWHt8/DMb4Cjrt0mLFTWzdzh3bhdwUuUd6hJepOrVjdCbGqAyGqDgQrzQguNuMFhQlBchOCitobAgtNoZOvTLzib59Y32GfWAtOwkVwEqpH4CvhGF8Ox11lmLGzFDPf0mDGdrXBaZdyvrXhRepuvkTdeeM/w9+GSHYbgQXt94Ly214cvjJJx7FLrL027nr1466PwJ/DzB1qOG1XwnmbvMLaA4hLOvO+DbyosJ0MgICzxtaQNKMLZZdYG8lJvDhhy0x0Xcu6PnNHCZy2q+C0rRjOWxVwjiuCc5xslbXgg1WmxWJVx9AU4BGQb4R/nuH3FCfhQgnncdfHtsy468PwcrjEyeASWwCX6PxT1hogRNXx0VThF+W1wU/adpVy2F1lGnd9ZMuMua6G0zayZRRw3loEl7hCFp4bkw9utPSytQYQq8zKqcL755LQD1IO8RX9BH6y6xO3jJxsF7jEFoIbcxbc6Dy4RkvBjcpustYAIUpz9dThDfCTGkA57CxrHXd94kEddV02wfVcuG45A9eoHLhGZNZZa4DgYrP0v4H3PaMfoGbs1Ei/flCJ60XjrscMu07g3aKy4RaZCV5E2mFrDRCkML87VXi/M3r45LRWUo5vqddMdl3+BNelrOtukVngRWQQeLhvOr3GWgMEKk2hU4X3zdHDJ7Mlhr2B09ZizejH4/BBHXU99zHX08HbTOBTwQs/mWKtAYKKTH+aKrx3dsvlFTpw2Btw44oEznGF/xx3PW/c9agsuEUS19Phvvk03DedgsfGz+G+4fgdfvhBtycBlUXTEeXR9Je6GPpOeTQNXRQ9qI2ku0s30xbNJtqi2SD0Hl27QgeOSNbeOkX41oXZNz0nvSkvosCdG5Ofw42WDk12PWPE9VP9vPCTGR7hJ0we4SfA33AM/PVH4ifeQxpG2eu2CFLKY2hUxA4HyXVbaJRF0SiLoKHdSHdJw6ixL2QimSlsDP6ssWfRWWPaojzjvW/cNtktxQvSm+d+4+N0jpBKXKMyP3SLzFDwItJr3DanFrlvPPkHj3Unnyd9OiyFy3/z0z/OWn+4c9a6v10bva4iTjC3PFZ4RRdNoyKGRmUcjQoSMTRGngI7QMk6wQP5G4LlYwMU3j4XWNDeG1jQniyStvBJzTvfKPTPbUvwk+oL/KSGi75n9Erf7NZ9Ppn6ZZS15BF2jCf47V9fHnW+PFpwcdRp8vq1JxBJo+RNGspf0lCsFXTI1gpnk2sDCwzLQ/KNQuppqixiVjgBr4wToumwFxoO+qBm93MoixSiLEKI6l3zcGO/NxoPeUO7aTYUa2nIf0H/hbIVlW6iD2ojaLR85oPe0lDc1y1FX8UP8aDyR2yQnNRIz5jhD8UaGrLVwnLKVlS6UZBcHjv7Ua9GgvvlP8CD88vRX/1jDFz4CRskJzXS6y2VoCJmzn3Zz4VqylakCad3XX1/wcB93Yt4ULkcA9Wv4mHNa3hUu5oNkpMa6ZE1XyZ798lWCU9StiLNBuFPG1P8hvoqlqG/6hU8rFmJwfo1GLz0xnDUr2FrpEfWGNKDhmSv0e9RtqCbWb6hNfv4VW1pgeireAn91a/iUe0qDF56HUOXf80GyUmN9Miau2oJyt7j65gsr5CnzU81S7331KV4oEcpZg8r2e8Pa1ZhsP51DP39V2yQnNRIj6whh7n2gAeac7w/sYknUJviMdirEbOHtL9qBQYu/gyP6lZjsH4tGyQnNdJjD7JGjLrDZACv31C2oAv73fh3S4Jwr+x76Kt8id3rBJgcXvYAs/CvsD2yhqytOcoXUbakHqV/S68mhP2UIaAPzr/MQpMgOamRHllzR+XXTNmauhWev7ujCmAB72mX4L7u++grX8YGyUltGD4AXQrPPZStCVLKvkvuqehR+eNuiYiFJXt9OELYGul1KzyLyFrKFgWpyLFL7vVpt8ILPUpf9Cj9R8IXpNal8DxC1lC2rsYsL7Sf9YJFPhwkb8z0AmXTSoKduKR7pVhl2Xc91WfoH6e9MDGupfoM+eYY93pmG1ZO17/c30rkJ+GSMku85FxXi1htQbCyE8dztk6CJ3E0Yyu8s9rgmdGGBWn6WwtOtcZTSSO/aZ+WQnXdvou1XVcl57owCv+CogOSQgM+yElCVfpSVKUtxfuZSQjIambhF6YZ8HyqHvM/b8XcE7e+mHdc7/9U4CVaizhUa+l4HF4kMyOgwIRF+bfhl9sO3zPGMecnws870YI5x25BeORmp+DIrSXTCr9EY+Et1lqa/lf42UebQR++CcHBphbuvn8Jpm8AreXPVoM/1AT+AQa8/UzytA0gOdd13Zrw7p8w4O1taJu2AcTqzgdWhd/XCNePG+C2/zr7t8p3ruDizj5rw3OTvwIv+QuPaRkgSGHeE1hobggoMDGL8m8zvlIj45PTxnhlGRjPdAOz8LSemZ+qZ577rJWZd7yFmXPsFjP76E1GkNLEzDrEMPwDDOO+n2F4exsZ7scNjEvyV4zTBzc+mhb4Z3qm/zP9G16JDRt0mVkSAAAAAElFTkSuQmCC"
        id="b"
        width={48}
        height={48}
      />
    </Defs>
  </Svg>
)
export default HomeActionMessage
