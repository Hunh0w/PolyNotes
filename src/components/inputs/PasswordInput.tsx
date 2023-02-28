import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

export interface InputError {
    message?: string
}

interface Props {
    defaultValue?: string
    children: string
    onClick?: (evt: MouseEvent) => void
    error?: InputError
    inputRef?: any
    onChange?: any
    sx?: any
}

export default function PasswordArea(props: Props) {

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = (evt: any) => {
        setShowPassword((show) => !show)
        if (props.onClick)
            props.onClick(evt)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <FormControl sx={{ m: 1, width: '25ch', ...props.sx }} variant="outlined" error={props.error ? true : false}>
        <InputLabel htmlFor="outlined-adornment-password" color={props.error ? "error" : "primary"}>{props.children}</InputLabel>
        <OutlinedInput
            error={props.error ? true : false}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            inputRef={props.inputRef}
            onChange={props.onChange}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
            }
            label={props.children}
            defaultValue={props.defaultValue}
        />
        {props.error &&
            <FormHelperText id="component-error-text" sx={{ "color": "#D80000" }}>{props.error.message}</FormHelperText>
        }
    </FormControl>
}