import {
    Box,
    Button,
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
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, { useState } from "react";

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

interface ElementsDisplayed {
    elements: any[]
    index: number
}

export default function RecentFiles(props: {}) {

    const [elementList, setElementList] = useState<any[]>(elements)
    const [index, setIndex] = useState(0);

    const [animation, setAnimation] = useState<Animation>({ display: true, direction: "right" })

    const getPageElements = () => {
        let element_list: any[] = [];

        let counter = 0;
        for (let i = 0; i < 4; i++) {
            let element = elements[index + i];
            if (!element) {
                element = elements[counter];
                counter++
            }
            element_list.push(element);
        }
        return element_list;
    }

    const getNextIndex = () => {
        let counter = 0;
        for (let i = 0; i < 4; i++) {
            let element = elements[index + i];
            if (!element)
                counter++
        }
        return counter > 0 ? counter : index + 4;
    }

    const getPrevIndex = () => {
        let counter = 0;
        for (let i = 0; i < 4; i++) {
            let element = elements[index - i];
            if (!element)
                counter++;
        }
        return counter > 0 ? elementList.length - 1 - counter : index - 4;
    }

    const prevPage = () => {

        setAnimation({ display: false, direction: "left" })

        setTimeout(() => {
            setIndex(getPrevIndex());
            setAnimation({ display: true, direction: "right" })
        }, 250);
    }

    const nextPage = () => {

        setAnimation({ display: false, direction: "right" })
        setTimeout(() => {
            setIndex(getNextIndex());
            setAnimation({ display: true, direction: "left" })
        }, 250);
    }

    return <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mt={5} borderRadius={2} border="1px dashed black" style={{ height: "100%" }}>
        <Box height={"100%"}>
            <Button color="inherit" variant="text" onClick={prevPage} style={{ height: "100%" }}>
                <ArrowLeft fontSize={"large"} />
            </Button>
        </Box>

        <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} py={5}>
            {getPageElements().map((value, index) => {
                return <Slide in={animation.display} direction={animation.direction} key={index}>
                    <Grid item key={index}>
                        <Card sx={{ width: "300px", height: "320px", "cursor": value ? "pointer" : "default" }} onClick={() => console.log("hello")}>
                            <CardActionArea>
                                {value && <>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image="https://cdn-icons-png.flaticon.com/512/124/124837.png"
                                        alt="file preview"
                                    />
                                    <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        <Box height={"100%"}>
            <Button color="inherit" variant="text" onClick={nextPage} style={{ height: "100%" }}>
                <ArrowRight fontSize={"large"} />
            </Button>
        </Box>
    </Box>
}
