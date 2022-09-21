import { useEffect, useState } from "react";
import { Box, Text} from "@chakra-ui/react"

const DemandeRDV= ()=>{

    const [url, setUrl] = useState("https://fhir.alliance4u.io/api/Appointment");
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data.filter(element => element.participant[1]?.actor.identifier.value == "7")));
    }, [url])

    useEffect(()=>{
        console.log(data)
    },[data]
    )

    return(
        <>
         <center>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                
            </Box>
         </center>
        </>
    )

}
export default DemandeRDV;