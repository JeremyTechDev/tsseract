import { useState, useEffect, FC } from 'react'
import { Grid, Typography, IconButton } from '@material-ui/core'
import ArrowBack from '@material-ui/icons/ArrowBack'

import useStyles from './styles'

interface Props {
    cover: string
    title?: string
}

const PostHero: FC<Props> = ({ cover, title }) => {
    const classes = useStyles()
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        function handleScroll() {
            setOffset(window.pageYOffset);
        }

        window.addEventListener('scroll', handleScroll);

        return () =>
            window.removeEventListener('scroll', handleScroll);

    }, [offset]);


    return (
        <>
            <IconButton className={classes.backBtn} size='medium' title='Back Home'>
                <ArrowBack fontSize='large' />
            </IconButton>

            <Grid
                className={classes.hero}
                container
                direction="column"
                justify="space-between"
            >
                <Grid item>
                    <img
                        alt={title || ''}
                        className={classes.img}
                        src={cover}
                        style={{ transform: `translateY(${offset * 0.5}px)` }}
                    />
                </Grid>


                <Grid item>
                    <Typography className={classes.title} variant="h1">
                        {title}
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default PostHero;
