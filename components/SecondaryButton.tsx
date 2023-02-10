import { Button, SpecializedButtonProps } from "./Button";

export function SecondaryButton(props: SpecializedButtonProps){
    return <Button
        {...props}
        backgroundColor="#e6e6e6"
        color="#000"
    />
}