import { CardWrapper } from "./card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


export const ErrorCard = ({errorLabel}: {errorLabel?: string}) => {
  return (
    <CardWrapper headerLabel={errorLabel || "Oops! Something went wrong"}>
        <div className="w-full flex justify-center items-center">
          <ExclamationTriangleIcon className="text-destructive"/>
        </div>
    </CardWrapper>
  )
}