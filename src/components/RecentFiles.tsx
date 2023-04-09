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
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {UserContext} from "./auth/AuthChecker";
import {PolyFileBase} from "./files/PolyFileBase";
import {PolyFile} from "./files/impl/PolyFile";
import {useNavigate} from "react-router-dom";

interface Animation {
    display: boolean
    direction: "right" | "left"
}

interface ElementsDisplayed {
    elements: any[]
    index: number
}

export default function RecentFiles(props: {}) {

    const {files} = useContext(UserContext);
    const elements = files.filter((file) => !file.isDirectory);

    const [index, setIndex] = useState(0);
    const navigate = useNavigate();

    const [animation, setAnimation] = useState<Animation>({ display: true, direction: "right" })

    const getPageElements = () => {
        if(elements.length === 0)
            return [null,null,null,null];

        let element_list: any[] = [];

        let counter = 0;
        for (let i = 0; i < 4; i++) {
            let element = elements[index + i];
            if (!element && elements.length > 4) {
                element = elements[counter];
                counter++
            }
            element_list.push(element);
        }
        return element_list;
    }

    const getNextIndex = () => {
        if(elements.length-1 < index)
            return 0;
        if(elements.length <= 4)
            return 0;

        let currentIndex = index;
        let counter = 0;
        for (let i = 0; i < 4; i++) {
            if (!elements[currentIndex + counter]) {
                currentIndex = 0;
                counter = 1;
                continue;
            }
            counter++;
        }

        const newIndex = currentIndex + counter;
        if(elements.length-1 < newIndex)
            return 0;
        return newIndex;
    }

    const getPrevIndex = () => {
        if(elements.length <= 4)
            return 0;

        let currentIndex = index;
        let counter = 0;
        for (let i = 0; i < 4; i++) {
            if (!elements[currentIndex + counter]){
                currentIndex = elements.length - 4;
                counter = 0;
                continue;
            }
            counter++;
        }
        return currentIndex + counter;
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

    return <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} borderRadius={2} mt={5}>
        <Box height={"100%"}>
            <Button color="inherit" variant="text" onClick={prevPage} style={{ height: "100%" }}>
                <ArrowLeft fontSize={"large"} />
            </Button>
        </Box>

        <Grid container spacing={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {getPageElements().map((value: PolyFile, index) => {
                return <Slide in={animation.display} direction={animation.direction} key={index}>
                    <Grid item key={index}>
                        <Card sx={{ width: "230px", height: "250px", "cursor": value ? "pointer" : "default" }} onClick={() => navigate("/page/"+value.id)}>
                            <CardActionArea>
                                {value && <>
                                    <CardMedia
                                        component="img"
                                        height="170"
                                        image="https://cdn-icons-png.flaticon.com/512/124/124837.png"
                                        alt="file preview"
                                    />
                                    <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {value.name}
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
