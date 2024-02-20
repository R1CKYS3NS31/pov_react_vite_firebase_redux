import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material'
import React from 'react'

export const Logo = () => {
    const theme = useTheme()
    return (
        <Typography variant='h1' color={theme.palette.grey[900]}>PoV</Typography>
    )
}
