import { Button, SpecializedButtonProps } from "./Button";

export function PrimaryButton(props: SpecializedButtonProps){
    return <Button
        {...props}
        backgroundColor="#2aa2a2"
        color="#fff"
    />
}