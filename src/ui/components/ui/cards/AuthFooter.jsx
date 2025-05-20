import { Link, Stack, Typography } from "@mui/material"


export const Copyright = (props) => {
    return (
        <Typography
            variant="subtitle2"
            component={Link} href="/"
            target="_black"
            underline="hover"
            {...props}
        >Copyright &copy; PoV
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
export const AuthFooter = () => {
    return (<Stack direction={'row'} justifyContent={'space-between'}>
        <Typography
            variant="subtitle2"
            component={Link} href="/"
            target="_black"
            underline="hover">
            PoV
        </Typography>
        <Copyright />
    </Stack>)
}
