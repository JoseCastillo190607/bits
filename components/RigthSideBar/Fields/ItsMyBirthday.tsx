import { Box, Grid, Avatar } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { getDatesByBirthday } from "../../../services/calendarService";

const ItsMyBirthday = () => {
    const [list, setList] = useState<Array<any>>([]);

    useEffect(() => {
        async function fetchData() {
            let result = await getDatesByBirthday();
            setList(result);
        }
        fetchData();
    }, [])

    return (
        <Box mt={2}>
            {
                list.length > 0 && (
                    <>
                        <Box mr={3} mt={2}>
                            <Grid direction="row" container item className="Rectangle">
                                <Grid xs item>
                                    <Box m={2}>
                                        <h4 className="color">Cumpleaños del dia</h4>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            list?.map((person: any, index: number) => (
                                <div className="ItsMyBirthday__Component">
                                    <Grid key={index} direction="row" container item className="ItsMyBirthday">
                                        <Grid xs={2} item>
                                            <Box m={2}>
                                                <Avatar src={person?.Img ? person.Img : '/assets/svg/user-avatar.svg'}></Avatar>
                                            </Box>
                                        </Grid>
                                        <Grid xs item>
                                            <Box m={2} mb={0}>
                                                <div className="ItsMyBirthday__person">
                                                    <span>{ person? person?.Nombre : ''}</span>
                                                    <span>Hoy es su cumpleaños</span>
                                                </div>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))
                        }
                    </>
                )
            }
        </Box>

    )
}

export default ItsMyBirthday;