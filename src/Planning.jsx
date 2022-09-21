import { Text, Badge, Stack, Center, Flex } from "@chakra-ui/react";
import Calendar from "./Calendar";
import DemandeRDV from "./DemandeRDV";


const Planning = () => {
    return(
        <>
            <Flex>
              <DemandeRDV/>
              <Calendar/>  
            </Flex>
            
        </>

    )
}

export default Planning;