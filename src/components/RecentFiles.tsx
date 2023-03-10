import {
    Box,
    Card,
    CardActionArea,
    CardContent, CardMedia,
    Chip,
    Container,
    Grid,
    Grow,
    Slide,
    SlideProps,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {ArrowLeft, ArrowRight} from "@mui/icons-material";
import React, {useState} from "react";

const elements = [
    "coucou.pnote",
    "hello.pnote",
    "hola.pnote",
    "welcome.pnote",
    "bienvenue.pnote",
    "moto.pnote",
    "car.pnote",
    "voiture.pnote",
    "camion.pnote"
];

interface Animation {
    display: boolean
    direction: "right" | "left"
}

export default function RecentFiles(props: {}) {

    const [page, setPage] = useState(0)

    const [animation, setAnimation] = useState<Animation>({display: true, direction: "right"})

    const getPageElements = () => {
        const startIndex = page*4;
        let element_list = [];
        for(let i = 0; i < 4; i++){
            const element = elements[startIndex+i]
            element_list.push(element)
        }
        return element_list
    }

    const prevPage = () => {
        if(page <= 0) return;
        setAnimation({display: false, direction: "left"})

        setTimeout(() => {
            setPage(page-1);
            setAnimation({display: true, direction: "right"})
        }, 250);
    }

    const nextPage = () => {
        const startIndex = (page+1)*4;
        if(elements.length-1 < startIndex)
            return;
        setAnimation({display: false, direction: "right"})
        setTimeout(() => {
            setPage(page+1);
            setAnimation({display: true, direction: "left"})
        }, 250);
    }

    return <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={5}>
        <IconButton onClick={prevPage}>
            <ArrowLeft fontSize={"large"}  />
        </IconButton>
        <Grid container spacing={4} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {getPageElements().map((value, index) => {
                return <Slide in={animation.display} direction={animation.direction}>
                    <Grid item key={index}>
                        <Card sx={{width: "300px", height: "320px", "cursor": value?"pointer":"default"}} onClick={() => console.log("hello")}>
                            <CardActionArea>
                                {value && <>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                                        alt="file preview"
                                    />
                                    <CardContent sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {value}
                                        </Typography>
                                    </CardContent>
                                </>
                                }
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Slide>
            })}
        </Grid>
        <IconButton onClick={nextPage}>
            <ArrowRight fontSize={"large"}  />
        </IconButton>
    </Box>
}
