import { useEffect, useState } from "react";
import { Box, Accordion, Text, Heading, IconButton } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const DemandeRDV = () => {

    const [url, setUrl] = useState("https://fhir.alliance4u.io/api/Appointment");
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data.filter(element => element.participant[1]?.actor.identifier.value == "7" && element.status == "pending")));
    }, [url])

    useEffect(() => {
        console.log(data)
    }, [data]
    )

    return (
        <>
            <center>
            <Heading m={5}> Your appointment requests </Heading>
                {data?.map((element, index) => {
                    try {
                        return (
                            <Box key={index} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'm={[2, 3]}>
                                <Box flex='1' textAlign='left' fontFamily={'body'} borderRadius='md' bg='#9AE6B4' color='white' px={4} h={8}>
                                    Appointment ({element?.start && element.start.split("T")[0]})
                                </Box>
                                <Box pb={4}>
                                {/* {element.status && <Badge colorScheme={element.status == "booked" && "green"}>{element?.status}</Badge>} */}<br />
                                    Begins : {element?.start && element.start.split("T")[0]} at {element?.start && element.start.split("T")[1]}<br />
                                    Ends : {element?.end && element.end.split("T")[0]} at {element?.end && element.end.split("T")[1]}<br />
                                    {/*Duration : {element?.minutesDuration && element?.minutesDuration} minutes*/}
                                </Box>
                                <IconButton icon={<FontAwesomeIcon icon={faXmark} />}  w={'40px'} m={2} marginBottom={5}/>
                                <IconButton icon={<FontAwesomeIcon icon={faCheck} />} w={'40px'} m={2} marginBottom={5}/>
                            </Box>
                        )
                    } catch (error) {

                    }


                })}
            </center>
        </>
    )

}
export default DemandeRDV;