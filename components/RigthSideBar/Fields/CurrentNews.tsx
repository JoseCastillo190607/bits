import { Avatar, Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getCurrentNews } from "../../../services/newService";

const CurrentNews = () => {
    const [list, setList] = useState<Array<any>>([]);

    useEffect(() => {
        async function fetchData() {
            let result = await getCurrentNews();
            setList(result);
        }
        fetchData();
    }, [])
    return (
        <Box mt={2}>
            {
                list.length > 0 && (
                    <>
                        <Box mr={1} mt={2}>
                            <Grid direction="row" container item className="Rectangle">
                                <Grid xs item>
                                    <Box m={2}>
                                        <h4 className="color">Últimas publicaciones</h4>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            list.map((noticia: any, index: number) => (
                                <div key={index} className="CurrentNews__Component">
                                    <Grid direction="row" container item className="CurrentNew">
                                        <Grid xs={2} item>
                                            <Box m={2}>
                                                <Avatar src={noticia.AutorImg ? noticia.AutorImg : '/assets/svg/user-avatar.svg'}></Avatar>
                                            </Box>
                                        </Grid>
                                        <Grid xs item>
                                            <Box m={2} mb={0}>
                                                <div className="ItsMyBirthday__person">
                                                    <span>{noticia.Titulo}</span>
                                                    <span>@{noticia.Autor}</span>
                                                </div>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid direction="row" container item className="CurrentNew" justify="center">
                                        <div className="ItsMyBirthday__person">
                                            <span className="color" dangerouslySetInnerHTML={{ __html: noticia.BodyHTML }}></span>
                                        </div>
                                    </Grid>
                                    {
                                        noticia.ImageUri && (
                                            <Grid direction="row" container item className="CurrentNew" justify="center">
                                                <div className="Image__person">
                                                    {
                                                        !noticia.ImageUri.includes('undefined') && (
                                                            <img src={
                                                                noticia.ImageUri
                                                            } alt="Noticia Imagen" />
                                                        )
                                                    }
                                                </div>
                                            </Grid>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </>
                )
            }
        </Box>
    )
}

export default CurrentNews;